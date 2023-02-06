<script setup>
import { ref } from 'vue'

const pokedexVisible = ref(false)


</script>

<template>
<el-dialog v-model="pokedexVisible" title="Pokedex" width="50%" height="50%" center>
    <el-form label-position='top' status-icon ref="ruleFormRef" :label-width="80">
    </el-form>
</el-dialog>
</template>

<style>
</style>