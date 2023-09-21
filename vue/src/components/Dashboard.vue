<script setup>
    import { indexStore } from '../store/indexStore';
    import Card from './Card.vue';
    const store = indexStore();

    store.getPokemons().then(() => {
        store.getType(store.pokemons);
    });

</script>

<template>
  <div v-if="store.pokemons.length > 0">
    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="pokemon in store.pokemons"
          :key="pokemon.id"
          cols="4"
        >
          <v-sheet class="d-flex justify-center pa-6">
            <Card :id="pokemon.id" :name="pokemon.name" :image="pokemon.image" :type="pokemon.type"/>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
