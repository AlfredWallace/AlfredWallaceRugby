<template>
  <v-row>
    <v-col cols="4">
      <v-btn color="error" block>
        reset
      </v-btn>
    </v-col>

    <v-col cols="8">
      <v-btn color="success" block>
        calculate
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CalculatorActions',
};
</script>
