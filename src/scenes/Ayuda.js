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
    this.add.image( 1333,1000,"instrucciones");
    this.click = this.sound.add("click");
   
    //botón para volver al menu
    const volverBoton = this.add.image(1815, 1350, "flecha").setInteractive();

    volverBoton.on("pointerup", () => {
      this.click.play();
      
      this.scene.start("menu");
    });

    volverBoton.on("pointerover", () => {
      volverBoton.setTexture("flechaPresionado");
    })

    volverBoton.on("pointerout", () => {
      volverBoton.setTexture("flecha");
    })
  }



  update() {}
}
