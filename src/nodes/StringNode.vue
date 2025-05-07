<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'
import { ref, computed, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'

const props = defineProps(['id', 'data'])
const { updateNodeData, getEdges } = useVueFlow()

const inputs: HandleDef[] = []

const outputs = [
  { id: 'String', dataType: 'string' }
]

const isUnconnected = computed(() =>
  !getEdges.value.some(e => e.sourceHandle === 'source-String')
)

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'string-node'
// Local value (two-way binding with input)
const localValue = computed({
  get: () => props.data.value,
  set: (val: string) => {
    props.data.value = val
  }
})
// Keep node data in sync when local input changes
watch(localValue, (val) => {
  updateNodeData(props.id, { value: val })
})

</script>

<template>
  <BaseNode
    :id="props.id"
    :data="props.data"
    title="String"
    :inputs="inputs"
    :outputs="outputs"
  >
    <template #output-String="{ handle }">
      <input
        v-if="isUnconnected"
        v-model="localValue"
        type="text"
        placeholder="Enter string..."
        style="font-size: 6px; padding: 2px; width: 60px; margin: 0 4px;"
      />
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

