import { Renderer } from '../src';

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const renderer = new Renderer(canvas);
Renderer.test();

