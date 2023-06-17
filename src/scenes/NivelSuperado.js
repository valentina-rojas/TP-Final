export default class NivelSuperado extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivelSuperado");
  }

  init(data) {
    this.puntajeFinal = data.puntajeFinal;
  }

  preload() {}

  create() {
    this.cantidadpuntajeFinalTexto = this.add.text(
      150,
      150,
      "Puntaje " + this.puntajeFinal,
      { fontSize: "100px", fill: "#FFFFFF" }
    );
  }

  update() {}
}
