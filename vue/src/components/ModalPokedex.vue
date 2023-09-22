<script setup>
    import { indexStore } from '../store/indexStore';

    const props = defineProps({
      slug: String
    })

    const store = indexStore();

    store.getPokemon(props.slug).then(() => {
      console.log(store.selectedPokemon)
    })

</script>

<template>
  <div class="image">
    <div class="button">
      <img
        height="70"
        :src="store.selectedPokemon.sprites.versions['generation-v']['black-white'].animated.front_default"
      />
      <v-btn>open</v-btn>
    </div>
    <img
        src="../assets/pokedex.png"
        alt="pokedex"
    />
  </div>
</template>


<style scoped>
  .image{
    width: 100%;
  }

  .button{
    position: absolute;
    left: 55%;
    top: 35%;
  }
</style>
