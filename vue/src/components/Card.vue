<script setup>
  import { colors } from '@/styles/colors';
  import { ref } from 'vue';
  import ModalPokedex from './ModalPokedex.vue';

  const props = defineProps({
    id: String,
    name: String,
    type: Array,
    image: String,
    slug: String
  });

  const emit = defineEmits(['handleSelectPokemon']);

  const dialog = ref(false);

  function handleDialog(){
    dialog.value = !dialog.value;
  }

</script>

<template>
  <v-hover
    v-slot="{ isHovering, props }"
  >
    <v-card
      v-bind="props"
      width="200"
      height="250"
      :class="`rounded-lg onCursor bg-${type ? colors[type[0]] : ''} d-flex flex-column justify-center align-center`"
      elevation="16"
    >
      <v-card-title :class="`d-flex justify-center mt-5 w-75 rounded-circle ${type ? type[0] : ''}`">
        <img
          class="card-image"
          height="70"
          :src="image"
        />
      </v-card-title>
      <v-card-text class="d-flex justify-center mt-3 font-weight-bold">
        {{ `#${id} ${name}` }}
      </v-card-text>
      <v-card-text>
        <div v-for="tp in type" class="ma-1 pa-1 d-flex justify-center text-gray rounded-lg" :class="tp">
          {{ tp.toUpperCase() }}
        </div>
      </v-card-text>
      <div v-if="isHovering" class="card-back">
        <v-card-title class="mt-16 pt-9">
          <v-btn @click="handleDialog" color="black">More Info</v-btn>
          <!-- <v-btn @click="$emit('handleSelectPokemon', slug)" color="black">More Info</v-btn> -->
        </v-card-title>
      </div>
    </v-card>
  </v-hover>
  <v-dialog v-model="dialog" max-width="425">
    <ModalPokedex :name="name" :slug="slug" :mainType="type ? type[0] : ''" @handleCloseDialog="handleDialog"/>
  </v-dialog>
</template>

<style scoped>
  .fire{
    background-color: #FDDFDF;
  }
  .grass{
    background-color: #DEFDE0;
  }
  .eletric{
    background-color: #f3dc6a;
  }
  .water{
    background-color: #DEF3FD;
  }
  .ground{
    background-color: #F4E7DA;
  }
  .rock{
    background-color: #D5D5D4;
  }
  .fairy{
    background-color: #FCEAFF;
  }
  .poison{
    background-color: #af5adc;
  }
  .bug{
    background-color: #F8D5A3;
  }
  .dragon{
    background-color: #97B3E6;
  }
  .psychic{
    background-color: #EAEDA1;
  }
  .flying{
    background-color: #d6cdcd;
  }
  .fighting{
    background-color: #E6E0D4;
  }
  .normal{
    background-color: #F5F5F5;
  }

  .onCursor{
    cursor: pointer;
  }

  .card-back{
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #a7a4a8;
    transition: all 1.5s ease-in;
    opacity: 70%;
  }
</style>
