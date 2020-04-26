<template>
  <v-app>
    <v-app-bar app dense :hide-on-scroll="smAndDown">
      <v-app-bar-nav-icon><v-icon>mdi-rugby</v-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Alfred Wallace Rugby</v-toolbar-title>

      <template v-if="smAndDown" v-slot:extension>
        <v-tabs v-model="activeTab" grow>
          <v-tab v-for="(tab, index) in tabs" :key="index">
            <v-icon>mdi-{{ tab }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <div v-if="smAndDown">
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
              <v-btn>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn>
                <v-icon>mdi-plus-box</v-icon>
              </v-btn>
            </v-bottom-navigation>
          </v-tab-item>
          <v-tab-item> </v-tab-item>
        </v-tabs-items>
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
        <v-row></v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RankingTable from '../components/RankingTable'
import Calculator from '../components/Calculator'
import RankingActions from '../components/RankingActions'

export default {
  components: {
    RankingActions,
    Calculator,
    RankingTable
  },
  data: () => ({
    activeTab: null,
    tabs: ['format-list-numbered', 'calculator', 'information'],
    isMounted: false
  }),
  computed: {
    smAndDown() {
      return this.isMounted && this.$vuetify.breakpoint.smAndDown
    }
  },
  mounted() {
    this.isMounted = true
  }
}
</script>
