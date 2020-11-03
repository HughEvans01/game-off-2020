var Intro = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "Intro" });
    },
    init: function() {},
    preload: function() {
      this.load.image('noon', '/../assets/noon.png');
      this.load.image('conferenceRoom', '/../assets/conferenceRoom.png');
      this.load.image('lincoln1', '/../assets/lincoln1.png');
      this.load.image('speechBubble1', '/../assets/speechBubble1.png');
      this.load.image('speechBubble2', '/../assets/speechBubble2.png');
    },
    create: function() {
      this.add.image(400, 300, 'noon');
      this.add.image(400, 300, 'conferenceRoom');
      this.add.image(400, 410, 'lincoln1');
      this.add.image(400, 50, 'speechBubble1');
      this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    },
    update: function() {}
});
