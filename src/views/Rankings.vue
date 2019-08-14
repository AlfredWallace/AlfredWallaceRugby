<template>
  <div>
    <v-card>
      <v-card-title>
        Rankings
      </v-card-title>

<!--      <v-simple-table>-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th></th>-->
<!--          <th>Rank</th>-->
<!--          <th>Team</th>-->
<!--          <th class="text-right">Points</th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody class="font-weight-bold">-->
<!--        <RankRow v-for="team in normalizedTeams" :key="team.id" :team="team"></RankRow>-->
<!--        </tbody>-->
<!--      </v-simple-table>-->
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import RankRow from '../components/RankRow.vue';

export default {
  components: {
    RankRow,
  },
  computed: {
    ...mapState(['teams']),
    ...mapGetters(['normalizedTeams']),
  },
  methods: {},
};
</script>

<style scoped>

</style>
