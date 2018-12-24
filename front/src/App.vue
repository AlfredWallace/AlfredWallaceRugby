<template>
  <div id="app">
    <header id="nav">
      <router-link to="/">
        <font-awesome-icon icon="calculator" :class="getNavLinkFaClasses('')"/>
      </router-link>
      <router-link to="/rankings">
        <font-awesome-icon icon="list-ol" :class="getNavLinkFaClasses('rankings')"/>
      </router-link>
      <router-link to="/about">
        <font-awesome-icon icon="info-circle" :class="getNavLinkFaClasses('about')"/>
      </router-link>
    </header>
    <transition :name="bodyTransition.name" :mode="bodyTransition.mode">
      <router-view/>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view name="footer"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
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
      bodyTransition: {
        name: null,
        mode: null
      },
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
      }
    }
  },
  methods: {
    getNavLinkFaClasses (path) {
      return window.location.pathname.replace(/\//g, '') === path ? 'fa-2x' : 'fa-lg'
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
      if (to.matched.length > 0 && from.matched.length > 0) {
        this.bodyTransition = this.bodyTransitions[from.name][to.name]
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../src/assets/css/normalize.css';

  $headerHeight: 7vh;
  $transitionSpeed: .3s;

  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: $headerHeight;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: lightskyblue;

    a {
      text-align: center;
      background-color: beige;
      flex-grow: 1;

      svg {
        transition: all $transitionSpeed ease;
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 10vh;
    background-color: darkseagreen;
  }

  body {
    margin-top: $headerHeight;
  }

  .main-content {
    position: absolute;
  }

  .swipe-left-enter-active, .swipe-left-leave-active, .swipe-right-enter-active, .swipe-right-leave-active {
    transition: all $transitionSpeed ease;
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
    transition: opacity $transitionSpeed ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-leave, .fade-enter-to {
    opacity: 1;
  }
</style>
