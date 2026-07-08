# @ai-native-solutions/quine-cube-runner-mcp

MCP server for **Quine Cube Runner** — exposes the ten built-in quine templates, sandboxed runner, byte-diff verifier, and mutation-testing loop as MCP tools and resources.

Runs over stdio. Uses [`@ai-native-solutions/quine-cube-runner-sdk`](https://github.com/sjgant80-hub/quine-cube-runner-sdk) under the hood.

## Install

```bash
npm install -g @ai-native-solutions/quine-cube-runner-mcp
```

Or add to any MCP client config (Claude Desktop, Cursor, Zed, etc.):

```json
{
  "mcpServers": {
    "quine-cube-runner": {
      "command": "npx",
      "args": ["-y", "@ai-native-solutions/quine-cube-runner-mcp"]
    }
  }
}
```

## Tools

| tool                       | input                                                | returns                                          |
|----------------------------|------------------------------------------------------|--------------------------------------------------|
| `quine_load_template`      | `{ language }`                                       | `{ source, language, bytes, runsIn }`            |
| `quine_run`                | `{ source, language }`                               | `{ output, ok, valid, simulated?, error? }`      |
| `quine_verify`             | `{ source, output }`                                 | `{ identical, diff, matchedLines, totalLines, sourceBytes, outputBytes }` |
| `quine_mutate_test`        | `{ source, position, char, language }` (empty char = delete) | `{ valid, broke, output, mutated, why }` |
| `quine_list_templates`     | `{}`                                                 | `{ templates: [{ key, label, runsIn, bytes }] }` |

`language` is one of: `js`, `py`, `rb`, `c`, `html`, `lisp`, `minimal`, `haiku`, `sonnet`, `opus`.

## Resources

- `quine-cube://templates` — all ten built-in templates with source
- `quine-cube://composition` — haiku / sonnet / opus tier metadata
- `quine-cube://lang-meta` — runtime lane and label per template key

## Estate

- SDK: [quine-cube-runner-sdk](https://github.com/sjgant80-hub/quine-cube-runner-sdk)
- HTTP proxy: [quine-cube-runner-api](https://github.com/sjgant80-hub/quine-cube-runner-api)
- Browser app: [quine-cube-runner](https://github.com/sjgant80-hub/quine-cube-runner)

## License

MIT · AI-Native Solutions
