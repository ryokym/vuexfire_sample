<template>
  <div class="user-list">
    <li
      v-for="(user, index) in users"
      :key="index"
      @click="showUserInfo(user.id)"
    >
      {{ user.name }}
    </li>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { userMapper } from '@/store/modules/user';

const Super = Vue.extend({
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...userMapper.mapActions(['setCurrentComponent', 'setCurrentUserRef'])
  }
});
@Component
export default class UsersList extends Super {
  async showUserInfo(userid: string) {
    await this.setCurrentUserRef(userid);
    this.setCurrentComponent('UserUpdate');
  }
}
</script>
<style lang="scss" scoped>
$baseColor: #39495c;
.user-list {
  border-right: 1px solid $baseColor;
  height: 100vh;
  padding: 8px 24px;
  width: 160px;
  max-width: 160px;
}
li {
  list-style: none;
  font-size: 1.05rem;
  padding: 4px 0;

  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
