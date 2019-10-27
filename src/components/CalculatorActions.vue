<template>
  <v-row>
    <v-col cols="3">
      <v-btn color="error" block @click="reset">
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="6">
      <v-btn color="info" block @click="calculate">
        calculate
      </v-btn>
    </v-col>

    <v-col cols="3">
      <v-btn color="success" block @click="addMatch">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'CalculatorActions',
  methods: {
    addMatch() {
      this.$root.$emit('add-match');
    },
    // ...mapActions('match', ['addMatch', 'resetMatches']),
    // ...mapActions('team', ['resetSteps']),
    async calculate() {
      // await this.resetSteps();
      // this.$root.$emit('calculate');
    },
    reset() {
      // this.resetSteps();
      // this.resetMatches();
    },
  },
};
</script>
