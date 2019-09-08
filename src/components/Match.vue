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
    ...mapState('match', ['matches']),
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
    ...mapActions('match', ['deleteMatch', 'updateMatch']),
    validate() {
      return this.$refs.matchForm.validate();
    },
  },
};
</script>
