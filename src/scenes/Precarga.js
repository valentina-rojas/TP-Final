export default class Precarga extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("precarga");
  }

  init() {}

  preload() {
    this.load.tilemapTiledJSON("map", "./public/assets/tilemaps/nivel1.json");

    this.load.image("tilesFondo", "./public/assets/images/fondo.png");
    this.load.image(
      "tilesPlataforma",
      "./public/assets/images/plataformas.png"
    );
    this.load.image("jugador", "./public/assets/images/jugador.png");

    this.load.image("harina", "./public/assets/images/harina.png");
    this.load.image("maiz", "./public/assets/images/choclo.png");
    this.load.image("cactus", "./public/assets/images/cactus.png");
    this.load.image("jugar", "./public/assets/images/jugar.png");
    this.load.image("ayuda", "./public/assets/images/ayuda.png");
    this.load.image("volver", "./public/assets/images/volver.png");
    this.load.image("ajustes", "./public/assets/images/ajustes.png");

    this.load.spritesheet("enemigo", "./public/assets/images/enemigo.png", {
      frameWidth: 200,
      frameHeight: 150,
    });

    this.load.spritesheet("personaje", "./public/assets/images/personaje.png", {
      frameWidth: 222,
      frameHeight: 352,
    });
  }

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 1,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "personaje", frame: 5 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 6,
        end: 9,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: [{ key: "personaje", frame: 11 }],
      frameRate: 10,
    });


    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("enemigo", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

 this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("enemigo", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    
    // init scene juego
    this.scene.start("menu");
  }

  update() {}
}
