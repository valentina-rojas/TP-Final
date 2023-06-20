export default class Nivel2 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel2");
  }

  init() {
    this.cantidadPan = 0;
    this.cantidadCarne = 0;
    this.temporizador = 90;
    this.puntajeFinal = 0;
    this.vidas = 3;

    this.juegoSuperado = false;
    this.juegoPerdido = false;
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "map2" });

    const capaCielo = map.addTilesetImage("cielo", "cielo2");
    const cieloLayer = map
      .createLayer("sky", capaCielo, 0, 0)
      .setOrigin(0)
      .setScrollFactor(0, 1);

    const capaEdificios = map.addTilesetImage("edificios", "edificios");
    const edificiosLayer = map
      .createLayer("buildings", capaEdificios, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.25);

    const capaArbustos1 = map.addTilesetImage("arbustos1", "arbustos1");
    const arbustos1Layer = map
      .createLayer("bushes1", capaArbustos1, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.4);

    const capaArbustos2 = map.addTilesetImage("arbustos2", "arbustos2");
    const arbustos2Layer = map
      .createLayer("bushes2", capaArbustos2, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.5);

    const capaArboles = map.addTilesetImage("arboles", "arboles");
    const arbolesLayer = map
      .createLayer("trees", capaArboles, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.75);

    const capaSuelo = map.addTilesetImage("suelo", "suelo2");
    const sueloLayer = map
      .createLayer("floor", capaSuelo, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(1);

    const capaPlataformas = map.addTilesetImage("plataformas", "plataformas2");
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

    // grupo vacío del elemento pan
    this.pan = this.physics.add.group();

    // si el tipo es "pan" agregar al grupo
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "pan": {
          // añadir en pantalla
          const pan = this.pan.create(x, y, "pan");
          break;
        }
      }
    });

    // grupo vacío del elemento carne
    this.carne = this.physics.add.group();

    // si el tipo es "carne" agregar al grupo
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "carne": {
          // añadir en pantalla
          const carne = this.carne.create(x, y, "carne");
          break;
        }
      }
    });

    this.maleza = this.physics.add.group();

    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "maleza": {
          const maleza = this.maleza.create(x, y, "maleza");
          maleza.setImmovable(true);
          break;
        }
      }
    });

    this.physics.add.collider(this.pan, plataformaLayer);
    this.physics.add.collider(this.carne, plataformaLayer);
    this.physics.add.collider(this.maleza, plataformaLayer);

    this.physics.add.collider(
      this.jugador,
      this.pan,
      this.recolectarPan,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.carne,
      this.recolectarCarne,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.maleza,
      this.perderVida,
      null,
      this
    );
    //temporizador
    this.time.addEvent({
      delay: 1000,
      callback: this.temporizadorDescendente,
      callbackScope: this,
      loop: true,
    });

    //texto que muestra el temporizador
    this.temporizadorTexto = this.add
      .text(15, 150, "Tiempo: " + this.temporizador, {
        fontSize: "80px",
        fill: "#ffffff",
        fontFamily: "arial",
        fontWeight: "bold",
      })
      .setScrollFactor(0);

    this.cantidadPanTexto = this.add
      .text(15, 15, "P: 0", {
        fontSize: "80px",
        fill: "#FFFFFF",
        fontFamily: "arial",
        fontWeight: "bold",
      })
      .setScrollFactor(0);

    this.cantidadCarneTexto = this.add
      .text(15, 80, "C: 0", {
        fontSize: "80px",
        fill: "#FFFFFF",
        fontFamily: "arial",
        fontWeight: "bold",
      })
      .setScrollFactor(0);

    //camara
    this.cameras.main.startFollow(this.jugador);
    //limites
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //para que la camara no se vaya fuera del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //grupo almacenar los sprites de los corazones
    this.corazones = this.add.group();

    // Obtiene las dimensiones de la pantalla
    const { width, height } = this.sys.game.canvas;

    // Posición del extremo derecho superior
    const posX = width - 505;
    const posY = 70;

    // Ajusta la posición de los corazones al extremo derecho superior
    const separacionX = 200; // Separación horizontal entre los corazones
    const separacionY = 0; // Separación vertical entre los corazones

    this.corazones.children.iterate((corazon, index) => {
      corazon.x = posX - index * separacionX;
      corazon.y = posY + index * separacionY;
    });

    // Número total de corazones a mostrar
    const totalCorazones = 3;

    // Crea los sprites de los corazones y añáde al grupo
    for (let i = 0; i < totalCorazones; i++) {
      const corazon = this.corazones.create(posX + i * 40, posY, "corazon");
      corazon.setScrollFactor(0); // Fija los corazones para que no se muevan con la cámara
      corazon.setOrigin(1, 0); // Ajusta el origen del sprite para alinearlos correctamente
      corazon.x -= i * (corazon.displayWidth + 45); // Ajusta la posición en el eje x con un espacio entre ellos
    }

    this.recolectable = this.sound.add("recolectado");
  }

  update() {
    //inicia escena de juego superado
    if (this.juegoSuperado) {
      //llama a funcion para calcular el puntaje
      this.calcularPuntaje();

      //inicio de escena
      this.scene.start("nivelSuperado", {
        puntajeFinal: this.puntajeFinal, //traspaso de data del puntaje
      });
    }

    //inicia escena de juego perdido
    if (this.juegoPerdido) {
      this.scene.start("nivelPerdido");
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
      } else {
        if (this.jugador.body.velocity.x > 0) {
          this.jugador.anims.play("jumpRight", true);
        } else if (this.jugador.body.velocity.x < 0) {
          this.jugador.anims.play("jumpLeft", true);
        }
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

  recolectarPan(jugador, pan) {
    pan.disableBody(true, true);

    const explosion = this.add.sprite(pan.x, pan.y, "explosion");
    explosion.play("explosion");

    this.recolectable.play();

    this.cantidadPan++;

    this.cantidadPanTexto.setText("H: " + this.cantidadPan);
  }

  recolectarCarne(jugador, carne) {
    carne.disableBody(true, true);

    const explosion = this.add.sprite(carne.x, carne.y, "explosion");
    explosion.play("explosion");

    this.recolectable.play();

    this.cantidadCarne++;

    this.cantidadCarneTexto.setText("H: " + this.cantidadCarne);
  }

  temporizadorDescendente() {
    this.temporizador = this.temporizador - 1;
    this.temporizadorTexto.setText("Tiempo: " + this.temporizador);
    //console.log(this.temporizador);

    if (this.jugador.body)
      if (this.temporizador <= 0) {
        //condicion perder si timer llega a 0
        this.juegoPerdido = true;
      }
  }

  perderVida() {
    if (this.jugador.body.blocked.left) {
      this.jugador.x += 150;
      console.log("choque izquierda");
      this.jugador.body.setVelocityX(200);
      this.jugador.anims.play("damageLeft");
    } else if (this.jugador.body.blocked.right) {
      this.jugador.x -= 150;
      console.log("choque derecha");
      this.jugador.body.setVelocityX(-200);
      this.jugador.anims.play("damageRight");
    }

    // restar una vida al jugador
    this.vidas--;

    console.log(this.vidas);

    // cambiar el sprite del corazón a uno gris
    const corazon = this.corazones.getChildren()[this.vidas];
    corazon.setTexture("corazonGris");

    if (this.vidas <= 0) {
      // si no quedan vidas, el juego se pierde
      this.juegoPerdido = true;
    }
  }

  calcularPuntaje() {
    const puntajeElementos = (this.cantidadHarina + this.cantidadMaiz) * 100;
    const puntajeVidas = this.vidas * 500;
    const puntajeTiempo = this.temporizador * 10;

    this.puntajeFinal = puntajeElementos + puntajeVidas + puntajeTiempo;
  }
}