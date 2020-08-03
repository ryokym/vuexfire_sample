<template>
  <div id="app">
    <User />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import 'normalize.css';
import User from '@/views/User.vue';

@Component({
  components: {
    User
  }
})
export default class App extends Vue {}
</script>

<style>
body {
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: 'palt';
}
</style>
