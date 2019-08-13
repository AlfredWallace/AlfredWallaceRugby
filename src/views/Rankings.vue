<template>
  <div>
    <v-card>
      <v-card-title>
        Rankings
      </v-card-title>

      <v-simple-table>
        <thead>
        <tr>
          <th class="text-left">Rank</th>
          <th class="text-left">Team</th>
          <th class="text-left">Points</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="team in normalizedTeams" :key="team.id">
          <td>{{ team.rank }}</td>
          <td>{{ $vuetify.breakpoint.xsOnly ? team.abbr : team.name }}</td>
          <td>{{ team.roundedPoints }}</td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['normalizedTeams']),
  },
};
</script>

<style scoped>

</style>
