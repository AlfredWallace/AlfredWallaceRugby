<template>
  <div class="d-flex justify-content justify-space-between" style="width: 100%">
    <v-btn :disabled="isInitialStep" @click="stepMin">
      <v-icon>mdi-skip-backward</v-icon>
    </v-btn>
    <v-btn :disabled="isInitialStep" @click="stepDown">
      <v-icon>mdi-step-backward</v-icon>
    </v-btn>
    <v-btn :disabled="isLastStep" @click="stepUp">
      <v-icon>mdi-step-forward</v-icon>
    </v-btn>
    <v-btn :disabled="isLastStep" @click="stepMax">
      <v-icon>mdi-skip-forward</v-icon>
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
