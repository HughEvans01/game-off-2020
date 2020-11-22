var Room = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Room' });
    },
    init: function(data) {
      this.day = data.day;
      this.currentTime = data.time;
      this.room = data.room;
      this.characterOpinions = data.opinions;
      this.rocketProgress=data.progress;
    },
    preload: function() {
      this.load.image('noon', './assets/noon.png');

      this.load.image('conferenceRoom', './assets/conferenceRoom.png');
      this.load.image('storageRoom', './assets/storageRoom.png');
      this.load.image('labRoom', './assets/labRoom.png');
      this.load.image('containment', './assets/containment.png');
      this.load.image('bars', './assets/bars.png');
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

      this.load.json('story', './story.json');
    },
    create: function() {
      this.story = this.cache.json.get('story');

      this.messageText;
      this.optionText1;
      this.optionText2;

      this.dialogue = this.story[this.day][this.room].dialogue;
      this.character = this.story[this.day][this.room].character;
      this.storyIndex = this.story[this.day][this.room].entryPoint;

      this.add.image(400, 300, 'noon');
      this.add.image(400, 300, this.room);
      this.add.image(400, 425, this.character+"1");

      if (this.room === "containment") {
        this.add.image(400,300, "bars")
      }

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        if (this.currentTime.getHours() < 16) {
          this.scene.start("Map",{day:this.day,
                                  time:this.currentTime,
                                  room:this.room,
                                  opinions:this.characterOpinions,
                                  progress:this.rocketProgress});
        } else {
          this.scene.start("Credits",{opinions:this.characterOpinions,
                                      progress:this.rocketProgress});
        }
        this.currentTime.setHours( this.currentTime.getHours() + 1);
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
    endConversation: function() {
      // Hide all the conversation UI elements and show map button
      this.map.visible = true;
      this.message.visible = false;
      this.messageText.visible = false;
      this.option1.visible = false;
      this.optionText1.visible = false;
      this.option2.visible = false;
      this.optionText2.visible = false;
    },
    nextDialogue: function(option) {
      /* Use the link attribute in the dialogue object to work out what to say
      or do next: positive numbers link to the next dialogue object at that
      index, negative numbers link to the next dialogue object at that next
      but only the next time you talk to that character, and a null value ends
      the conversation instantly. This could probably be done better */

      // Apply character's reaction to option to their opinion of the player
      var effect = this.dialogue[this.storyIndex].options[option].reaction;
      var characterOpinion = this.characterOpinions[this.character];
      // Opinion is null if character has not been introduced
      if ( characterOpinion === null){
        // Introduction
        characterOpinion = 0 + effect;
      } else {
        // Normal conversation
        characterOpinion += effect;
      }
      this.characterOpinions[this.character] = characterOpinion;

      // Figure out what to do next in conversation
      var nextIndex = this.dialogue[this.storyIndex].options[option].link;

      if (nextIndex === null) {
        this.endConversation();
      } else if (Math.sign(nextIndex) > 0) {
        // If there is a link to dialogue at the next index load it
        this.storyIndex = nextIndex;
        this.messageText.setText(this.dialogue[this.storyIndex].message);
        this.optionText1.setText(this.dialogue[this.storyIndex].options[0].text);
        this.optionText2.setText(this.dialogue[this.storyIndex].options[1].text);

      } else if (Math.sign(nextIndex) < 0) {
        // If there is a new entry point at the next index set it to that
        this.story[this.day][this.room].entryPoint = Math.abs(nextIndex);
        this.endConversation();
      }
    }
});
