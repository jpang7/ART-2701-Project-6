class Preload extends Phaser.State {
    preload() {
        this.load.atlasJSONArray('foxWalk', '../assets/foxSprite.png', '../assets/foxSprite.json');
        this.load.image('heard', '../assets/heard so much.png');
        this.load.image('excellent', '../assets/excellent.png');
    }
    create() {
        console.log('Preload')
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        let loading = this.add.sprite(0, 0, 'spinning triangle')
        loading.animations.add('spin', [0,1,2,3,4,5], 11, true);
        loading.animations.play('spin');

        let variable = this;

        function next() {
            variable.state.start('FirstTime');
        }
        setTimeout(function() {next()}, 3000);
    }
    update() {

    }


}