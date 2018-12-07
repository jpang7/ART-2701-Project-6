class Boot extends Phaser.State {
    preload() {
        this.load.atlasJSONArray('spinning triangle', '../assets/spinningtri.png', '../assets/spinningtri.json')
    }
    create() {
        console.log("Booted")
        this.state.start('Preload')
    }
    update() {

    }
}