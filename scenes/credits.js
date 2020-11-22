var Credits = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Credits' });
    },
    init: function(data) {
      this.characterOpinions=data.opinions;
      console.log("credits",this.characterOpinions)
    },
    preload: function() {
      this.load.image('title', './assets/title.png');
    },
    create: function() {
      this.add.image(400, 200, 'title');
      this.add.text(270, 250, 'End of alpha', { fontSize: '32px', fill: '#ffffff' });
      console.log(this.characterOpinions);
    },
    update: function() {}
});
