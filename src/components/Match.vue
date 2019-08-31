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
      <v-btn color="error" small>
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn color="warning" small>
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
      <v-btn small>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn small>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn color="info" small>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

    </v-card-actions>

    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header>Options</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-switch v-model="match.neutralGround" label="Played on neutral ground"></v-switch>
          <v-switch v-model="match.worldCup" label="World Cup match"></v-switch>
          <v-switch v-model="match.ignore" label="Ignore this match"></v-switch>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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
