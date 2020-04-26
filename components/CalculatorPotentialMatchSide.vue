<template>
  <v-row dense>
    <v-col cols="12">
      <v-autocomplete
        v-model="side.team"
        return-object
        :items="teamsForCurrentStep"
        item-text="name"
        placeholder="pick a team"
        dense
        outlined
        auto-select-first
        hide-details
      >
        <template v-slot:item="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="8" class="text-truncate d-flex align-center">
              {{ item.name }}
            </v-col>
            <v-col cols="4" class="text-no-wrap d-flex align-center"> ({{ item.points }}) </v-col>
          </v-row>
        </template>

        <template v-slot:selection="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="8" class="text-truncate d-flex align-center">
              {{ item.name }}
            </v-col>
            <v-col cols="4" class="text-no-wrap d-flex align-center"> ({{ item.points }}) </v-col>
          </v-row>
        </template>
      </v-autocomplete>
    </v-col>

    <v-col cols="3">
      <v-text-field v-model="side.score" type="number" :rules="[validation.required, validation.integer]" placeholder="score" outlined hide-details dense> </v-text-field>
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="8" class="d-flex align-center">
      new rank:
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CalculatorPotentialMatchSide',
  props: {
    index: {
      type: Number,
      required: true
    },
    side: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      validation: {
        required: (val) => !!val || 'Required.',
        integer: (val) => /^[0-9]+$/.test(val) || 'Must be an positive integer.'
      }
    }
  },
  computed: {
    ...mapGetters('team', ['teamsForCurrentStep'])
  }
}
</script>

<style scoped>
/* Hack to prevent the parent of an element with .text-truncate from expanding */
.truncatedParent {
  max-width: 100%;
}
</style>
