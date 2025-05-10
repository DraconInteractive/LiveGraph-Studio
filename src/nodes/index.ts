import IntNode from './Core/Data/IntNode.vue'
import DebugLogNode from './Core/DebugLogNode.vue'
import EntryNode from './Core/EntryNode.vue'
import FindSentientByIDNode from './Eternal/Data/FindSentientByIDNode.vue'
import FindSentientByNameNode from './Eternal/Data/FindSentientByNameNode.vue'
import StringNode from './Core/Data/StringNode.vue'
import ToStringNode from './Core/Data/ToStringNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode, category: 'Debug' },
    { type: 'run', component: EntryNode, category: 'Control' },
    { type: 'string-literal', component: StringNode, category: 'Data' },
    { type: 'int-literal', component: IntNode, category: 'Data' },
    { type: 'to-string-node', component: ToStringNode, category: 'Data'},
    { type: 'find-sentient-name-node', component: FindSentientByNameNode, category: 'Data'},
    { type: 'find-sentient-id-node', component: FindSentientByIDNode, category: 'Data'},
  ]

