var Room = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Room' });
    },
    init: function(data) {
      this.day = data.day;
      this.time = data.time;
      this.room = data.room;
    },
    preload: function() {
      this.load.image('noon', './assets/noon.png');

      this.load.image('conferenceRoom', './assets/conferenceRoom.png');
      this.load.image('storageRoom', './assets/storageRoom.png');
      this.load.image('labRoom', './assets/labRoom.png');
      this.load.image('containment', './assets/containment.png');
      this.load.image('observatory', './assets/observatory.png');
      this.load.image('workshop', './assets/workshop.png');

      this.load.image('lincoln1', './assets/lincoln1.png');
      this.load.image('bort1', './assets/bort1.png');
      this.load.image('alien1', './assets/alien1.png');
      this.load.image('susan1', './assets/susan1.png');
      this.load.image('marjot1', './assets/marjot1.png');
      this.load.image('astronaut1', './assets/astronaut1.png');

      this.load.image('speechBubble1', './assets/speechBubble1.png');
      this.load.image('speechBubble2', './assets/speechBubble2.png');

      this.load.image('mapIcon', './assets/mapIcon.png');
      this.load.image('clock', './assets/clock.png');
    },
    create: function() {
      this.story = {"monday":{"09:00":{
                    "conferenceRoom":{character:"lincoln1",dialogue:[{message:"Welcome to Moonshot Inc. I'm Lincoln Rust the CEO\nand owner. How was your journey in?",options:[{text:"My journey was fine, thanks.",link:1},{text:"I was attacked\nby a swarm of bees.",link:1}]},
                                                                     {message:"Awesome. Would you like me to give you a quick rundown\nof your new role here?",options:[{text:"No [SKIP TUTORIAL]",link:-1},{text:"Sure",link:2}]},
                                                                     {message:"We need the code for our new rocket debugged before\nthe launch test on Friday: that's where you come in.",options:[{text:"Got it",link:4},{text:"Bugs?",link:3}]},
                                                                     {message:"Our server is full of bugs and we need you to hit all\nthose bugs with a mallet. Smush em' good.",options:[{text:"I don't think\nthat's how-",link:4},{text:"Bring it on",link:4}]},
                                                                     {message:"You'll work from the admin building. It's marked on\nyour map. Oh and make sure you only travel by map.",options:[{text:"Okay",link:6},{text:"Travel by what?",link:5}]},
                                                                     {message:'Some of our "interns" broke lose and overan the\ngrounds. Select a location on your map to travel there.',options:[{text:"Got it",link:6},{text:"Interns?",link:7}]},
                                                                     {message:"Feel free to explore and meet your new colleagues\njust make sure you get that engine debugged by Friday!",options:[{text:"I won't let\nyou down!",link:-1},{text:"I'm still\nconfused",link:-1}]},
                                                                     {message:"Ah that reminds me, stay out of the containment area\nin the R&D block. I don't want to replace another dev." ,options:[{text:"Replace another-",link:6},{text:"You didn't-",link:6}]}]},
                    "storageRoom":{character:"bort1",dialogue:[{message:"Muh?",options:[{text:"Hur",link:-1},{text:"Dur",link:-1}]}]},
                    "labRoom":{character:"marjot1",dialogue:[{message:"Muh?",options:[{text:"Hur",link:-1},{text:"Dur",link:-1}]}]},
                    "workshop":{character:"susan1",dialogue:[{message:"Muh?",options:[{text:"Hur",link:-1},{text:"Dur",link:-1}]}]},
                    "containment":{character:"alien1",dialogue:[{message:"Muh?",options:[{text:"Hur",link:-1},{text:"Dur",link:-1}]}]},
                    "observatory":{character:"astronaut1",dialogue:[{message:"Muh?",options:[{text:"Hur",link:-1},{text:"Dur",link:-1}]}]}
                 }}};

      this.messageText;
      this.optionText1;
      this.optionText2;

      this.dialogue = this.story[this.day][this.time][this.room].dialogue;
      this.character = this.story[this.day][this.time][this.room].character;
      this.storyIndex = 0;

      this.add.image(400, 300, 'noon');
      this.add.image(400, 300, this.room);
      this.add.image(400, 425, this.character);

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        this.scene.start("Map",{day:"monday",time:"09:00",room:this.room});
      }, this);
      this.map.visible = false;

      this.message = this.add.image(400, 50, 'speechBubble1');

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
      this.messageText.setText(this.dialogue[this.storyIndex].message);
      this.optionText1.setText(this.dialogue[this.storyIndex].options[0].text);
      this.optionText2.setText(this.dialogue[this.storyIndex].options[1].text);
    },
    update: function() {},
    nextDialogue: function(option) {
      var nextIndex = this.dialogue[this.storyIndex].options[option].link;

      if (nextIndex >= 0) {
        // If there is a valid dialogue at the next index load it
        this.storyIndex = nextIndex;
        this.messageText.setText(this.dialogue[this.storyIndex].message);
        this.optionText1.setText(this.dialogue[this.storyIndex].options[0].text);
        this.optionText2.setText(this.dialogue[this.storyIndex].options[1].text);
      } else {
        // If there is no valid dialogue at the next index end the conversation
        this.map.visible = true;
        this.timeText.visible = true;
        this.message.visible = false;
        this.messageText.visible = false;
        this.option1.visible = false;
        this.optionText1.visible = false;
        this.option2.visible = false;
        this.optionText2.visible = false;

      }
    }
});
