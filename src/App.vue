<template>
  <div id="app">
    <v-app>

      <v-content>
      </v-content>

      <v-bottom-navigation app shift grow class="hidden-md-and-up">

        <v-btn>
          <span>Rankings</span>
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>

        <v-btn>
          <span>Calculator</span>
          <v-icon>mdi-calculator</v-icon>
        </v-btn>

        <v-btn>
          <span>About</span>
          <v-icon>mdi-information</v-icon>
        </v-btn>

      </v-bottom-navigation>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
