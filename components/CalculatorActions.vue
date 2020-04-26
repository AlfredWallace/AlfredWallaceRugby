<template>
  <div class="d-flex justify-content justify-space-between" style="width: 100%">
    <v-btn @click="resetMatches">
      <v-icon>mdi-undo-variant</v-icon>
    </v-btn>
    <v-btn @click="calculate">
      <v-icon>mdi-calculator</v-icon>
    </v-btn>
    <v-btn @click="addMatch">
      <v-icon>mdi-plus-box</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CalculatorActions',
  methods: {
    addMatch() {
      this.$root.$emit('add-potential-match')
    },
    resetMatches() {
      this.$root.$emit('reset-potential-matches')
    },
    // emits a root event because the button may pu put anywhere
    calculate() {
      this.$root.$emit('calculate')
    }
  }
}
</script>
