<script setup lang="ts">
import BaseNode from '~/nodes/BaseNode.vue'
import { HandleDef } from '~/types/HandleDef'

const props = defineProps(['id', 'data'])

const inputs: HandleDef[] = []

const outputs = [
  { id: 'All', dataType: 'sentient' }
]

props.data.inputs = inputs
props.data.outputs = outputs
props.data.class = 'all-sentients-node'
</script>

<template>
    <BaseNode
        :id="props.id"
        :data="props.data"
        title="All Sentients"
        :inputs="inputs"
        :outputs="outputs"
        :titleSpacing="35"
        :bottomSpacing="12"
        :render-title="true"
        :render-body="true"
        :render-spacer="true"
    />
</template>

<style>
.custom-node.all-sentients-node {
  min-width: 50px;
}
</style>