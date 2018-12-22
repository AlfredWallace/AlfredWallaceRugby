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
    yPosInit: null,
    xPos: null,
    yPos: null,
    swipeThreshold: 100,
    verticalSwipeThreshold: 100,
    routesOrders: [
      'home',
      'rankings',
      'about'
    ]
  },
  mounted: function () {
    let vm = this

    vm.$el.addEventListener('touchstart', function (event) {
      vm.xPosInit = vm.xPos = event.touches[0].clientX
      vm.yPosInit = vm.yPos = event.touches[0].clientY
    })
    vm.$el.addEventListener('touchmove', function () {
      vm.xPos = event.touches[0].clientX
      vm.yPos = event.touches[0].clientY
    })
    vm.$el.addEventListener('touchend', function () {
      let posDiff = vm.xPos - vm.xPosInit

      if (Math.abs(posDiff) > vm.swipeThreshold && Math.abs(vm.yPos - vm.yPosInit) <= vm.verticalSwipeThreshold) {
        let currentRouteIndex = vm.routesOrders.indexOf(vm.$route.name)

        if (currentRouteIndex > -1) {
          let nextRouteIndex = (currentRouteIndex - Math.sign(posDiff) + 3) % 3

          vm.$router.push({ name: vm.routesOrders[nextRouteIndex] })
        }
      }
    })
  }
}).$mount('#app')
