import IntNode from './Core/Data/IntNode.vue'
import DebugLogNode from './Core/DebugLogNode.vue'
import EntryNode from './Core/EntryNode.vue'
import FindSentientByIDNode from './Eternal/Data/FindSentientByIDNode.vue'
import FindSentientByNameNode from './Eternal/Data/FindSentientByNameNode.vue'
import StringNode from './Core/Data/StringNode.vue'
import ToStringNode from './Core/Data/ToStringNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode, category: 'Debug', display: 'Debug Log' },
    { type: 'run', component: EntryNode, category: 'Control', display: 'Entry' },
    { type: 'string-literal', component: StringNode, category: 'Data', display: 'String' },
    { type: 'int-literal', component: IntNode, category: 'Data', display: 'Int' },
    { type: 'to-string-node', component: ToStringNode, category: 'Data', display: 'To String'},
    { type: 'find-sentient-name-node', component: FindSentientByNameNode, category: 'Data', display: 'Find Sentient by Name'},
    { type: 'find-sentient-id-node', component: FindSentientByIDNode, category: 'Data', display: 'Find Sentient by ID'},
  ]

