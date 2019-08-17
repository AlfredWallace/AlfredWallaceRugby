<template>
  <v-container>
    <v-row>
      <v-col v-for="(match, index) in matches" :key="index">
        <Match :match="match"></Match>
      </v-col>
    </v-row>
  </v-container>
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

<style scoped>

</style>
