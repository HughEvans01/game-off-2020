var Map = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Map' });
    },
    init: function() {},
    preload: function() {
      this.load.image('mapScreen', './assets/mapScreen.png');
      this.load.image('boxIcon', './assets/boxIcon.png');
      this.load.image('ceoIcon', './assets/ceoIcon.png');
      this.load.image('hereIcon', './assets/hereIcon.png');
      this.load.image('labIcon', './assets/labIcon.png');
      this.load.image('scpIcon', './assets/scpIcon.png');
      this.load.image('serversIcon', './assets/serversIcon.png');
      this.load.image('telescopeIcon', './assets/telescopeIcon.png');
      this.load.image('workshopIcon', './assets/workshopIcon.png');
    },
    create: function() {
      this.add.image(400, 300, 'mapScreen');

      this.storageRoom = this.add.sprite(127, 390, 'boxIcon').setInteractive();
      this.storageRoom.on('pointerover', function(){this.storageRoom.setTint(0xff8f00);}, this)
      this.storageRoom.on('pointerout', function(){this.storageRoom.setTint(0xffffff);}, this)
      this.storageRoom.on('pointerdown', function(){

      }, this);

      this.ceoRoom = this.add.sprite(567, 198, 'hereIcon').setInteractive();
      this.ceoRoom.on('pointerover', function(){this.ceoRoom.setTint(0xff8f00);}, this)
      this.ceoRoom.on('pointerout', function(){this.ceoRoom.setTint(0xffffff);}, this)
      this.ceoRoom.on('pointerdown', function(){

      }, this);

      this.labRoom = this.add.sprite(140, 120, 'labIcon').setInteractive();
      this.labRoom.on('pointerover', function(){this.labRoom.setTint(0xff8f00);}, this)
      this.labRoom.on('pointerout', function(){this.labRoom.setTint(0xffffff);}, this)
      this.labRoom.on('pointerdown', function(){

      }, this);

      this.containment = this.add.sprite(155, 222, 'scpIcon').setInteractive();
      this.containment.on('pointerover', function(){this.containment.setTint(0xff8f00);}, this)
      this.containment.on('pointerout', function(){this.containment.setTint(0xffffff);}, this)
      this.containment.on('pointerdown', function(){

      }, this);

      this.observatory = this.add.sprite(340, 150, 'telescopeIcon').setInteractive();
      this.observatory.on('pointerover', function(){this.observatory.setTint(0xff8f00);}, this)
      this.observatory.on('pointerout', function(){this.observatory.setTint(0xffffff);}, this)
      this.observatory.on('pointerdown', function(){

      }, this);

      this.workshop = this.add.sprite(255, 435, 'workshopIcon').setInteractive();
      this.workshop.on('pointerover', function(){this.workshop.setTint(0xff8f00);}, this)
      this.workshop.on('pointerout', function(){this.workshop.setTint(0xffffff);}, this)
      this.workshop.on('pointerdown', function(){

      }, this);

      this.serverRoom = this.add.sprite(667, 196, 'serversIcon').setInteractive();
      this.serverRoom.on('pointerover', function(){this.serverRoom.setTint(0xff8f00);}, this)
      this.serverRoom.on('pointerout', function(){this.serverRoom.setTint(0xffffff);}, this)
      this.serverRoom.on('pointerdown', function(){

      }, this);
    },
    update: function() {}
});
