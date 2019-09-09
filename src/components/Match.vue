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
        <MatchTeam ground="home" :index="index"></MatchTeam>
        <MatchTeam ground="away" :index="index"></MatchTeam>
        <v-row dense>
          <v-col>
            <v-switch
              v-model="neutralGround"
              label="Played on neutral ground ?"
              hide-details
            >
            </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-switch
              v-model="worldCup"
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
import { mapActions, mapState } from 'vuex';
import MatchTeam from './MatchTeam.vue';

export default {
  name: 'Match',
  components: {
    MatchTeam,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      matchNumber: this.index + 1,
    };
  },
  computed: {
    ...mapState(['currentStep']),
    ...mapState('match', ['matches']),
    ...mapState('team', ['teams']),
    neutralGround: {
      get() {
        return this.matches[this.index].neutralGround;
      },
      set(value) {
        this.updateMatch({ name: 'NEUTRAL_GROUND', data: { index: this.index, value } });
      },
    },
    worldCup: {
      get() {
        return this.matches[this.index].worldCup;
      },
      set(value) {
        this.updateMatch({ name: 'WORLD_CUP', data: { index: this.index, value } });
      },
    },
  },
  methods: {
    ...mapActions(['stepUp']),
    ...mapActions('match', ['deleteMatch', 'updateMatch']),
    ...mapActions('team', ['makeNewStep']),
    validate() {
      return this.$refs.matchForm.validate();
    },
    // todo : calculation done in store module after validation events
    // calculate() {
    //   if (!this.$refs.matchForm.validate()) {
    //     return;
    //   }
    //
    //   const match = this.matches[this.index];
    //   const homeAdvantage = match.neutralGround ? 0 : 3;
    //   const homePoints = match.home.team.points[this.currentStep].raw;
    //   const awayPoints = match.away.team.points[this.currentStep].raw;
    //
    //   let pointsDifference = homePoints + homeAdvantage - awayPoints;
    //   if (pointsDifference < -10) {
    //     pointsDifference = -10;
    //   } else if (pointsDifference > 10) {
    //     pointsDifference = 10;
    //   }
    //
    //   const scoreDifference = match.home.score - match.away.score;
    //   let p;
    //   if (scoreDifference > 0) {
    //     p = (-10 - scoreDifference) / 10;
    //   } else if (scoreDifference < 0) {
    //     p = (10 - scoreDifference) / 10;
    //   } else {
    //     p = (-scoreDifference) / 10;
    //   }
    //
    //   if (Math.abs(scoreDifference) > 15) {
    //     p *= 1.5;
    //   }
    //
    //   if (match.worldCup) {
    //     p *= 2;
    //   }
    //   const homeTeam = match.home.team;
    //   const awayTeam = match.away.team;
    //
    //   this.makeNewStep({
    //     home: { id: homeTeam.id, rank: homeTeam.rank, points: homePoints + p },
    //     away: { id: awayTeam.id, rank: awayTeam.rank, points: awayPoints - p },
    //   });
    // },
  },
};
</script>
