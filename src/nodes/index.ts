import DebugLogNode from './DebugLogNode.vue'
import EntryNode from './EntryNode.vue'
import StringNode from './StringNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode, category: 'Debug' },
    { type: 'run', component: EntryNode, category: 'Control' },
    { type: 'string-literal', component: StringNode, category: 'Data' }
  ]

