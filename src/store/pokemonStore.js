import { defineStore } from 'pinia'
import axios from 'axios'
import { usePokedexStore } from './pokedexStore';

let apiLink = 'https://pokeapi.co/api/v2'
var baseURL = 'http://localhost:3000/'

export const pokeStore = defineStore("pokemons", {
  state: () => {
    return {
      pokemons: [],
      loading: true
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
            image: response.data.sprites.front_default,
            type: response.data.types[0].type.name,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defence: response.data.stats[2].base_stat,
            special_attack: response.data.stats[3].base_stat,
            special_defence: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat
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
        }
        else {
          throw new Error('Not all are inside')
        }
      }
      catch (err)
      {
        for(let id = 1; id<152;id++){
          let response = await axios.get(`${apiLink}/pokemon/${id}`)
          let pokemon = {
            id: response.data.id,
            name: response.data.name,
            image: response.data.sprites.front_default,
            type1: response.data.types[0].type.name,
            type2: (response.data.types[1])? response.data.types[1].type.name : "",
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defence: response.data.stats[2].base_stat,
            special_attack: response.data.stats[3].base_stat,
            special_defence: response.data.stats[4].base_stat,
            speed: response.data.stats[5].base_stat
          }
          this.pokemons.push(pokemon)     
        }
        await axios.post(baseURL+"pokemons", this.pokemons).catch(err=>console.log(err))
      }
      this.loading = false
    }
    
  }
});
