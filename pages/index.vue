<template>
  <div class="app-tpl">
    <h1>{{title}}</h1>
    <input v-model="formData.message" placeholder="Message" />
    <div>
      <button @click="onEmit">Emit Message</button>
      <button @click="onPost">Post Message</button>
    </div>
    <ul class="messages">
      <li v-for="msg in messages">
        <pre v-text="msg" />
      </li>
    </ul>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { state, methods } from '~/lib/store/storeMessages'
import axios from 'axios'
const post = (url, data) => axios.post(url, data).then(({ data }) => data)

let socket

export default {
	head() {
		return {
			script: [{ src: '/socket.io/socket.io.js' }]
		}
	},
	components: {
		Logo
	},
	data: () => ({
		title: 'Chat Nuxt App',
		formData: {
			message: ''
		}
	}),
	computed: {
		messages() {
			return state.messages
		}
	},
	methods: {
		onEmit() {
			const { formData } = this
			socket.emit('chat-message', formData.message)
			console.log('onEmit:', formData.message, socket.id)
			formData.message = ''
		},
		onPost() {
			const { formData } = this,
				url = '/api/message'
			console.log('onPost:', formData.message)
			post(url, {
				id: socket.id,
				message: formData.message
			})
				.then(console.log.bind(console, 'RESPONSE:'))
				.catch(console.error.bind(console, 'FAIL - onPost:'))
			formData.message = ''
		}
	},
	// Life Cycle Hooks
	mounted() {
		socket = io()
		socket.on('chat-message', methods.onMessage)
	}
}
</script>

<style lang="scss">
body {
	margin: 0;
	padding: 0;
}

.app-tpl {
	height: calc(100vh);
	overflow-y: auto;
	overflow-x: hidden;
	background-color: rgb(248, 239, 201);
}

.messages {
	list-style: none;
	margin: 0;
	padding: 0;

	li {
		&:nth-child(odd) {
			background-color: yellow;
		}
	}
}
</style>