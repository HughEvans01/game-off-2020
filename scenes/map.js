var Map = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Map' });
    },
    init: function(data) {
      this.day = data.day;
      this.time = data.time;
      this.room = data.room;
      this.characterOpinions = data.opinions;
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

      this.rooms = {}; //Store references to room buttons on map
    },
    create: function() {
      this.add.image(400, 300, 'mapScreen');

      this.createButton(127,390,'boxIcon',this.day,this.time,'storageRoom')
      this.createButton(567,198,'ceoIcon',this.day,this.time,'conferenceRoom')
      this.createButton(140,120,'labIcon',this.day,this.time,'labRoom')
      this.createButton(155,222,'scpIcon',this.day,this.time,'containment')
      this.createButton(340,150,'telescopeIcon',this.day,this.time,'observatory')
      this.createButton(255,435,'workshopIcon',this.day,this.time,'workshop')
      this.createButton(667,196,'serversIcon',this.day,this.time,'serverRoom')

    },
    createButton(x,y,icon,day,time,nextRoom) {
      if (this.room===nextRoom) {
        this.rooms[nextRoom] = this.add.sprite(x, y, 'hereIcon').setInteractive();
      } else {
        if (nextRoom === 'serverRoom') {
          /* Server room button links to a different scene to the rest so
          I implmented it differently, yes I know it is ugly */
          this.serverRoom = this.add.sprite(667,196,'serversIcon').setInteractive();
          this.serverRoom.on('pointerover', function(){this.serverRoom.setTint(0xff8f00);}, this)
          this.serverRoom.on('pointerout', function(){this.serverRoom.setTint(0xffffff);}, this)
          this.serverRoom.on('pointerdown', function(){
            this.scene.start("Loading",{day:this.day,time:this.time,room:"serverRoom",opinions:this.characterOpinions});
          }, this);
        } else {
          this.rooms[nextRoom] = this.add.sprite(x, y, icon).setInteractive();
          this.rooms[nextRoom].on('pointerover', function(){this.rooms[nextRoom].setTint(0xff8f00);}, this)
          this.rooms[nextRoom].on('pointerout', function(){this.rooms[nextRoom].setTint(0xffffff);}, this)
          this.rooms[nextRoom].on('pointerdown', function(){
            this.scene.start("Loading",{day:day,time:time,room:nextRoom,opinions:this.characterOpinions});
          }, this);
        }
      }
    },
    update: function() {}
});
