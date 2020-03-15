<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Alfred Wallace Rugby</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" touchless app>
      <v-subheader>Navigation</v-subheader>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-item link nuxt exact :to="{ name: 'index' }">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <span>Home</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link nuxt exact :to="{ name: 'calculator' }">
          <v-list-item-icon>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <span>Calculator</span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link nuxt exact :to="{ name: 'about' }">
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
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  })
}
</script>
