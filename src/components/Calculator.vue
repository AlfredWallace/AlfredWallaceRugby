<template>
  <div class="mb-12 pb-2">
    <CalculatorMatch v-for="(match, index) in matches" ref="matches" :key="index" :match="match" :index="index"></CalculatorMatch>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CalculatorMatch from './CalculatorMatch.vue';

export default {
  name: 'Calculator',

  components: {
    CalculatorMatch,
  },

  computed: {
    ...mapState('match', ['matches']),
  },
};
</script>
