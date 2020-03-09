<template>
  <div class="mb-12 pb-2">
    <CalculatorMatch
      v-for="(match, index) in matches"
      ref="matches"
      :key="index"
      :match="match"
      :index="index"
      @delete-match="matches.splice(index, 1)"
    ></CalculatorMatch>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import Match from '../classes/Match'
import CalculatorMatch from './CalculatorMatch.vue'

export default {
  name: 'Calculator',
  components: {
    CalculatorMatch
  },
  data() {
    return {
      matches: [new Match()]
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
    this.$root.$on('add-match', () => {
      this.matches.push(new Match())
    })
    // this.$root.$on('delete-match', (index) => {
    //   this.matches.splice(index, 1);
    // });
  }
}
</script>
