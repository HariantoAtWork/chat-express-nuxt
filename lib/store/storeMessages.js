import Vue from 'vue'

const state = Vue.observable({
    messages: []
  }),
  methods = {
    onMessage(message) {
      state.messages.push(message)
    }
  }

export { state, methods }
