import { defineStore } from "pinia";
import axiosClient from "../axios";

export const indexStore = defineStore('pokedex', {
    state(){
        return {
            pokemons: []
        }
    },

    actions:{
        async getPokemons(){
            let {data} = await axiosClient.get('https://pokeapi.co/api/v2/pokemon');

            let pokemonArray = data.results.map(r => {
                let splitString = r.url.split('/');

                return {
                    name: r.name[0].toUpperCase() + r.name.slice(1),
                    id: splitString[splitString.length - 2],
                    slug: r.name
                }
            });

            this.$patch({
                pokemons: pokemonArray
            })
        },
        async getType(pokemonArray){
            let pokemons = []
            for (let pokemon of pokemonArray) {
                await axiosClient.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.slug}`)
                .then(({data}) => {
                    let image = data.sprites.versions['generation-v']['black-white'].animated.front_default;
                    pokemons.push({
                      ...pokemon,
                      type: data.types.map(t => {return t.type.name}),
                      image: image
                    })
                })
            }
            this.$patch({
                pokemons
            })
        }
    }
});
