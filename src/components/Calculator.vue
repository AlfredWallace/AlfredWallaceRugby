<template>
  <div>
    <Match v-for="(match, index) in matches" :key="index" :match="match"></Match>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Match from './Match.vue';

export default {
  name: 'Calculator',
  components: {
    Match,
  },
  computed: {
    ...mapState('match', ['matches']),
  },
};
</script>
