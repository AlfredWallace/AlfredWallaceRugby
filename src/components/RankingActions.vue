<template>
  <div class="d-flex justify-content justify-space-between" style="width: 100%">
    <v-btn :disabled="isInitialStep" @click="stepMin">
      <v-icon color="info">mdi-skip-backward</v-icon>
    </v-btn>
    <v-btn :disabled="isInitialStep" @click="stepDown">
      <v-icon color="info">mdi-step-backward</v-icon>
    </v-btn>
    <v-btn :disabled="isLastStep" @click="stepUp">
      <v-icon color="info">mdi-step-forward</v-icon>
    </v-btn>
    <v-btn :disabled="isLastStep" @click="stepMax">
      <v-icon color="info">mdi-skip-forward</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RankingActions',

  computed: {
    ...mapGetters(['isInitialStep', 'isLastStep']),
  },

  methods: {
    ...mapActions(['stepMin', 'stepUp', 'stepDown', 'stepMax']),
  },
};
</script>
