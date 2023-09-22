<script setup>
    import { ref } from 'vue';
    import { indexStore } from '../store/indexStore';
    import Card from './Card.vue';
    const store = indexStore();
    const offset = ref(0);

    store.getPokemons(offset.value).then(() => {
        store.getType(store.pokemons);
    });

    function loadMore(){
      offset.value = offset.value + 20;
      store.getPokemons(offset.value).then(() => {
        store.getType(store.pokemons);
      });
    }

    function handleMoreInfo(slug){
      store.getPokemon(slug).then(() => {
        console.log(store.selectedPokemon)
      })
    }
</script>

<template>
  <div v-if="store.pokemons.length > 0" class="d-flex justify-center flex-column align-center">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="pokemon in store.pokemons"
          :key="pokemon.id"
          :lg="2"
          :md="4"
          :sm="6"
        >
          <v-sheet class="d-flex justify-center pa-6">
            <Card :id="pokemon.id" :name="pokemon.name" :image="pokemon.image" :type="pokemon.type" :slug="pokemon.slug" @handleSelectPokemon="handleMoreInfo"/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <div class="pa-10 d-flex justify-center w-50">
      <v-btn @click="loadMore" block color="indigo-darken-3">Load more</v-btn>
    </div>
  </div>
</template>
