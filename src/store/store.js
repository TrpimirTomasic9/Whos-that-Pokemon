import { defineStore } from 'pinia'
import axios from 'axios';

export const pokeStore = defineStore("pokemons", {
state: () => {
    return {};
},
actions: {
        async getPokemonData(){
        try {
            return await axios.get(
                "https://pokeapi.co/api/v2/pokemon/"
            );
            } catch (error) {
            throw error;
            }
        }
},
persist: true,
});
