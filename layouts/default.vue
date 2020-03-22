<template>
  <v-app>
    <v-app-bar app dense hide-on-scroll>
      <v-app-bar-nav-icon><v-icon>mdi-rugby</v-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Alfred Wallace Rugby</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs v-model="activeTab" grow>
          <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.route" nuxt exact>
            <v-icon>mdi-{{ tab.name }}</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-tabs-items v-model="activeTab" @change="updateRouter($event)">
        <v-tab-item v-for="tab in tabs" :key="tab.name" :value="tab.route">
          <nuxt />
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    activeTab: null,
    tabs: [
      {
        name: 'home',
        route: '/'
      },
      {
        name: 'calculator',
        route: 'calculator'
      },
      {
        name: 'information',
        route: 'about'
      }
    ]
  }),
  methods: {
    updateRouter(val) {
      this.$router.push(val)
    }
  }
}
</script>
