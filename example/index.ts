import { CubeGeometry, Mesh } from '../src';
import { Main } from '../src/main';

const canvas = document.createElement('canvas');
canvas.width = 960;
canvas.height = 480;
document.body.appendChild(canvas);


// Create Cube
const geometry = new CubeGeometry();
const cube = new Mesh(geometry);



Main.init(canvas);
Main.scene.add(cube);
Main.camera.position.z = -10;
Main.camera.position.x = -10;

let lastMouse = Main.input.mouse;
Main.update(() => {
  // Zoom
  Main.camera.position.z += Main.input.mouse.wheel / 100;

  // Rotate Camera
  if (Main.input.holding('mouse0')) {
    const rotateX = Main.input.mouse.y - lastMouse.y;
    const rotateY = Main.input.mouse.x - lastMouse.x;

    if (rotateX !== 0 || rotateY !== 0) {
      cube.rotation.x += (rotateX) / 100;
      cube.rotation.y += (rotateY) / 100;
    }
  }

  // Move Camera
  if (Main.input.holding('mouse1')) {
    const translateX = Main.input.mouse.y - lastMouse.y;
    const translateY = Main.input.mouse.x - lastMouse.x;

    if (translateX !== 0 || translateY !== 0) {
      Main.camera.position.x += (translateX) / 100;
      Main.camera.position.y += (translateY) / 100;
    }
  }

  lastMouse = { ...Main.input.mouse };
});

Main.update(() => {
  if (Main.input.holding('w')) {
    cube.position.x += 0.01;
    console.log('Hold');
  }
});
