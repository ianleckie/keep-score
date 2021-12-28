const KeepScoreElement = document.getElementById('keep-score')

let gamePlayersDefault = [
		{ name: '', score: 0, added: '', total: 0, turn: false },
		{ name: '', score: 0, added: '', total: 0, turn: false }
	]

const KeepScore = {
	
	data() {
		return {
			gamePlayers: gamePlayersDefault,
			placeholder: 'Player Name',
			starting: true,
			playing: false,
			ending: false,
		}
	},
	
	methods: {
		
		addPlayer() {
			
			this.gamePlayers.push( { name: '', score: 0, added: '', total: 0, turn: false } )
		
		},
		
		startGame() {

			let canStart = true;

			// don't start if there are any un-named players
			for ( gamePlayer of this.gamePlayers ) {
				if ( gamePlayer.name == '' ) canStart = false
			}

			if ( canStart ) {
			
				this.starting = false
				this.playing = true
				this.ending = false
				
				KeepScoreElement.className = ''
				KeepScoreElement.classList.add('playing')

				let listElements = document.getElementsByTagName('li')

				let listElement = listElements[0]

				listElement.classList.add('turn')

				this.pullFocus( listElement )

			} else {

				alert('Please give all players a name first.');

			}
		
		},

		pullFocus( element ) {

			for ( const child of element.children ) {

				if ( child.className == 'add' ) {

					child.children[0].focus()

				} 

			}

		},
		
		playerTurn( event ) {

			let listElement = event.target.closest('li')

			if ( listElement.className != 'turn' && this.playing ) {

				let listElement = event.target.closest('li')

				for ( const listItem of document.getElementsByTagName('li') ) {
					listItem.classList.remove('turn')
				}

				listElement.classList.add('turn')

				this.pullFocus( listElement )

				this.addScores()

			}

		},

		addScores() {

			// add scores that need to be added
			for ( gamePlayer of this.gamePlayers ) {
				
				if ( gamePlayer.total != 0 ) {
					
					gamePlayer.score = gamePlayer.total
					gamePlayer.total = 0
					gamePlayer.added = ''
				
				}
			
			}

		},
		
		endGame( event ) {

			this.starting = false
			this.playing = false
			this.ending = true

			this.addScores()

			this.gamePlayers.sort( (a, b) => b.score - a.score )

			KeepScoreElement.className = ''
			KeepScoreElement.classList.add('ending')

			let listElement = event.target.closest('li')

			for ( const listItem of document.getElementsByTagName('li') ) {
				listItem.classList.remove('turn')
			}

		},
		
		addScore( event ) {

			let playerId = event.target.nextSibling.value

			this.gamePlayers[playerId].total = Number(this.gamePlayers[playerId].score) + Number(this.gamePlayers[playerId].added)

		}
	
	},

}

Vue.createApp(KeepScore).mount('#keep-score')
