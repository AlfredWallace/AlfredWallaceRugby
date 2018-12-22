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
    swipeThreshold: 30,
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
    })
    vm.$el.addEventListener('touchmove', function () {
      vm.xPos = event.touches[0].clientX
    })
    vm.$el.addEventListener('touchend', function () {
      let posDiff = vm.xPos - vm.xPosInit

      if (Math.abs(posDiff) > vm.swipeThreshold) {
        let currentRouteIndex = vm.routesOrders.indexOf(vm.$route.name)

        if (currentRouteIndex > -1) {
          let nextRouteIndex = (currentRouteIndex - Math.sign(posDiff) + 3) % 3

          vm.$router.push({ name: vm.routesOrders[nextRouteIndex] })
        }
      }
    })
  }
}).$mount('#app')
