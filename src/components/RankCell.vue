<template functional v-bind="data.attrs">
  <div class="d-flex flex-nowrap align-center">
    <slot name="first"></slot>
    <slot v-if="data.attrs.showSecondSlot" name="second"></slot>
  </div>
</template>
