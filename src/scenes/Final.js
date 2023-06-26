export default class Final extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("final");
  }

  init() {}

  preload() {}

  create() {
    this.add.image(1333, 1000, "fin1");
    this.add.image(1333, 1000, "fin2");
    this.add.image(1333, 1000, "fin");

    this.click = this.sound.add("click");

    this.imagenActual = 0; // Variable para rastrear la imagen actual
    this.imagenes = ["fin1", "fin2", "fin"];

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
  }

  mostrarSiguienteImagen() {
    this.imagenActual++;

    if (this.imagenActual < this.imagenes.length) {
      this.imagen.setTexture(this.imagenes[this.imagenActual]);
    }

    if (this.imagenActual === this.imagenes.length - 1) {
      const confeti = this.add.sprite(1333, 1000, "confeti");
      this.anims.create({
        key: "confeti",
        frames: this.anims.generateFrameNumbers("confeti", {
          start: 0,
          end: 9,
        }),
        frameRate: 10,
        repeat: -1,
      });
      confeti.play("confeti");

      // Botón para la escena de ayuda
      const botonMenu = this.add.sprite(2600, 1900, "home").setInteractive();
      botonMenu.on("pointerup", () => {
        this.click.play();
        this.scene.start("menu");
      });
      botonMenu.on("pointerover", () => {
        botonMenu.setTexture("homePresionado");
      });
      botonMenu.on("pointerout", () => {
        botonMenu.setTexture("home");
      });
    }
  }
}
