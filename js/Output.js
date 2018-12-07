class Output extends Phaser.State {
    preload() {
        this.load.atlasJSONArray('cooking','ART-2701-Project-6-/assets/cooking.png','../assets/cooking.json');
    }
    create() {
        this.stage.backgroundColor = '#fff';
        let cooking = this.add.sprite(200, 200, 'cooking')
        cooking.animations.add('cook', [0,1,2,3,4], 11, true);
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