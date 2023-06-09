export default class Menu extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("menu");
  }
  init(data) {
    this.musica = data.musica;
  }
  create() {
    this.add.image(1333, 1000, "fondoMenu");
    this.add.image(2050, 1150, "logo");
    this.iniciarJuego = this.sound.add("iniciarJuego");
    this.click = this.sound.add("click");

    this.musica.play();

    // Botón para empezar el juego
    const botonJugar = this.add.sprite(1750, 600, "logoBoton").setInteractive();
    botonJugar.on("pointerup", () => {
      this.iniciarJuego.play();
      this.musica.stop({ loop: false });
      this.scene.start("nivel1");
    });

    botonJugar.on("pointerover", () => {
      botonJugar.setTexture("logoBotonPresionado");
    });
    botonJugar.on("pointerout", () => {
      botonJugar.setTexture("logoBoton");
    });

    //Botón para la escena de ayuda
    const botonAyuda = this.add
      .sprite(2500, 1800, "botonAyuda")
      .setInteractive();
    botonAyuda.on("pointerup", () => {
      this.click.play();
      this.scene.pause("menu");
      this.scene.launch("ayuda");
    });
    botonAyuda.on("pointerover", () => {
      botonAyuda.setTexture("botonAyudaPresionado");
    });
    botonAyuda.on("pointerout", () => {
      botonAyuda.setTexture("botonAyuda");
    });
  }
}
