<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

 <template>
  <div class="common-layout">
    <img class="hero" src="src/assets/images/hero-image.jpg"/>
    <el-container>
      <Header />
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; 
  background-color: gray;
  
}
.hero{
  background-size: cover;
  max-width: 100%;
  max-height: 100%;
}

</style>

