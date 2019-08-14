<template >
  <tr>
    <td>
      <v-icon>mdi-arrow-up-bold-box</v-icon>
    </td>
    <td>
      <!--      <RankCell>-->
      <!--        <template v-slot:first>-->
      <!--          {{ team.rank }}-->
      <!--        </template>-->
      <!--        <template v-slot:second>-->
      <!--          ({{ team.previousRank }})-->
      <!--        </template>-->
      <!--      </RankCell>-->
      <div class="d-flex align-center flex-nowrap">
        <span class="subtitle-1">{{ team.rank }}</span>&nbsp;
        <span class="font-weight-light subtitle-2">({{ team.previousRank }})</span>
      </div>
    </td>
    <td>
      <!--      <RankCell>-->
      <!--        <template v-slot:first>-->
      <!--          <v-img src="../assets/nz.svg" max-width="40px"></v-img>-->
      <!--        </template>-->
      <!--        <template v-slot:second>-->
      <!--          {{ $vuetify.breakpoint.xsOnly ? team.abbr : team.name }}-->
      <!--        </template>-->
      <!--      </RankCell>-->
      <div class="d-flex align-center flex-nowrap flex-column">
        <span><v-img src="../assets/nz.svg" max-width="40px"></v-img></span>
        <span>{{ $vuetify.breakpoint.xsOnly ? team.abbr : team.name }}</span>
      </div>
    </td>
    <td>
      <!--      <RankCell>-->
      <!--        <template v-slot:first>-->
      <!--          {{ team.roundedPoints }}-->
      <!--        </template>-->
      <!--        <template v-slot:second>-->
      <!--          ({{ team.roundedPreviousPoints }})-->
      <!--        </template>-->
      <!--      </RankCell>-->
      <div class="d-flex align-center justify-end flex-column">
        <span class="subtitle-1">{{ team.roundedPoints }}</span>
        <span class="font-weight-light subtitle-2">({{ team.roundedPreviousPoints }})</span>
      </div>
    </td>
  </tr>
</template>

<script>
// import RankCell from './RankCell.vue'

export default {
  name: 'RankRow',
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  // components: {
  //   RankCell,
  // },
};
</script>

<style scoped>

</style>
