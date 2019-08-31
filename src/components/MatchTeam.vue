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
        outlined
      >
        <template v-slot:item="{ item }">
          <img :src="flagPath(item.abbreviation)" width="30" />&nbsp;{{ item.name }}
        </template>
        <template v-slot:selection="{ item }">
          <img :src="flagPath(item.abbreviation)" width="30" />&nbsp;{{ item.name }}
        </template>
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
import { countryFlagMixin } from '../mixins/countryFlagMixin';

export default {
  name: 'MatchTeam',
  mixins: [countryFlagMixin],
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
