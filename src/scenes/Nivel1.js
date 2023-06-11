// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Nivel1 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel1");
  }

  init() {
    this.cantidadHarina = 0;
    this.cantidadMaiz = 0;
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)

    const capaFondo = map.addTilesetImage("fondo", "tilesFondo");

    const capaPlataformas = map.addTilesetImage(
      "plataformas",
      "tilesPlataforma"
    );

    // Parameters: layer name (or index) from Tiled, tileset, x, y

    const fondoLayer = map.createLayer("background", capaFondo, 0, 0);

    const plataformaLayer = map.createLayer("platforms", capaPlataformas, 0, 0);

    const objectosLayer = map.getObjectLayer("objetos");

    plataformaLayer.setCollisionByProperty({ colision: true });

    console.log("spawn point player", objectosLayer);

    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);

    // The player and its settings
    this.jugador = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");

    this.physics.add.collider(this.jugador, plataformaLayer);
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    // grupo vacío del elemento harina
    this.harina = this.physics.add.group();

    // si el tipo es "harina" agregar al grupo
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "harina": {
          // añadir harina en pantalla
          const star = this.harina.create(x, y, "harina");
          break;
        }
      }
    });

    // grupo vacio del elemento maiz
    this.maiz = this.physics.add.group();

    // si el tipo es "maiz" agregar al grupo
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "maiz": {
          // añadir maiz en pantalla
          const star = this.maiz.create(x, y, "maiz");
          break;
        }
      }
    });

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "cactus");

    this.cactus = this.add.image(spawnPoint.x, spawnPoint.y, "cactus");

    //colision entre harina y plataformas
    this.physics.add.collider(this.harina, plataformaLayer);
    this.physics.add.collider(this.maiz, plataformaLayer);
    this.physics.add.collider(this.cactus, plataformaLayer);

    //colision entre jugador y harina
    this.physics.add.collider(
      this.jugador,
      this.harina,
      this.recolectarHarina,
      null,
      this
    );

    //colision entre jugador y maiz
    this.physics.add.collider(
      this.jugador,
      this.maiz,
      this.recolectarMaiz,
      null,
      this
    );

    this.cantidadHarinaTexto = this.add.text(15, 15, "H: 0", {
      fontSize: "50px",
      fill: "#FFFFFF",
    });

    this.cantidadMaizTexto = this.add.text(15, 55, "M: 0", {
      fontSize: "50px",
      fill: "#FFFFFF",
    });

    //camara
    this.cameras.main.startFollow(this.jugador);

    //limites
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //para que la camarra no se vaya fuera del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //fijar texto para que no se mueva con la camara
    this.cantidadHarinaTexto.setScrollFactor(0);

    //fijar texto para que no se mueva con la camara
    this.cantidadMaizTexto.setScrollFactor(0);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-500);
      this.jugador.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(500);
      this.jugador.anims.play("right", true);
    }
    //stop
    else {
      this.jugador.setVelocityX(0);
      this.jugador.anims.play("turn");
    }

    //jump
    if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(-500);
    }
  }

  recolectarHarina(jugador, harina) {
    harina.disableBody(true, true);

    this.cantidadHarina++;

    this.cantidadHarinaTexto.setText("H: " + this.cantidadHarina);
  }

  recolectarMaiz(jugador, maiz) {
    maiz.disableBody(true, true);

    this.cantidadMaiz++;

    this.cantidadMaizTexto.setText("H: " + this.cantidadMaiz);
  }

  colisionCactus(jugador, cactus) {}
}
