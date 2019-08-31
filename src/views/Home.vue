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
        <v-container class="py-0">
          <v-row>
            <v-col class="py-0">
              <v-window touchless v-model="step">
                <v-window-item :value="1">
                  <RankingActions></RankingActions>
                </v-window-item>

                <v-window-item :value="2">
                  <CalculatorActions></CalculatorActions>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </div>

    <v-container v-else>
      <v-row>
        <v-col>
          <RankingTable></RankingTable>
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
import CalculatorActions from '../components/CalculatorActions.vue';
import RankingActions from '../components/RankingActions.vue';

export default {
  components: {
    RankingTable,
    RankingActions,
    Calculator,
    CalculatorActions,
  },
  data() {
    return {
      step: 1,
    };
  },
};
</script>
