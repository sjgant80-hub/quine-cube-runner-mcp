#!/usr/bin/env node
// quine-cube-runner-mcp · MCP stdio server wrapping quine-cube-runner-sdk · MIT · AI-Native Solutions
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server({ name: 'quine-cube-runner-mcp', version: '1.0.0' }, { capabilities: { tools: {} } });

const TOOLS = [
  {
    name: 'quine-cube-runner_show_toast',
    description: 'showToast · from quine-cube-runner-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { showToast } = await import('@ai-native-solutions/quine-cube-runner-sdk');
      return typeof showToast === 'function' ? await showToast(args) : { error: 'showToast not callable' };
    }
  },
  {
    name: 'quine-cube-runner_update_stats',
    description: 'updateStats · from quine-cube-runner-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { updateStats } = await import('@ai-native-solutions/quine-cube-runner-sdk');
      return typeof updateStats === 'function' ? await updateStats(args) : { error: 'updateStats not callable' };
    }
  },
  {
    name: 'quine-cube-runner_paint_cube',
    description: 'paintCube · from quine-cube-runner-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { paintCube } = await import('@ai-native-solutions/quine-cube-runner-sdk');
      return typeof paintCube === 'function' ? await paintCube(args) : { error: 'paintCube not callable' };
    }
  },
  {
    name: 'quine-cube-runner_detect_lang',
    description: 'detectLang · from quine-cube-runner-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { detectLang } = await import('@ai-native-solutions/quine-cube-runner-sdk');
      return typeof detectLang === 'function' ? await detectLang(args) : { error: 'detectLang not callable' };
    }
  },
  {
    name: 'quine-cube-runner_run_in_sandbox',
    description: 'runInSandbox · from quine-cube-runner-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { runInSandbox } = await import('@ai-native-solutions/quine-cube-runner-sdk');
      return typeof runInSandbox === 'function' ? await runInSandbox(args) : { error: 'runInSandbox not callable' };
    }
  },
  {
    name: 'quine-cube-runner_run',
    description: 'run · from quine-cube-runner-sdk',
    inputSchema: { type: 'object', properties: {} },
    handler: async (args) => {
      const { run } = await import('@ai-native-solutions/quine-cube-runner-sdk');
      return typeof run === 'function' ? await run(args) : { error: 'run not callable' };
    }
  }
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(({ handler, ...rest }) => rest)
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const t = TOOLS.find(x => x.name === req.params.name);
  if (!t) throw new Error('unknown tool: ' + req.params.name);
  const result = await t.handler(req.params.arguments || {});
  return { content: [{ type: 'text', text: JSON.stringify(result) }] };
});

await server.connect(new StdioServerTransport());
console.error('quine-cube-runner-mcp v1.0.0 · stdio ready');
