import DebugLogNode from './DebugLogNode.vue'
import CustomNode from './CustomNode.vue'
import EntryNode from './EntryNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode },
    { type: 'custom', component: CustomNode },
    { type: 'run', component: EntryNode }
]

