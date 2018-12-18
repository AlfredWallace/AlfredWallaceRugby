import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    xPosInit: null,
    xPos: null,
    swipeThreshold: 30
  },
  mounted: function () {
    let vm = this

    vm.$el.addEventListener('touchstart', function (event) {
      vm.xPosInit = vm.xPos = event.touches[0].clientX
    })
    vm.$el.addEventListener('touchmove', function () {
      vm.xPos = event.touches[0].clientX
    })
    vm.$el.addEventListener('touchend', function () {
      console.log('xPosInit', vm.xPosInit)
      console.log('xPos', vm.xPos)
      console.log('abs(xPosInit - xPos)', Math.abs(vm.xPosInit - vm.xPos))
      console.log('abs(xPosInit - xPos) > 30 ?', Math.abs(vm.xPosInit - vm.xPos) > vm.swipeThreshold)
    })
  }
}).$mount('#app')
