import { defineStore } from 'pinia'
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
});
