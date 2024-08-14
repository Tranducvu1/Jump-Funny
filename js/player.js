game.player = {
	x: 54,
	y: 0,
	height: 24,
	highestY: 0,
	direction: "left",
	isInAir: false,
	startedJump: false,
	moveInterval: null,
	canDoubleJump: false,
	doubleJumpTimeout: null,
	fallTimeout: function(startingY, time, maxHeight) {
	    setTimeout(function () {
		  if (this.isInAir) {
			this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
			if (this.y < this.highestY) {
			    this.highestY = this.y
			}
			if (time > 37) {
			    this.startedJump = false
			    game.checkCollisions()
			}
			if (time < 150) {
			    time++
			    this.fallTimeout(startingY, time, maxHeight)
			} else {
			    game.isOver = true
			}
			if (this.y > 40) {
			    game.isOver = true
			}
			game.requestRedraw()
		  }
	    }.bind(this, startingY, time, maxHeight), 12)
	},
	animationFrameNumber: 0,
	collidesWithGround: true,
	animations: {
	    left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
	    right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
	},
	jump: function (type) {
	    if (!this.isInAir || this.canDoubleJump) {
		  clearInterval(this.fallInterval)
		  game.sounds.jump.play()
		  this.isInAir = true
		  this.startedJump = true
		  var startingY = this.y
		  var time = 1
		  var maxHeight = 121
  
		  if (type == "fall") {
			time = 30
			maxHeight = 0
		  } else if (this.canDoubleJump) {
			maxHeight = 80 // descrease double jump
			this.canDoubleJump = false
		  } else {
			this.canDoubleJump = true
			clearTimeout(this.doubleJumpTimeout)
			this.doubleJumpTimeout = setTimeout(() => {
			    this.canDoubleJump = false
			}, 300) // set internal time (300ms)
		  }
  
		  this.fallTimeout(startingY, time, maxHeight)
	    }
	}
  }