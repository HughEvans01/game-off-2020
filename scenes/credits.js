var Credits = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Credits' });
    },
    init: function(data) {
      this.characterOpinions=data.opinions;
      this.rocketProgress=data.progress;
    },
    preload: function() {
      this.load.image('wedding', './assets/weddingCredit.png');
      this.load.image('family', './assets/familyCredit.png');
      this.load.image('grave1', './assets/grave1.png');
      this.load.image('launchPad', './assets/launchPad.png');
      this.load.image('mushroomCloud', './assets/mushroomCloud.png');
      this.load.image('space', './assets/space1.png');
      this.load.image('rocket1', './assets/rocket1.png');
      this.load.image('rocket2', './assets/rocket2.png');

      this.load.image('retryButton', './assets/retryButton.png');

      this.load.image('alien', './assets/alienHead.png');
      this.load.image('babyAlien', './assets/babyAlienHead.png');
      this.load.image('lincoln', './assets/lincolnHead.png');
      this.load.image('bort', './assets/bortHead.png');
      this.load.image('susan', './assets/susanHead.png');
      this.load.image('marjot', './assets/marjotHead.png');
      this.load.image('player', './assets/playerHead.png');

      this.load.audio('clickSound','./assets/sounds/click.m4a');
      this.load.audio('countdownSound','./assets/sounds/countdown.mp3');
      this.load.audio('explosionSound','./assets/sounds/explosion.wav');
      this.load.audio('hooraySound','./assets/sounds/hooray.wav');
      this.load.audio('music1','./assets/sounds/music1.wav');
    },
    create: function() {

      /* Need to add an edge case for when no charcters like player */

      var characters = Object.keys(this.characterOpinions);
      var opinions = Object.values(this.characterOpinions);

      var partner = {name: "", opinion: 0};

      for (var i = 0; i < characters.length; i++) {
        var opinion = opinions[i];
        if (opinion) { // Check if opinion is null i.e. have they met
          if (opinion > partner.opinion) {
            partner.name = characters[i];
            partner.opinion = opinion;
          }
        }
      }

      // ROCKET LAUNCH
      this.add.image(400, 300, 'launchPad');
      this.rocket = this.add.image(400, 310, 'rocket2');
      // COUNT DOWN
      this.sound.play('countdownSound');
      var count = 10;
      this.countdown = this.add.text(400, 300, count, { fontSize: '450px', fill: '#000000' }).setOrigin(0.5);
      this.spawnTimer = this.time.addEvent({delay: 1000,  callback: (func) => {
        this.countdown.setText(count);
        count--;
      }, callbackScope: this,  repeat: 10});
      // ROCKET BLOWS UP
      if (this.rocketProgress < 5) {
        this.time.delayedCall(13000, (func) => {
          this.sound.play('explosionSound');
          this.countdown.visible=false;
          this.add.image(400, 300, 'launchPad');
          this.add.image(400, 310, 'mushroomCloud');
          partner.name = "";
        });
      } else {
        //ROCKET LAUNCHES
        this.time.delayedCall(13000, (func) => {
          this.sound.play('hooraySound');
          this.countdown.visible=false;
          this.add.image(400, 300, 'space1');
          this.add.image(400, 300, 'rocket1');
        });
      }

      //FINAL ENDING
      //BAD ENDING
      if (partner.name === "") {
        this.time.delayedCall(20000, (func) => {
          this.add.image(400, 300, 'grave1');
        });
      } else {
        // GOOD ENDING
        this.time.delayedCall(20000, (func) => {
          this.sound.play('music1');
          this.add.image(400, 300, 'wedding');
          this.add.image(320, 270, partner.name); // Bride
          this.add.image(440, 230, 'player'); // Groom
        });


        this.time.delayedCall(25000, (func) => {
          this.add.image(400, 300, 'family');
          this.add.image(260, 230, partner.name); // Mother
          this.add.image(520, 230, 'player'); // Father
          if (partner.name === 'alien') {
            this.add.image(425, 230, 'babyAlien');
          }
        });
      }

      // Add a "The end ?" bit after this
      this.time.delayedCall(25500, (func) => {
        this.retry = this.add.sprite(760,560,'retryButton').setInteractive();
        this.retry.on('pointerover', function(){
          this.retry.setTint(0xff8f00);}, this)

        this.retry.on('pointerout', function(){
          this.retry.setTint(0xffffff);}, this)

        var characterOpinions = {"alien": null,
                                 "astronaut": null,
                                 "lincoln": null,
                                 "marjot": null,
                                 "susan": null,
                                 "bort": null};

        this.retry.on('pointerdown', function(){
          this.sound.play('clickSound');
          this.scene.start("Loading",{time:new Date('August 17, 1975 09:00:00'),
                                      room:"conferenceRoom",
                                      opinions:characterOpinions,
                                      progress:0});}, this)
      });
    },
    update: function() {}
});
