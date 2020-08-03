import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import firebase from 'firebase';
import { registerModule } from 'vuex-smart-module';
import { user } from '@/store/modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    users: state => state.users
  },
  mutations: vuexfireMutations,
  actions: {
    vuexfireInit: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        'users',
        firebase.firestore().collection('users')
      );
    })
  }
});

registerModule(
  store, // store instance
  ['user'], // module path. can be string or array of string
  'user/', // namespace string which will be when put into the store
  user // module instance
);

export default store;
