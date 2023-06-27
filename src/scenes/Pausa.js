export default class Pausa extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("pausa");
  }


  init(data) {
    this.nivelActual = data.nivelActual;
    this.musica = data.musica;
  }

  preload() {}

  create() {

    this.click = this.sound.add("click");

    this.add.image(1333, 1000, "fondoPausa");
    this.add.image(1333, 700, "juegoPausado");

    //botón para reanudar el juego
    const botonReanudar = this.add
      .image(1350, 1100, "botonJugar")
      .setInteractive();

    botonReanudar
      .on("pointerup", () => {
        this.click.play();
        this.scene.stop("pausa");
     
        this.scene.resume(this.nivelActual);

        const nivelScene = this.scene.get(this.nivelActual);
        nivelScene.musica.resume();
      })
      .on("pointerover", () => {
        botonReanudar.setTexture("botonJugarPresionado");
      })
      .on("pointerout", () => {
        botonReanudar.setTexture("botonJugar");
      });
      
    //botón para reiniciar el nivel
    const botonReintentar = this.add
      .image(1600, 1100, "botonReintentar")
      .setInteractive();

    botonReintentar
      .on("pointerup", () => {
        this.click.play();
    
        this.scene.stop("pausa");
        this.scene.start(this.nivelActual);
      })
      .on("pointerover", () => {
        botonReintentar.setTexture("botonReintentarPresionado");
      })
      .on("pointerout", () => {
        botonReintentar.setTexture("botonReintentar");
      });


      //boton para volver al menu
    const botonVolver = this.add
      .image(1100, 1100, "botonMenu")
      .setInteractive();

    botonVolver
      .on("pointerup", () => {
        this.click.play();
        
        this.scene.stop("pausa");
        this.scene.stop(this.nivelActual);
        this.scene.start("menu");
      })
      .on("pointerover", () => {
        botonVolver.setTexture("botonMenuPresionado");
      })
      .on("pointerout", () => {
        botonVolver.setTexture("botonMenu");
      });
  }

  update() {}
}
