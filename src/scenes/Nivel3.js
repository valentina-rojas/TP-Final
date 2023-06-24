export default class Nivel3 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel3");
  }

  init() {}

  preload() {}

  create() {
    const nivelActual = "nivel3";

    const map = this.make.tilemap({ key: "map3" });

    const capaCielo = map.addTilesetImage("cielo", "cielo3");
    const cieloLayer = map
      .createLayer("sky", capaCielo, 0, 0)
      .setOrigin(0)
      .setScrollFactor(0, 1);

    const capaAgua1 = map.addTilesetImage("aguaAtras", "aguaAtras");
    const Agua1Layer = map
      .createLayer("water1", capaAgua1, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1);

    const capaGlaciares1 = map.addTilesetImage(
      "hielosGrandes",
      "hielosGrandes"
    );
    const glaciares1Layer = map
      .createLayer("glaciers1", capaGlaciares1, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.25);

    const capaGlaciares2 = map.addTilesetImage(
      "hielosGrandes",
      "hielosGrandes"
    );
    const glaciares2Layer = map
      .createLayer("glaciers2", capaGlaciares2, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.5);

    const capaAgua2 = map.addTilesetImage("aguaMedia", "aguaMedia");
    const Agua2Layer = map
      .createLayer("water2", capaAgua2, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.75);

    const capaGlaciares3 = map.addTilesetImage("hielosChicos", "hielosChicos");
    const glaciares3Layer = map
      .createLayer("glaciers3", capaGlaciares3, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(1);

    const capaPlataformas = map.addTilesetImage("plataformas", "plataformas3");
    const plataformaLayer = map.createLayer("platforms", capaPlataformas, 0, 0);
    plataformaLayer.setCollisionByProperty({ colision: true });

    const objectosLayer = map.getObjectLayer("objetos");

    let spawnPoint = map.findObject("objetos", (obj) => obj.name === "jugador");
    console.log(spawnPoint);

    this.jugador = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "personaje"
    );

    this.physics.add.collider(this.jugador, plataformaLayer);
    this.jugador.setBounce(0.1);
    this.jugador.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    //camara
    this.cameras.main.startFollow(this.jugador);
    //limites
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //para que la camara no se vaya fuera del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    //movimiento de personaje
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-600);
      if (this.jugador.body.blocked.down) {
        this.jugador.anims.play("left", true);
      } else {
        this.jugador.anims.play("jumpLeft", true);
      }
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(600);
      if (this.jugador.body.blocked.down) {
        this.jugador.anims.play("right", true);
      } else {
        this.jugador.anims.play("jumpRight", true);
      }
    } else {
      this.jugador.setVelocityX(0);
      if (this.jugador.body.blocked.down) {
        this.jugador.anims.play("turn");
      }
    }

    if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(-900);
      if (this.jugador.body.velocity.x > 0) {
        this.jugador.anims.play("jumpRight");
      } else if (this.jugador.body.velocity.x < 0) {
        this.jugador.anims.play("jumpLeft");
      }
    }
    //movimiento de personaje
    if (this.cursors.left.isDown) {
      this.jugador.setVelocityX(-600);
      if (this.jugador.body.blocked.down) {
        this.jugador.anims.play("left", true);
      } else {
        this.jugador.anims.play("jumpLeft", true);
      }
    } else if (this.cursors.right.isDown) {
      this.jugador.setVelocityX(600);
      if (this.jugador.body.blocked.down) {
        this.jugador.anims.play("right", true);
      } else {
        this.jugador.anims.play("jumpRight", true);
      }
    } else {
      this.jugador.setVelocityX(0);
      if (this.jugador.body.blocked.down) {
        this.jugador.anims.play("turn");
      }
    }

    if (this.cursors.up.isDown && this.jugador.body.blocked.down) {
      this.jugador.setVelocityY(-900);
      if (this.jugador.body.velocity.x > 0) {
        this.jugador.anims.play("jumpRight");
      } else if (this.jugador.body.velocity.x < 0) {
        this.jugador.anims.play("jumpLeft");
      }
    }
  }
}
