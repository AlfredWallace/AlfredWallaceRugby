<template>
  <div>
    <v-window v-if="$vuetify.breakpoint.smAndDown">
      <v-window-item>
        <RankingTable></RankingTable>
      </v-window-item>

      <v-window-item>
        Calculator mobile view
      </v-window-item>
    </v-window>

    <div v-else class="d-flex">
      <RankingTable></RankingTable>
      <div>Calculator desktop view</div>
    </div>
  </div>
</template>

<script>
import RankingTable from '../components/RankingTable.vue';

export default {
  components: {
    RankingTable,
  },
};
</script>

<style scoped>

</style>
