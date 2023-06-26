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
    this.load.tilemapTiledJSON("map3", "./public/assets/tilemaps/nivel3.json");

    // nivel 1
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

    //nivel 2
    this.load.image(
      "arbustos01",
      "./public/assets/images/nivel1/arbustos1.png"
    );
    this.load.image(
      "arbustos02",
      "./public/assets/images/nivel1/arbustos2.png"
    );
    this.load.image("cielo2", "./public/assets/images/nivel2/cielo.png");
    this.load.image("arboles", "./public/assets/images/nivel2/arboles.png");
    this.load.image("arbustos1", "./public/assets/images/nivel2/arbustos1.png");
    this.load.image("arbustos2", "./public/assets/images/nivel2/arbustos2.png");
    this.load.image("edificios", "./public/assets/images/nivel2/edificios.png");
    this.load.image("suelo1", "./public/assets/images/nivel2/suelo 1.png");
    this.load.image("suelo2", "./public/assets/images/nivel2/suelo 2.png");
    this.load.image(
      "plataformas2",
      "./public/assets/images/nivel2/plataformas.png"
    );
    this.load.image("pan", "./public/assets/images/nivel2/pan.png");
    this.load.image("carne", "./public/assets/images/nivel2/carne.png");
    this.load.image("maleza", "./public/assets/images/nivel2/maleza.png");

    //nivel 3
    this.load.image("cielo3", "./public/assets/images/nivel3/cielo.png");
    this.load.image("aguaAtras", "./public/assets/images/nivel3/aguaAtras.png");
    this.load.image(
      "aguaFrente",
      "./public/assets/images/nivel3/aguaFrente.png"
    );
    this.load.image("aguaMedia", "./public/assets/images/nivel3/aguaMedia.png");
    this.load.image(
      "hielosChicos",
      "./public/assets/images/nivel3/hielosChicos.png"
    );
    this.load.image(
      "hielosGrandes",
      "./public/assets/images/nivel3/hielosGrandes.png"
    );
    this.load.image(
      "plataformas3",
      "./public/assets/images/nivel3/plataformas.png"
    );
    this.load.image("hielos", "./public/assets/images/nivel3/hielos.png");
    this.load.image("centolla", "./public/assets/images/nivel3/centolla.png");
    this.load.image("lechuga", "./public/assets/images/nivel3/lechuga.png");

    this.load.image("jugar", "./public/assets/images/jugar.png");
    this.load.image("ayuda", "./public/assets/images/ayuda.png");
    this.load.image("volver", "./public/assets/images/volver.png");
    this.load.image("ajustes", "./public/assets/images/ajustes.png");
    this.load.image(
      "ajustesPresionado",
      "./public/assets/images/ajustesPresionado.png"
    );
    this.load.image("reanudar", "./public/assets/images/reanudar.png");
    this.load.image("fondoPausa", "./public/assets/images/fondoPausa.png");
    this.load.image(
      "instrucciones",
      "./public/assets/images/instrucciones.png"
    );
    this.load.image("cerrarBoton", "./public/assets/images/cerrarBoton.png");
    this.load.image(
      "cerrarBotonPresionado",
      "./public/assets/images/cerrarBotonPresionado.png"
    );
    this.load.image("flecha", "./public/assets/images/flecha.png");
    this.load.image(
      "flechaPresionado",
      "./public/assets/images/flechaPresionado.png"
    );

    //escena de inicio
    this.load.image(
      "inicio1",
      "./public/assets/images/cinematicas/cinematica inicio1.png"
    );
    this.load.image(
      "inicio2",
      "./public/assets/images/cinematicas/cinematica inicio2.png"
    );
    this.load.image(
      "inicio3",
      "./public/assets/images/cinematicas/cinematica inicio3.png"
    );
    this.load.image(
      "inicio4",
      "./public/assets/images/cinematicas/cinematica inicio4.png"
    );
    this.load.image("saltar", "./public/assets/images/cinematicas/saltar.png");
    this.load.image(
      "saltarPresionado",
      "./public/assets/images/cinematicas/saltarPresionado.png"
    );
    this.load.image(
      "siguiente",
      "./public/assets/images/cinematicas/siguiente.png"
    );
    this.load.image(
      "siguientePresionado",
      "./public/assets/images/cinematicas/siguientePresionado.png"
    );
    this.load.image(
      "transparente",
      "./public/assets/images/cinematicas/transparente2.png"
    );

    this.load.image("fin", "./public/assets/images/cinematicas/fin.png");
    this.load.image("fin1", "./public/assets/images/cinematicas/fin1.png");
    this.load.image("fin2", "./public/assets/images/cinematicas/fin2.png");
    this.load.image("home", "./public/assets/images/cinematicas/home.png");
    this.load.image(
      "homePresionado",
      "./public/assets/images/cinematicas/homePresionado.png"
    );

    //escena pausa
    this.load.image("juegoPausado", "./public/assets/images/juegoPausado.png");
    this.load.image("botonJugar", "./public/assets/images/botonJugar.png");
    this.load.image(
      "botonJugarPresionado",
      "./public/assets/images/botonJugarPresionado.png"
    );
    this.load.image("botonMenu", "./public/assets/images/botonMenu.png");
    this.load.image(
      "botonMenuPresionado",
      "./public/assets/images/botonMenuPresionado.png"
    );
    this.load.image(
      "botonReintentar",
      "./public/assets/images/botonReintentar.png"
    );
    this.load.image(
      "botonReintentarPresionado",
      "./public/assets/images/botonReintentarPresionado.png"
    );

    this.load.image(
      "cartelPuntaje",
      "./public/assets/images/cartelPuntaje.png"
    );
    this.load.image(
      "cartelPerdiste",
      "./public/assets/images/cartelPerdiste.png"
    );
    this.load.image("humita", "./public/assets/images/humita.png");
    this.load.image("choripan", "./public/assets/images/choripan.png");
    this.load.image(
      "centollaPlato",
      "./public/assets/images/centollaPlato.png"
    );
    this.load.image("plato", "./public/assets/images/plato.png");
    this.load.image("papel", "./public/assets/images/papel.png");
    this.load.image(
      "leyendaSuperado",
      "./public/assets/images/leyendaSuperado.png"
    );
    this.load.image(
      "leyendaPerdiste",
      "./public/assets/images/leyendaPerdiste.png"
    );

    //menu de inicio
    this.load.image("logo", "./public/assets/images/logo.png");
    this.load.image("fondoMenu", "./public/assets/images/fondoMenu.png");
    this.load.image("logoBoton", "./public/assets/images/logoBoton.png");
    this.load.image(
      "logoBotonPresionado",
      "./public/assets/images/logoBotonPresionado.png"
    );
    this.load.image("botonAyuda", "./public/assets/images/botonAyuda.png");
    this.load.image(
      "botonAyudaPresionado",
      "./public/assets/images/botonAyudaPresionado.png"
    );

    //sfx
    this.load.audio("recolectado", "./public/assets/audio/pickup.mp3");
    this.load.audio("iniciarJuego", "./public/assets/audio/startGame.mp3");
    this.load.audio("daño", "./public/assets/audio/damage.mp3");
    this.load.audio("perdiste1", "./public/assets/audio/gameOver.mp3");
    this.load.audio("perdiste2", "./public/assets/audio/gameOver2.mp3");
    this.load.audio("click", "./public/assets/audio/mouseClick.mp3");
    this.load.audio("ganaste", "./public/assets/audio/win.mp3");

    //musica
    this.load.audio("musica1", "./public/assets/audio/Bleeping Demo.mp3");
    this.load.audio("musica2", "./public/assets/audio/Captain Scurvy.mp3");
    this.load.audio(
      "musica3",
      "./public/assets/audio/Cruising for Goblins.mp3"
    );
    this.load.audio(
      "musica4",
      "./public/assets/audio/Desert of Lost Souls.mp3"
    );
    this.load.audio("musica5", "./public/assets/audio/Getting it Done.mp3");
    this.load.audio("musica6", "./public/assets/audio/Neon Laser Horizon.mp3");
    this.load.audio(
      "musica7",
      "./public/assets/audio/Starting Out Waltz Vivace.mp3"
    );
    this.load.audio("musica8", "./public/assets/audio/Townie Loop.mp3");

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

    this.load.spritesheet(
      "explosion2",
      "./public/assets/images/nivel3/explosion.png",
      {
        frameWidth: 200,
        frameHeight: 200,
      }
    );

    this.load.spritesheet(
      "transicion",
      "./public/assets/images/transicion.png",
      {
        frameWidth: 2666,
        frameHeight: 2000,
      }
    );

    this.load.spritesheet(
      "confeti",
      "./public/assets/images/cinematicas/confeti.png",
      {
        frameWidth: 2666,
        frameHeight: 2000,
      }
    );

    this.load.spritesheet(
      "cocina",
      "./public/assets/images/cinematicas/cocina.png",
      {
        frameWidth: 2666,
        frameHeight: 2000,
      }
    );

    // Crea la barra de carga
    const progressBox = this.add.graphics(); // crea un objeto graphics para representar el fondo de la barra de carga
    const progressWidth = 900;
    const progressHeight = 70;
    const progressBarX = (this.cameras.main.width - progressWidth) / 2;
    const progressBarY = (this.cameras.main.height - progressHeight) / 2;

    progressBox.fillStyle(0x222222, 0.8); // color de relleno y la opacidad del fondo
    progressBox.fillRect(
      progressBarX,
      progressBarY,
      progressWidth,
      progressHeight
    ); // Dibuja el fondo de la barra de carga en la pantalla

    const progressBar = this.add.graphics(); //objeto para representar la barra de progreso

    // actualiza la barra de carga en cada archivo cargado
    this.load.on("progress", function (value) {
      // Agrega un evento para escuchar el progreso de carga de los archivos
      progressBar.clear(); // limpia el gráfico de la barra de progreso
      progressBar.fillStyle(0xffffff, 1); // color de relleno y la opacidad de la barra de progreso
      progressBar.fillRect(
        progressBarX + 10,
        progressBarY + 10,
        (progressWidth - 20) * value,
        progressHeight - 20
      ); // Dibuja la barra de progreso actualizada en la pantalla
    });

    // elimina barra de carga una vez que todos los archivos se hayan cargado
    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
    });

    // inicia la carga de los recursos
    this.load.start(); // inicia la carga de los archivos
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
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "damageLeft",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 2,
        end: 0,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "damageUp",
      frames: this.anims.generateFrameNumbers("personaje", {
        start: 19,
        end: 20,
      }),
      frameRate: 10,
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

    this.anims.create({
      key: "explosion2",
      frames: this.anims.generateFrameNumbers("explosion2", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "transicion",
      frames: this.anims.generateFrameNumbers("transicion", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "confeti",
      frames: this.anims.generateFrameNumbers("confeti", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "cocina",
      frames: this.anims.generateFrameNumbers("cocina", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // init scene juego
    this.scene.start("inicio");
  }

  update() {}
}
