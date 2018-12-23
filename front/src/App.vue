<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/rankings">Rankings</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <transition :name="bodyTransitionName" :mode="bodyTransitionMode">
      <router-view/>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view name="footer"/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xPosInit: null,
      yPosInit: null,
      xPos: null,
      yPos: null,
      swipeThreshold: 100,
      verticalSwipeThreshold: 100,
      routesOrder: [
        'home',
        'rankings',
        'about'
      ],
      bodyTransitions: {
        home: {
          rankings: {
            name: 'swipe-left',
            mode: null
          },
          about: {
            name: 'fade',
            mode: 'out-in'
          }
        },
        rankings: {
          home: {
            name: 'swipe-right',
            mode: null
          },
          about: {
            name: 'swipe-left',
            mode: null
          }
        },
        about: {
          home: {
            name: 'fade',
            mode: 'out-in'
          },
          rankings: {
            name: 'swipe-right',
            mode: null
          }
        }
      },
      bodyTransitionName: null,
      bodyTransitionMode: null
    }
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
        let currentRouteIndex = vm.routesOrder.indexOf(vm.$route.name)

        if (currentRouteIndex > -1) {
          let nextRouteIndex = currentRouteIndex - Math.sign(posDiff)

          if (nextRouteIndex >= 0 && nextRouteIndex < vm.routesOrder.length) {
            vm.$router.push({ name: vm.routesOrder[nextRouteIndex] })
          }
        }
      }
    })
  },
  watch: {
    '$route' (to, from) {
      if (from.matched.length > 0 && to.matched.length > 0) {
        let bodyTransition = this.bodyTransitions[from.name][to.name]
        this.bodyTransitionName = bodyTransition.name
        this.bodyTransitionMode = bodyTransition.mode
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../src/assets/css/normalize.css';

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10%;
    background-color: darkseagreen;
  }

  .swipe-left-enter-active, .swipe-left-leave-active, .swipe-right-enter-active, .swipe-right-leave-active {
    transition: all .3s ease;
    position: absolute;
  }

  .swipe-left-enter, .swipe-right-leave-to {
    transform: translateX(100%);
  }

  .swipe-left-leave-to, .swipe-right-enter {
    transform: translateX(-100%);
  }

  .swipe-left-leave, .swipe-left-enter-to, .swipe-right-leave, .swipe-right-enter-to {
    transform: translateX(0px);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
    position: absolute;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-leave, .fade-enter-to {
    opacity: 1;
  }
</style>
