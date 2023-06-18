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
    this.puntajeFinal = 0;
    this.temporizador = 90;
    this.vidas = 3;

    this.juegoSuperado = false;
    this.juegoPerdido = false;
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "map" });

    const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
    const fondoLayer = map
      .createLayer("background", capaFondo, 0, 0)
      .setOrigin(0)
      .setScrollFactor(0, 1);

    const capaPlataformas = map.addTilesetImage(
      "plataformas",
      "tilesPlataforma"
    );

    const capaNubes = map.addTilesetImage("nubes", "nube");
    const nibesLayer = map
      .createLayer("clouds", capaNubes, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.25);


    const capaMontañas = map.addTilesetImage("montañas", "montañas");
    const montañasLayer = map
      .createLayer("mountains", capaMontañas, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.5);

    const capaSuelo = map.addTilesetImage("suelo", "suelo");
    const sueloLayer = map
      .createLayer("floor", capaSuelo, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(1);

    const plataformaLayer = map.createLayer("platforms", capaPlataformas, 0, 0);

    const objectosLayer = map.getObjectLayer("objetos");

    plataformaLayer.setCollisionByProperty({ colision: true });

    console.log("spawn point player", objectosLayer);

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

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "salida");

    this.cursors = this.input.keyboard.createCursorKeys();

    // grupo vacío del elemento harina
    this.harina = this.physics.add.group();

    // si el tipo es "harina" agregar al grupo
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "harina": {
          // añadir harina en pantalla
          const harina = this.harina.create(x, y, "harina");
          break;
        }
      }
    });

    // grupo de maiz
    this.maiz = this.physics.add.group();

    // si el tipo es "maiz" agregar al grupo
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "maiz": {
          // añadir maiz en pantalla
          const maiz = this.maiz.create(x, y, "maiz");
          break;
        }
      }
    });

    //grupo de enemigos
    this.enemigo = this.physics.add.group();

    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "enemigo": {
          // añadir enemigo en pantalla
          const enemigo = this.enemigo.create(x, y, "enemigo");
          break;
        }
      }
    });

    //grupo de cactus
    this.cactus = this.physics.add.group();

    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "cactus": {
          // añadir cactus en pantalla
          const cactus = this.cactus.create(x, y, "cactus");
          cactus.setImmovable(true);
          break;
        }
      }
    });

    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.collider(this.harina, plataformaLayer);
    this.physics.add.collider(this.maiz, plataformaLayer);
    this.physics.add.collider(this.enemigo, plataformaLayer);
    this.physics.add.collider(this.cactus, plataformaLayer);
    this.physics.add.collider(this.enemigo, this.cactus);

    this.physics.add.collider(
      this.jugador,
      this.cactus,
      this.perderVida,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.enemigo,
      this.perderVida,
      null,
      this
    );
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

    //overlap entre jugador y salida
    this.physics.add.overlap(
      this.jugador,
      this.salida,
      this.verificarRecolectables,
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
    this.temporizadorTexto = this.add.text(
      15,
      150,
      "Tiempo: " + this.temporizador,
      {
        fontSize: "80px",
        fill: "#ffffff",
        fontFamily: "arial",
        fontWeight: "bold",
      }
    );

    this.cantidadHarinaTexto = this.add.text(15, 15, "H: 0", {
      fontSize: "80px",
      fill: "#FFFFFF",
      fontFamily: "arial",
      fontWeight: "bold",
    });

    this.cantidadMaizTexto = this.add.text(15, 80, "M: 0", {
      fontSize: "80px",
      fill: "#FFFFFF",
      fontFamily: "arial",
      fontWeight: "bold",
    });

    //botón para la escena de pausa
    const stopButton = this.add.sprite(2500, 110, "ajustes").setInteractive();
    stopButton
      .on("pointerup", () => {
        this.scene.pause("nivel1");
        this.scene.launch("pausa");
      })
      .setScrollFactor(0);

    //camara
    this.cameras.main.startFollow(this.jugador);

    //limites
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //para que la camara no se vaya fuera del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //fijar texto para que no se mueva con la camara
    this.cantidadHarinaTexto.setScrollFactor(0);
    this.cantidadMaizTexto.setScrollFactor(0);
    this.temporizadorTexto.setScrollFactor(0);

    // Añadir enemigos en pantalla
    this.enemigo.getChildren().forEach((enemigo) => {
      enemigo.anims.play("enemiesLeft");
      enemigo.body.setVelocityX(-200); // Velocidad inicial del enemigo
    });

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
    this.updateEnemigos();

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
      this.jugador.setVelocityY(-1000);
      if (this.jugador.body.velocity.x > 0) {
        this.jugador.anims.play("jumpRight");
      } else if (this.jugador.body.velocity.x < 0) {
        this.jugador.anims.play("jumpLeft");
      }
    }
  }

  recolectarHarina(jugador, harina) {
    harina.disableBody(true, true);

    const explosion = this.add.sprite(harina.x, harina.y, "explosion");
    explosion.play("explosion");

    this.recolectable.play();

    this.cantidadHarina++;

    this.cantidadHarinaTexto.setText("H: " + this.cantidadHarina);
  }

  recolectarMaiz(jugador, maiz) {
    maiz.disableBody(true, true);

    const explosion = this.add.sprite(maiz.x, maiz.y, "explosion");
    explosion.play("explosion");

    this.recolectable.play();

    this.cantidadMaiz++;

    this.cantidadMaizTexto.setText("H: " + this.cantidadMaiz);
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

  verificarRecolectables() {
    if (this.cantidadMaiz >= 1 && this.cantidadHarina >= 1) {
      this.juegoSuperado = true;
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

  // Actualizar la posición de cada enemigo en cada fotograma
  updateEnemigos() {
    this.enemigo.getChildren().forEach((enemigo) => {
      if (enemigo.body.blocked.left || enemigo.body.touching.left) {
        // Colisión con un obstáculo a la izquierda, cambiar dirección y animación
        enemigo.body.setVelocityX(200); // Cambiar dirección
        enemigo.anims.play("enemiesRight", true); // Reproducir animación "right"
      } else if (enemigo.body.blocked.right || enemigo.body.touching.right) {
        // Colisión con un obstáculo a la derecha, cambiar dirección y animación
        enemigo.body.setVelocityX(-200); // Cambiar dirección
        enemigo.anims.play("enemiesLeft", true); // Reproducir animación "left"
      }
    });
  }
}
