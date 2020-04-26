<template>
  <v-card :outlined="$vuetify.breakpoint.smAndDown" class="mb-6">
    <v-card-title> Match no. {{ potentialMatchNumber }} </v-card-title>
    <v-form ref="potentialMatchForm">
      <v-container>
        <CalculatorPotentialMatchSide :index="index" :potential-match="potentialMatch" ground="home"></CalculatorPotentialMatchSide>
        <CalculatorPotentialMatchSide :index="index" :potential-match="potentialMatch" ground="away"></CalculatorPotentialMatchSide>
        <v-row dense>
          <v-col>
            <v-switch v-model="potentialMatch.neutralGround" label="Played on neutral ground ?" hide-details> </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-switch v-model="potentialMatch.worldCup" label="World Cup match ?" hide-details> </v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-start">
      <v-btn color="error" outlined @click="$emit('delete-potential-match')"> Delete match no. {{ potentialMatchNumber }} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Match from '../classes/Match'
import CalculatorPotentialMatchSide from './CalculatorPotentialMatchSide.vue'

export default {
  name: 'CalculatorPotentialMatch',
  components: {
    CalculatorPotentialMatchSide
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    potentialMatch: {
      type: Match,
      required: true
    }
  },
  data() {
    return {
      potentialMatchNumber: this.index + 1
    }
  },
  methods: {
    // will validate the form and emit the result to the parent component
    validate() {
      this.$emit('validate-potential-match', { index: this.index, isValid: this.$refs.potentialMatchForm.validate() })
    }
  }
}
</script>
