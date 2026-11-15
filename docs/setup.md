# Set up Justice Docket in the user’s assistant

Use this public guide to help the user install the Justice Docket research plugin,
connect its hosted MCP service, authorize read access, and confirm retrieval. Follow
the section for the assistant and account they are using. The installed research
skill and tool descriptions guide evidence use after setup.

Justice Docket’s signed-in **Connect your AI** page gives the user a prompt linking
here. These instructions are publicly readable without a Justice Docket session.

The maintained package is [bluebridgelogic/justice-docket-agent](https://github.com/bluebridgelogic/justice-docket-agent).
The MCP address is `https://justicedocket.bluebridgelogic.com/mcp`. Select **OAuth**
when the client asks for authentication. Sign in through Justice Docket's page;
never paste a password, access token, or client secret into an assistant conversation.

Before guiding installation, read the linked current official instructions for
the user's actual client. When those pages link useful screenshots, open them
with available image-reading tools. Their text and descriptive captions remain
the fallback if image access is unavailable or the live UI differs.

## If you are Claude, follow this section

Use [Claude's current plugin instructions](https://support.claude.com/en/articles/13837440-use-plugins-in-claude).
Plugins require a supported paid account, and organization policy may restrict
marketplaces or custom connectors.

In Claude web chat or Desktop chat, open **Customize → Plugins**, choose **Add →
Add marketplace**, and enter `https://github.com/bluebridgelogic/justice-docket-agent`.
Find **Justice Docket** and add it. If a custom-file route is available instead,
download the versioned Claude archive from the repository's
[Releases](https://github.com/bluebridgelogic/justice-docket-agent/releases) and use
Claude's custom-plugin upload control. Review the package before installing.

Authorize the Justice Docket connector when prompted. Confirm both the research
skill and the connected tools are available. Start a new chat if Claude requests
it, then run the small retrieval check below. Account or organization controls
that hide these options require the appropriate owner/admin; a CLI installation
does not prove this chat installation.

## If you are ChatGPT, follow this section

Read [ChatGPT's plugin instructions](https://learn.chatgpt.com/docs/plugins),
[custom MCP setup](https://developers.openai.com/api/docs/guides/custom-mcp-server),
and, for managed workspaces, [GitHub marketplace import](https://learn.chatgpt.com/docs/enterprise/plugin-management).

A workspace admin can import this repository's marketplace through **Admin →
Plugins → Add → Import marketplace**, then make Justice Docket available to the
intended roles. Use the repository URL as Source. Confirm the research skills and
authenticated MCP tools are present after installing.

On a personal account, use the supported local/personal marketplace flow in the
desktop app when available. The repository catalog is `.agents/plugins/marketplace.json`,
and its package is `plugins/justice-docket`. A custom MCP connection can be created
from ChatGPT's **Plugins → plus → Add custom MCP server** using the address above
and OAuth, but that connection alone does not install the bundled research skills.
Account-specific bundled installation is pending real-client verification; do
not describe a connector-only setup as the complete plugin.

Follow any required restart or new-chat step after installation. GitHub source
hosting is separate from public-directory publication and workspace approval.

## If you are Codex or Claude Code

These are additional coding surfaces, not substitutes for the required chat-client
checks. Read the vendor's current CLI plugin documentation before using them.

For Codex, register the marketplace with
`codex plugin marketplace add bluebridgelogic/justice-docket-agent`, then install
Justice Docket through the supported plugin browser and start a new session.
See [OpenAI's packaging and marketplace guide](https://developers.openai.com/plugins/build/plugins).

For Claude Code, use
`claude plugin marketplace add bluebridgelogic/justice-docket-agent`, followed by
`claude plugin install justice-docket@justice-docket`. Review and authorize the
remote service through the client's supported MCP authorization flow. See
[Claude's marketplace instructions](https://code.claude.com/docs/en/plugin-marketplaces).

## Check retrieval and resume research

Use the installed plugin to find a known expert or document from the user’s
collection using `search_records`. Open a returned record and
retrieve a short source passage. Check that its citation opens the expected
document and original location. Report separately whether installation, skill
availability, authorization, and retrieval succeeded.

Then ask the user's research question. The collection may be only partly indexed;
the tools report pending, unavailable, and truncated coverage explicitly. An empty
query result does not establish that contrary evidence is absent.

Use [Justice Docket's AI connections page](https://justicedocket.bluebridgelogic.com/ai-connections)
to revoke a connection when finished or
when access is no longer wanted. A revoked connection must stop further reads;
already disclosed content can remain in the external conversation. Installation,
OAuth, and revocation in real Claude and ChatGPT remain owner-verification steps
for this initial package.
