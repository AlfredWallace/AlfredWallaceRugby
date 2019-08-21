<template functional v-bind="data.attrs">
  <div class="d-flex flex-nowrap align-center" :class="data.class">
    <span><slot name="first"></slot></span>
    <span v-if="data.attrs.showSecondSlot"><slot name="second"></slot></span>
  </div>
</template>
