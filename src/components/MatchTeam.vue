<template>
  <v-row dense>
    <v-col cols="12">
      <v-autocomplete
        v-model="team"
        return-object
        :items="teams"
        item-text="name"
        placeholder="pick a team"
        dense
        outlined
        auto-select-first
        hide-details
      >
        <template v-slot:item="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="2" class="d-flex align-center">
              <img :src="flagPath(item)" width="30" />
            </v-col>
            <v-col cols="7" class="text-truncate d-flex align-center">
              {{ item.name }}
            </v-col>
            <v-col cols="3" class="text-no-wrap d-flex align-center">
              ({{ item.points[currentStep].rounded }})
            </v-col>
          </v-row>
        </template>

        <template v-slot:selection="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="2" class="d-flex align-center">
              <img :src="flagPath(item)" width="30" />
            </v-col>
            <v-col cols="7" class="text-truncate d-flex align-center">
              {{ item.name }}
            </v-col>
            <v-col cols="3" class="text-no-wrap d-flex align-center">
              ({{ item.points[currentStep].rounded }})
            </v-col>
          </v-row>
        </template>
      </v-autocomplete>
    </v-col>

    <v-col cols="3">
      <v-text-field
        type="number"
        v-model="score"
        :rules="[validation.required, validation.integer]"
        placeholder="score"
        outlined
        hide-details
      >
      </v-text-field>
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="8" class="d-flex align-center">
      new rank:
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { countryFlagMixin } from '../mixins/countryFlagMixin';

export default {
  name: 'MatchTeam',
  mixins: [countryFlagMixin],
  props: {
    index: {
      type: Number,
      required: true,
    },
    ground: {
      type: String,
      required: true,
      validator(value) {
        return ['home', 'away'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      validation: {
        required: val => !!val || 'Required.',
        integer: val => /^[0-9]+$/.test(val) || 'Must be an positive integer.',
      },
    };
  },
  computed: {
    ...mapState('team', ['teams']),
    ...mapState('match', ['matches']),
    ...mapState(['currentStep']),
    team: {
      get() {
        return this.matches[this.index][this.ground].team;
      },
      set(value) {
        this.updateMatch({ name: 'TEAM', data: { index: this.index, ground: this.ground, value } });
      },
    },
    score: {
      get() {
        return this.matches[this.index][this.ground].score;
      },
      set(value) {
        this.updateMatch({ name: 'SCORE', data: { index: this.index, ground: this.ground, value } });
      },
    },
  },
  methods: {
    ...mapActions('match', ['updateMatch']),
  },
};
</script>

<style scoped>
/* Hack to prevent the parent of an element with .text-truncate from expanding */
.truncatedParent {
  max-width: 100%;
}
</style>
