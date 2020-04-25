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
      <v-tabs-items v-if="smAndDown" v-model="activeTab">
        <v-tab-item>
          <RankingTable></RankingTable>
        </v-tab-item>
        <v-tab-item>
          <Calculator></Calculator>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs-items>

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

export default {
  components: {
    Calculator,
    RankingTable
  },
  data: () => ({
    activeTab: null,
    tabs: ['home', 'calculator', 'information'],
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
