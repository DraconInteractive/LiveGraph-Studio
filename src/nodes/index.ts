import DebugLogNode from './DebugLogNode.vue'
import EntryNode from './EntryNode.vue'
import StringNode from './StringNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode },
    { type: 'run', component: EntryNode },
    { type: "string-literal", component: StringNode}
]

