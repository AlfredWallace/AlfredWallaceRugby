<template>
  <v-card
    :outlined="$vuetify.breakpoint.smAndDown"
    class="mb-6"
  >
    <v-card-title>
      Match no. {{ matchNumber }}
    </v-card-title>
    <v-form ref="matchForm">
      <v-container>
        <MatchTeam v-model="match.home"></MatchTeam>
        <MatchTeam v-model="match.away"></MatchTeam>
        <v-row dense>
          <v-col>
            <v-switch
              v-model="match.neutralGround"
              label="Played on neutral ground ?"
              hide-details
            >
            </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-switch
              v-model="match.worldCup"
              label="World Cup match ?"
              hide-details
            >
            </v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-end">
      <v-btn color="error" outlined @click="deleteMatch(index)">
        Delete match no. {{ matchNumber }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import Match from '../classes/Match';
import MatchTeam from './MatchTeam.vue';

export default {
  name: 'Match',
  components: {
    MatchTeam,
  },
  props: {
    index: {
      type: Number,
    },
  },
  data() {
    return {
      match: new Match(),
      matchNumber: this.index + 1,
    };
  },
  methods: {
    ...mapActions('match', ['deleteMatch']),
  },
};
</script>
