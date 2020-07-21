<template>
  <v-card class="mb-12" :class="[$vuetify.breakpoint.smAndDown ? 'pb-4' : 'pa-4']" :outlined="$vuetify.breakpoint.smAndDown">
    <v-data-table
        :headers="headers"
        :items="currentRanking"
        :items-per-page="itemsPerPage"
        :footer-props="footerProps"
        :item-class="rowClasses"
        :mobile-breakpoint="0"
        disable-sort
    >
      <template v-slot:item.rank="{ item }">
        <RankingTableCell :show-second-slot="!isInitialStep">
          <template v-slot:first>
            <span :class="classes.slots.first">
              {{ item.rank }}
            </span>
          </template>
          <template v-if="!isInitialStep" v-slot:second>
            &nbsp;<span :class="classes.slots.second">({{ item.previousRank }})</span>
          </template>
        </RankingTableCell>
      </template>

      <template v-slot:item.team="{ item }">
        <RankingTableCell :show-second-slot="false">
          <template v-slot:first>
            <span class="font-weight-bold">
              {{ $vuetify.breakpoint.smAndDown ? item.abbreviation : item.name }}
            </span>
          </template>
        </RankingTableCell>
      </template>

      <template v-slot:item.points="{ item }">
        <RankingTableCell :show-second-slot="!isInitialStep">
          <template v-slot:first>
            <span :class="classes.slots.first">
              {{ item.points | displayRounded }}
            </span>
          </template>
          <template v-if="!isInitialStep" v-slot:second>
            &nbsp;<span :class="classes.slots.second">({{ item.previousPoints | displayRounded }})</span>
          </template>
        </RankingTableCell>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

const RankingTableCell = () => import('./RankingTableCell.vue');

export default {
  name: 'RankingTable',

  components: {
    RankingTableCell,
  },

  data() {
    return {
      classes: {
        slots: {
          first: 'font-weight-bold body-2',
          second: 'font-italic caption',
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
    ...mapState(['currentStep']),
    ...mapGetters(['isInitialStep', 'currentRanking']),

    itemsPerPage() {
      return this.$vuetify.breakpoint.smAndDown ? this.currentRanking.length : 10;
    },

    footerProps() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return {};
      }

      return {
        'items-per-page-options': [10, 20, -1],
        'items-per-page-text': 'Show',
      };
    },
  },

  methods: {
    rowClasses(item) {
      if (this.isInitialStep) {
        return '';
      }

      if (item.rank < item.previousRank) {
        return 'green lighten-5';
      }

      if (item.rank > item.previousRank) {
        return 'red lighten-5';
      }

      if (item.points !== item.previousPoints) {
        return 'blue lighten-5';
      }

      return '';
    },
  },
};
</script>
