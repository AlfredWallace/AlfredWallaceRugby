<template>
  <v-card class="pa-0">
    <!--    <v-card-title>Match</v-card-title>-->

    <v-form ref="matchForm">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="match.homeTeam"
              return-object
              :items="teams"
              item-value="id"
              item-text="name"
              dense
              solo
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="4">
            {{ match.homeTeam ? match.homeTeam.points[currentStep].rounded : null }}
          </v-col>

          <v-col cols="4">
            <v-text-field
              type="number"
              v-model="match.homeScore"
              :rules="[validation.required, validation.integer]"
              solo
            >
            </v-text-field>
          </v-col>

          <v-col cols="4">

          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-autocomplete
              v-model="match.awayTeam"
              return-object
              :items="teams"
              item-value="id"
              item-text="name"
              dense
              solo
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="4">
            {{ match.awayTeam ? match.awayTeam.points[currentStep].rounded : null }}
          </v-col>

          <v-col cols="4">
            <v-text-field
              type="number"
              v-model="match.awayScore"
              :rules="[validation.required, validation.integer]"
              solo
            >
            </v-text-field>
          </v-col>

          <v-col cols="4">

          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn color="error">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn color="warning">
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-btn>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn color="info">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import Match from '../classes/Match';

export default {
  name: 'Match',
  data() {
    return {
      match: new Match(),
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
