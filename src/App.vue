<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Home from './views/Home.vue'
</script>

<template>
  <RouterView />
  <el-container>
      <Header />
    </el-container>
</template>


