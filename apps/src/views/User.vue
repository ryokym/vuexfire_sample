<template>
  <div>
    <div class="header">
      <span @click="deleteAllUser()">delete all</span>
      <span @click="changeComponentToCreate()">
        create new
      </span>
    </div>
    <div class="wrapper">
      <div class="container">
        <UsersList />
        <keep-alive>
          <component :is="getCurrentComponent"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { functions } from '@/firebase';
import UsersList from '@/components/UsersList.vue';
import UserCreate from '@/components/UserCreate.vue';
import UserUpdate from '@/components/UserUpdate.vue';
import UserEmpty from '@/components/UserEmpty.vue';

import { mapGetters } from 'vuex';
import { userMapper } from '@/store/modules/user';

const Super = Vue.extend({
  computed: {
    ...mapGetters(['users']),
    ...userMapper.mapGetters(['getCurrentComponent'])
  },
  methods: {
    ...userMapper.mapActions(['setCurrentComponent', 'setCurrentUserRef'])
  }
});

@Component({
  components: {
    UsersList,
    UserCreate,
    UserUpdate,
    UserEmpty
  }
})
export default class User extends Super {
  username = '';
  componentName = 'UserEmpty';

  async changeComponentToCreate() {
    await this.setCurrentUserRef('');
    this.setCurrentComponent('UserCreate');
  }

  // useing CloudFunction
  async deleteAllUser() {
    this.setCurrentUserRef('');
    this.setCurrentComponent('UserEmpty');
    const func = functions.httpsCallable('deleteAllUser');
    return await func().catch(e => console.log(e));
  }

  created() {
    this.$store.dispatch('vuexfireInit');
  }
}
</script>
<style lang="scss" scoped>
$baseColor: #39495c;
.wrapper {
  display: flex;
}
::v-deep .container {
  display: flex;
  input {
    text-indent: 0.1rem;
    border: none;
    border-bottom: 1px solid lighten($baseColor, 20%);
    outline: none;
    &:focus {
      border-bottom: 1px solid $baseColor;
    }
  }
  input,
  label {
    display: block;
    margin: 16px 10px 16px 2px;
    padding: 0;
    height: 1rem;
    line-height: 1.2;
  }
  .button {
    display: inline-block;
    font-size: 0.9rem;
    color: $baseColor;
    border: 1px solid $baseColor;
    box-sizing: border-box;
    padding: 4px 8px;
    margin-top: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .form {
    display: flex;
    justify-content: center;
    width: 480px;
    .form-enter {
      input:nth-of-type(1) {
        width: 120px;
      }
      input:nth-of-type(2) {
        width: 40px;
      }
      input:nth-of-type(3) {
        width: 280px;
      }
    }
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  background-color: $baseColor;
  span {
    color: lighten($baseColor, 60%);
    font-size: 1.05rem;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      color: lighten($baseColor, 90%);
    }
  }
}
</style>
