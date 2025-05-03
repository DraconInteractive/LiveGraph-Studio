<script setup lang="ts">
import BaseNode from '../components/BaseNode.vue'

const props = defineProps(['id', 'data'])
</script>

<template>
  <BaseNode
    :id="props.id"
    :data="props.data"
    title="Run"
    body=""
    :inputs="[]"
    :outputs="['Exec']"
  />
</template>
