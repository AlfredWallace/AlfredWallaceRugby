<template>
  <div id="app">
    <v-app>

      <v-app-bar app elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Alfred Wallace Rugby</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer touchless app v-model="drawer">

        <v-subheader>Navigation</v-subheader>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item link :to="{ name: 'home' }" exact>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span>Home</span>
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

<!--        <v-btn fab fixed bottom right color="success">-->
<!--          <v-icon>mdi-checkbox-marked-circle</v-icon>-->
<!--        </v-btn>-->
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
    ...mapActions(['initStore']),
    // validate() {
    //   const res = this.$refs.matchForm.validate();
    //   console.log(res);
    //   return res;
    // },
  },
  created() {
    this.initStore();
  },
};
</script>

<style>
.monospaced {
  font-family: 'Roboto Mono', monospace;
}
</style>
