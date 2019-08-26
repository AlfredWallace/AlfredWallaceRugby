<template>
  <div>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <v-window v-model="step">
        <v-window-item :value="1">
          <RankingTable></RankingTable>
        </v-window-item>

        <v-window-item :value="2">
          <Calculator></Calculator>
        </v-window-item>
      </v-window>

      <v-footer fixed padless elevation="10">
        <v-window touchless v-model="step">
          <v-window-item :value="1">
            Ranking actions
          </v-window-item>

          <v-window-item :value="2">
            Calculator actions
          </v-window-item>
        </v-window>
      </v-footer>
    </div>

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
  data() {
    return {
      step: 1,
    };
  },
};
</script>

<style scoped>

</style>
