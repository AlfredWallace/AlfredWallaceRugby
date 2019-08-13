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
          <th class="text-center">Team</th>
          <th class="text-right">Points</th>
        </tr>
        </thead>
        <tbody class="font-weight-bold">
        <tr v-for="team in normalizedTeams" :key="team.id">
          <td>
            <v-chip :outlined="outlined(team.rank)" :class="chipColor(team.rank)">
              {{ team.rank }}
            </v-chip>
          </td>
          <td class="text-right">
            <v-img src="../assets/nz.svg" max-width="50px"></v-img>
            {{ $vuetify.breakpoint.xsOnly ? team.abbr : team.name }}
          </td>
          <td class="text-right">
            <v-chip :outlined="outlined(team.rank)" :class="chipColor(team.rank)">
              {{ team.roundedPoints }}
            </v-chip>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['normalizedTeams']),
  },
  methods: {
    outlined: rank => rank > 3,
    chipColor: (rank) => {
      switch (rank) {
        case 1:
          return 'amber lighten-1';
        case 2:
          return 'grey lighten-1';
        case 3:
          return 'brown lighten-3';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>

</style>
