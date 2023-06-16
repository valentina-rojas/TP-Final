export default class Ayuda extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("ayuda");
  }

  init() {}

  preload() {}

  create() {
    this.add.image( 1333,1000,"fondoPausa");
    

    //botón para volver al menu
    const Button = this.add.image(1350, 1000, "volver").setInteractive();

    Button.on("pointerup", () => {
      this.scene.start("menu");
    });
  }

  update() {}
}
