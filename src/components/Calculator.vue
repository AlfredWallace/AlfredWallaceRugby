<template>
  <div class="mb-12 pb-2">
    <CalculatorMatch v-for="(match, index) in matches" ref="matches" :key="index" :match="match" :index="index"></CalculatorMatch>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import CalculatorMatch from './CalculatorMatch.vue';

export default {
  name: 'Calculator',

  components: {
    CalculatorMatch,
  },

  created() {
    this.$root.$on('validate-all', () => {
      this.$refs.matches.forEach((ref) => {
        ref.validate();
      });

      this.calculate();
    });
  },

  computed: {
    ...mapState('match', ['matches']),
  },

  methods: {
    ...mapActions(['calculate']),
  },
};
</script>
