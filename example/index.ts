import { Camera, CubeGeometry, Mesh, Renderer, Scene } from '../src';
import { Input } from '../src/controllers';
import { Main } from '../src/main';

const canvas = document.createElement('canvas');
canvas.width = 960;
canvas.height = 480;
document.body.appendChild(canvas);


// Create Cube
const geometry = new CubeGeometry();
const cube = new Mesh(geometry);

Main.init(canvas);

Main.update(() => {
  // if (Main.input.down('a')) console.log('Fire');
  // if (Main.input.down('s')) console.log('Fire S');
  // if (Main.input.holding('a')) console.log('Holding');
  // if (Main.input.up('a')) console.log('Release');
});
