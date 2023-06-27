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
    this.click = this.sound.add("click");

    this.musica = this.sound.add("musica5");
    this.musica.play({ loop: true });

    const cocina = this.add.sprite(1333, 1000, "cocina");
    cocina.play("cocina");
    this.add.image(1333, 1000, "transparente");

    this.imagenActual = 0; // Variable para rastrear la imagen actual

    this.imagenes = ["inicio1", "inicio2", "inicio3", "inicio4"];

    this.imagen = this.add
      .image(1333, 1000, this.imagenes[this.imagenActual])
      .setOrigin(0.5, 0.5);

    // botón "Siguiente"
    const siguienteBoton = this.add
      .image(2450, 1750, "siguiente", { fontSize: 100, fill: "#ffffff" })
      .setInteractive();

    siguienteBoton.on("pointerup", () => {
      this.mostrarSiguienteImagen();
      this.click.play();
    });
    siguienteBoton.on("pointerover", () => {
      siguienteBoton.setTexture("siguientePresionado");
    });
    siguienteBoton.on("pointerout", () => {
      siguienteBoton.setTexture("siguiente");
    });

    // botón "Saltar"
    const saltarBoton = this.add
      .image(2500, 1900, "saltar", { fontSize: 100, fill: "#ffffff" })
      .setInteractive();
    saltarBoton.on("pointerup", () => {
      this.scene.start("menu", { musica: this.musica });
      this.click.play();
    });
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

      this.musica.pause();
      this.scene.start("menu", { musica: this.musica });
    } else {
      this.imagen.setTexture(this.imagenes[this.imagenActual]); //sino pasar a la siguiente imágen
    }
  }
}
