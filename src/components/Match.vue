<template>
  <v-card class="pa-4">
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-autocomplete
            v-model="home.team"
            return-object
            :items="teams"
            item-value="id"
            item-text="name"
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          <span>{{ home.team ? home.team.points[currentStep].rounded : null }}</span>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <v-text-field v-model="home.score"></v-text-field>
        </v-col>
        <v-col>

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <v-autocomplete
            v-model="away.team"
            return-object
            :items="teams"
            item-value="id"
            item-text="name"
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          {{ away.team ? away.team.points[currentStep].rounded : null }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8">
          <v-text-field v-model="away.score"></v-text-field>
        </v-col>
        <v-col>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Match',
  data() {
    return {
      home: {
        team: null,
        score: null,
      },
      away: {
        team: null,
        score: null,
      },
      validation: {
        required: val => !!val || 'Required.',
        integer: val => (!Number.isNaN(val) && Number.isInteger(val)) || 'Must be an integer.',
        number: val => Number.isNaN(val) || 'Must be an number.',
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
