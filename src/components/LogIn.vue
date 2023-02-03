<script setup>
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>

<template>
<el-dialog v-model="centerDialogVisible" title="LogIn" width="50%" height="50%" center>
    <el-form label-position='top' status-icon ref="ruleFormRef" :label-width="80">

        <el-form-item label="Username">
            <el-input autofocus type="text" />
        </el-form-item>

        <el-form-item label="Password">
            <el-input type="password" />
        </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">
                Confirm
            </el-button>
        </span>
    </template>
</el-dialog>
</template>

<style>
</style>