<template>
  <div class="mb-12 pb-2">
    <Match v-for="(match, index) in matches" :key="index" :index="index"></Match>
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
