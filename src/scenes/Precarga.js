export default class Precarga extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("precarga");
  }

  init() {}

  preload() {
    this.load.tilemapTiledJSON("map", "./public/assets/tilemaps/nivel1.json");
    this.load.tilemapTiledJSON("map2", "./public/assets/tilemaps/nivel2.json");

    this.load.image("tilesFondo", "./public/assets/images/fondo.png");
    this.load.image(
      "tilesPlataforma",
      "./public/assets/images/plataformas.png"
    );
    this.load.image("jugador", "./public/assets/images/jugador.png");

    this.load.image("harina", "./public/assets/images/harina.png");
    this.load.image("maiz", "./public/assets/images/choclo.png");
    this.load.image("harinaIcono", "./public/assets/images/harinaIcono.png");
    this.load.image("maizIcono", "./public/assets/images/chocloIcono.png");
    this.load.image("cactus", "./public/assets/images/cactus.png");
    this.load.image("reloj", "./public/assets/images/reloj.png");
    this.load.image("corazon", "./public/assets/images/corazon.png");
    this.load.image("corazonGris", "./public/assets/images/corazongris.png");
   
    this.load.image("nube", "./public/assets/images/nube.png");
    this.load.image("cielo", "./public/assets/images/cielo.png");
    this.load.image("montañas", "./public/assets/images/montañas.png");
    this.load.image("suelo", "./public/assets/images/suelo.png");
    this.load.image("salida", "./public/assets/images/salida.png");


    this.load.image("arbustos01", "./public/assets/images/nivel1/arbustos1.png");
    this.load.image("arbustos02", "./public/assets/images/nivel1/arbustos2.png");
    this.load.image("cielo2", "./public/assets/images/nivel2/cielo.png");
    this.load.image("arboles", "./public/assets/images/nivel2/arboles.png");
    this.load.image("arbustos1", "./public/assets/images/nivel2/arbustos1.png");
    this.load.image("arbustos2", "./public/assets/images/nivel2/arbustos2.png");
    this.load.image("edificios", "./public/assets/images/nivel2/edificios.png");
    this.load.image("suelo2", "./public/assets/images/nivel2/suelo.png");
    this.load.image("suelo2", "./public/assets/images/nivel2/suelo.png");
    this.load.image(
      "plataformas2",
      "./public/assets/images/nivel2/plataformas.png"
    );
    this.load.image("pan", "./public/assets/images/nivel2/pan.png");
    this.load.image("carne", "./public/assets/images/nivel2/carne.png");
    this.load.image("maleza", "./public/assets/images/nivel2/maleza.png");

    this.load.image("jugar", "./public/assets/images/jugar.png");
    this.load.image("ayuda", "./public/assets/images/ayuda.png");
    this.load.image("volver", "./public/assets/images/volver.png");
    this.load.image("ajustes", "./public/assets/images/ajustes.png");
    this.load.image("ajustesPresionado", "./public/assets/images/ajustesPresionado.png");
    this.load.image("reanudar", "./public/assets/images/reanudar.png");
    this.load.image("fondoPausa", "./public/assets/images/fondoPausa.png");
    this.load.image("instrucciones", "./public/assets/images/instrucciones.png");
    this.load.image("cerrarBoton", "./public/assets/images/cerrarBoton.png");
    this.load.image("cerrarBotonPresionado", "./public/assets/images/cerrarBotonPresionado.png");
    this.load.image("flecha", "./public/assets/images/flecha.png");
    this.load.image("flechaPresionado", "./public/assets/images/flechaPresionado.png");
 
    this.load.image("inicio1", "./public/assets/images/cinematicas/cinematica inicio1.png");
    this.load.image("inicio2", "./public/assets/images/cinematicas/cinematica inicio2.png");
    this.load.image("inicio3", "./public/assets/images/cinematicas/cinematica inicio3.png");
    this.load.image("inicio4", "./public/assets/images/cinematicas/cinematica inicio4.png");
    


    this.load.image("juegoPausado", "./public/assets/images/juegoPausado.png")
    this.load.image("botonJugar", "./public/assets/images/botonJugar.png")
    this.load.image("botonJugarPresionado", "./public/assets/images/botonJugarPresionado.png")
    this.load.image("botonMenu", "./public/assets/images/botonMenu.png")
    this.load.image("botonMenuPresionado", "./public/assets/images/botonMenuPresionado.png")
    this.load.image("botonReintentar", "./public/assets/images/botonReintentar.png")
    this.load.image("botonReintentarPresionado", "./public/assets/images/botonReintentarPresionado.png")


    this.load.image("cartelPuntaje", "./public/assets/images/cartelPuntaje.png" )
    this.load.image("cartelPerdiste", "./public/assets/images/cartelPerdiste.png" )
    this.load.image("humita", "./public/assets/images/humita.png" )
    this.load.image("choripan", "./public/assets/images/choripan.png" )
    this.load.image("plato", "./public/assets/images/plato.png" )
    this.load.image("papel", "./public/assets/images/papel.png" )
    this.load.image("leyendaSuperado", "./public/assets/images/leyendaSuperado.png" )
    this.load.image("leyendaPerdiste", "./public/assets/images/leyendaPerdiste.png" )

    this.load.audio("recolectado", "./public/assets/audio/pickup.mp3");

    this.load.spritesheet("enemigo", "./public/assets/images/enemigo.png", {
      frameWidth: 200,
      frameHeight: 150,
    });

    this.load.spritesheet("personaje", "./public/assets/images/personaje.png", {
      frameWidth: 256,
      frameHeight: 351,
    });

    this.load.spritesheet("explosion", "./public/assets/images/explosion.png", {
      frameWidth: 150,
      frameHeight: 150,
    });
  }

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 8,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "personaje", frame: 9 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 10,
        end: 13,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpLeft",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 4,
        end: 3,
      }),
      frameRate: 10,
      repeat: 2,
    });

    this.anims.create({
      key: "jumpRight",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 14,
        end: 15,
      }),
      frameRate: 10,
      repeat: 2,
    });

    this.anims.create({
      key: "damageRight",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 16,
        end: 18,
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "damageLeft",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 2,
        end: 0,
      }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "enemiesLeft",
      frames: this.anims.generateFrameNumbers("enemigo", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "enemiesRight",
      frames: this.anims.generateFrameNumbers("enemigo", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true,
    });




    // init scene juego
    this.scene.start("nivel2");
  }

  update() {}
}
