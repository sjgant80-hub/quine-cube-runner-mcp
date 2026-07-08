// @ai-native-solutions/quine-cube-runner-mcp · tools.js
// MCP tool definitions backed by @ai-native-solutions/quine-cube-runner-sdk.

import {
  loadTemplate, run, verify, mutateReplace, listTemplates, detectLang
} from '@ai-native-solutions/quine-cube-runner-sdk';

const LANG_ENUM = ['js','py','rb','c','html','lisp','minimal','haiku','sonnet','opus'];

export const TOOLS = [
  {
    name: 'quine_load_template',
    description: 'Load one of the ten built-in quine templates by language key.',
    inputSchema: {
      type: 'object',
      properties: {
        language: { type: 'string', enum: LANG_ENUM, description: 'Template key.' }
      },
      required: ['language']
    },
    run: async ({ language }) => {
      const source = loadTemplate(language);
      return { source, language, bytes: source.length, runsIn: detectLang(language) };
    }
  },
  {
    name: 'quine_run',
    description: 'Run a quine source in a sandbox. JS runs in node:vm; HTML/others are simulated on the server.',
    inputSchema: {
      type: 'object',
      properties: {
        source:   { type: 'string' },
        language: { type: 'string', enum: LANG_ENUM }
      },
      required: ['source', 'language']
    },
    run: async ({ source, language }) => {
      const res = await run(source, language);
      const v = res.ok ? verify(source, res.output) : { identical: false };
      return { output: res.output, ok: res.ok, valid: !!v.identical, simulated: !!res.simulated, error: res.error };
    }
  },
  {
    name: 'quine_verify',
    description: 'Byte-diff a quine source against its output. Returns identical flag and line diff.',
    inputSchema: {
      type: 'object',
      properties: {
        source: { type: 'string' },
        output: { type: 'string' }
      },
      required: ['source', 'output']
    },
    run: async ({ source, output }) => verify(source, output)
  },
  {
    name: 'quine_mutate_test',
    description: 'Replace the character at `position` with `char` (empty string = delete), re-run, report whether the mutation broke the quine.',
    inputSchema: {
      type: 'object',
      properties: {
        source:   { type: 'string' },
        position: { type: 'number', description: 'Character index in source.' },
        char:     { type: 'string', description: 'Replacement character (empty string = delete).' },
        language: { type: 'string', enum: LANG_ENUM }
      },
      required: ['source', 'position', 'language']
    },
    run: async ({ source, position, char = '', language }) => {
      const r = await mutateReplace(source, Number(position), String(char || ''), language);
      return { valid: r.valid, broke: r.broke, output: r.output, mutated: r.mutated, why: r.why };
    }
  },
  {
    name: 'quine_list_templates',
    description: 'List the ten built-in template keys with labels, runtime lanes, and byte lengths.',
    inputSchema: { type: 'object', properties: {} },
    run: async () => ({ templates: listTemplates() })
  }
];
