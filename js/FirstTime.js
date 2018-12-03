class FirstTime extends Phaser.State {
    preload() {
        this.load.image('done', '../assets/done.png');
        this.load.image('gifts', '../assets/gifts.png');
        this.load.image('table2', '../assets/table2.png');
        this.load.image('done', '../assets/done.png');
    }
    create() {
        let foxWalk = this.add.sprite(0,0, 'foxWalk');
        foxWalk.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13], 10, false);
        foxWalk.animations.play('walk');

        let variable = this;
        function addText() {
            let heard = variable.add.sprite(500,200,'heard');
        }

        setTimeout(function() {addText()}, 1400);
        function submitText() {
            variable.userName = prompt("Please enter your name", "");
        }
        setTimeout(function() {submitText()},1600);

        function addText2() {
            let excellent = variable.add.sprite(500,200,'excellent');
        }

        setTimeout(function() {addText2()}, 2000);

        function next() {
            variable.state.start('MainGame');
        }
        setTimeout(function() {next()},2200);
    }
    update() {
    }
}