<template>
  <div class="mb-12 pb-2">
    <CalculatorPotentialMatch
      v-for="(potentialMatch, index) in potentialMatches"
      ref="matches"
      :key="index"
      :potential-match="potentialMatch"
      :index="index"
      @delete-potential-match="potentialMatches.splice(index, 1)"
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
  // methods: {
  //   ...mapActions('match', ['updateMatch']),
  //   ...mapActions(['calculate']),
  // },
  mounted() {
    // this.$root.$on('calculate', () => {
    //   Promise.all(this.$refs.matches.map(match => match.validate()))
    //     .then(() => {
    //       this.calculate();
    //     });
    // });
    this.$root.$on('add-potential-match', () => {
      this.potentialMatches.push(new Match())
    })
    this.$root.$on('reset-potential-matches', () => {
      this.potentialMatches = [new Match()]
    })
  }
}
</script>
