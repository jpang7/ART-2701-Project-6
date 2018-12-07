class FirstTime extends Phaser.State {
    preload() {
        this.load.image('done', '../assets/done.png');
        this.load.image('gifts', '../assets/gifts.png');
        this.load.image('table2', '../assets/table2.png');
    }
    create() {
        let foxWalk = this.add.sprite(0,0, 'foxWalk');
        foxWalk.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13], 10, false);
        foxWalk.animations.play('walk');

        let variable = this;
        function addText() {
            variable.heard = variable.add.sprite(500,200,'heard');
        }

        setTimeout(function() {addText()}, 1400);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    update() {

        if (this.heard != undefined && this.heard.alive && this.spaceKey.isDown) {
            this.state.start('MainGame');
        }   
    }
}