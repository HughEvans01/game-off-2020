var Credits = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { 'key': 'Credits' });
    },
    init: function(data) {
      this.characterOpinions=data.opinions;
      this.rocketProgress=data.progress;
      console.log("credits",data.progress)
    },
    preload: function() {
      this.load.image('wedding', './assets/weddingCredit.png');
      this.load.image('family', './assets/familyCredit.png');

      this.load.image('alien', './assets/alienHead.png');
      this.load.image('babyAlien', './assets/babyAlienHead.png');
      this.load.image('lincoln', './assets/lincolnHead.png');
      this.load.image('bort', './assets/bortHead.png');
      this.load.image('susan', './assets/susanHead.png');
      this.load.image('marjot', './assets/marjotHead.png');
      this.load.image('player', './assets/playerHead.png');


    },
    create: function() {

      console.log("rocket progress",this.rocketProgress)
      console.log("characterOpinions",this.characterOpinions)

      /* Need to add an edge case for when no charcters like player */

      var characters = Object.keys(this.characterOpinions);
      var opinions = Object.values(this.characterOpinions);

      var partner = {name: "", opinion: 0};

      for (var i = 0; i < characters.length; i++) {
        var opinion = opinions[i];
        if (opinion) { // Check if opinion is null i.e. have they met
          if (opinion > partner.opinion) {
            partner.name = characters[i];
            partner.opinion = opinion;
          }
        }
      }

      // ROCKET BLOWS UP
      //OR
      //ROCKET LAUNCHES

      //BAD ENDING
      //OR
      // GOOD ENDING
      this.add.image(400, 300, 'wedding');
      this.add.image(320, 270, partner.name); // Bride
      this.add.image(440, 230, 'player'); // Groom

      this.time.delayedCall(10000, (func) => {
        this.add.image(400, 300, 'family');
        this.add.image(260, 230, partner.name); // Mother
        this.add.image(520, 230, 'player'); // Father
        if (partner.name === 'alien') {
          this.add.image(425, 230, 'babyAlien');
        }
      });

      // Add a "The end ?" bit after this
    },
    update: function() {}
});
