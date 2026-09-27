/**
 * compress-images.js
 * Batch-compresses all JPG/PNG in src/imports in-place using sharp.
 * Max dimension: 1600px on the longest side, MozJPEG quality 80.
 * Skips files that are already ≤ 200KB.
 */
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const ROOT      = path.resolve(__dirname, '../src/imports');
const MAX_DIM   = 1600;
const QUALITY   = 90;
const SKIP_BELOW = 200 * 1024; // 200 KB

let totalBefore = 0;
let totalAfter  = 0;
let skipped     = 0;
let compressed  = 0;

async function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      const before = fs.statSync(full).size;
      if (before <= SKIP_BELOW) {
        skipped++;
        continue;
      }
      try {
        const isPng = /\.png$/i.test(entry.name);
        let pipeline = sharp(full).resize({
          width: MAX_DIM,
          height: MAX_DIM,
          fit: 'inside',
          withoutEnlargement: true,
        });
        let buf;
        if (isPng) {
          buf = await pipeline.png({ quality: QUALITY, compressionLevel: 9, effort: 10 }).toBuffer();
        } else {
          buf = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
        }
        // Only write if it saves space
        if (buf.length < before) {
          fs.writeFileSync(full, buf);
          totalBefore += before;
          totalAfter  += buf.length;
          compressed++;
          const pct = Math.round((1 - buf.length / before) * 100);
          console.log(`✓ ${path.relative(ROOT, full).padEnd(70)} ${Math.round(before/1024)}KB → ${Math.round(buf.length/1024)}KB (-${pct}%)`);
        } else {
          skipped++;
        }
      } catch (err) {
        console.error(`✗ ${full}: ${err.message}`);
        skipped++;
      }
    }
  }
}

(async () => {
  console.log('Compressing images in src/imports...\n');
  await processDir(ROOT);
  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
  console.log(`\n─────────────────────────────────────`);
  console.log(`Compressed : ${compressed} files`);
  console.log(`Skipped    : ${skipped} files`);
  console.log(`Saved      : ${savedMB} MB`);
  console.log(`─────────────────────────────────────`);
})();
