var Room = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Room' });
    },
    init: function(data) {
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

      this.load.image('lincoln2', './assets/lincoln2.png');
      this.load.image('bort2', './assets/bort2.png');
      this.load.image('alien2', './assets/alien2.png');
      this.load.image('susan2', './assets/susan2.png');
      this.load.image('marjot2', './assets/marjot2.png');
      this.load.image('astronaut2', './assets/astronaut2.png');

      this.load.image('lincoln3', './assets/lincoln3.png');
      this.load.image('bort3', './assets/bort3.png');
      this.load.image('alien3', './assets/alien3.png');
      this.load.image('susan3', './assets/susan3.png');
      this.load.image('marjot3', './assets/marjot3.png');
      this.load.image('astronaut3', './assets/astronaut3.png');

      this.load.image('speechBubble1', './assets/speechBubble1.png');
      this.load.image('speechBubble2', './assets/speechBubble2.png');

      this.load.image('mapIcon', './assets/mapIcon.png');

      this.load.json('Monday', './story/monday.json');
      this.load.json('Tuesday', './story/tuesday.json');
      this.load.json('Wednesday', './story/wednesday.json');
      this.load.json('Thursday', './story/thursday.json');
      this.load.json('Friday', './story/friday.json');

      this.load.audio('clickSound','./assets/sounds/click.m4a');
    },
    create: function() {
      const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
      this.story = this.cache.json.get(days[this.currentTime.getDay()]);

      this.messageText;
      this.optionText1;
      this.optionText2;

      this.dialogue = this.story[this.room].dialogue;
      this.character = this.story[this.room].character;
      this.storyIndex = this.story[this.room].entryPoint;

      this.characterOpinion = this.characterOpinions[this.character];

      this.add.image(400, 300, 'noon');
      this.add.image(400, 300, this.room);
      this.characterSprite = this.add.image(400, 425, this.character+"1");

      if (this.room === "containment") {
        this.add.image(400,300, "bars")
      }

      this.map = this.add.sprite(750, 550, 'mapIcon').setInteractive();
      this.map.on('pointerover', function(){this.map.setTint(0xff8f00);}, this)
      this.map.on('pointerout', function(){this.map.setTint(0xffffff);}, this)
      this.map.on('pointerdown', function(){
        this.sound.play('clickSound');
        const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
        if (this.currentTime.getHours() < 16) {
          this.scene.start("Map",{time:this.currentTime,
                                  room:this.room,
                                  opinions:this.characterOpinions,
                                  progress:this.rocketProgress});
          this.currentTime.setHours( this.currentTime.getHours() + 2);
        } else if (this.currentTime.getDay() > 3){
          this.scene.start("Credits",{opinions:this.characterOpinions,
                                      progress:this.rocketProgress});
        } else {
          this.currentTime.setUTCDate(this.currentTime.getUTCDate()+1);
          this.currentTime.setHours(9);
          this.scene.start("Map",{time:this.currentTime,
                                  room:this.room,
                                  opinions:this.characterOpinions,
                                  progress:this.rocketProgress});
        }
      }, this);

      this.map.visible = false;

      this.message = this.add.image(400, 50, 'speechBubble1');

      this.option1 = this.add.sprite(200, 150, 'speechBubble2').setInteractive();
      this.option1.on('pointerover', function(){this.option1.setTint(0xff8f00);}, this)
      this.option1.on('pointerout', function(){this.option1.setTint(0xffffff);}, this)
      this.option1.on('pointerdown', function(){
        this.sound.play('clickSound');
        this.nextDialogue(0);
      }, this);

      this.option2 = this.add.sprite(600, 150, 'speechBubble2').setInteractive();
      this.option2.on('pointerover', function(){this.option2.setTint(0xff8f00);}, this)
      this.option2.on('pointerout', function(){this.option2.setTint(0xffffff);}, this)
      this.option2.on('pointerdown', function(){
        this.nextDialogue(1);
        this.sound.play('clickSound');
      }, this);

      this.messageText = this.add.text(16, 16, 'Hello world', { fontSize: '24px', fill: '#000' });
      this.optionText1 = this.add.text(16, 116, 'Hello world', { fontSize: '24px', fill: '#000' });
      this.optionText2 = this.add.text(416, 116, 'Hello world', { fontSize: '24px', fill: '#000' });

      // If characters hasn't yet been introduced use introduction from Monday
      if (this.characterOpinion === null) {
        this.story = this.cache.json.get("Monday");

        this.dialogue = this.story[this.room].dialogue;
        this.character = this.story[this.room].character;
        this.storyIndex = this.story[this.room].entryPoint;
      }

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
      // Opinion is null if character has not been introduced
      if ( this.characterOpinion === null){
        // Introduction

        this.characterOpinion = 0 + effect;
      } else {
        // Normal conversation
        this.characterOpinion += effect;

        // Update character's sprite to match reaction
        if (Math.sign(effect) > 0) {
          // Happy reaction
          this.characterSprite.setTexture(this.character+"2");
        } else if (Math.sign(effect) < 0) {
          // Angry reaction
          this.characterSprite.setTexture(this.character+"3");
        } else {
          this.characterSprite.setTexture(this.character+"1");
        }

      }
      this.characterOpinions[this.character] = this.characterOpinion;

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
        this.story[this.room].entryPoint = Math.abs(nextIndex);
        this.endConversation();
      }
    }
});
