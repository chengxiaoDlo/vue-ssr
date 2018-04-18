import types from './type'

export default {
  [types.GET_USERS_LIST] (state, payload) {
    console.log(333, payload)
    state.userList = payload.data
  },
  [types.TOGGLE_LOADING] (state) {
    state.loading = !state.loading
  }
}