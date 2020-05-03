<template>
  <v-card :outlined="$vuetify.breakpoint.smAndDown" class="mb-6">
    <v-card-title> Match no. {{ matchNumber }} </v-card-title>
    <v-form ref="matchForm">
      <v-container>
        <CalculatorMatchSide :index="index" :match="match" ground="home"></CalculatorMatchSide>
        <CalculatorMatchSide :index="index" :match="match" ground="away"></CalculatorMatchSide>
        <v-row dense>
          <v-col>
            <v-switch v-model="match.neutralGround" label="Played on neutral ground ?" hide-details> </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-switch v-model="match.worldCup" label="World Cup match ?" hide-details> </v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-start">
      <v-btn color="error" outlined @click="$emit('delete-match')"> Delete match no. {{ matchNumber }} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CalculatorMatchSide from './CalculatorMatchSide.vue'

export default {
  name: 'CalculatorMatch',
  components: {
    CalculatorMatchSide
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    match: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      matchNumber: this.index + 1
    }
  }
  // methods: {
  //   // will validate the form and emit the result to the parent component
  //   validate() {
  //     this.$emit('validate-match', { index: this.index, isValid: this.$refs.matchForm.validate() })
  //   }
  // }
}
</script>
