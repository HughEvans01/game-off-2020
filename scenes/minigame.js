var Minigame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Minigame' });
    },
    init: function(data) {
      this.day = data.day;
      this.time = data.time;
      this.room = data.room;
    },
    preload: function() {
      this.load.image('metalFloor', './assets/metalFloor.png');
      this.load.image('malletIcon', './assets/malletIcon.png');
      this.load.image('mugIcon', './assets/mugIcon.png');
      this.load.image('mapIcon', './assets/mapIcon.png');
      this.load.image('server', './assets/server.png');
    },
    create: function() {
      this.add.image(400, 300, 'metalFloor');
      this.add.image(400, 300, 'server');
      this.add.image(600,100, 'mugIcon');

      this.mallet = this.add.sprite(700, 300, 'malletIcon').setInteractive();
      this.mallet.on('pointerover', function(){this.mallet.setTint(0xff8f00);}, this)
      this.mallet.on('pointerout', function(){this.mallet.setTint(0xffffff);}, this)
      this.mallet.on('pointerdown', function(){
        console.log("Game start")
      }, this);

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        this.scene.start("Map",{day:this.day,time:this.time,room:this.room});
      }, this);
    },
    update: function() {}
});
