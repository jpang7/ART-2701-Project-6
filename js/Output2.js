class Output2 extends Phaser.State {
    preload() {
        this.load.spritesheet('concoctions','../assets/concoctions.png',64,64,36);
        this.load.image('Collect?','../assets/congrats.png');
    }
    create() {
        var hashCode = this.game.state.states['MainGame'].hashCode
        var conc = new Concoction(hashCode);
        console.log(conc.name);
        console.log(conc.index);

        var concoction = this.add.sprite(400,200,'concoctions');
        var choose = concoction.animations.add('choose',[conc.index]);
        concoction.animations.play('choose',1,true);

        var text = this.add.text(400,250,conc.name, {
            font: 'bold 20pt Consolas',
            fill: 'black'
        });

        var button = this.add.button(200,300,'Collect?',collectItem,this);

        function collectItem() {
            console.log("hooray");
            try{
                console.log(userAccount1)
                light_contract.methods.createItem(conc.name,hashCode,userAccount1).send({from: userAccount1});
            } catch(err) {
                console.log("Something went wrong");
                console.log(err);
            }
        }

        function Concoction(hash) {
            this.id = hash;
            this.name;
            this.index =0;
            if (hash[0] == '0') {
                this.name = 'Red ';
            }
            else if (hash[0] == '1') {
                this.name = 'Green ';
                this.index += 4;
            }
            else if (hash[0] == '5') {
                this.name = 'Rainbow '
                this.index += 8;
            }
            if (hash[1] == '0') {
                this.name += 'FRESH '
            }
            else if (hash[1] == '1') {
                this.name += 'ROTTEN ';
                this.index +=12;
            }
            else if (hash[1] == '5') {
                this.name += 'FIRE '
                this.index +=24;
            }
            if (hash[2] == '0') {
                this.name += 'Awesome '
            }
            else if (hash[2] == '1') {
                this.name += 'Boring ';
            }
            else if (hash[2] == '5') {
                this.name += 'FIRE '
            }
            if (hash[4] == '0') {
                if (hash[3] == '0') {
                    this.name += 'Hammer';
                }
                else if (hash[3] == '1') {
                    this.name += 'Cocktail';
                    this.index += 1;
                }
                else if (hash[3] == '5') {
                    this.name += 'Contract';
                    this.index +=2;
                }
            }
            else {
                this.name += 'Robot';
                this.index +=3;
            }
        }
    }
    update() {

    }
}