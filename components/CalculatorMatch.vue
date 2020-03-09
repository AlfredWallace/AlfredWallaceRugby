<template>
  <v-card :outlined="$vuetify.breakpoint.smAndDown" class="mb-6">
    <v-card-title> Match no. {{ matchNumber }} </v-card-title>
    <v-form ref="matchForm">
      <v-container>
        <CalculatorMatchTeam
          ground="home"
          :index="index"
          :match="match"
        ></CalculatorMatchTeam>
        <CalculatorMatchTeam
          ground="away"
          :index="index"
          :match="match"
        ></CalculatorMatchTeam>
        <v-row dense>
          <v-col>
            <v-switch
              v-model="match.neutralGround"
              label="Played on neutral ground ?"
              hide-details
            >
            </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-switch
              v-model="match.worldCup"
              label="World Cup match ?"
              hide-details
            >
            </v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-end">
      <v-btn color="error" outlined @click="$emit('delete-match')">
        Delete match no. {{ matchNumber }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Match from '../classes/Match'
import CalculatorMatchTeam from './CalculatorMatchTeam.vue'

export default {
  name: 'Match',
  components: {
    CalculatorMatchTeam
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    match: {
      type: Match,
      required: true
    }
  },
  data() {
    return {
      matchNumber: this.index + 1
    }
  },
  computed: {
    ...mapState('team', ['teams'])
  }
}
</script>
