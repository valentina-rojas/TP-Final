import Ayuda from "./src/scenes/Ayuda.js";
import Final from "./src/scenes/Final.js";
import Inicio from "./src/scenes/Inicio.js";
import Menu from "./src/scenes/Menu.js";
import Nivel1 from "./src/scenes/Nivel1.js";
import Nivel2 from "./src/scenes/Nivel2.js";
import Nivel3 from "./src/scenes/Nivel3.js";
import NivelPerdido from "./src/scenes/NivelPerdido.js";
import NivelSuperado from "./src/scenes/NivelSuperado.js";
import Pausa from "./src/scenes/Pausa.js";
import Precarga from "./src/scenes/Precarga.js";



// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 2666,
  height: 2000,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Precarga ,Menu, Nivel1, Nivel2,Nivel3 , Ayuda, Pausa, NivelPerdido, NivelSuperado, Inicio, Final],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
