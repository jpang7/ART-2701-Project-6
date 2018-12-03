class Game extends Phaser.Game {
    constructor() {
        // super('100%', '100%', Phaser.AUTO, 'gameArea');
        super(800,600,Phaser.AUTO,'gameArea');
        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        // this.state.add('foxAnimation', foxAnimation, false);
        this.state.add('FirstTime',FirstTime,false);
        this.state.add('MainGame',MainGame,false);
        this.state.add('Output',Output,false);
        this.state.add('Output2',Output2,false);
        this.state.start('Boot');
    }
}

new Game();