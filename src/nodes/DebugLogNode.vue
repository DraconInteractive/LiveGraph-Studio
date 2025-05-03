<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'

const props = defineProps(['id', 'data'])
</script>

<template>
  <BaseNode
    :id="props.id"
    :data="props.data"
    title="Debug Log"
    body=""
    :inputs="['Exec', 'Message']"
    :outputs="['Exec']"
  />
</template>
