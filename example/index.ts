import { Renderer } from '../src/index';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

console.log('test');
const renderer = new Renderer(canvas);
Renderer.test();

