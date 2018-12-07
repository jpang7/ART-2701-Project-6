class Output2 extends Phaser.State {
    preload() {
        this.load.spritesheet('wonItems', 'ART-2701-Project-6-/assets/assets/won_items2.png',128,128,36);
        this.load.atlasJSONArray('backGroup', 'ART-2701-Project-6-/assets/assets/background.png', 'ART-2701-Project-6-/assets/assets/background.JSON');
        this.load.image('collect', 'ART-2701-Project-6-/assets/assets/collect.png');
        this.load.image('again', 'ART-2701-Project-6-/assets/assets/goAgain.png');
        this.load.image('collectY', 'ART-2701-Project-6-/assets/assets/collectYellow.png');
        this.load.image('againY', 'ART-2701-Project-6-/assets/assets/goAgainYellow.png');
    }
    create() {

        var back = this.add.sprite(0,0,'backGroup');
        var run = back.animations.add('run',[0,1,2,3]);
        back.animations.play('run',7,true);

        var derived = new Derivation(threeBitCode);
        console.log(derived);

        this.wonItem = this.add.sprite(400,200,'wonItems');
        var choose = this.wonItem.animations.add('choose',[derived.index]);
        this.wonItem.animations.play('choose',1,true);
        this.physics.arcade.enable(this.wonItem);
        this.wonItem.body.collideWorldBounds = true;
        this.wonItem.body.velocity.x = 100;

        this.collect = this.add.sprite(200,500,'collect');
        this.collect.inputEnabled = true;

        this.again = this.add.sprite(450,495,'again');
        this.again.inputEnabled = true;

        this.collectY = this.add.sprite(200,500,'collectY');
        this.collectY.inputEnabled = true;
        this.collectY.visible = false;

        this.againY = this.add.sprite(450,495,'againY');
        this.againY.inputEnabled = true;
        this.againY.visible = false;
        
        var text = this.add.text(200,450,"YOU MADE "+derived.name, {
            font: 'bold 20pt Consolas',
            fill: 'black'
        });

        this.ytext = this.add.text(200,450,"YOU MADE "+derived.name, {
            font: 'bold 20pt Consolas',
            fill: 'yellow'
        });

        this.ytext.visible = false;

        function collectItem() {
            console.log("hooray");
            try{
                console.log(userAccount1)
                light_contract.methods.createItem(derived.name,threeBitCode,userAccount1).send({from: userAccount1});
            } catch(err) {
                console.log("Something went wrong");
                console.log(err);
            }
        }

        this.collect.events.onInputDown.add(function() {
            this.collectY.visible = true;
            collectItem();
        },this);
        this.collect.events.onInputUp.add(function() {
            this.collectY.visible = false;
        },this);
        this.again.events.onInputDown.add(function() {
            this.againY.visible = true;
            this.stage.backgroundColor = 'black';
            this.state.start('Boot');
        },this);
        this.again.events.onInputUp.add(function() {
            this.againY.visible = false;
        },this);
    }
    update() {
        var round = Math.round;
        if (round(this.wonItem.x) % 2 == 0) this.ytext.visible = true;
        else this.ytext.visible = false;
        if (this.wonItem.x >= 500) this.wonItem.body.velocity.x = -100;
        if (this.wonItem.x <= 200) this.wonItem.body.velocity.x = 100;


    }
}