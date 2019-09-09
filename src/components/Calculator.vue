<template>
  <div class="mb-12 pb-2">
    <Match v-for="(match, index) in matches" :key="index" :index="index" ref="matches"></Match>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Match from './Match.vue';

export default {
  name: 'Calculator',
  components: {
    Match,
  },
  computed: {
    ...mapState('match', ['matches']),
  },
  methods: {
    ...mapActions('match', ['updateMatch']),
  },
  mounted() {
    this.$root.$on('validate', () => {
      for (let i = 0; i < this.$refs.matches.length; i++) {
        this.$refs.matches[i].validate();
      }

      // todo emit calculate
    });
  },
};
</script>
