// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Nivel2 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel2");
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
    const nivelActual = "nivel2";

    const map = this.make.tilemap({ key: "map" });

    const capaFondo = map.addTilesetImage("fondo", "tilesFondo");
    const fondoLayer = map
      .createLayer("background", capaFondo, 0, 0)
      .setOrigin(0)
      .setScrollFactor(0, 1);

    const capaMontañas = map.addTilesetImage("montañas", "montañas");
    const montañasLayer = map
      .createLayer("mountains", capaMontañas, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.25);

    const capaArbustos1 = map.addTilesetImage("arbustos1", "arbustos01");
    const arbustos1Layer = map
      .createLayer("bushes1", capaArbustos1, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.4);

    const capaArbustos2 = map.addTilesetImage("arbustos2", "arbustos02");
    const arbustos2Layer = map
      .createLayer("bushes2", capaArbustos2, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.5);

    const capaSuelo = map.addTilesetImage("suelo", "suelo");
    const sueloLayer = map
      .createLayer("floor", capaSuelo, 0, 0)
      .setOrigin(0, 1)
      .setScrollFactor(0.75);

    const capaPlataformas = map.addTilesetImage(
      "plataformas",
      "tilesPlataforma"
    );
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
      this.colisionCactus,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.enemigo,
      this.colisionEnemigo,
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

    this.add.image(366, 105, "reloj").setScrollFactor(0);
    this.add.image(490, 100, "maiz").setScale(0.7).setScrollFactor(0);
    this.add.image(275, 100, "harina").setScale(0.7).setScrollFactor(0);

    //texto que muestra el temporizador
    this.temporizadorTexto = this.add.text(105, 70, this.temporizador, {
      fontSize: "75px",
      fill: "#000",
      fontFamily: "cursive",
      fontWeight: "bold",
    });

    this.cantidadHarinaTexto = this.add.text(320, 90, "0/3", {
      fontSize: "50px",
      fill: "#000",
      fontFamily: "cursive",
      fontWeight: "bold",
    });

    this.cantidadMaizTexto = this.add.text(540, 90, "0/7", {
      fontSize: "50px",
      fill: "#000",
      fontFamily: "cursive",
      fontWeight: "bold",
    });

    //botón para la escena de pausa
    const pausaBoton = this.add.sprite(2500, 110, "ajustes").setInteractive();
    pausaBoton
      .on("pointerup", () => {
        this.musica.pause();
        this.click.play();
        this.scene.pause("nivel2");
        this.scene.launch("pausa", {
          nivelActual: nivelActual,
          musica: this.musica,
        });
      })
      .on("pointerover", () => {
        pausaBoton.setTexture("ajustesPresionado");
      })
      .on("pointerout", () => {
        pausaBoton.setTexture("ajustes");
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
    this.click = this.sound.add("click");
    this.daño = this.sound.add("daño");
    this.ganaste = this.sound.add("ganaste");
    this.perdiste1 = this.sound.add("perdiste1");
    this.perdiste2 = this.sound.add("perdiste2");
    this.musica = this.sound.add("musica4");

    this.musica.play();
  }

  update() {
    this.updateEnemigos();

    //inicia escena de juego superado
    if (this.juegoSuperado) {
      this.musica.stop();
      this.ganaste.play();
      //llama a funcion para calcular el puntaje
      this.calcularPuntaje();

      //inicio de escena
      this.scene.pause("nivel2");
      this.scene.launch("nivelSuperado", {
        puntajeFinal: this.puntajeFinal,
        nivelActual: "nivel2", //traspaso de data del puntaje
      });
    }

    //inicia escena de juego perdido
    if (this.juegoPerdido) {
      this.musica.stop();
      this.perdiste2.play();

      this.scene.pause("nivel2");
      this.scene.launch("nivelPerdido", {
        nivelActual: "nivel2", //traspaso de data
      });
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

  recolectarHarina(jugador, harina) {
    harina.disableBody(true, true);

    const explosion = this.add.sprite(harina.x, harina.y, "explosion");
    explosion.play("explosion");

    this.recolectable.play();

    this.cantidadHarina++;

    this.cantidadHarinaTexto.setText(this.cantidadHarina + "/3");
  }

  recolectarMaiz(jugador, maiz) {
    maiz.disableBody(true, true);

    const explosion = this.add.sprite(maiz.x, maiz.y, "explosion");
    explosion.play("explosion");

    this.recolectable.play();

    this.cantidadMaiz++;

    this.cantidadMaizTexto.setText(this.cantidadMaiz + "/7");
  }

  temporizadorDescendente() {
    this.temporizador = this.temporizador - 1;
    this.temporizadorTexto.setText(this.temporizador);
    //console.log(this.temporizador);

    if (this.temporizador <= 0) {
      //condicion perder si timer llega a 0

      this.juegoPerdido = true;
    }
  }

  verificarRecolectables() {
    if (this.cantidadMaiz >= 7 && this.cantidadHarina >= 3) {
      this.juegoSuperado = true;
    }
  }

  perderVida(jugador) {
    this.daño.play({ volume: 0.3 });
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

  colisionCactus(jugador, cactus) {
    if (this.jugador.body.blocked.left) {
      this.jugador.x += 150;
      console.log("choque izquierda");
      this.jugador.body.setVelocityX(200);

      // Deshabilitar la interacción del jugador temporalmente
      this.jugador.disableBody(true, true);
      // Reproducir la animación de daño del personaje
      this.jugador.setAlpha(0.5); // Hacer el personaje semitransparente

      const choqueIzquierda = this.add.sprite(
        jugador.x,
        jugador.y,
        "personaje"
      );
      choqueIzquierda.play("damageLeft");

      this.time.delayedCall(1000, () => {
        choqueIzquierda.destroy();
      });
    } else if (this.jugador.body.blocked.right) {
      this.jugador.x -= 150;
      console.log("choque derecha");
      this.jugador.body.setVelocityX(-200);

      // Deshabilitar la interacción del jugador temporalmente
      this.jugador.disableBody(true, true);
      // Reproducir la animación de daño del personaje
      this.jugador.setAlpha(0.5); // Hacer el personaje semitransparente

      const choqueDerecha = this.add.sprite(jugador.x, jugador.y, "personaje");
      choqueDerecha.play("damageRight");

      this.time.delayedCall(1000, () => {
        choqueDerecha.destroy();
      });
    } else if (this.jugador.body.blocked.down) {
      this.jugador.body.setVelocityY(-400);
    }

    // Establecer un temporizador para restaurar el estado del jugador después de cierto tiempo
    this.time.delayedCall(1000, () => {
      // Restaurar el estado del jugador
      this.jugador.enableBody(true, jugador.x, jugador.y, true, true);
      this.jugador.setAlpha(1); // Restaurar la opacidad del personaje
    });

    this.perderVida();
  }

  colisionEnemigo(jugador, enemigos) {
    if (this.jugador.body.touching.left) {
      this.jugador.x += 150;
      console.log("choque izquierda");
      this.jugador.body.setVelocityX(200);

      // Deshabilitar la interacción del jugador temporalmente
      this.jugador.disableBody(true, true);
      // Reproducir la animación de daño del personaje
      this.jugador.setAlpha(0.5); // Hacer el personaje semitransparente

      const choqueIzquierda = this.add.sprite(
        jugador.x,
        jugador.y,
        "personaje"
      );
      choqueIzquierda.play("damageLeft");

      this.time.delayedCall(1000, () => {
        choqueIzquierda.destroy();
      });
    } else if (this.jugador.body.touching.right) {
      this.jugador.x -= 150;
      console.log("choque derecha");
      this.jugador.body.setVelocityX(-200);

      // Deshabilitar la interacción del jugador temporalmente
      this.jugador.disableBody(true, true);
      // Reproducir la animación de daño del personaje
      this.jugador.setAlpha(0.5); // Hacer el personaje semitransparente

      const choqueDerecha = this.add.sprite(jugador.x, jugador.y, "personaje");
      choqueDerecha.play("damageRight");

      this.time.delayedCall(1000, () => {
        choqueDerecha.destroy();
      });
    } else if (this.jugador.body.touching.down) {
      this.jugador.body.setVelocityY(-400);
    }

    // Establecer un temporizador para restaurar el estado del jugador después de cierto tiempo
    this.time.delayedCall(1000, () => {
      // Restaurar el estado del jugador
      this.jugador.enableBody(true, jugador.x, jugador.y, true, true);
      this.jugador.setAlpha(1); // Restaurar la opacidad del personaje
    });

    this.perderVida();
  }
}
