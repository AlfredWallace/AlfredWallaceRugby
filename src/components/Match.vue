<template>
  <v-card>
    <v-autocomplete
      v-model="home.team"
      return-object
      :items="teams"
      item-value="id"
      item-text="name"
    >
    </v-autocomplete>

    <v-autocomplete
      v-model="away.team"
      return-object
      :items="teams"
      item-value="id"
      item-text="name"
    >
    </v-autocomplete>

  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Match',
  data() {
    return {
      home: {
        team: null,
        score: null,
      },
      away: {
        team: null,
        score: null,
      },
    };
  },
  computed: {
    ...mapState('team', ['teams']),
  },
};
</script>

<style scoped>

</style>
