import Vuex from 'vuex'

const bindUser = () => {
  return new Vuex.Store({
    state: {
      username: '',
      userid: '',
      loggedIn: true,
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
      unsetLogin (state) {
        state.loggedIn = false;
      }
    }
  })
}

export default bindUser