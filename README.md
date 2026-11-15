# Justice Docket agent

Research skills and read-only MCP connection declarations for Justice Docket.
The hosted service supplies authorized records and source evidence; your assistant
plans the investigation and writes the answer through your AI account.

Start with the [public setup guide](https://justicedocket.bluebridgelogic.com/connect-your-ai)
or its [Markdown view](https://justicedocket.bluebridgelogic.com/connect-your-ai.md).
The [repository copy](docs/setup.md) records the instructions shipped with this package.

The two-sentence setup prompt is:

> Connect this assistant to Justice Docket so I can research expert witnesses, cases, and supporting documents. Read https://justicedocket.bluebridgelogic.com/connect-your-ai and guide me through installing Justice Docket for this app.

## Package

`plugins/justice-docket` is the common package. It contains:

- `plugin.json` and `mcp.json`: portable Agent Plugins 1.0 manifests, with OpenAI presentation metadata.
- `.claude-plugin/plugin.json` and `.mcp.json`: Claude's native manifest and HTTP connector configuration.
- `skills/justice-docket-research`: the shared source-backed research workflow.
- `skills/justice-docket-setup`: installation and reconnection guidance.

The repository root supplies both `.agents/plugins/marketplace.json` and
`.claude-plugin/marketplace.json`. Account permissions, supported surfaces, and
installation mechanisms differ; follow the relevant section of the setup guide.
Claude Code users can install from the repository with
`/plugin install justice-docket --marketplace bluebridgelogic/justice-docket-agent`.
Public GitHub hosting does not make the package a listing in either vendor's
public directory. ChatGPT registered-app mappings are created through its actual
connection flow; this package contains no fabricated app ID or fixed credential.

## Verification and maintenance

Use Node 22+ and Python 3:

```sh
npm run check
npm run build
```

The build writes deterministic portable and Claude ZIPs plus `SHA256SUMS` under
ignored `dist/`. It makes no network, model, or agent calls. The archives share
the same maintained skills. [Compatibility metadata](compatibility.json) records
package and server tool-contract versions; [release guidance](docs/releases.md)
describes updates and rollback.

Package/schema checks do not prove installation or OAuth behavior in either real
client. The owner will perform those checks with the
[manual verification checklist](docs/verification.md). Keep any account-specific
screenshots, source text, credentials, and test conversations out of this public
repository. It contains synthetic review cases only.

Copyright and publication terms are recorded in [NOTICE](NOTICE). No open-source
license has been selected for this initial version.
