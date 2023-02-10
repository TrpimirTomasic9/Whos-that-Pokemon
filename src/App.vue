<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Home from './views/Home.vue'
</script>

<template>
  <el-container>
    <Header />
    <RouterView />
  </el-container>
</template>

