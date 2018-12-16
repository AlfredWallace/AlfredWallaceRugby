<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/rankings">Rankings</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <router-view name="footer"/>
  </div>
</template>

<style lang="scss">
  @import '../src/assets/css/normalize.css';

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10%;
    background-color: white;
  }

  button {

  }
</style>
