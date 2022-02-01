<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Countries</router-link> |
      <router-link to="/cities">Cities</router-link> |   
      <router-link to="/measurements">Measurements</router-link>
    </div>
    <router-view/>
  </div>
</template>



<style>
body {
  background-color: #888;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}
</style>
