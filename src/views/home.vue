<script>
import {ref} from 'vue';
import {pokeStore} from '../store/store';

export default {
  data () {
    return {
      pokemons: null
    }
  },
  computed: {
  },
  async mounted () {
    await this.$store.get('getPokemonData', { limit: 151 }).then((res) => {
      this.pokemons = res.results
      console.log(this.pokemons)
    }).catch((err) => {
      return err
    })
  },
  methods: {
  }
}


</script>

 <template>
  <div class="common-layout">
    <div class="imageBox">

    <div class="hovertext" style="margin:0 auto;">
    <img class="pokemonText"  style="height: 150px; width: 350px; margin:0 auto;" src="src/assets/images/pokemon-text.png"/>
  </div>
  <div class="hoverball" style="margin:0 auto;">
    <img class="pokeball"  style="height: 250px; width: 250px; margin:0 auto;" src="/src/assets/images/logo.png"/>
  </div>
</div>
  </div>
</template>

<!--  -->

<style scoped>
.common-layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto; 
}
.pokemonText{
  overflow: hidden; 
  position: absolute;
  left: 0;
  top: 200px;
  right: 0;
  display:block;
  height:min-content;
}
.imageBox {
  position: relative;
}

.imageBox .hovertext {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  display:block;
  height:min-content;
}

.pokeball{
  position: absolute;
  left: 0px;
  top: 350px;
  right: 0;
  display:block;
  height:min-content;
}
.imageBox .hoverball {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  display:block;
  height:min-content;
}

</style>

