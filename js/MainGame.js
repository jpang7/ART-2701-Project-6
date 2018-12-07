class MainGame extends Phaser.State {

    preload() {

        //table
        this.load.image('table', '../assets/final_table.png');

        //Idle animation
        this.load.atlasJSONArray('metal','../assets/metal.png','../assets/metal.JSON');
        this.load.atlasJSONArray('powder','../assets/powder.png','../assets/powder.JSON');
        this.load.atlasJSONArray('oil','../assets/oil.png','../assets/oil.JSON');
        this.load.atlasJSONArray('box','../assets/box.png','../assets/box.JSON');

        //Dumping animation
        this.load.atlasJSONArray('metalDump','../assets/metal_dump.png','../assets/metal_dump.JSON');
        this.load.atlasJSONArray('oilDump','../assets/oil_dump.png','../assets/oil_dump.JSON');
        this.load.atlasJSONArray('powderDump','../assets/powder_dump.png','../assets/powder_dump.JSON');

        //Next button
        this.load.image('done', '../assets/done.png');
    }
    create() {

        this.startTime = this.time.now;

        this.table = this.add.sprite(200,300,'table');
        this.box = this.add.sprite(250,290,'box');

        this.metal = this.add.sprite(320,240,'metal');
        this.powder = this.add.sprite(420,310,'powder');
        this.oil = this.add.sprite(540,330,'oil');

        this.box2 = this.add.sprite(250,290,'box');
        this.metal2 = this.add.sprite(270,250, 'metal');
        this.powder2 = this.add.sprite(270,250, 'powder');
        this.oil2 = this.add.sprite(270,290, 'oil');

        this.metal2.visible =false;
        this.powder2.visible = false;
        this.oil2.visible = false;
        this.box2.visible = false;

        this.done = this.add.sprite(400,300,'done');
        this.done.visible = false;

        function next() {
            threeBitCode = createCode(resources, this.powderNumber, this.smokeNumber, isSpecial);
            console.log(this.code);
            clearInterval(trackSeconds);
            clearInterval(trackSnaps);
            this.state.start('Output');
        }

        this.done.events.onInputDown.add(next,this);

        this.box.animations.add('idle',[0,1,2,3,4,5,6]);
        this.box.animations.add('active',[7]);
        this.box2.animations.add('active',[7]);
        
        if (resources == 0) {
            this.metal.animations.add('idle',[24,25,26,27,28]);
            this.metal2.animations.add('active',[0,1,2,3,4,5,6,7]);

            this.powder.animations.add('idle',[0,1,2,3]);
            this.powder2.animations.add('active',[12,13,14,15,16,17]);

            this.oil2.animations.add('idle',[0,1,2,3,4,5,6]);
            this.oil2.animations.add('active',[14,15,16,17,18,19,20]);
        }
        else if (resources == 1) {
            this.metal.animations.add('idle',[30,31,32,33,34]);
            this.metal2.animations.add('active',[8,9,10,11,12,13,14,15]);

            this.powder.animations.add('idle',[4,5,6,7]);
            this.powder2.animations.add('active',[18,19,20,21,22,23]);

            this.oil2.animations.add('idle',[5,6,7,8,9,10,11]);
            this.oil2.animations.add('active',[21,22,23,24,25,26,27]);
        }
        else if (resources == 2) {
            this.metal.animations.add('idle',[36,37,38,39,40]);
            this.metal2.animations.add('active',[16,17,18,19,20,21,22,23]);

            this.powder.animations.add('idle',[8,9,10,11]);
            this.powder2.animations.add('active',[24,25,26,27,28,29]);

            this.oil2.animations.add('idle',[10,11,12,13,14,15]);
            this.oil2.animations.add('active',[28,29,30,31,32,33,34]);
        }

        this.metal.animations.play('idle',7,true);
        this.oil.animations.play('active',7,true);
        this.box.animations.play('idle',7,true);
        this.box2.animations.play('active',1,true);

        this.metal.inputEnabled = 
        this.powder.inputEnabled = 
        this.oil.inputEnabled = true;

        this.metal.input.enableDrag();
        this.powder.input.enableDrag();
        this.oil.input.enableDrag();

        this.numberSnaps = 0;
        this.smokeSeconds = 0;
        
        this.shouldOpen = false;

        //variables to pass into the item making formula
        this.powderNumber;
        this.smokeNumber;

        var variable = this;
    
        var trackSnaps = setInterval(function(){
            variable.numberSnaps++; 
            variable.powder.animations.play('idle',7, false);
            console.log(variable.numberSnaps);
        }, 2000);

        var trackSeconds = setInterval(function(){
            variable.smokeSeconds++;
        }, 1000);
    }
    update() {

        if (this.metal.x == -100 && this.powder.x == -100 && this.oil.x == -100) {
            this.done.visible = true;
            this.done.inputEnabled = true;
        }

        if (this.shouldOpen) this.box.animations.play('active',1,true);
        else this.box.animations.play('idle',7,true);

        function openBox() {
            this.shouldOpen = true;
        }

        function closeBox() {
            this.shouldOpen = false;
        }

        this.metal.events.onInputDown.add(openBox, this);
        this.metal.events.onInputUp.add(closeBox, this);
        this.powder.events.onInputDown.add(openBox, this);
        this.powder.events.onInputUp.add(closeBox, this);
        this.oil.events.onInputDown.add(openBox, this);
        this.oil.events.onInputUp.add(closeBox, this);

        var variable = this;

        if (this.powder.overlap(this.box) && !this.input.activePointer.leftButton.isDown) {
            this.powder.x = -100;
            this.box2.visible = true;
            this.box.visible = false;
            this.powder2.visible = true;
            this.powder2.animations.play('active',10,false);
            setTimeout(function() {killPowder2()},1000);
            this.powderNumber = this.numberSnaps;
            console.log(this.powderNumber)
        }

        if (this.metal.overlap(this.box) && !this.input.activePointer.leftButton.isDown) {
            this.metal.x = -100;
            this.box2.visible = true;
            this.box.visible = false;
            this.metal2.visible = true;
            this.metal2.animations.play('active',10,false);
            setTimeout(function() {killMetal2()},1000);
            this.smokeNumber = this.smokeSeconds;
            console.log(this.smokeNumber);
        }

        if (this.oil.overlap(this.box) && !this.input.activePointer.leftButton.isDown) {
            this.oil.x = -100;
            this.box2.visible = true;
            this.box.visible = false;
            this.oil2.visible = true;
            this.oil2.animations.play('idle',10,false);
            setTimeout(function() {killOil2()},1000);
        }

        function killPowder2() {
            if (variable.powder2 != undefined) variable.powder2.kill();
            variable.box2.visible = false;
            variable.box.visible = true;
        }

        function killOil2() {
            if (variable.oil2 != undefined) variable.oil2.kill();
            variable.box2.visible = false;
            variable.box.visible = true;
        }

        function killMetal2() {
            if (variable.metal2 != undefined) variable.metal2.kill();
            variable.box2.visible = false;
            variable.box.visible = true;
        }

    }


}