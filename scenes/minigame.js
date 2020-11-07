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
      this.load.image('mapIcon', './assets/mapIcon.png');
    },
    create: function() {

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        this.scene.start("Map",{day:this.day,time:this.time,room:this.room});
      }, this);
    },
    update: function() {}
});
