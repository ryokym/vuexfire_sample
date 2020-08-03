import {
  Getters,
  Module,
  Mutations,
  Actions,
  createMapper
} from 'vuex-smart-module';

export class UserState {
  currentComponent = 'UserEmpty';
  currentUserRef = '';
}

class UserGetters extends Getters<UserState> {
  get getCurrentComponent() {
    return this.state.currentComponent;
  }
  get getCurrentUserRef() {
    return this.state.currentUserRef;
  }
}

class UserMutations extends Mutations<UserState> {
  setCurrentComponent(payload: string) {
    this.state.currentComponent = payload;
  }
  setCurrentUserRef(payload: string) {
    this.state.currentUserRef = payload;
  }
}

class UserActions extends Actions<
  UserState,
  UserGetters,
  UserMutations,
  UserActions
> {
  setCurrentComponent(payload: string) {
    this.commit('setCurrentComponent', payload);
  }
  setCurrentUserRef(payload: string) {
    this.commit('setCurrentUserRef', payload);
  }
}

export const user = new Module({
  namespaced: true,
  state: UserState,
  getters: UserGetters,
  mutations: UserMutations,
  actions: UserActions
});

export const userMapper = createMapper(user);
