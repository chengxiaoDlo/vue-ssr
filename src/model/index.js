import REST from '@/utils/rest'

class Users extends REST {
  constructor () {
    super()
    this.baseURL = 'http://127.0.0.1:8989/api'
    this.path = 'users/list'
  }
}

class UserList extends REST {
  constructor () {
    super()
    this.baseURL = '/api'
    this.path = 'users'
  }
}

class Location extends REST {
  constructor () {
    super()
    this.baseURL = 'http://10.106.157.173:3000'
    this.path = 'location'
  }
}

export { Users, UserList, Location }
