<template>
  <div class="mb-12 pb-2">
    <CalculatorMatch v-for="(match, index) in matches" ref="matches" :key="index" :match="match" :index="index" @validate-match="validateMatch"></CalculatorMatch>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CalculatorMatch from './CalculatorMatch'

export default {
  name: 'Calculator',
  components: {
    CalculatorMatch
  },
  computed: {
    ...mapState('match', ['matches'])
  },
  mounted() {
    //   this.$root.$on('add-match', () => {
    //     this.matches.push(new Match())
    //   })
    //   this.$root.$on('reset-matches', () => {
    //     this.matches = [new Match()]
    //   })
    //   // when the button is clicked, will trigger and wait for the result of the validate method on all the CalculatorMatch and then TODO
    //   this.$root.$on('calculate', () => {
    //     console.log(this)
    //     console.log(this.$refs)
    //     console.log(this.$refs.matches)
    //     Promise.all(this.$refs.matches.map((match) => match.validate())).then(function() {
    //       console.log(this)
    //       console.log(this.validMatches)
    //       this.setMatches(this.validMatches)
    //     })
    //   })
  },
  methods: {
    ...mapActions('match', ['setMatches']),
    // will set the valid property of a match depending on the result of the form validataion mechanism
    validateMatch({ index, isValid }) {
      // this.matches[index].valid = isValid
    }
  }
}
</script>
