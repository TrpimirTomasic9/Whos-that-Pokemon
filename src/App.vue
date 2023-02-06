<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Home from './views/Home.vue'
</script>

 <template>
  <div class="common-layout">
    <img class="hero" src="src/assets/images/hero-image.jpg"/>
    <el-container>
      <Header />
    </el-container>
   <!--  <RouterView /> -->
  </div>
  
</template>

<style scoped>
.common-layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; 
}
.hero{
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  filter: brightness(50%)
}

</style>

