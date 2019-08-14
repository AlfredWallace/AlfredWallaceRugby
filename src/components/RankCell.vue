<template >
  <div class="d-flex flex-nowrap">
    <span><slot name="first"></slot></span>
    &nbsp;
    <span><slot name="second"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'RankCell',
};
</script>

<style scoped>

</style>
