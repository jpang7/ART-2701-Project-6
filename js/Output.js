class Output extends Phaser.State {
    preload() {
        this.load.atlasJSONArray('cooking','../assets/cook.png','../assets/cook.json');
    }
    create() {
        this.stage.backgroundColor = '#fff';
        let cooking = this.add.sprite(400, 300, 'cooking')
        cooking.animations.add('cook', [0,1,2,3], 11, true);
        cooking.animations.play('cook');
        setTimeout(function() {next()}, 3000);
        var variable = this;
        function next() {
            variable.state.start('Output2');
        }
    }
    update() {

    }
}