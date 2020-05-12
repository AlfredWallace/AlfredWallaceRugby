<template>
  <v-row dense>
    <v-col cols="12">
      <v-autocomplete v-model="teamProxy" return-object :items="teams" :rules="[validation.required]" item-text="name" placeholder="pick a team" dense outlined auto-select-first hide-details>
        <template v-slot:item="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="8" class="text-truncate d-flex align-center">
              {{ item.name }}
            </v-col>
            <v-col cols="4" class="text-no-wrap d-flex align-center"> ({{ item.points | displayRounded }}) </v-col>
          </v-row>
        </template>

        <template v-slot:selection="{ item }">
          <v-row class="truncatedParent">
            <v-col cols="8" class="text-truncate d-flex align-center">
              {{ item.name }}
            </v-col>
            <v-col cols="4" class="text-no-wrap d-flex align-center"> ({{ item.points | displayRounded }}) </v-col>
          </v-row>
        </template>
      </v-autocomplete>
    </v-col>

    <v-col cols="3">
      <v-text-field v-model="scoreProxy" type="number" :rules="[validation.required, validation.integer]" placeholder="score" outlined hide-details dense> </v-text-field>
    </v-col>

    <v-spacer></v-spacer>

    <v-col cols="8" class="d-flex align-center">
      new rank:
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'CalculatorMatchSide',
  props: {
    match: {
      type: Object,
      required: true
    },
    ground: {
      type: String,
      required: true,
      validator(value) {
        return ['home', 'away'].includes(value)
      }
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      validation: {
        required: (val) => !!val,
        integer: (val) => /^[0-9]+$/.test(val)
      }
    }
  },
  computed: {
    ...mapState('team', ['teams']),
    ...mapGetters('match', ['getTeam', 'getScore']),
    teamProxy: {
      get() {
        return this.getTeam({ index: this.index, ground: this.ground })
      },
      set(value) {
        this.setTeam({ index: this.index, ground: this.ground, value })
      }
    },
    scoreProxy: {
      get() {
        return this.getScore({ index: this.index, ground: this.ground })
      },
      set(value) {
        this.setScore({ index: this.index, ground: this.ground, value })
      }
    }
  },
  methods: {
    ...mapActions('match', ['setTeam', 'setScore'])
  }
}
</script>

<style scoped>
/* Hack to prevent the parent of an element with .text-truncate from expanding */
.truncatedParent {
  max-width: 100%;
}
</style>
