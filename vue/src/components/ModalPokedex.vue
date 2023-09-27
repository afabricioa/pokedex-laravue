<script setup>
    import { ref } from 'vue';
    import { indexStore } from '../store/indexStore';
    import { colors } from '@/styles/colors';

    const props = defineProps({
      slug: String,
      name: String,
      mainType: String
    });

    const store = indexStore();

    const weakness = ref([]);

    store.getPokemon(props.slug).then(() => {
      store.getWeakness(props.mainType).then(() => {
        weakness.value = store.weakness['damage_relations']['double_damage_from'].map(weak => {
          return { name: weak.name.toUpperCase(), slug: weak.name }
        })
      })
    });

    function handleEvolution(){
      store.getEvolutions(props.slug)
    }

    const emit = defineEmits(['handleCloseDialog']);

</script>

<template>
  <div v-if="store.selectedPokemon" class="pokedex">
    <v-btn variant="text" color="grey-lighten-3" class="close" @click="$emit('handleCloseDialog')">Close</v-btn>
    <div class="image">
      <img
        :src="store.selectedPokemon.sprites.versions['generation-v']['black-white'].animated.front_default"
      />
    </div>
    <div class="name">
      <span class="text-grey-darken-1">{{ store.selectedPokemon.id }}</span> - {{ name }}
    </div>
    <div class="weakness">
      <div class="text-yellow-darken-4" :class="'title'">
        <h3>Weakness</h3>
      </div>
      <v-container>
        <v-row>
          <v-col
            v-for="weak in weakness"
            :key="weak.slug"
            :lg="6"
            :md="4"
            :sm="6"
            class="pa-1"
          >
            <div :class="`bg-${colors[weak.slug]} rounded-lg pa-1 elevation-15`">{{ weak.name }}</div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- <div class="evolutions" @click="handleEvolution">
      <h3 class="pa-1">Evolutions</h3>
    </div> -->
    <img
        src="../assets/pokedex.png"
        alt="pokedex"
    />
  </div>
</template>


<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  .pokedex{
    width: 100%;
    max-width: 425px;
    font-family: 'Press Start 2P', cursive;
  }

  .image{
    position: absolute;
    left: 45%;
    top: 35%;
    transform: translate(-40%, -10%);
    height: 15%;
    display: flex;
    justify-content: center;
  }

  .close{
    position: absolute;
    top: 8%;
    right: 14%;
  }

  .name{
    width: 50%;
    position: absolute;
    top: 55%;
    left: 25%;
    font-size: 13px;
    display: flex;
    justify-content: end;
  }

  .weakness{
    position: absolute;
    top: 65%;
    width: 70%;
  }

  .pokedex .weakness{
    display: flex;
    flex-direction: column;
    left: 10%;
    font-size: 11px !important;

  }

  .title{
    width: 100%;
    background-color: lightgray;
    border: 2px solid #333;
    box-shadow: 2px 3px 0 #333;
    display: flex;
    justify-content: center;
  }

  .evolutions{
    position: absolute;
    top: 85%;
    background-color: antiquewhite;
    width: 70%;
    background-color: lightgray;
    border: 2px solid #333;
    box-shadow: 2px 3px 0 #333;
    cursor: pointer;
  }

  .evolutions:hover{
    transform: translate(1%, 2%);
    box-shadow: 0 0 0 #333;
  }

  .pokedex .evolutions{
    display: flex;
    justify-content: center;
    left: 10%;
  }

  .wk{
    width: 100%;
  }

</style>
