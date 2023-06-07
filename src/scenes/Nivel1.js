// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel1");
  }

  init() {

  }

  preload() {
    this.load.tilemapTiledJSON("map", "./public/assets/tilemaps/nivel1.json");
 

    this.load.image("tilesFondo", "./public/assets/images/fondo.png");

    this.load.image("jugador", "./public/assets/images/jugador.png")
  }

  create() {
   
    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)

    const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
   

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const fondoLayer = map.createLayer("background", capaFondo, 0, 0);
   

  }

  update() {
 
  }
}
