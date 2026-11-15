---
name: justice-docket-setup
description: Install, authorize, reconnect, or check the Justice Docket research plugin and hosted MCP connection in a supported AI client. Use for setup or missing Justice Docket tools.
---

Read the [Justice Docket setup guide](https://justicedocket.bluebridgelogic.com/connect-your-ai) and follow the section for the user's actual client and account. Its [Markdown view](https://justicedocket.bluebridgelogic.com/connect-your-ai.md) provides the same essential steps when an agent-readable view is needed.

Read the linked current official installation instructions before guiding the user through vendor controls. If useful screenshots are linked and image tools are available, inspect them; use the textual instructions and captions when images are unavailable. Distinguish ChatGPT and Claude chat surfaces from Codex and Claude Code. Do not assume a CLI installation proves a chat connection or that an account has workspace-admin controls.

The package source is [bluebridgelogic/justice-docket-agent](https://github.com/bluebridgelogic/justice-docket-agent). The hosted MCP endpoint is `https://justicedocket.bluebridgelogic.com/mcp`, with OAuth sign-in through Justice Docket. A public repository or installed skill alone does not establish an authenticated tool connection.

Guide the user through the client's supported install, sign-in, and consent flow. Keep credentials in that flow; never ask the user to paste a password, access token, or client secret into chat. If an account policy or admin approval blocks setup, identify the actual missing capability and leave it unresolved rather than substituting unauthenticated access.

After installation, follow any required new-chat/session step. Verify that `search_records` is available and offer a small user-approved read. Report skill availability, connection authorization, successful retrieval, and any missing client verification separately. A successful protocol check is not a completed real-client investigation.

Explain how to find the connection in Justice Docket and revoke its access. Previously disclosed material may remain in the external conversation after revocation. Resume research with the user's question only when the connection is active.
