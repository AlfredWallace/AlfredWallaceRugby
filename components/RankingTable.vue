<template>
  <v-card
    class="mb-12"
    :class="[$vuetify.breakpoint.smAndDown ? 'pb-4' : 'pa-4']"
    :outlined="$vuetify.breakpoint.smAndDown"
  >
    <v-data-table
      :headers="headers"
      :items="teams"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      :mobile-breakpoint="0"
      disable-sort
      hide-default-footer
    >
      <template v-slot:item.rank="{ item }">
        <RankingTableCell :show-second-slot="currentStep">
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
        </RankingTableCell>
      </template>

      <template v-slot:item.team="{ item }">
        <RankingTableCell :show-second-slot="true">
          <template v-slot:first>
            <img :src="flagPath(item)" width="30" />
          </template>
          <template v-slot:second>
            &nbsp;
            <span class="font-weight-bold">
              {{ $vuetify.breakpoint.xsOnly ? item.abbreviation : item.name }}
            </span>
          </template>
        </RankingTableCell>
      </template>

      <template v-slot:item.points="{ item }">
        <RankingTableCell :show-second-slot="currentStep">
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
        </RankingTableCell>
      </template>
    </v-data-table>

    <v-pagination v-model="page" :length="nbPages"></v-pagination>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { countryFlagMixin } from '../mixins/countryFlagMixin'
import RankingTableCell from './RankingTableCell.vue'

export default {
  name: 'RankingTable',
  components: {
    RankingTableCell
  },
  mixins: [countryFlagMixin],
  data() {
    return {
      page: 1,
      itemsPerPage: 20,
      classes: {
        slots: {
          first: 'font-weight-bold body-2',
          second: 'font-italic caption'
        }
      },
      headers: [
        {
          text: 'Rank',
          value: 'rank'
        },
        {
          text: 'Team',
          value: 'team'
        },
        {
          text: 'Points',
          value: 'points'
        }
      ]
    }
  },
  computed: {
    ...mapState('team', ['teams']),
    ...mapState(['currentStep']),
    nbPages() {
      return Math.ceil(this.teams.length / this.itemsPerPage)
    }
  }
}
</script>
