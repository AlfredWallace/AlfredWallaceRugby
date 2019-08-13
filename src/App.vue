<template>
  <div id="app">
    <v-app>

      <v-app-bar app elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Alfred Wallace Rugby</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer">

        <v-subheader>Navigation</v-subheader>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item link :to="{ name: 'rankings' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>Rankings</span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="{ name: 'calculator' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-calculator</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>Calculator</span>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="{ name: 'about' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>About</span>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-navigation-drawer>

      <v-content>
        <router-view />

        <v-btn fab fixed bottom right>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    drawer: null,
  }),
  methods: {
    ...mapActions(['setTeams']),
  },
  created() {
    this.setTeams();
  },
};
</script>
