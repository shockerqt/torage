import { Camera, CubeGeometry, Mesh, Renderer, Scene } from '../src/index';

const canvas = document.createElement('canvas');
canvas.width = 960;
canvas.height = 480;
document.body.appendChild(canvas);

const camera = new Camera();
camera.position.z = 10;
camera.position.y = 10;

const scene = new Scene();

const renderer = new Renderer(canvas);

const geometry = new CubeGeometry();
const cube = new Mesh(geometry, { position: { x: 1 } });
scene.add(cube);

const animate = async () => {
  requestAnimationFrame(animate);

  cube.position.x += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  await renderer.render(scene, camera);
};

renderer.init(scene, camera).then(animate);
