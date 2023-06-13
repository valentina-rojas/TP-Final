export default class Pausa extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("pausa");
    }
  
    init() {}
  
    preload() {}
  
    create() {
      this.add.image(400, 1000, "tilesFondo");
  
      //botón para volver al menu
      const botonVolver = this.add.image(1350, 1000, "volver").setInteractive();
  
      botonVolver.on("pointerup", () => {
        this.scene.start("nivel1");
      });

   
      
    }
  
    update() {}
  }
  