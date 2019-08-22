<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="teams"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      disable-sort
      hide-default-footer
      hide-default-header
      dense
    >
      <template v-slot:item.rank="{ item }">
        <RankCell :showSecondSlot="currentStep">
          <template v-slot:first>
          <span :class="classes.slots.first">
            {{ item.ranks[currentStep] }}
          </span>
          </template>
          <template v-if="currentStep" v-slot:second>
            &nbsp;
            <span :class="classes.slots.second">
            ({{ item.ranks[currentStep - 1] }})
          </span>
          </template>
        </RankCell>
      </template>

      <template v-slot:item.team="{ item }">
        <RankCell :showSecondSlot="true">
          <template v-slot:first>
            <img :src="flagPath(item.abbreviation)" width="40" />
          </template>
          <template v-slot:second>
            <span v-if="$vuetify.breakpoint.smAndUp">&nbsp;</span>
            <span class="font-weight-bold">
            {{ $vuetify.breakpoint.xsOnly ? item.abbreviation : item.name }}
          </span>
          </template>
        </RankCell>
      </template>

      <template v-slot:item.points="{ item }">
        <RankCell :showSecondSlot="currentStep">
          <template v-slot:first>
          <span :class="classes.slots.first">
            {{ item.points[currentStep].rounded }}
          </span>
          </template>
          <template v-if="currentStep" v-slot:second>
            &nbsp;
            <span :class="classes.slots.second">
            ({{ item.points[currentStep - 1].rounded }})
          </span>
          </template>
        </RankCell>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-pagination v-model="page" :length="nbPages"></v-pagination>
  </div>
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
      page: 1,
      itemsPerPage: 20,
      classes: {
        slots: {
          first: 'font-weight-bold subtitle-1',
          second: 'font-italic subtitle-2',
        },
      },
      headers: [
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
    nbPages() {
      return Math.ceil(this.teams.length / this.itemsPerPage);
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
