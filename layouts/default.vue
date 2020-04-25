<template>
  <v-app>
    <v-app-bar app dense :hide-on-scroll="$vuetify.breakpoint.smAndDown">
      <v-app-bar-nav-icon><v-icon>mdi-rugby</v-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Alfred Wallace Rugby</v-toolbar-title>

      <template v-if="$vuetify.breakpoint.smAndDown" v-slot:extension>
        <v-tabs v-model="activeTab" grow>
          <v-tab v-for="(tab, index) in tabs" :key="index">
            <v-icon>mdi-{{ tab }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-tabs-items v-if="$vuetify.breakpoint.smAndDown" v-model="activeTab">
        <v-tab-item>
          <RankingTable></RankingTable>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs-items>

      <v-container v-else>
        <v-row>
          <v-col>
            <RankingTable></RankingTable>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row></v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import RankingTable from '../components/RankingTable'

export default {
  components: {
    RankingTable
  },
  data: () => ({
    activeTab: null,
    tabs: ['home', 'calculator', 'information']
  })
}
</script>
