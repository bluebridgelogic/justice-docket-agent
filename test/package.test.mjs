import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat,realpath} from 'node:fs/promises';
import {resolve,relative,sep} from 'node:path';
import {execFileSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..'),pkg=resolve(root,'plugins/justice-docket');
const json=async path=>JSON.parse(await readFile(resolve(root,path),'utf8'));
const within=(base,path)=>!relative(base,path).split(sep).includes('..');
async function files(directory){const result=[];for(const entry of await readdir(directory,{withFileTypes:true})){const path=resolve(directory,entry.name);assert.ok(!entry.isSymbolicLink(),'no symlink can escape a runtime package');if(entry.isDirectory())result.push(...await files(path));else result.push(path);}return result;}

test('portable and Claude packages agree on identity and the protected remote endpoint',async()=>{
 const manifest=await json('plugins/justice-docket/plugin.json'),claude=await json('plugins/justice-docket/.claude-plugin/plugin.json'),compat=await json('compatibility.json');
 assert.equal(manifest.$schema,'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
 const portableFields=['$schema','name','version','description','author','homepage','repository','license','keywords','extensions'];
 assert.ok(Object.keys(manifest).every(k=>portableFields.includes(k)));
 assert.match(manifest.name,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);assert.match(manifest.version,/^\d+\.\d+\.\d+$/);
 assert.equal(claude.name,manifest.name);assert.equal(claude.version,manifest.version);assert.equal(compat.packageVersion,manifest.version);
 assert.equal(manifest.repository,'https://github.com/bluebridgelogic/justice-docket-agent');
 const portable=await json('plugins/justice-docket/mcp.json'),legacy=await json('plugins/justice-docket/.mcp.json');
 assert.equal(portable.$schema,'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json');
 assert.deepEqual(Object.keys(portable).sort(),['$schema','mcpServers']);
 assert.deepEqual(Object.keys(portable.mcpServers),['justice-docket']);
 const server=portable.mcpServers['justice-docket'];assert.deepEqual(Object.keys(server).sort(),['type','url']);
 assert.equal(server.type,'streamable-http');assert.equal(server.url,compat.mcpEndpoint);
 assert.equal(new URL(server.url).protocol,'https:');assert.equal(new URL(server.url).pathname,'/mcp');
 assert.deepEqual(legacy,{mcpServers:{'justice-docket':{type:'http',url:server.url}}});
 assert.equal(claude.mcpServers,'./.mcp.json');assert.equal(claude.skills,'./skills/');
 assert.equal(manifest.extensions['com.openai'].interface.capabilities[0],'Read');
 const setup=resolve(pkg,manifest.extensions['com.openai'].onboardingSkill);assert.ok(within(pkg,setup));assert.ok((await stat(setup)).isFile());
});

test('both marketplace catalogs resolve to the same contained package',async()=>{
 const openai=await json('.agents/plugins/marketplace.json'),claude=await json('.claude-plugin/marketplace.json');
 assert.equal(openai.name,claude.name);assert.equal(openai.plugins.length,1);assert.equal(claude.plugins.length,1);
 assert.equal(openai.plugins[0].name,claude.plugins[0].name);
 const path=openai.plugins[0].source.path;assert.ok(path.startsWith('./'));assert.equal(claude.plugins[0].source,path);
 assert.equal(openai.plugins[0].source.source,'local');assert.equal(await realpath(resolve(root,path)),pkg);
 assert.equal(openai.plugins[0].policy.installation,'AVAILABLE');assert.equal(openai.plugins[0].policy.authentication,'ON_INSTALL');
});

test('runtime files contain portable skills and no credentials, scripts, or corpus artifacts',async()=>{
 const paths=await files(pkg),skills=paths.filter(p=>p.endsWith('/SKILL.md'));assert.equal(skills.length,2);
 for(const path of paths){
  assert.ok(within(pkg,path));assert.ok(path.endsWith('.json')||path.endsWith('.md'));
  const text=await readFile(path,'utf8');
  assert.doesNotMatch(text,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9._-]{20,}|plugin_asdk_app_[a-f0-9]+|\/Users\//);
  if(path.endsWith('.json')){const value=JSON.parse(text);const keys=Object.keys(value);assert.ok(!keys.some(k=>/token|password|clientSecret|headers|command|hooks/i.test(k)));}
 }
 for(const path of skills){const text=await readFile(path,'utf8');const front=text.match(/^---\n([\s\S]*?)\n---\n/);assert.ok(front);assert.match(front[1],/^name: [a-z0-9-]+$/m);assert.match(front[1],/^description: .{30,}$/m);assert.doesNotMatch(text,/\bTODO\b|\[INSERT|\[PLACEHOLDER/);}
 const compat=await json('compatibility.json');assert.equal(compat.toolContractVersion,'1.0.0');assert.equal(new Set(compat.tools).size,5);
});

test('documentation local references resolve without escaping the repository',async()=>{
 const paths=(await files(resolve(root,'docs'))).concat(resolve(root,'README.md'));
 for(const path of paths)for(const match of (await readFile(path,'utf8')).matchAll(/\]\(([^)]+)\)/g)){
  const href=match[1];if(href.includes('://')||href.startsWith('#'))continue;
  const target=resolve(path,'..',href.split('#')[0]);assert.ok(within(root,target));assert.ok((await stat(target)).isFile(),`${relative(root,path)} links to missing file`);
 }
});

test('release archives are deterministic runtime-only packages with identical shared skills',async()=>{
 const build=()=>execFileSync('python3',[resolve(root,'scripts/package.py')],{cwd:root,encoding:'utf8'});
 build();const first=await readFile(resolve(root,'dist/SHA256SUMS'),'utf8');build();
 assert.equal(await readFile(resolve(root,'dist/SHA256SUMS'),'utf8'),first);
 const verify=`from pathlib import Path\nfrom zipfile import ZipFile\nimport json\nr=Path.cwd()\nresult=[]\nfor p in sorted((r/'dist').glob('*.zip')):\n with ZipFile(p) as z:\n  files=z.namelist()\n  assert z.testzip() is None\n  assert len(files)==4\n  assert not any('..' in Path(f).parts or f.startswith('/') for f in files)\n  assert all(f.startswith('skills/') or f in ['plugin.json','mcp.json','.mcp.json','.claude-plugin/plugin.json'] for f in files)\n  for f in files:\n   if f.startswith('skills/'):\n    assert z.read(f)==(r/'plugins/justice-docket'/f).read_bytes()\n  result.append({'archive':p.name,'files':files})\nprint(json.dumps(result))`;
 const archives=JSON.parse(execFileSync('python3',['-c',verify],{cwd:root,encoding:'utf8'}));assert.equal(archives.length,2);
 assert.ok(archives.find(a=>a.archive.includes('-claude-')).files.includes('.claude-plugin/plugin.json'));
 assert.ok(archives.find(a=>a.archive.includes('-portable-')).files.includes('plugin.json'));
});
