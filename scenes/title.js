var Title = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Title' });
    },
    init: function() {},
    preload: function() {
      this.load.image('space1', './assets/space1.png');
      this.load.image('title', './assets/title.png');
      this.load.image('start', './assets/start.png');
    },
    create: function() {
      this.add.image(400, 300, 'space1');
      this.add.image(400, 200, 'title');

      var characterOpinions = {"alien1": null,
                               "astronaut1": null,
                               "lincoln1": null,
                               "marjot1": null,
                               "susan1": null,
                               "bort1": null};

      this.button = this.add.sprite(400, 400, 'start').setInteractive();
      this.button.on('pointerover', function(){this.button.setTint(0xf0ff00);}, this);
      this.button.on('pointerout', function(){this.button.setTint(0xffffff);}, this);
      this.button.on('pointerdown', function(){
        this.scene.start("Loading",{day:"Monday",
                                    time:new Date('August 19, 1975 09:00:00'),
                                    room:"conferenceRoom",
                                    opinions:characterOpinions});
      }, this);
    },
    update: function() {}
});
