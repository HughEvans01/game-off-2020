var Loading = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Loading' });
    },
    init: function(data) {
      this.day = data.day;
      this.time = data.time;
      this.room = data.room;
    },
    preload: function() {},
    create: function() {

      this.add.text(200, 200, this.day, { fontSize: '100px', fill: '#ffffff' });
      this.add.text(300, 300, this.time, { fontSize: '60px', fill: '#ffffff' });

      setTimeout(() => {  this.scene.start("Room",{day:this.day,time:this.time,room:this.room}); }, 2000);

    },
    update: function() {}
});
