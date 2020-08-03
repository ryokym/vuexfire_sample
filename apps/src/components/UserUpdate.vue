<template>
  <div class="form">
    <div>
      <label for="name">Name:</label>
      <label for="age">Age:</label>
      <label for="address">Address:</label>
      <span @click="updateUser" class="button">Update</span>
    </div>
    <div class="form-enter">
      <input id="name" type="text" v-model="userData.name" />
      <input id="age" type="number" v-model="userData.age" />
      <input id="address" type="text" v-model="userData.address" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { userMapper } from '@/store/modules/user';
import { IUser } from '@/types';
import { User } from '@/models/User';
import firebase from 'firebase';

const Super = Vue.extend({
  computed: {
    ...mapGetters(['users']),
    ...userMapper.mapGetters(['getCurrentUserRef'])
  }
});

@Component
export default class UserUpdate extends Super {
  userData = User;

  async setUserData() {
    if (this.getCurrentUserRef) {
      const userData = await this.users.find(
        (user: IUser) => user.id === this.getCurrentUserRef
      );
      this.userData = { ...userData };
    }
  }

  // using vuexfire
  async updateUser() {
    const doc = await firebase
      .firestore()
      .collection('users')
      .doc(this.getCurrentUserRef)
      .get();
    await doc.ref.update(this.userData);
  }

  @Watch('getCurrentUserRef', { immediate: true })
  onChangeCurrentUser() {
    if (this.getCurrentUserRef) {
      this.setUserData();
    }
  }
}
</script>
<style lang="scss" scoped></style>
