class MainGame extends Phaser.State {

    preload() {
        this.load.image('redPowder', '../assets/redPowder.png');
        this.load.image('whiteOil', '../assets/whiteOil.png');
        this.load.image('blueMetal', '../assets/blueMetal.png');
        this.load.image('can','../assets/combine jug.png');
        this.load.image('greenPowder','../assets/greenPowder.png');
        this.load.image('yellowOil','../assets/yellowOil.png');
        this.load.image('orangeMetal','../assets/orangeMetal.png');
        this.load.image('rainbowOil','../assets/rainbowOil.png');
        this.load.image('rainbowMetal','../assets/rainbowMetal.png');
        this.load.image('rainbowPowder','../assets/rainbowPowder.png');

    }
    create() {

        var powderString;
        var oilString;
        var metalString;

        if (fox == 0) {
            powderString = 'redPowder';
            oilString = 'whiteOil';
            metalString = 'blueMetal';
        }
        
        else if (fox == 1) {
            powderString = 'greenPowder';
            oilString = 'yellowOil';
            metalString = 'orangeMetal';
        }

        else if(fox ==5) {
            powderString = 'rainbowPowder';
            oilString = 'rainbowPowder';
            metalString = 'rainbowMetal';
        }

        let table = this.add.sprite(0,0,'table2');


        this.can = this.add.sprite(100,450,'can');
        this.powder = this.add.sprite(300,450,powderString);
        this.oil = this.add.sprite(400,450,oilString);
        this.metal = this.add.sprite(500,400,metalString);

        this.can.inputEnabled = true;
        this.powder.inputEnabled = true;
        this.oil.inputEnabled = true;
        this.metal.inputEnabled = true;
        
        this.can.input.enableDrag();
        this.powder.input.enableDrag();
        this.oil.input.enableDrag();
        this.metal.input.enableDrag();

        let gifts = this.add.sprite(200,200,'gifts');
        function hide() {
            gifts.visible = false;
        }
        setTimeout(function() {hide()}, 2000);
        this.done = this.add.sprite(640,70,'done');
        this.done.inputEnabled = true;
        this.done.events.onInputDown.add(next,this);
        this.canProceed = false;

        function next() {
            if (!this.canProceed) {
                alert("You're not done yet!!!");
            }
            else {
                var user = this.game.state.states['FirstTime'].userName
                console.log(this.duration + " is duration")
                if (fox == 0) {
                    this.hashCode = secretSauce("red","white","blue",this.duration,user);
                }
                else if (fox==1) {
                    this.hashCode = secretSauce("green","yellow","orange",this.duration,user);
                }
                else if (fox==5) {
                    this.hashCode = secretSauce("rainbow","rainbow","rainbow",this.duration,user);
                }
                console.log(this.hashCode);
                this.state.start('Output');
            }
            
        }

        function secretSauce(powder, oil, metal, shakes, title) {
            var first,second,third,fourth,fifth;
            if (powder == 'red') {
                first = 0;
            }
            else if (powder == 'green') {
                first = 1;
            }
            else if (powder == 'rainbow') {
                first = 5;
            }
            if (oil == 'white') {
                second = 0;
            }
            else if (oil == 'yellow') {
                second = 1;
            }
            else if (oil == 'rainbow') {
                second = 5;
            }
            if (metal == 'blue') {
                third = 0;
            }
            else if (metal == 'orange') {
                third = 1;
            }
            else if (metal == 'rainbow') {
                third = 5;
            }
            if (shakes % 2 == 0) {
                fourth = 0;
            }
            else {
                fourth = 1;
            }
            if (shakes == 10) {
                fourth = 5;
            }
            if (countVowels(title) >=5) {
                var prob = Math.random();
                if (prob >= .7) {
                    fifth = 0;
                }
                else {
                    fifth = 1;
                }
            }
            else {fifth = 0};
            return first.toString() + second.toString() + third.toString() + fourth.toString() + fifth.toString();
        }

        function isVowel(ch) {
            ch = ch.toUpperCase();
            return (ch=='A' || ch=='E' || ch=='I' || 
                                   ch=='O' || ch=='U'); 
        }
        
        function countVowels(str) {
            var count = 0; 
            for (let i = 0; i < str.length; i++) 
                if (isVowel(str.charAt(i))) // Check for vowel 
                    ++count; 
            return count;  
        }
        this.duration = 0;
    }
    update() {
        if (this.powder.overlap(this.can) && !this.input.activePointer.leftButton.isDown) {
            this.powder.kill();
        }
        if (this.oil.overlap(this.can)&& !this.input.activePointer.leftButton.isDown) {
            this.oil.kill();
        }
        if (this.metal.overlap(this.can)&& !this.input.activePointer.leftButton.isDown) {
           this.metal.kill();
        }
        if (!this.powder.alive && !this.oil.alive && !this.metal.alive) {
            this.canProceed = true;
        }
        
        if (this.canProceed) {
            this.duration++;
        }
    }
}