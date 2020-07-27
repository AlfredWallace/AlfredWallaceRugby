<template>
  <div class="d-flex justify-content justify-space-between" style="width: 100%">
    <v-btn @click="resetMatches">
      <v-icon color="error">mdi-delete</v-icon>
    </v-btn>
    <v-btn @click="$root.$emit('validate-all')">
      <v-icon color="info">mdi-calculator</v-icon>
    </v-btn>
    <v-btn @click="addMatch">
      <v-icon color="success">mdi-plus-box</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CalculatorActions',

  methods: {
    ...mapActions('match', ['addMatch', 'resetMatches']),
  },
};
</script>
