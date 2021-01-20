import { ActionContext } from "vuex";
import gql from "graphql-tag";
import { SET_CURRENT_USER, SET_LOADING, SET_TOKEN } from "~/store/index";

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
  login(context: ActionContext<any, any>, credentials: any) {
    context.commit(SET_LOADING, true);
    try {
        /* const { login } = await this.app.apolloProvider.defaultClient.mutate({mutation: gql`mutation ($email: String!, $password: String!){
            login(email: $email, password: $password)
          }`, variables: credentials});
        await this.$apolloHelpers.onLogin(login); */
        context.commit(SET_CURRENT_USER, credentials.email);
      }finally {
      context.commit(SET_LOADING, false);
    }
  },
  logout(context: ActionContext<any, any>) {
    context.commit(SET_TOKEN, null);
  }
};
