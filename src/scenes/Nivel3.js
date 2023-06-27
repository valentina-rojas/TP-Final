export default class Nivel3 extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("nivel3");
  }

  init() {
    this.temporizador = 90;
    this.puntajeFinal = 0;
    this.vidas = 3;
    this.cantidadCentolla = 0;
    this.cantidadLechuga = 0;

    this.juegoSuperado = false;
    this.juegoPerdido = false;
  }

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
      .setScrollFactor(0.9);


    const capaAgua3 = map.addTilesetImage("aguaFrente", "aguaFrente");
    const Agua3Layer = map
      .createLayer("water3", capaAgua3, 0, 0)
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

    spawnPoint = map.findObject("objetos", (obj) => obj.name === "salida");
    console.log("spawn point salida ", spawnPoint);
    this.salida = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "salida");


    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.centolla = this.physics.add.group();

    
    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "centolla": {
          // añadir en pantalla
          const centolla = this.centolla.create(x, y, "centolla");
          break;
        }
      }
    });


    this.lechuga = this.physics.add.group();

    objectosLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "lechuga": {
          // añadir en pantalla
          const lechuga = this.lechuga.create(x, y, "lechuga");
          break;
        }
      }
    });

  

    //camara
    this.cameras.main.startFollow(this.jugador);
    //limites
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    //para que la camara no se vaya fuera del mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.hielos = this.physics.add.group();

    this.physics.add.collider(this.salida, plataformaLayer);
    this.physics.add.collider(this.centolla, plataformaLayer);
    this.physics.add.collider(this.lechuga, plataformaLayer);

    this.physics.add.collider(
      this.jugador,
      this.centolla,
      this.recolectarCentolla,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.lechuga,
      this.recolectarLechuga,
      null,
      this
    );

    this.physics.add.overlap(
      this.jugador,
      this.salida,
      this.verificarRecolectables,
      null,
      this
    );

    this.physics.add.collider(
      this.hielos,
      plataformaLayer,
      this.colisionHielos,
      null,
      this
    );

    this.physics.add.collider(
      this.jugador,
      this.hielos,
      this.perderVida,
      null,
      this
    );

    this.time.addEvent({
      delay: 2000,
      callback: this.caidaHielos,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.temporizadorDescendente,
      callbackScope: this,
      loop: true,
    });


    this.add.image(366, 110, "reloj").setScrollFactor(0);
    this.add.image(470, 110, "centolla").setScale(0.5).setScrollFactor(0);
    this.add.image(250, 110, "lechuga").setScale(0.5).setScrollFactor(0);

    //texto que muestra el temporizador
    this.temporizadorTexto = this.add
      .text(77, 80, this.temporizador, {
        fontSize: "60px",
        fill: "#000",
        fontFamily: "cursive",
        fontWeight: "bold",
      })
      .setScrollFactor(0);

    this.cantidadLechugaTexto = this.add
      .text(300, 80, "0/3", {
        fontSize: "50px",
        fill: "#000",
        fontFamily: "cursive",
        fontWeight: "bold",
      })
      .setScrollFactor(0);

    this.cantidadCentollaTexto = this.add
      .text(520, 80, "0/5", {
        fontSize: "50px",
        fill: "#000",
        fontFamily: "cursive",
        fontWeight: "bold",
      })
      .setScrollFactor(0);


    //botón para la escena de pausa
    const pausaBoton = this.add.sprite(2500, 110, "ajustes").setInteractive();
    pausaBoton
      .on("pointerup", () => {
       this.musica.pause();
        this.click.play();
        this.scene.pause("nivel3");
        this.scene.launch("pausa", { nivelActual: nivelActual,  musica: this.musica });
      })
      .on("pointerover", () => {
        pausaBoton.setTexture("ajustesPresionado");
      })
      .on("pointerout", () => {
        pausaBoton.setTexture("ajustes");
      })
      .setScrollFactor(0);

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
    this.musica = this.sound.add("musica1")


    this.musica.play();
  }

  update() {


    //inicia escena de juego superado
    if (this.juegoSuperado) {
      this.musica.stop();
      this.ganaste.play();
      //llama a funcion para calcular el puntaje
      this.calcularPuntaje();

      this.scene.pause("nivel3");
      this.scene.launch("nivelSuperado", {
        puntajeFinal: this.puntajeFinal,
        nivelActual: "nivel3", //traspaso de data
      });
    }

    //inicia escena de juego perdido
    if (this.juegoPerdido) {
      this.musica.stop();
      this.perdiste1.play();

      this.scene.pause("nivel3");
      this.scene.launch("nivelPerdido", {
        nivelActual: "nivel3", //traspaso de data
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

  perderVida(jugador, hielos) {

    this.daño.play();
    hielos.disableBody(true, true);

    const explosion = this.add.sprite(hielos.x, hielos.y, "explosion2");
    explosion.play("explosion2");

    hielos.destroy();
    this.time.delayedCall(1000, () => {
      explosion.destroy();
    });

    // Deshabilitar la interacción del jugador temporalmente
    this.jugador.disableBody(true, true);

    // Reproducir la animación de daño del personaje
    this.jugador.setAlpha(0.5); // Hacer el personaje semitransparente

    const mareo = this.add.sprite(jugador.x, jugador.y, "personaje");
    mareo.play("damageUp");

    this.time.delayedCall(1000, () => {
      mareo.destroy();
    });

    // Establecer un temporizador para restaurar el estado del jugador después de cierto tiempo
    this.time.delayedCall(1000, () => {
      // Restaurar el estado del jugador
      this.jugador.enableBody(true, jugador.x, jugador.y, true, true);
      this.jugador.setAlpha(1); // Restaurar la opacidad del personaje
    });

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

  caidaHielos() {
    // Create and position the obstacle above the player
    const hielos = this.physics.add.sprite(
      this.jugador.x,
      this.jugador.y - 1500,
      "hielos"
    );
    // Set obstacle properties, such as velocity and gravity
    hielos.setVelocityY(300);
    hielos.setGravityY(1000);
    hielos.setCollideWorldBounds(true);

    this.hielos.add(hielos); // Agregar el objeto de hielo al grupo
  }

  colisionHielos(hielos) {

    this.daño.play();
    hielos.disableBody(true, true);

    const explosion = this.add.sprite(hielos.x, hielos.y, "explosion2");
    explosion.play("explosion2");

    hielos.destroy();
    this.time.delayedCall(1000, () => {
      explosion.destroy();
    });
  }

  recolectarCentolla(jugador, centolla){
  
     centolla.disableBody(true, true);
  
      const explosion = this.add.sprite(centolla.x, centolla.y, "explosion");
      explosion.play("explosion");
  
      this.recolectable.play();
  
      this.cantidadCentolla++;
  
      this.cantidadCentollaTexto.setText(this.cantidadCentolla + "/5");
    
  }

  recolectarLechuga(jugador, lechuga){
  
    lechuga.disableBody(true, true);
 
     const explosion = this.add.sprite(lechuga.x, lechuga.y, "explosion");
     explosion.play("explosion");
 
     this.recolectable.play();
 
     this.cantidadLechuga++;
 
     this.cantidadLechugaTexto.setText(this.cantidadLechuga + "/3");
   
 }
  
  verificarRecolectables() {
    if (this.cantidadCentolla >= 5 && this.cantidadLechuga >= 3) {
      this.juegoSuperado = true;
    }
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

  calcularPuntaje() {
    const puntajeElementos = (this.cantidadCentolla + this.cantidadLechuga) * 100;
    const puntajeVidas = this.vidas * 500;
    const puntajeTiempo = this.temporizador * 10;

    this.puntajeFinal = puntajeElementos + puntajeVidas + puntajeTiempo;
  }
}
