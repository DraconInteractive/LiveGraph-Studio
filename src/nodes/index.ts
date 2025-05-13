import IntNode from './Core/Data/IntNode.vue'
import DebugLogNode from './Core/DebugLogNode.vue'
import EntryNode from './Core/Control/EntryNode.vue'
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
import AllSentients from './Eternal/Data/AllSentients.vue'
import ForEachNode from './Core/Control/ForEachNode.vue'
import BranchNode from './Core/Control/BranchNode.vue'
import EqualsNode from './Core/Math/EqualsNode.vue'
import BreakNode from './Core/Control/BreakNode.vue'
import GetNode from './Core/Variables/GetNode.vue'
import SetNode from './Core/Variables/SetNode.vue'
import RouteNode from './Core/Control/RouteNode.vue'
import IsNullNode from './Core/Math/IsNullNode.vue'
import AppendString from './Core/Data/AppendString.vue'

export const nodeTypes = [
    { type: 'debug-log', component: DebugLogNode, category: 'Debug', display: 'Debug Log' },
    { type: 'route-node', component: RouteNode, category: 'Debug', display: 'Route' },
    { type: 'run', component: EntryNode, category: 'Control', display: 'Entry' },
    { type: 'for-each-node', component: ForEachNode, category: 'Control', display: 'For Each' },
    { type: 'break-node', component: BreakNode, category: 'Control', display: 'Break Loop'},
    { type: 'branch-node', component: BranchNode, category: 'Control', display: 'If' },
    { type: 'equals-node', component: EqualsNode, category: 'Math', display: 'Equals' },
    { type: 'is-null-node', component: IsNullNode, category: 'Math', display: 'Is Null' },
    { type: 'string-literal', component: StringNode, category: 'Data/Primitives', display: 'String' },
    { type: 'float-literal', component: FloatNode, category: 'Data/Primitives', display: 'Float'},
    { type: 'int-literal', component: IntNode, category: 'Data/Primitives', display: 'Int' },
    { type: 'bool-literal', component: BoolNode, category: 'Data/Primitives', display: 'Bool' },
    { type: 'to-string-node', component: ToStringNode, category: 'Data/String', display: 'To String'},
    { type: 'append-string-node', component: AppendString, category: 'Data/String', display: 'Append'},
    { type: 'get-node', component: GetNode, category: 'Variables', display: 'Get Variable'},
    { type: 'set-node', component: SetNode, category: 'Variables', display: 'Set Variable'},
    { type: 'find-sentient-name-node', component: FindSentientByNameNode, category: 'Eternal/Data', display: 'Find Sentient by Name'},
    { type: 'find-sentient-id-node', component: FindSentientByIDNode, category: 'Eternal/Data', display: 'Find Sentient by ID'},
    { type: 'sentient-node', component: SentientDetails, category: 'Eternal/Data', display: 'Sentient'},
    { type: 'position-node', component: PositionDetails, category: 'Eternal/Data', display: 'Position'},
    { type: 'rotation-node', component: RotationDetails, category: 'Eternal/Data', display: 'Rotation'},
    { type: 'sentient-move-node', component: MoveSentientNode, category: 'Eternal/Actions', display: 'Sentient - Move To'},
    { type: 'all-sentients-node', component: AllSentients, category: 'Eternal/Data', display: 'Sentients - All'},


  ]

