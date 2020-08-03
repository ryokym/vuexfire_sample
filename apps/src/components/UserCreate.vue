<template>
  <div class="form">
    <div>
      <label for="name">Name:</label>
      <label for="age">Age:</label>
      <label for="address">Address:</label>
      <span @click="addUser" class="button">Create</span>
    </div>
    <div class="form-enter">
      <input id="name" type="text" v-model="userData.name" />
      <input id="age" type="number" v-model="userData.age" />
      <input id="address" type="text" v-model="userData.address" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { functions } from '@/firebase';
import { User } from '@/models/User';

@Component
export default class UserCreate extends Vue {
  userData = User;

  // using CloudFunction
  async addUser() {
    if (this.userData.name) {
      const func = functions.httpsCallable('addUser');
      await func(this.userData).catch(e => console.log(e));
      this.userData = {};
    }
  }
}
</script>
<style lang="scss" scoped></style>
