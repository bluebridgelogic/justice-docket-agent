# Releases and compatibility

Package version `0.1.1` targets Justice Docket tool contract `1.0.0` and the five
read-only tools named in [compatibility.json](../compatibility.json). Protocol
version negotiation belongs to the MCP server and client; the package never
stores an access token or client secret.

Maintain the two research/setup skills in `plugins/justice-docket/skills/`.
Both native client manifests reference that package. When changing a tool name,
schema, response meaning, or source-location contract, update compatibility
metadata and instructions together. A breaking server contract needs an explicit
compatibility decision rather than a silent skill update.

Before publication:

1. Run `npm run check`, skill frontmatter validation, and the native Claude
   manifest/marketplace validator. Record precisely which checks ran.
2. Run `npm run build`. Review each ZIP's file list and compare `SHA256SUMS`.
   The packager includes only runtime manifests and skills, not tests, private
   files, local output, or application source.
3. Commit the reviewed source, tag the package version, and attach the two ZIPs
   and checksums to that GitHub release. No vendor directory listing is implied.
4. Complete the [real-client checklist](verification.md), or visibly retain its
   pending status when the owner has deferred it.

To roll back package instructions, pin or republish the previous reviewed tag
using each client's supported update controls and start a fresh chat/session when
required. A GitHub rollback does not revoke issued grants, remove previously
disclosed conversations, restore application data, or roll back the server.
Use Justice Docket's connection controls for revocation. Keep the server compatible
with the package versions still in use until an intentional migration is ready.

The official portable MCP schema currently excludes extension fields inside its
remote-server entry, while OpenAI's guide documents additional OAuth extensions.
The portable `mcp.json` therefore uses the strict common schema and relies on the
protected server's OAuth discovery. OpenAI setup still selects OAuth explicitly.
The native Claude configuration uses its documented `http` transport spelling.

References checked November 14, 2026:
[portable plugin schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json),
[portable MCP schema](https://agent-plugins.org/schemas/1.0.0/mcp.schema.json),
[OpenAI plugin packaging](https://developers.openai.com/plugins/build/plugins),
[Claude manifest reference](https://code.claude.com/docs/en/plugins-reference).
