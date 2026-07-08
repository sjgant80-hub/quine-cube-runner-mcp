// @ai-native-solutions/quine-cube-runner-mcp · resources.js

import {
  TEMPLATES, LANG_META, COMPOSITION, listTemplates
} from '@ai-native-solutions/quine-cube-runner-sdk';

export const RESOURCES = [
  {
    uri: 'quine-cube://templates',
    name: 'Built-in quine templates',
    description: 'All ten built-in templates with metadata (key, label, runsIn, bytes, source).',
    mimeType: 'application/json',
    read: () => JSON.stringify({
      count: 10,
      templates: listTemplates().map(t => ({ ...t, source: TEMPLATES[t.key] }))
    }, null, 2)
  },
  {
    uri: 'quine-cube://composition',
    name: 'Composition tiers',
    description: 'Haiku / sonnet / opus tier metadata (short / structured / nested).',
    mimeType: 'application/json',
    read: () => JSON.stringify(COMPOSITION, null, 2)
  },
  {
    uri: 'quine-cube://lang-meta',
    name: 'Language metadata',
    description: 'Runtime lane and label for each of the ten template keys.',
    mimeType: 'application/json',
    read: () => JSON.stringify(LANG_META, null, 2)
  }
];
