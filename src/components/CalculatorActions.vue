<template>
  <v-row>
    <v-col cols="3">
      <v-btn color="error" block>
        <v-icon>mdi-eraser</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="6">
      <v-btn color="info" block>
        calculate
      </v-btn>
    </v-col>

    <v-col cols="3">
      <v-btn color="success" block @click="addMatch">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CalculatorActions',
  methods: {
    ...mapActions('match', ['addMatch']),
  },
};
</script>
