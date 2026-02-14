import { renderStill } from 'remotion';

// Try to render just Scene8
await renderStill({
  composition: {
    id: 'Scene8',
    fps: 30,
    width: 1920,
    height: 1080,
    durationInFrames: 138,
  },
  output: '/tmp/test.png',
  serveUrl: 'http://localhost:3002/bundle.js',
});

console.log('Render successful!');
