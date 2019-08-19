<template>
  <v-data-table
    :headers="headers"
    :items="teams"
    :items-per-page="teams.length"
    :mobile-breakpoint="0"
    :class="{ 'mb-12': $vuetify.breakpoint.xsOnly, 'pb-12': $vuetify.breakpoint.xsOnly }"
    class="monospaced"
    disable-pagination
    disable-sort
    hide-default-footer
  >
    <template v-slot:item.actions="{ item }">
      <v-icon>mdi-arrow-up-bold-box</v-icon>
    </template>

    <template v-slot:item.rank="{ item }">
      <RankCell :step="currentStep" :class="rankCellClasses">
        <template v-slot:first>{{ item.ranks[currentStep] }}</template>
        <template v-if="currentStep" v-slot:second>({{ item.ranks[currentStep - 1] }})</template>
      </RankCell>
    </template>

    <template v-slot:item.team="{ item }">
      <v-chip outlined pill>
        <v-avatar left>
          <v-img :src="flagPath(item.abbreviation)"></v-img>
        </v-avatar>
        {{ $vuetify.breakpoint.xsOnly ? item.abbreviation : item.name }}
      </v-chip>
    </template>

    <template v-slot:item.points="{ item }">
      <RankCell :step="currentStep" :class="rankCellClasses">
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
