# Owner verification in Claude and ChatGPT

Real-client verification is deferred to the owner for this initial package.
The following is an acceptance checklist, not evidence that these checks passed.

Run it separately in the intended Claude chat and ChatGPT chat accounts. Record
the client/surface, account plan, workspace/admin requirements, package version,
date, and actual outcome in private operating notes. Keep the source questions,
answers, and screenshots out of this public repository.

1. Start from the app's two-sentence setup prompt and follow the correct client
   route. Confirm installation of the research skill plus the remote connector.
2. Sign in to Justice Docket and consent. Confirm that the connection is attributed
   to the expected user and client. Follow any new-chat/session requirement.
3. Ask a known representative expert question. Open the resulting record,
   related matter, literal passage, and original source location. Confirm that
   the answer's factual findings have checkable citations.
4. Try an ambiguous identity, conflicting statements, an unrelated query, and a
   partly indexed scope. The assistant should preserve attribution and disclose
   coverage limits. [Synthetic scenarios](../test/research-cases.json) can help
   structure this review without publishing private material.
5. Revoke the connection through Justice Docket. Retry an existing tool call and
   any supported refresh flow: subsequent reads must be denied. Reconnect only
   through fresh user consent.
6. Check the available desktop/phone surfaces and record real limitations. A
   local manifest validator, HTTP probe, Codex run, or Claude Code run does not
   establish either required chat-client journey.

Record missing capabilities or vendor approval steps visibly. Do not mark the
integration accepted until each required real client has its own evidence.
