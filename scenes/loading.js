var Loading = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Loading' });
    },
    init: function(data) {
      this.currentTime = data.time;
      this.room = data.room;
      this.characterOpinions = data.opinions;
      this.rocketProgress=data.progress;
    },
    preload: function() {},
    create: function() {

      var timeText = this.currentTime.toTimeString().slice(0,5);

      const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
      var day = days[this.currentTime.getDay()];

      this.add.text(400, 200, day, { fontSize: '100px', fill: '#ffffff' }).setOrigin(0.5);
      this.add.text(300, 300, timeText , { fontSize: '60px', fill: '#ffffff' });

      // Switch to minigame scene if the server room is visted
      if (this.room === 'serverRoom') {
          this.time.delayedCall(2000, (func) => {
            this.scene.start("Minigame",{time:this.currentTime,
                                         room:this.room,
                                         opinions:this.characterOpinions,
                                         progress:this.rocketProgress})});
      // Otherwise switch to the room scene
      } else {
          this.time.delayedCall(2000, (func) => {
            this.scene.start("Room",{time:this.currentTime,
                                     room:this.room,
                                     opinions:this.characterOpinions,
                                     progress:this.rocketProgress})});
      }
    },
    update: function() {}
});
