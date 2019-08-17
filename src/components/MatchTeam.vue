<template>
  <v-row dense>
    <v-col cols="9">
      <v-autocomplete
        v-model="value.team"
        return-object
        :items="teams"
        item-text="name"
        placeholder="pick a team"
        clearable
        dense
        solo
      >
      </v-autocomplete>
    </v-col>

    <v-col cols="3">
      <v-text-field
        type="number"
        v-model="value.score"
        :rules="[validation.required, validation.integer]"
        placeholder="score"
        solo
      >
      </v-text-field>
    </v-col>

    <v-col cols="6">
      <v-text-field
        outlined
        disabled
        :value="value.team ? value.team.points[currentStep].rounded : null"
        placeholder="points"
      >
        <!-- TODO currentStep -1 when currentStep > 0 -->
      </v-text-field>
    </v-col>

    <v-col cols="6">
      <v-text-field outlined disabled placeholder="result">
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MatchTeam',
  props: ['value'],
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
    ...mapState(['currentStep']),
  },
};
</script>

<style scoped>

</style>
