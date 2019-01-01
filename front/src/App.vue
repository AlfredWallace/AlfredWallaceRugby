<template>
  <div id="app">
    <transition-group tag="header" :class="{ 'left-handed': isLeftHanded}" name="flip-list">
      <span class="hand-switch" :class="{ 'left-handed': isLeftHanded}" :key="0">
        <a href="#" @click="isLeftHanded = !isLeftHanded">switch to {{ isLeftHanded ? 'right-handed' : 'left-handed' }}</a>
      </span>
      <span class="nav-item" :key="1">
        <router-link to="/">
          <font-awesome-icon icon="calculator" :class="getNavLinkFaClasses('')"/>
        </router-link>
      </span>
      <span class="nav-item" :key="2">
        <router-link to="/rankings">
          <font-awesome-icon icon="list-ol" :class="getNavLinkFaClasses('rankings')"/>
        </router-link>
      </span>
      <span class="nav-item" :key="3">
        <router-link to="/about">
          <font-awesome-icon icon="info-circle" :class="getNavLinkFaClasses('about')"/>
        </router-link>
      </span>
    </transition-group>
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
      isLeftHanded: false,
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
  @import '../src/assets/css/globals.scss';

  .main-content {
    position: absolute;
  }

  .swipe-left-enter-active, .swipe-left-leave-active, .swipe-right-enter-active, .swipe-right-leave-active {
    -webkit-transition: -webkit-transform $transition-speed ease;
    -moz-transition: transform $transition-speed ease;
    -o-transition: transform $transition-speed ease;
    transition: transform $transition-speed ease;
  }

  .swipe-left-enter, .swipe-right-leave-to {
    -webkit-transform: translateX(100%) translateZ(0);
    -moz-transform: translateX(100%) translateZ(0);
    -ms-transform: translateX(100%) translateZ(0);
    -o-transform: translateX(100%) translateZ(0);
    transform: translateX(100%) translateZ(0);
  }

  .swipe-left-leave-to, .swipe-right-enter {
    -webkit-transform: translateX(-100%) translateZ(0);
    -moz-transform: translateX(-100%) translateZ(0);
    -ms-transform: translateX(-100%) translateZ(0);
    -o-transform: translateX(-100%) translateZ(0);
    transform: translateX(-100%) translateZ(0);
  }

  .swipe-left-leave, .swipe-left-enter-to, .swipe-right-leave, .swipe-right-enter-to {
    -webkit-transform: translateX(0) translateZ(0);
    -moz-transform: translateX(0) translateZ(0);
    -ms-transform: translateX(0) translateZ(0);
    -o-transform: translateX(0) translateZ(0);
    transform: translateX(0) translateZ(0);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity $transition-speed ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-leave, .fade-enter-to {
    opacity: 1;
  }

  .flip-list-move {
    -webkit-transition: -webkit-transform $transition-speed ease;
    -moz-transition: transform $transition-speed ease;
    -o-transition: transform $transition-speed ease;
    transition: transform $transition-speed ease;
  }
</style>
