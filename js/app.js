const KeepScore = {
	data() {
		return {
			gamePlayers: [
				{ name: '', score: 0 },
				{ name: '', score: 0 }
			],
			starting: true,
			playing: false,
			ending: false,
		}
	},
	methods: {
		addPlayer() {
			this.gamePlayers.push( { name: '', score: 0 } )
		},
		startGame() {
			this.starting = false
			this.playing = true
		}
	},
}

Vue.createApp(KeepScore).mount('#keep-score')