var Minigame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Minigame' });
    },
    init: function(data) {
      this.day = data.day;
      this.currentTime = data.time;
      this.room = data.room;
      this.characterOpinions = data.opinions;
      console.log("minigame",this.characterOpinions)
    },
    preload: function() {
      this.load.image('metalFloor', './assets/metalFloor.png');
      this.load.image('malletIcon', './assets/malletIcon.png');
      this.load.image('mugIcon', './assets/mugIcon.png');
      this.load.image('mapIcon', './assets/mapIcon.png');
      this.load.image('server', './assets/server.png');
      this.load.image('bug1', './assets/bug1.png');
      this.load.image('splat', './assets/splat.png');
    },
    create: function() {

      this.add.image(400, 300, 'metalFloor');
      this.add.image(400, 300, 'server');
      this.add.image(600,100, 'mugIcon');

      this.mallet = this.add.sprite(700, 300, 'malletIcon').setInteractive();
      this.mallet.on('pointerover', function(){this.mallet.setTint(0xff8f00);}, this)
      this.mallet.on('pointerout', function(){this.mallet.setTint(0xffffff);}, this)
      this.mallet.on('pointerdown', function(){
        this.startGame();
        this.mallet.visible = false;
      }, this);

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        if (this.currentTime.getHours() < 16) {
          this.scene.start("Map",{day:this.day,
                                  time:this.currentTime,
                                  room:this.room,
                                  opinions:this.characterOpinions});
        } else {
          this.scene.start("Credits",{opinions:this.characterOpinions});
        }
        this.currentTime.setHours( this.currentTime.getHours() + 2);
      }, this);
    },
    // Setup game timers and win conditions
    startGame: function() {
      this.map.visible = false;
      this.bugs = [];
      this.spawnTimer = this.time.addEvent({delay: 500,  callback: this.spawnBugs, callbackScope: this,  repeat: 32});
      this.gameTimer = this.time.delayedCall(16000, (func) => {
        this.spawnTimer.remove();
        this.map.visible = true;
      });
    },
    // Spawns clickable bugs
    spawnBugs: function() {
          var x = Phaser.Math.Between(50, 750);
          var y = Phaser.Math.Between(50, 550);
          var bugId = this.bugs.length + 1;
          var color = new Phaser.Display.Color(Phaser.Math.Between(0, 255),
                                               Phaser.Math.Between(0, 255),
                                               Phaser.Math.Between(0, 255));

          this.bugs[bugId] = this.add.sprite(x, y, 'bug1').setInteractive();
          this.bugs[bugId].on('pointerdown', function(){
            this.spawnTimer.delay=this.spawnTimer.delay-5;
            this.bugs[bugId].setTexture('splat').setTint(color.color);
            this.time.delayedCall(300, (a) => {this.bugs[bugId].destroy()});
          }, this);
    },
    update: function() {}
});
