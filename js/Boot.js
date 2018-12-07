class Boot extends Phaser.State {
    preload() {
        this.load.atlasJSONArray('spinning triangle', 'ART-2701-Project-6-/assets/spinningtri.png', '../assets/spinningtri.json')
    }
    create() {
        console.log("Booted")
        this.state.start('Preload')
    }
    update() {

    }
}