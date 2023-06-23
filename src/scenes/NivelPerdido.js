export default class NivelPerdido extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("nivelPerdido");
    }
    init(data) {
    
      this.nivelActual = data.nivelActual;
    }
  
    preload() {}
  
    create() {
      this.add.image(1333, 1000, "fondoPausa");
  
      this.add.image(1333, 100, "leyendaPerdiste");
      this.add.image(1333, 600, "papel");
      this.add.image(1333, 700, "plato");
      this.add.image(1333, 1000, "cartelPerdiste");
  
    
        
      //botón para reiniciar el nivel
      const botonReintentar = this.add
        .image(1600, 1400, "botonReintentar")
        .setInteractive();
  
      botonReintentar
        .on("pointerup", () => {
          if (this.nivelActual === "nivel1") {
            this.scene.start("nivel1");
          } else if (this.nivelActual === "nivel2") {
            this.scene.start("nivel2");
          }
        })
        .on("pointerover", () => {
          botonReintentar.setTexture("botonReintentarPresionado");
        })
        .on("pointerout", () => {
          botonReintentar.setTexture("botonReintentar");
        });
  
      //boton para volver al menu
      const botonVolver = this.add
        .image(1100, 1400, "botonMenu")
        .setInteractive();
  
      botonVolver
        .on("pointerup", () => {
          this.scene.start("menu");
        })
        .on("pointerover", () => {
          botonVolver.setTexture("botonMenuPresionado");
        })
        .on("pointerout", () => {
          botonVolver.setTexture("botonMenu");
        });
  
      this.cantidadpuntajeFinalTexto = this.add.text(
        1400,
        920,
        this.puntajeFinal,
        {
          fontSize: "100px",
          fill: "#000",
          fontFamily: "cursive",
          fontWeight: "bold",
        }
      );
    }
  }
  