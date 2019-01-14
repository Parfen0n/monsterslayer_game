new Vue({
	el: "#app",
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;

			this.turns = [];
		},
		attack: function() {
			var damage = this.calculateDamage(3, 10);
			this.monsterHealth -= this.calculateDamage(3, 10);

			if(this.checkWin()) { 
				return;
			}

			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits Monster for ' + damage
			})

			this.monsterAttack();
		},
		specialAttack: function() {
			var damage = this.calculateDamage(10, 20);;
			this.monsterHealth -= this.calculateDamage(10, 20);

			if(this.checkWin()) { 
				return;
			}

			this.turns.unshift({
				isPlayer: true,
				text: 'Player use special attack to Monster for ' + damage
			})

			this.monsterAttack();
		},
		heal: function() {
			if (this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}

			this.turns.unshift({
				isPlayer: true,
				text: 'Player use heal for 10'
			})

			this.monsterAttack();
		},
		giveUp: function() {
			this.gameIsRunning = false;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		monsterAttack: function() {
			var damage = this.calculateDamage(5, 12);
			this.playerHealth -= this.calculateDamage(5, 12);
			
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster hits Player for ' + damage
			})

			this.checkWin();
		},
		calculateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function() {
			if(this.monsterHealth <= 0) {
				if(confirm("You Won! New Game?")) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if(this.playerHealth <= 0) {
				if(confirm("You Lost! New Game?")) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;

 		}
	}
})