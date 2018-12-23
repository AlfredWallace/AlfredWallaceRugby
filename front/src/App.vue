<template>
  <div id="app">
    <header id="nav">
      <router-link :class="navLinkClasses.home" to="/">Calculator</router-link>
      <router-link :class="navLinkClasses.rankings" to="/rankings">Rankings</router-link>
      <router-link :class="navLinkClasses.about" to="/about">About</router-link>
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
      },
      navLinkClasses: {
        home: this.checkPath('home'),
        rankings: this.checkPath('rankings'),
        about: this.checkPath('about')
      }
    }
  },
  methods: {
    checkPath (path) {
      return window.location.pathname.replace(/\//g,'') === path ? 'selected' : null
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
      if (to.matched.length > 0) {
        this.navLinkClasses = {
          home: to.name === 'home' ? 'selected' : null,
          rankings: to.name === 'rankings' ? 'selected' : null,
          about: to.name === 'about' ? 'selected' : null
        }
        if (from.matched.length > 0) {
          this.bodyTransition = this.bodyTransitions[from.name][to.name]
        }
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../src/assets/css/normalize.css';

  header {
    width: 100%;
    height: 10%;
    background-color: lightskyblue;
    display: flex;
    justify-content: space-around;

    a {
      background-color: beige;
      transition: all .3s ease;

      &.selected {
        flex-grow: 1;
      }
    }
  }

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
