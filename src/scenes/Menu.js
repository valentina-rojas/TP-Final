export default class Menu extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("menu");
  }

  create() {
    this.add.image(400, 1000, "tilesFondo");

   
    // Botón para empezar el juego
    const playButton = this.add.sprite(1350, 800, "jugar").setInteractive();
    playButton.on("pointerup", () => {
      this.scene.start("nivel1");
    });

   
  //Botón para la escena de ayuda
    const helpButton = this.add.sprite(1350, 1000, "ayuda").setInteractive();
    helpButton.on("pointerup", () => {
      this.scene.start("ayuda");
    });
   
  }
  }
