<template>
  <v-card :outlined="$vuetify.breakpoint.smAndDown" class="mb-6">
    <v-card-title> Match no. {{ match.number }} </v-card-title>
    <v-form :ref="ref">
      <v-container>
        <CalculatorMatchSide :index="index" :match="match" ground="home"></CalculatorMatchSide>
        <CalculatorMatchSide :index="index" :match="match" ground="away"></CalculatorMatchSide>
        <v-row dense>
          <v-col>
            <v-switch v-model="neutralGroundProxy" label="Played on neutral ground ?" hide-details> </v-switch>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-switch v-model="worldCupProxy" label="World Cup match ?" hide-details> </v-switch>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions class="d-flex justify-start">
      <v-btn color="error" outlined @click="deleteMatch(index)"> Delete match no. {{ match.number }} </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import CalculatorMatchSide from './CalculatorMatchSide.vue';
import Match from '../classes/Match';

export default {
  name: 'CalculatorMatch',

  components: {
    CalculatorMatchSide,
  },

  props: {
    index: {
      type: Number,
      required: true,
    },

    match: {
      type: Match,
      required: true,
    },
  },

  data() {
    return {
      ref: `match-form-${this.index}`,
    };
  },

  computed: {
    ...mapGetters('match', ['getNeutralGround', 'getWorldCup']),

    neutralGroundProxy: {
      get() {
        return this.getNeutralGround(this.index);
      },
      set(value) {
        this.setNeutralGround({ index: this.index, value });
      },
    },

    worldCupProxy: {
      get() {
        return this.getWorldCup(this.index);
      },
      set(value) {
        this.setWorldCup({ index: this.index, value });
      },
    },
  },

  methods: {
    ...mapActions('match', ['deleteMatch', 'setNeutralGround', 'setWorldCup', 'setValid']),

    validate() {
      if (this.$refs[this.ref]) {
        this.setValid({ index: this.index, value: this.$refs[this.ref].validate() });
      }
    },
  },
};
</script>
