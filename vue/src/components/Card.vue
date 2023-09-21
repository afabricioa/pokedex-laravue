<script setup>

  const props = defineProps({
    id: String,
    name: String,
    type: Array,
    image: String
  });
</script>

<template>
  <v-card width="200" height="250" class="rounded-lg shadow-lg">
    <v-card-title class="d-flex justify-center mt-5">
      <img
        class="card-image"
        height="70"
        :src="image"
      />
    </v-card-title>
    <v-card-text class="d-flex justify-center mt-3 font-weight-bold">
      {{ `#${id} ${name}` }}
    </v-card-text>
    <v-card-text class="d-flex justify-center">
      <div v-for="tp in type" class="ma-1 pa-1 text-gray rounded-lg" :class="tp">
        {{ tp.toUpperCase() }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .fire{
    background-color: #FDDFDF;
  }
  .grass{
    background-color: #DEFDE0;
  }
  .eletric{
    background-color: #FCF7DE;
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

  .test {
    background: radial-gradient(#E6E0D4, #fff);
  }

</style>
