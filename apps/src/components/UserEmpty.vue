<template>
  <div class="empty">
    <p>The user is not selected...</p>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Users extends Vue {}
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  justify-content: center;
  width: 280px;
  padding-bottom: 16px;
  p {
    margin-top: 16px;
  }
}
</style>
