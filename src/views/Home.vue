<template>
  <div>
    <v-window v-if="$vuetify.breakpoint.smAndDown">
      <v-window-item>
        <RankingTable></RankingTable>
      </v-window-item>

      <v-window-item>
        <Calculator></Calculator>
      </v-window-item>
    </v-window>

    <div v-else class="d-flex">
      <v-card>
      <RankingTable></RankingTable>
      </v-card>
      <Calculator></Calculator>
    </div>
  </div>
</template>

<script>
import RankingTable from '../components/RankingTable.vue';
import Calculator from '../components/Calculator.vue';

export default {
  components: {
    RankingTable,
    Calculator,
  },
};
</script>

<style scoped>

</style>
