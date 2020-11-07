var Map = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Map' });
    },
    init: function(data) {
      this.currentRoom = data.currentRoom;
      this.character= data.character;
    },
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

      this.rooms = {};
    },
    create: function() {
      this.add.image(400, 300, 'mapScreen');

      this.createButton(127,390,'boxIcon','storageRoom','bort1',0)
      this.createButton(567,198,'ceoIcon','conferenceRoom','lincoln1',0)
      this.createButton(140,120,'labIcon','labRoom','marjot1',0)
      this.createButton(155,222,'scpIcon','containment','alien1',0)
      this.createButton(340,150,'telescopeIcon','observatory','astronaut1',0)
      this.createButton(255,435,'workshopIcon','workshop','susan1',0)
      this.createButton(667,196,'serversIcon','serverRoom','foo',0) //This will need to change when I add the debugging game

    },
    createButton(x,y,icon,room,character,link) {
      if (this.currentRoom===room) {
        this.rooms[room] = this.add.sprite(x, y, 'hereIcon').setInteractive();
      } else {
        this.rooms[room] = this.add.sprite(x, y, icon).setInteractive();
        this.rooms[room].on('pointerover', function(){this.rooms[room].setTint(0xff8f00);}, this)
        this.rooms[room].on('pointerout', function(){this.rooms[room].setTint(0xffffff);}, this)
        this.rooms[room].on('pointerdown', function(){
          this.scene.start("Room",{"currentRoom": room,"character":character,"link":link});
        }, this);
      }
    },
    update: function() {}
});
