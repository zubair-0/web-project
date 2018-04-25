import Vuex from 'vuex'

const bindUser = () => {
  return new Vuex.Store({
    state: {
      username: 'zubair.ejaz@gmail.com',
      loggedIn: true,
    },
    mutations: {
      update (state, text) {
        state.username = text;
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