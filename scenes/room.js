var Room = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Room' });
    },
    init: function() {},
    preload: function() {
      this.load.image('noon', './assets/noon.png');
      this.load.image('conferenceRoom', './assets/conferenceRoom.png');
      this.load.image('lincoln1', './assets/lincoln1.png');
      this.load.image('speechBubble1', './assets/speechBubble1.png');
      this.load.image('speechBubble2', './assets/speechBubble2.png');
      this.load.image('mapIcon', './assets/mapIcon.png');
    },
    create: function() {
      this.story = [{message:"Welcome to Moonshot Inc. I'm Lincoln Rust the CEO\nand owner. How was your journey in?",options:[{text:"My journey was fine, thanks.",link:1},{text:"I was attacked\nby a swarm of bees.",link:1}]},
                   {message:"Awesome. Would you like me to give you a quick rundown\nof your new role here?",options:[{text:"No [SKIP TUTORIAL]",link:-1},{text:"Sure",link:2}]},
                   {message:"We need the code for our new rocket debugged before\nthe launch test on Friday: that's where you come in.",options:[{text:"Got it",link:4},{text:"Bugs?",link:3}]},
                   {message:"Our server is full of bugs and we need you to hit all\nthose bugs with a mallet. Smush em' good.",options:[{text:"I don't think\nthat's how-",link:4},{text:"Bring it on",link:4}]},
                   {message:"You'll work from the admin building. It's marked on\nyour map. Oh and make sure you only travel by map.",options:[{text:"Okay",link:6},{text:"Travel by what?",link:5}]},
                   {message:'Some of our "interns" broke lose and overan the\ngrounds. Select a location on your map to travel there.',options:[{text:"Got it",link:6},{text:"Interns?",link:7}]},
                   {message:"Feel free to explore and meet your new colleagues\njust make sure you get that engine debugged by Friday!",options:[{text:"I won't let\nyou down!",link:-1},{text:"I'm still\nconfused",link:-1}]},
                   {message:"Ah that reminds me, stay out of the containment area\nin the R&D block. I don't want to replace another dev." ,options:[{text:"Replace another-",link:6},{text:"You didn't-",link:6}]},
                   {message:"Message2",options:[{text:"A",link:-1},{text:"B",link:-1}]}];

      this.messageText;
      this.optionText1;
      this.optionText2;

      this.storyIndex = 0;

      this.add.image(400, 300, 'noon');
      this.add.image(400, 300, 'conferenceRoom');
      this.add.image(400, 410, 'lincoln1');
      this.message = this.add.image(400, 50, 'speechBubble1');

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        this.nextDialogue(0);
      }, this);
      this.map.visible = false;

      this.option1 = this.add.sprite(200, 150, 'speechBubble2').setInteractive();
      this.option1.on('pointerover', function(){this.option1.setTint(0xff8f00);}, this)
      this.option1.on('pointerout', function(){this.option1.setTint(0xffffff);}, this)
      this.option1.on('pointerdown', function(){
        this.nextDialogue(0);
      }, this);

      this.option2 = this.add.sprite(600, 150, 'speechBubble2').setInteractive();
      this.option2.on('pointerover', function(){this.option2.setTint(0xff8f00);}, this)
      this.option2.on('pointerout', function(){this.option2.setTint(0xffffff);}, this)
      this.option2.on('pointerdown', function(){
        this.nextDialogue(1);
      }, this);

      this.messageText = this.add.text(16, 16, 'Hello world', { fontSize: '24px', fill: '#000' });
      this.optionText1 = this.add.text(16, 116, 'Hello world', { fontSize: '24px', fill: '#000' });
      this.optionText2 = this.add.text(416, 116, 'Hello world', { fontSize: '24px', fill: '#000' });
      this.messageText.setText(this.story[this.storyIndex].message);
      this.optionText1.setText(this.story[this.storyIndex].options[0].text);
      this.optionText2.setText(this.story[this.storyIndex].options[1].text);
    },
    update: function() {},
    nextDialogue: function(option) {
      var nextIndex = this.story[this.storyIndex].options[option].link;

      if (nextIndex >= 0) {
        // If there is a valid dialogue at the next index load it
        this.storyIndex = nextIndex;
        this.messageText.setText(this.story[this.storyIndex].message);
        this.optionText1.setText(this.story[this.storyIndex].options[0].text);
        this.optionText2.setText(this.story[this.storyIndex].options[1].text);
      } else {
        // If there is no valid dialogue at the next index end the conversation
        this.map.visible = true;
        this.message.visible = false;
        this.messageText.visible = false;
        this.option1.visible = false;
        this.optionText1.visible = false;
        this.option2.visible = false;
        this.optionText2.visible = false;

      }
    }
});
