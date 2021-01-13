import { ActionContext } from "vuex";
import { SET_CURRENT_USER, SET_LOADING, SET_TOKEN } from "~/store/index";
import gql from "graphql-tag";

export const state = () => ({
  loading: false,
  token: null,
  currentUser: null,
});

export const getters = {
  loggedIn(state: any) {
    return !!state.token;
  },
};

export const mutations = {
  [SET_TOKEN](state: any, token: string) {
    state.token = token;
  },
  [SET_CURRENT_USER](state: any, user: string) {
    state.currentUser = user;
  },
  [SET_LOADING](state: any, loading: boolean) {
    state.loading = loading;
  },
};

export const actions = {
  async login(context: ActionContext<any, any>, credentials: any) {
    context.commit(SET_LOADING, true);
    try {
        context.commit(SET_CURRENT_USER, credentials.email);
      }finally {
      context.commit(SET_LOADING, false);
    }
  },
  logout(context: ActionContext<any, any>) {
    context.commit(SET_TOKEN, null);
  }
};
