<template>
  <div>
    <v-card>
      <v-card-title>
        Rankings
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="currentTeams"
        :items-per-page="currentTeams.length"
        :mobile-breakpoint="0"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.actions="{ item }">
          <v-icon>mdi-arrow-up-bold-box</v-icon>
        </template>

        <template v-slot:item.rank="{ item }">
          <RankCell>
            <template v-slot:first>{{ item.rank }}</template>
            <template v-slot:second>({{ item.previousRank }})</template>
          </RankCell>
        </template>

        <template v-slot:item.team="{ item }">
          <RankCell :class="{ 'flex-column': $vuetify.breakpoint.xsOnly }">
            <template v-slot:first>
              <v-img src="../assets/nz.svg" max-width="40px"></v-img>
            </template>
            <template v-slot:second>{{ $vuetify.breakpoint.xsOnly ? item.abbr : item.name }}
            </template>
          </RankCell>
        </template>

        <template v-slot:item.points="{ item }">
          <RankCell :class="{ 'flex-column': $vuetify.breakpoint.xsOnly }">
            <template v-slot:first>{{ item.roundedPoints }}</template>
            <template v-slot:second>({{ item.roundedPreviousPoints }})</template>
          </RankCell>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RankCell from '../components/RankCell.vue';

export default {
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
  components: {
    RankCell,
  },
  computed: {
    ...mapGetters(['currentTeams']),
  },
  methods: {},
};
</script>

<style scoped>

</style>
