<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'

const props = defineProps<{
  id: string
  nodeId: string
}>()

const { updateNodeData, getNode } = useVueFlow()

// Watch the node's data for this handle's value
const node = computed(() => getNode.value(props.nodeId))
const currentValue = computed({
  get: () => node.value?.data?.[props.id] ?? '',
  set: (val: string) => {
    updateNodeData(props.nodeId, { [props.id]: val })
  }
})
</script>

<template>
  <input
    v-model="currentValue"
    type="text"
    placeholder="Enter string..."
    style="font-size: 4px; padding: 2px; text-align: left; width: 50px; margin-right: 4px;"
  />
</template>
