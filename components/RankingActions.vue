<template>
  <v-row>
    <v-col cols="3">
      <v-btn color="info" block :disabled="currentStep <= 0" @click="stepDown">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="6" class="d-flex align-center justify-center">
      current step &nbsp;
      <v-chip outlined>{{ currentStep }}</v-chip>
    </v-col>

    <v-col cols="3">
      <v-btn
        color="info"
        block
        :disabled="currentStep >= nbSteps"
        @click="stepUp"
      >
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'RankingActions',
  computed: {
    ...mapState(['currentStep']),
    ...mapGetters('match', ['nbSteps'])
  },
  methods: {
    ...mapActions(['stepUp', 'stepDown'])
  }
}
</script>
