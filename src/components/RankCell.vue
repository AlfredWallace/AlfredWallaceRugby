<template functional v-bind="data.attrs">
  <div class="d-flex align-center flex-nowrap" :class="data.class">
    <span class="subtitle-1"><slot name="first"></slot></span>&nbsp;
    <span class="font-weight-light subtitle-2"><slot name="second"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'RankCell',
};
</script>

<style scoped>

</style>
