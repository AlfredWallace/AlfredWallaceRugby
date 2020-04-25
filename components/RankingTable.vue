<template>
  <v-card class="mb-12" :class="[$vuetify.breakpoint.smAndDown ? 'pb-4' : 'pa-4']" :outlined="$vuetify.breakpoint.smAndDown">
    <v-data-table :headers="headers" :items="teamsForCurrentStep" :items-per-page="teamsForCurrentStep.length" :mobile-breakpoint="0" disable-sort hide-default-footer>
      <template v-slot:item.rank="{ item }">
        <RankingTableCell :show-second-slot="!isFirstStep">
          <template v-slot:first>
            <span :class="classes.slots.first">
              {{ item.rank }}
            </span>
          </template>
          <template v-if="!isFirstStep" v-slot:second>
            &nbsp;
            <span :class="classes.slots.second"> ({{ item.previousRank }}) </span>
          </template>
        </RankingTableCell>
      </template>

      <template v-slot:item.team="{ item }">
        <RankingTableCell :show-second-slot="false">
          <template v-slot:first>
            <span class="font-weight-bold">
              {{ $vuetify.breakpoint.xsOnly ? item.abbreviation : item.name }}
            </span>
          </template>
        </RankingTableCell>
      </template>

      <template v-slot:item.points="{ item }">
        <RankingTableCell :show-second-slot="!isFirstStep">
          <template v-slot:first>
            <span :class="classes.slots.first">
              {{ item.points }}
            </span>
          </template>
          <template v-if="!isFirstStep" v-slot:second>
            &nbsp;
            <span :class="classes.slots.second"> ({{ item.previousPoints }}) </span>
          </template>
        </RankingTableCell>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import RankingTableCell from './RankingTableCell.vue'

export default {
  name: 'RankingTable',
  components: {
    RankingTableCell
  },
  data() {
    return {
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
    ...mapGetters('team', ['teamsForCurrentStep']),
    ...mapGetters(['isFirstStep'])
  }
}
</script>
