import edge from 'edge.js'
import { marked } from 'marked'

/**
 * Register global helper to render markdown
 */
edge.global('markdown', (value: string) => {
  if (!value) return ''
  return marked.parse(value)
})
