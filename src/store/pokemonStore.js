import { defineStore } from 'pinia'
import axios from 'axios'

let apiLink = 'https://pokeapi.co/api/v2'

export const pokeStore = defineStore("pokemons", {
  state: () => {
    return {
      pokemons: []
    };
  },
  actions: {
    async getOnePokemon() {
      try {
        let id = Math.floor(Math.random() * 151) + 1;
        let response = await axios.get(`${apiLink}/pokemon/${id}`)
        if(response.data){
          let pokemon = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default
          }
          return pokemon
        }
      } catch (error) {
        console.log(error)
      }
    },
    
  }
});

/* import { defineStore } from 'pinia'
import axios from 'axios';

export const pokeStore = defineStore("pokemons", {
state: () => {
    return {pokedexLimit: 151};
    
},
actions: {
        async getPokemonData(){
        try {
            return await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0."
            );
            } catch (error) {
            throw error;
            }
        }
},
persist: true,
}); */
