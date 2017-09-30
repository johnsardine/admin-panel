<template>
  <div id="app" class="App">
    <header class="AppHeader">
      <div class="AppHeader__brand">Admin Panel</div>
      <div class="AppHeader__navigation">
        <ul class="NavBar">
          <li v-for="route in routerMenuItems" class="NavBar__item">
            <router-link :to="route" class="NavBar__cell">{{ route.name }}</router-link>
          </li>

          <li class="NavBar__item">
            <a href="#" class="NavBar__cell">Has children</a>
            <ul class="NavBar__panel">
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Another one</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </li>

          <li class="NavBar__item">
            <a href="#" class="NavBar__cell">Has Mega</a>
            <div class="NavBar__panel">
              <p>Anything</p>
            </div>
          </li>

          <li class="NavBar__item"><div class="NavBar__cell App__version">v0.1.0</div></li>
        </ul>
      </div>
    </header>
    <div class="AppContainer">
      <div class="AppNavigation">
        <div class="AppNavigation__header">
          Welcome, Human!
        </div>
        <div class="ComponentScroll AppNavigation__main">
          <ul class="NavCol">
            <li v-for="route in routerMenuItems" class="NavCol__item">
              <router-link :to="route" class="NavCol__cell">{{ route.name }}</router-link>
            </li>

            <li class="NavCol__item">
              <a href="#" class="NavCol__cell">Has children</a>
              <ul class="NavCol__panel">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Another one</a></li>
                <li><router-link :to="{ name: 'About'}">About</router-link></li>
              </ul>
            </li>

            <li class="NavCol__item">
              <a href="#" class="NavCol__cell">Has Mega</a>
              <div class="NavCol__panel">
                <p>Anything</p>
              </div>
            </li>

            <li class="NavCol__item"><div class="NavCol__cell App__version">v0.1.0</div></li>
          </ul>
        </div>
        <div class="AppNavigation__footer">
          Footer
        </div>
      </div>
      <main class="AppMain">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'app',
  computed: {
    routerMenuItems() {
      const {
        routes,
      } = router.options;
      return routes
      .filter((route) => {
        const {
          ignoreInMenu,
        } = route.meta || {};
        return (!ignoreInMenu);
      })
      .map((route) => {
        const {
          name,
        } = route;
        return {
          name,
        };
      });
    },
  },
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
html,
body,
#app,
.AppContainer,
.AppMain {
  height: 100%;
}
body {
  margin: 0;
  font-size: 16px;
  font-family: Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

$sidebarWidth: 200px;
$headerHeight: 40px;

// Element inside App Header and Navbar
%NavBar__cell {
  padding: 8px 10px;
}

.NoScriptMessage {
  padding: 50px;
  max-width: 600px;
  margin: 40px auto;
  background-color: #405db5;
  color: rgba(255, 255, 255, 0.9);

  a {
    color: currentColor;
  }
}

.App {
  &__version {
    color: rgba(255, 255, 255, 0.5);
  }
}

.AppHeader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  color: #fff;
  background-color: #405db5;
  padding: 3px 0;

  & {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__brand {
    @extend %NavBar__cell;
  }
  &__navigation {}

  // Override NavBar Color
  .NavBar__panel {
  }
}

// Header Text Style
.AppHeader {
  &__brand,
  .NavBar__cell {
    line-height: 18px;
    font-size: 14px;
    font-weight: bold;
  }
}

.AppContainer {
  padding-left: $sidebarWidth;
}

.AppNavigation {
  position: fixed;
  top: $headerHeight;
  left: 0;
  bottom: 0;
  width: $sidebarWidth;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  color: #dbe2ea;
  background-color: #21283e;
  font-size: 16px;
  line-height: 1.3em;

  &__header,
  &__footer,
  &__main {
  }

  &__header,
  &__footer {
    font-size: 14px;
    padding: 5px 8px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__header {
    $spacingY: 15px;
    padding-top: $spacingY;
    padding-bottom: $spacingY;
  }

  &__main {
    flex-grow: 1;
  }
}

.AppMain {
  padding-top: $headerHeight;
  // overflow: hidden; // Force margin collapse

  $spacingY: 40px;
  &__view {
    margin-left: $spacingY;
    margin-right: $spacingY;
  }
}

.NavBar {
  $s: &; // Store scope selector
  display: flex;
  flex-direction: row;

  & {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &__item {
    position: relative;
    margin-left: 5px;

    &::first-child {
      margin-left: 0;
    }
  }

  &__cell {
    @extend %NavBar__cell;
    border-radius: 2px;
    transition: 0.2s ease;
    transition-property: color, background-color;

    // Links only
    @at-root a#{&} {
      display: inline-block;
      color: currentColor;
      text-decoration: none;
    }
  }

  &__cell {
    // Reads: When Cell is child of Hover Item and an A element
    // Reads: .NavBar__item:hover a.NavBar__cell
    @at-root #{$s}__item:hover a#{&} {
      color: inherit;
      background-color: rgba(255, 255, 255, 0.1);
    }
    @at-root #{$s}__item:hover a#{&}.router-link-active,
    &.router-link-active {
      color: rgba(0, 0, 0, 0.8);
      background-color: rgba(255, 255, 255, 0.9);
    }
  }

  &__panel {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;

    // Is list overrides
    @at-root ul#{&} {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    color: #333;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);

    // Positioning Details
    @at-root ul#{&},
    & {}
  }

  // Open Panel
  &__item:hover > &__panel {
    // display: block;
  }
}

.NavCol {
  $s: &; // Store scope selector
  display: flex;
  flex-direction: column;

  & {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &__item {
    position: relative;
  }

  &__cell {
    @extend %NavBar__cell;
    transition: 0.2s ease;
    transition-property: color, background-color;

    // Links only
    @at-root a#{&} {
      display: block;
      color: currentColor;
      text-decoration: none;
    }
  }

  &__cell {
    // Reads: When Cell is child of Hover Item and an A element
    // Reads: .NavBar__item:hover a.NavBar__cell
    @at-root #{$s}__item:hover a#{&} {
      // text-decoration: underline;
      color: inherit;
      background-color: rgba(255, 255, 255, 0.1);
    }
    @at-root #{$s}__item:hover a#{&}.router-link-active,
    &.router-link-active {
      color: rgba(0, 0, 0, 0.8);
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  &__panel {
    display: none;
    overflow: hidden;
    padding: 0 10px;
    background-color: rgba(255, 255, 255, 0.1);
  }
}

// Component with content scroll
.ComponentScroll {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
