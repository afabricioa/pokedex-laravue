import { defineStore } from "pinia";
import axiosClient from "../axios";
import { Loading } from 'notiflix/build/notiflix-loading-aio';

export const indexStore = defineStore('pokedex', {
    state(){
        return {
            pokemons: [],
            selectedPokemon: null,
            weakness: [],
            evolutions: []
        }
    },

    actions:{
      async getPokemons(offset){
        this.startLoading();
        let {data} = await axiosClient.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);

        let pokemonArray = data.results.map(r => {
            let splitString = r.url.split('/');

            return {
                name: r.name[0].toUpperCase() + r.name.slice(1),
                id: splitString[splitString.length - 2],
                slug: r.name
            }
        });

        this.$patch({
            pokemons: [
              ...this.pokemons,
              ...pokemonArray
            ]
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
        });
        this.stopLoading();
      },
      async getPokemon(slug){
        this.startLoading();
        await axiosClient.get(`https://pokeapi.co/api/v2/pokemon/${slug}`)
        .then(({data}) => {
            this.$patch({
              selectedPokemon: data
            })
        })
      },
      async getWeakness(type){
        await axiosClient.get(`https://pokeapi.co/api/v2/type/${type}`)
        .then(({data}) => {
            this.$patch({
              weakness: data
            })
        })
        this.stopLoading();
      },
      async getEvolutions(pokemon){
        console.log(pokemon)
        this.startLoading();
        this.evolutions = [];
        await axiosClient.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(async ({data}) => {
          await axiosClient.get(data.evolution_chain.url).then(({data}) => {
            this.evolutions.push({order: 1, name: data.chain.species.name});
            if(data.chain.evolves_to.length > 0){
              data.chain.evolves_to.forEach(ev => {
                this.evolutions.push({order: this.evolutions.length + 1, name: ev.species.name});
              })
            }
            console.log(this.evolutions)
          })
        })
        this.stopLoading();
      },
      async startLoading(){
        Loading.init({
            backgroundColor: 'rgba(0,0,0,0.9)',
            svgColor: '#5C697D'
        });
        Loading.dots();
      },
      async stopLoading(){
          Loading.remove();
      }
    }
});
