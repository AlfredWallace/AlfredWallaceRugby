<template>
  <div class="mb-12 pb-2">
    <CalculatorPotentialMatch
      v-for="(potentialMatch, index) in potentialMatches"
      ref="potentialMatches"
      :key="index"
      :potential-match="potentialMatch"
      :index="index"
      @delete-potential-match="potentialMatches.splice(index, 1)"
      @validate-potential-match="validatePotentialMatch"
    ></CalculatorPotentialMatch>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import Match from '../classes/Match'
import CalculatorPotentialMatch from './CalculatorPotentialMatch'

export default {
  name: 'Calculator',
  components: {
    CalculatorPotentialMatch
  },
  data() {
    return {
      potentialMatches: [new Match()]
    }
  },
  mounted() {
    this.$root.$on('add-potential-match', () => {
      this.potentialMatches.push(new Match())
    })
    this.$root.$on('reset-potential-matches', () => {
      this.potentialMatches = [new Match()]
    })
    // when the button is clicked, will trigger and wait for the result of the validate method on all the CalculatorPotentialMatch and then TODO
    this.$root.$on('calculate', () => {
      Promise.all(this.$refs.potentialMatches.map((match) => match.validate())).then(() => {
        // this.calculate()
      })
    })
  },
  methods: {
    // will set the valid property of a match depending on the result of the form validataion mechanism
    validatePotentialMatch({ index, isValid }) {
      this.potentialMatches[index].valid = isValid
    }
  }
}
</script>
