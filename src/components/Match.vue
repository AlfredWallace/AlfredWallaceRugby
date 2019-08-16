<template>
  <v-card class="pa-4">
    <v-container>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="home.team"
            return-object
            :items="teams"
            item-value="id"
            item-text="name"
          >
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="home.score"></v-text-field>
        </v-col>
        <v-col>

        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-autocomplete
            v-model="away.team"
            return-object
            :items="teams"
            item-value="id"
            item-text="name"
          >
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field></v-text-field>
        </v-col>
        <v-col>
          <v-text-field></v-text-field>
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
