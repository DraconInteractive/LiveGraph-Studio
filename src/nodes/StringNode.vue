<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import StringHandle from "../components/StringHandle.vue"

const props = defineProps(['id', 'data'])

const inputs: HandleDef[] = []
const outputs = [
  { id: 'String', dataType: 'string' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'string-node'

</script>

<template>
  <BaseNode
    :id="props.id"
    :data="props.data"
    title="String"
    :inputs="inputs"
    :outputs="outputs"
  >
    <template #output-String>
        <StringHandle :id="'String'" :node-id="props.id" />
    </template>
  </BaseNode>
</template>


<style>
.custom-node.string-node {
  background-color: rosybrown !important;
  width: 50px;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
}

.custom-node.string-node .node-body {
  padding-left: 10px;
  padding-right: 10px;
}
</style>

