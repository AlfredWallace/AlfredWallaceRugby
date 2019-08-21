<template>
  <v-simple-table>
    <table>
      <thead>
      <th></th>
      <th :class="dynClasses.tHead">Rank</th>
      <th :class="dynClasses.tHead">Team</th>
      <th :class="dynClasses.tHead">Points</th>
      </thead>
      <tbody>
      <tr v-for="team in teams" :key="team.id">
        <td>
          <!--          <v-icon>mdi-arrow-up-bold-box</v-icon>-->
        </td>
        <td>
          <RankCell :showSecondSlot="currentStep" :class="dynClasses.rankCell">
            <template v-slot:first>
              <span :class="classes.slots.first">
                {{ team.ranks[currentStep] }}
              </span>
            </template>
            <template v-if="currentStep" v-slot:second>
              &nbsp;
              <span :class="classes.slots.second">
                ({{ team.ranks[currentStep - 1] }})
              </span>
            </template>
          </RankCell>
        </td>
        <td>
          <RankCell :showSecondSlot="true" :class="dynClasses.rankCell">
            <template v-slot:first>
              <img :src="flagPath(team.abbreviation)" width="40" />
            </template>
            <template v-slot:second>
              <span v-if="$vuetify.breakpoint.smAndUp">&nbsp;</span>
              <span class="font-weight-bold">
                {{ $vuetify.breakpoint.xsOnly ? team.abbreviation : team.name }}
              </span>
            </template>
          </RankCell>
        </td>
        <td>
          <RankCell :showSecondSlot="currentStep" :class="dynClasses.rankCell">
            <template v-slot:first>
              <span :class="classes.slots.first">
                {{ team.points[currentStep].rounded }}
              </span>
            </template>
            <template v-if="currentStep" v-slot:second>
              &nbsp;
              <span :class="classes.slots.second">
                ({{ team.points[currentStep - 1].rounded }})
              </span>
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
      classes: {
        slots: {
          first: 'font-weight-bold subtitle-1',
          second: 'font-italic subtitle-2',
        },
      },
    };
  },
  computed: {
    ...mapState('team', ['teams']),
    ...mapState(['currentStep']),
    dynClasses() {
      return {
        tHead: {
          'text-center': this.$vuetify.breakpoint.xsOnly,
        },
        rankCell: {
          'flex-column py-1 justify-space-around': this.$vuetify.breakpoint.xsOnly,
        },
      };
    },
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
