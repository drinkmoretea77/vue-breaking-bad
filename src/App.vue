<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <router-link to="/">Breaking Bad Demo</router-link>
      </div>
      <div class="nav">
        <!-- <router-link to="/">Home</router-link> -->
        <router-link to="/">Seasons</router-link>
        <router-link to="/occupation">Occupation</router-link>        
        <router-link to="/about">About</router-link>
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 100%;
  line-height: 1;
  font: inherit;
  vertical-align: baseline;
  transition: 0.07s;
  outline: none;
}
ul {
  list-style: none;
}
body {
  background-color: #071514;
  color: #edfafa;
}
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.main {
  margin-top: 20px;
  padding: 0 20px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 20px 0;
  min-height: 60px;
  padding: 10px;
  color: #edfafa;
}
.header .logo {
  font-family: "Open Sans";
  padding-left: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.header .logo a {
  color: mediumturquoise;
  font-size: 22px;
}
.header a,
.nav a {
  text-decoration: none;
  color: mediumturquoise;
  display: inline-block;
}
.nav {
  text-align: right;
  padding-right: 20px;
}
.nav a {
  margin: 0 5px 10px;
}
.nav a:last-child {
  margin-right: 0;
}
.nav a:hover,
.nav a.router-link-exact-active {
  color: #edfafa;
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  #app {
    padding: 0 10px;
  }
}

.seasons {
  display: flex;
}
.tabs {
  font-family: "Open Sans";
  flex-shrink: 0;
  border-right: 2px solid mediumturquoise;
  width: 200px;
  margin-top: 81px;
}

.tabs ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tabs li {
  display: block;
  cursor: pointer;
  padding: 8px 15px;
  margin: 0 5px;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 20px;
  background-color: #edfafa;
  color: #3a3a3a;
  font-weight: bold;
  border: 2px solid transparent;
}

.tabs li:hover {
  transform: translateY(1px);
}

.tabs li.active {
  color: mediumturquoise;
  border-color: mediumturquoise;
  background-color: transparent;
}
.cards {
  color: #3a3a3a;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 20px;
  margin-bottom: 40px;
}
.card {
  margin: 10px;
  cursor: pointer;
  flex-basis: 200px;
  background: #edfafa;
  border-radius: 5px;
}
.card-content {
  padding: 15px;
}
.card:hover {
  transform: translateY(-3px);
}
.cards.not-active .card:hover {
  transform: none;
  cursor: default;
}
.card-name {
  font-size: 18px;
  line-height: 1.2;
  font-weight: bold;
  margin-bottom: 15px;
}
.card-title {
  margin-bottom: 10px;
}
.card-caption {
  font-size: 15px;
  padding: 0 10px 0 0;
  font-weight: bold;
}
.card-list {
  display: block;
  padding: 5px 0 0 0;
}
.card-list-item {
  display: block;
  line-height: 1.5;
}

.card-with-photo .card-name {
  margin: 0;
}
.card-photo-container {
  width: 100%;
  padding-top: 125%;
  position: relative;
}
.card-photo {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.page-title,
.page-subtitle {
  text-align: center;
  font-family: "Open Sans";
}
.page-title h1,
.page-subtitle h2 {
  display: inline-block;
  font-weight: bold;
  line-height: 1.2;
  color: mediumturquoise;
  margin-bottom: 40px;
  font-size: 20px;
  padding: 0 10px;
}
.page-title h1::after,
.page-subtitle h2::after {
  content: "";
  display: block;
  background-color: mediumturquoise;
  height: 2px;
  margin-top: 5px;
}
.page-subtitle {
  font-size: 18px;
}
.page-subtitle h2 {
  margin-bottom: 30px;
}
.data-content {
  padding: 20px;
  border-radius: 5px;
  background-color: #edfafa;
  color: #3a3a3a;
}

@media screen and (max-width: 549px) {
  .tabs {
    width: auto;
    padding-right: 10px;
  }
  .cards {
    padding: 0;
  }
}
</style>
