import { defineStore } from 'pinia'
import axios from 'axios'
import { usePokedexStore } from './pokedexStore';

let apiLink = 'https://pokeapi.co/api/v2'
var baseURL = 'http://localhost:3000/'

export const pokeStore = defineStore("pokemons", {
  state: () => {
    return {
      pokemons: []
    };
  },
  actions: {
    async getOnePokemon() {
      let pokedexStore = usePokedexStore()
      try {
        let id = Math.floor(Math.random() * 151) + 1;
        while(pokedexStore.userPokedex.includes(id))
        {
          id = Math.floor(Math.random() * 151) + 1;
        }
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
    async getAllpokemon() {
      let response = await axios.get(baseURL + 'pokemons').then(response => response.data).catch(err =>  [])
      try
      {
        if (response[0].length == 151) {
          this.pokemons = response
          console.log("here")
        }
        else {
          console.log("there")
          throw new Error('Not all are inside')
        }
      }
      catch (err)
      {
        for(let id = 1; id<152;id++){
          let response = await axios.get(`${apiLink}/pokemon/${id}`)
          let name = response.data.name;
          let img = response.data.sprites.front_default;
          let pokemon = {
            name,
            img,
            id
          }
          this.pokemons.push(pokemon)          
        }
        await axios.post(baseURL+"pokemons", this.pokemons).catch(err=>console.log(err))
      }
    }
    
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
