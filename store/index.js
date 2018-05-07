import Vuex from 'vuex'

const bindUser = () => {
  return new Vuex.Store({
    state: {
      username: 'zubair.ejaz@gmail.com',
      userid: '',
      loggedIn: true,
      friends: []
    },
    mutations: {
      update (state, name) {
        state.username = name;
      },
      setID (state, id) {
        state.userid = id;
      },
      setLogin (state) {
        state.loggedIn = true;
      },
      setFriends (state, list) {
        state.friends = list;
      },
      unsetLogin (state) {
        state.loggedIn = false;
      }
    }
  })
}

export default bindUser