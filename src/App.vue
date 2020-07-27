<template>
    <v-app :dark="isDark">
        <v-app-bar app dense :hide-on-scroll="mobileLayout">
            <v-img :src="require('./assets/awr.svg')" alt="Alfred Wallace Rugby logo" height="2.5rem" width="2.5rem" contain class="flex-grow-0" />
            <v-spacer></v-spacer>
            <v-toolbar-title class="flex-grow-1">
                {{ siteTitle }}
            </v-toolbar-title>
            <v-switch color="info" hide-details v-model="isDark" append-icon="mdi-weather-night"></v-switch>

            <template v-if="mobileLayout" v-slot:extension>
                <v-tabs color="info" v-model="activeTab" grow>
                    <v-tab v-for="(tab, index) in tabs" :key="index">
                        <v-icon>mdi-{{ tab }}</v-icon>
                    </v-tab>
                </v-tabs>
            </template>
        </v-app-bar>

        <v-main>
            <div v-if="mobileLayout">
                <v-tabs-items v-model="activeTab">
                    <v-tab-item>
                        <RankingTable></RankingTable>
                        <v-bottom-navigation app grow>
                            <RankingActions></RankingActions>
                        </v-bottom-navigation>
                    </v-tab-item>
                    <v-tab-item>
                        <Calculator></Calculator>
                        <v-bottom-navigation app grow>
                            <CalculatorActions></CalculatorActions>
                        </v-bottom-navigation>
                    </v-tab-item>
                    <v-tab-item>
                        <About></About>
                    </v-tab-item>
                </v-tabs-items>
            </div>

            <v-container v-else>
                <v-row>
                    <v-col>
                        <v-bottom-navigation grow>
                            <RankingActions></RankingActions>
                        </v-bottom-navigation>
                    </v-col>
                    <v-col>
                        <v-bottom-navigation grow>
                            <CalculatorActions></CalculatorActions>
                        </v-bottom-navigation>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <RankingTable></RankingTable>
                    </v-col>
                    <v-col>
                        <Calculator></Calculator>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <About></About>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';

import About from './components/About.vue';
import Calculator from './components/Calculator.vue';
import CalculatorActions from './components/CalculatorActions.vue';
import RankingActions from './components/RankingActions.vue';
import RankingTable from './components/RankingTable.vue';

export default {
  name: 'Default',

  components: {
    About,
    Calculator,
    CalculatorActions,
    RankingActions,
    RankingTable,
  },

  data: () => ({
    activeTab: null,
    tabs: ['format-list-numbered', 'calculator', 'information'],
    isMounted: false,
  }),

  computed: {
    mobileLayout() {
      return this.isMounted && this.$vuetify.breakpoint.smAndDown;
    },

    siteTitle() {
      return this.mobileLayout ? 'AWR' : 'Alfred Wallace Rugby';
    },

    isDark: {
      get() {
        return this.$vuetify.theme.dark;
      },
      set(value) {
        this.$vuetify.theme.dark = value;
        localStorage.setItem('awr-theme-choice', value ? 'DARK' : 'LIGHT');
      },
    },
  },

  mounted() {
    this.isMounted = true;
    this.$vuetify.theme.dark = localStorage.getItem('awr-theme-choice') === 'DARK';
  },

  created() {
    this.initWorldRugbyData();
  },

  methods: {
    ...mapActions(['initWorldRugbyData']),
  },
};
</script>
