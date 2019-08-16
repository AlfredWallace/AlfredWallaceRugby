<template>
  <v-data-table
    :headers="headers"
    :items="teams"
    :items-per-page="teams.length"
    :mobile-breakpoint="0"
    disable-pagination
    hide-default-footer
  >
    <template v-slot:item.actions="{ item }">
      <v-icon>mdi-arrow-up-bold-box</v-icon>
    </template>

    <template v-slot:item.rank="{ item }">
      <RankCell :step="currentStep">
        <template v-slot:first>{{ item.ranks[currentStep] }}</template>
        <template v-if="currentStep" v-slot:second>({{ item.ranks[currentStep - 1] }})</template>
      </RankCell>
    </template>

    <template v-slot:item.team="{ item }">
      <div class="d-flex align-center flex-nowrap"
           :class="{ 'flex-column': $vuetify.breakpoint.xsOnly }"
      >
        <v-img src="../assets/nz.svg" max-width="40px"></v-img>
        <span>
          {{ $vuetify.breakpoint.xsOnly ? item.abbreviation : item.name }}
        </span>
      </div>
    </template>

    <template v-slot:item.points="{ item }">
      <RankCell :step="currentStep" :class="{ 'flex-column': $vuetify.breakpoint.xsOnly }">
        <template v-slot:first>{{ item.points[currentStep].rounded }}</template>
        <template v-if="currentStep" v-slot:second>
          ({{ item.points[currentStep - 1].rounded }})
        </template>
      </RankCell>
    </template>

  </v-data-table>
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
      headers: [
        {
          text: '',
          value: 'actions',
        },
        {
          text: 'Rank',
          value: 'rank',
        },
        {
          text: 'Team',
          value: 'team',
        },
        {
          text: 'Points',
          value: 'points',
        },
      ],
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
