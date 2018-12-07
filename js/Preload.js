class Preload extends Phaser.State {
    preload() {
        this.load.atlasJSONArray('foxWalk', './assets/foxSprite.png', './assets/foxSprite.json');
        this.load.image('heard', './assets/shall we begin.png');
    }
    create() {
        console.log('Preload')
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        let loading = this.add.sprite(150, 0, 'spinning triangle')
        loading.animations.add('spin', [0,1,2,3,4,5], 11, true);
        loading.animations.play('spin');

        // var text = this.add.text(350,500,'GITHUB.COM/JPANG7',{
        //     font: 'bold 10pt Consolas',
        //     fill: 'white'
        // });

        let variable = this;

        function next() {
            variable.state.start('FirstTime');
        }
        setTimeout(function() {next()}, 3000);
    }
    update() {

    }


}