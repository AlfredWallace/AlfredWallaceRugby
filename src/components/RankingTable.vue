<template>
  <v-simple-table>
    <table>
      <thead>
      <th></th>
      <th>Rank</th>
      <th>Team</th>
      <th>Points</th>
      </thead>
      <tbody>
      <tr v-for="team in teams" :key="team.id">
        <td>
          <!--          <v-icon>mdi-arrow-up-bold-box</v-icon>-->
        </td>
        <td>
          <RankCell :step="currentStep" :class="rankCellClasses">
            <template v-slot:first>{{ team.ranks[currentStep] }}</template>
            <template v-if="currentStep" v-slot:second>({{ team.ranks[currentStep - 1] }})
            </template>
          </RankCell>
        </td>
        <td>
          <img :src="flagPath(team.abbreviation)" width="40" />
          {{ $vuetify.breakpoint.xsOnly ? team.abbreviation : team.name }}
        </td>
        <td>
          <RankCell :step="currentStep" :class="rankCellClasses">
            <template v-slot:first>{{ team.points[currentStep].rounded }}</template>
            <template v-if="currentStep" v-slot:second>
              ({{ team.points[currentStep - 1].rounded }})
            </template>
          </RankCell>
        </td>
      </tr>
      </tbody>
    </table>
  </v-simple-table>
</template>

<script>
import { mapState } from 'vuex';
import RankCell from './RankCell.vue';

export default {
  name: 'RankingTable',
  components: {
    RankCell,
  },
  data() {
    return {
      rankCellClasses: {
        'flex-column py-1': this.$vuetify.breakpoint.xsOnly,
      },
    };
  },
  computed: {
    ...mapState('team', ['teams']),
    ...mapState(['currentStep']),
  },
  methods: {
    flagPath(countryCode) {
      try {
        return require(`../assets/${countryCode.toLowerCase()}.svg`);
      } catch (e) {
        return require('../assets/nzl.svg');
      }
    },
  },
};

</script>
