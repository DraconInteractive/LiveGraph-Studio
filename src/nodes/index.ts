import IntNode from './Core/Data/IntNode.vue'
import DebugLogNode from './Core/DebugLogNode.vue'
import EntryNode from './Core/EntryNode.vue'
import FindSentientByIDNode from './Eternal/Data/FindSentientByIDNode.vue'
import FindSentientByNameNode from './Eternal/Data/FindSentientByNameNode.vue'
import StringNode from './Core/Data/StringNode.vue'
import ToStringNode from './Core/Data/ToStringNode.vue'
import FloatNode from './Core/Data/FloatNode.vue'
import BoolNode from './Core/Data/BoolNode.vue'
import SentientDetails from './Eternal/Data/SentientDetails.vue'
import PositionDetails from './Eternal/Data/PositionDetails.vue'
import RotationDetails from './Eternal/Data/RotationDetails.vue'
import MoveSentientNode from './Eternal/Actions/MoveSentientNode.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode, category: 'Debug', display: 'Debug Log' },
    { type: 'run', component: EntryNode, category: 'Control', display: 'Entry' },
    { type: 'string-literal', component: StringNode, category: 'Data/Primitives', display: 'String' },
    { type: 'float-literal', component: FloatNode, category: 'Data/Primitives', display: 'Float'},
    { type: 'int-literal', component: IntNode, category: 'Data/Primitives', display: 'Int' },
    { type: 'bool-literal', component: BoolNode, category: 'Data/Primitives', display: 'Bool' },
    { type: 'to-string-node', component: ToStringNode, category: 'Data', display: 'To String'},
    { type: 'find-sentient-name-node', component: FindSentientByNameNode, category: 'Eternal/Data', display: 'Find Sentient by Name'},
    { type: 'find-sentient-id-node', component: FindSentientByIDNode, category: 'Eternal/Data', display: 'Find Sentient by ID'},
    { type: 'sentient-node', component: SentientDetails, category: 'Eternal/Data', display: 'Sentient'},
    { type: 'position-node', component: PositionDetails, category: 'Eternal/Data', display: 'Position'},
    { type: 'rotation-node', component: RotationDetails, category: 'Eternal/Data', display: 'Rotation'},
    { type: 'sentient-move-node', component: MoveSentientNode, category: 'Eternal/Actions', display: 'Sentient - Move To'},


  ]

