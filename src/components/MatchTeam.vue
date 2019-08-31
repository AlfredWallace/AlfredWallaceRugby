<template>
  <v-row dense>
    <v-col cols="12">
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
          <img :src="flagPath(item.abbreviation)" width="30" />&nbsp;
          {{ item.name }}&nbsp;
          ({{ item.points[currentStep].rounded }})
        </template>

        <template v-slot:selection="{ item }">
          <img :src="flagPath(item.abbreviation)" width="30" />&nbsp;
          {{ item.name }}&nbsp;
          ({{ item.points[currentStep].rounded }})
        </template>
      </v-autocomplete>
    </v-col>

    <v-col cols="6">
      <v-text-field
        type="number"
        v-model="value.score"
        :rules="[validation.required, validation.integer]"
        placeholder="score"
        outlined
      >
      </v-text-field>
    </v-col>

    <v-col cols="6">
      <v-text-field outlined disabled placeholder="new rank">
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
