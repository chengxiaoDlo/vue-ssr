import types from './type'
import * as model from '../model'

export default {
  getUserList ({commit}, {params}) {
    return new model.Users().GET({params})
      .then((res) => {
        commit(types.GET_USERS_LIST, {
          data: res.data
        })
      })
  }
}