<template>
  <v-row dense>
    <v-col cols="12">
      <v-autocomplete
        v-model="value.team"
        return-object
        :items="teams"
        item-text="name"
        placeholder="pick a team"
        dense
        outlined
        auto-select-first
      >
        <template v-slot:item="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="2"><img :src="flagPath(item.abbreviation)" width="30" /></v-col>
            <v-col cols="7" class="text-truncate">{{ item.name }}</v-col>
            <v-col cols="3" class="text-no-wrap">({{ item.points[currentStep].rounded }})</v-col>
          </v-row>
        </template>

        <template v-slot:selection="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="2"><img :src="flagPath(item.abbreviation)" width="30" /></v-col>
            <v-col cols="7" class="text-truncate">{{ item.name }}</v-col>
            <v-col cols="3" class="text-no-wrap">({{ item.points[currentStep].rounded }})</v-col>
          </v-row>
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

<style scoped>
  /* Hack to prevent the parent of an element with .text-truncate from expanding */
  .truncatedParent {
    max-width: 100%;
  }
</style>
