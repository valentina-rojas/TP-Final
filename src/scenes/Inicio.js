export default class Inicio extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("inicio");
  }

  init() {}

  preload() {}

  create() {
    this.add.image(1333, 1000, "inicio4");
    this.add.image(1333, 1000, "inicio3");
    this.add.image(1333, 1000, "inicio2");
    this.add.image(1333, 1000, "inicio1");

    this.imagenActual = 0; // Variable para rastrear la imagen actual

    this.imagenes = ["inicio1", "inicio2", "inicio3", "inicio4"];

    this.imagen = this.add
      .image(1333, 1000, this.imagenes[this.imagenActual])
      .setOrigin(0.5, 0.5);

    // botón "Siguiente"
    const siguienteBoton = this.add
      .image(2450, 1750, "siguiente", { fontSize: 100, fill: "#ffffff" })
      .setInteractive();

    siguienteBoton.on("pointerup", () => this.mostrarSiguienteImagen());
    siguienteBoton.on("pointerover", () => {
      siguienteBoton.setTexture("siguientePresionado");
    });
    siguienteBoton.on("pointerout", () => {
      siguienteBoton.setTexture("siguiente");
    });

    // botón "Saltar"
    const saltarBoton = this.add
      .image(2500, 1900,  "saltar", { fontSize: 100, fill: "#ffffff" })
      .setInteractive();
    saltarBoton.on("pointerup", () => this.scene.start("menu"));
    saltarBoton.on("pointerover", () => {
      saltarBoton.setTexture("saltarPresionado");
    });
    saltarBoton.on("pointerout", () => {
      saltarBoton.setTexture("saltar");
    });
  }

  mostrarSiguienteImagen() {
    this.imagenActual++;

    if (this.imagenActual >= this.imagenes.length) {
      //si llego a la última imágen cambiar a la escena menú
      this.scene.start("menu");
    } else {
      this.imagen.setTexture(this.imagenes[this.imagenActual]); //sino pasar a la siguiente imágen
    }
  }
}
