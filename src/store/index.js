import { createStore } from "vuex";

export default createStore({
  state: {
    cartItems: []
  },
  mutations: {
    updateCartItems(state, newItems) {
      state.cartItems = newItems
    }
  },
  actions: {},
  modules: {},
});
