<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'

const props = defineProps(['id', 'data'])
</script>

<template>
    <BaseNode
      :id="props.id"
      :data="props.data"
      title="Debug Log"
      :inputs="['Exec', 'Message']"
      :outputs="['Exec']"
    >
      <template #body>
        <div style="font-size: 11px; color: #bbb;">
          Logs the message to the debug console. blah blas
        </div>
      </template>
    </BaseNode>
  </template>
