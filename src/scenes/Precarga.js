export default class Precarga extends Phaser.Scene {
    constructor() {
      // key of the scene
      // the key will be used to start the scene by other scenes
      super("precarga");
    }
  
    init() {
  
    }
  
    preload() {
      this.load.tilemapTiledJSON("map", "./public/assets/tilemaps/nivel1.json");
 

      this.load.image("tilesFondo", "./public/assets/images/fondo.png");
      this.load.image("tilesPlataforma", "./public/assets/images/plataformas.png");
      this.load.image("jugador", "./public/assets/images/jugador.png");
  
      this.load.image("harina", "./public/assets/images/harina.png");
      this.load.image("maiz", "./public/assets/images/choclo.png");
      this.load.image("cactus", "./public/assets/images/cactus.png");
  
      
      this.load.spritesheet("dude", "./public/assets/images/personaje.png", {
        frameWidth: 222,
        frameHeight: 352,
      });
    }
  
    create() {
     
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { frames: [0, 1, 2, 3] }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });
    
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { frames: [5, 6, 7, 8] }),
      frameRate: 10,
      repeat: -1,
    });


     // init scene juego
     this.scene.start("nivel1");
  
    }
  
    update() {
   
    }
  }