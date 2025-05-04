import DebugLogNode from './DebugLogNode.vue'
import EntryNode from './EntryNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode },
    { type: 'run', component: EntryNode }
]

