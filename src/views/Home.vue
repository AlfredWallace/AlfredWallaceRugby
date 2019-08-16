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

    <v-container v-else>
      <v-row>
        <v-col>
          <v-card class="pa-4">
            <RankingTable></RankingTable>
          </v-card>
        </v-col>
        <v-col>
          <Calculator></Calculator>
        </v-col>
      </v-row>
    </v-container>
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
