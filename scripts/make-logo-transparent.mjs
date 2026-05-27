import fs from 'node:fs';
import path from 'node:path';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';

const inputPath = path.resolve('public/logo.png');
const outputPath = path.resolve('public/logo-mark.png');

const buf = fs.readFileSync(inputPath);
const decoded = jpeg.decode(buf, { useTArray: true });
const { width, height, data } = decoded;

// Create a PNG with alpha.
const png = new PNG({ width, height });

// Heuristic: treat very dark pixels as background and fade alpha smoothly.
// Keeps bright cyan/blue strokes and core.
const lo = 18; // below this luminance, fully transparent
const hi = 70; // above this, keep opaque (subject to edge blending)

function luminance(r, g, b) {
  // sRGB luma approximation
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const lum = luminance(r, g, b);

    // Soft alpha ramp from lo..hi
    let a;
    if (lum <= lo) a = 0;
    else if (lum >= hi) a = 255;
    else a = Math.round(((lum - lo) / (hi - lo)) * 255);

    // Preserve bright saturated strokes even if lum is lower.
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;
    if (sat > 80 && max > 120) {
      a = Math.max(a, 235);
    }

    png.data[i] = r;
    png.data[i + 1] = g;
    png.data[i + 2] = b;
    png.data[i + 3] = a;
  }
}

// Optional: crop surrounding fully-transparent margins
function cropToAlpha(src) {
  let minX = src.width, minY = src.height, maxX = -1, maxY = -1;
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const i = (y * src.width + x) * 4;
      if (src.data[i + 3] > 8) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < minX || maxY < minY) return src;

  // Add a little padding.
  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(src.width - 1, maxX + pad);
  maxY = Math.min(src.height - 1, maxY + pad);

  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const out = new PNG({ width: w, height: h });

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcI = ((y + minY) * src.width + (x + minX)) * 4;
      const dstI = (y * w + x) * 4;
      out.data[dstI] = src.data[srcI];
      out.data[dstI + 1] = src.data[srcI + 1];
      out.data[dstI + 2] = src.data[srcI + 2];
      out.data[dstI + 3] = src.data[srcI + 3];
    }
  }
  return out;
}

const cropped = cropToAlpha(png);
fs.writeFileSync(outputPath, PNG.sync.write(cropped));

console.log(`Wrote ${path.relative(process.cwd(), outputPath)} (${cropped.width}x${cropped.height})`);
