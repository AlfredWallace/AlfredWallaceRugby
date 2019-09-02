<template>
  <v-card
    :outlined="$vuetify.breakpoint.smAndDown"
    class="mb-6"
  >
    <v-form ref="matchForm">
      <v-container>
        <MatchTeam v-model="match.home"></MatchTeam>
        <MatchTeam v-model="match.away"></MatchTeam>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn color="error" outlined>
        Delete
      </v-btn>
      <v-btn color="info" outlined>
        Options
      </v-btn>
      <v-btn color="success" outlined>
        Add
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
import Match from '../classes/Match';
import MatchTeam from './MatchTeam.vue';

export default {
  name: 'Match',
  components: {
    MatchTeam,
  },
  data() {
    return {
      match: new Match(),
    };
  },
};
</script>
