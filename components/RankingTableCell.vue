<template functional>
  <div class="d-flex flex-nowrap align-center">
    <slot name="first"></slot>
    <slot v-if="props.showSecondSlot" name="second"></slot>
  </div>
</template>

<script>
export default {
  props: {
    showSecondSlot: {
      type: Boolean,
      required: true
    }
  }
}
</script>
