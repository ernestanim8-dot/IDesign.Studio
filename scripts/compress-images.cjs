/**
 * compress-images.cjs  (CommonJS so it works in ESM-typed projects)
 * Batch-compresses all JPG/PNG in src/imports in-place using sharp.
 * Max dimension: 1600px on the longest side, MozJPEG quality 80.
 * Skips files that are already ≤ 200KB.
 * Uses readFileSync → sharp() from buffer to avoid Windows path issues.
 */
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const ROOT       = path.resolve(__dirname, '../src/imports');
const MAX_DIM    = 1600;
const QUALITY    = 80;
const SKIP_BELOW = 80 * 1024; // 80 KB

let totalBefore = 0;
let totalAfter  = 0;
let skipped     = 0;
let compressed  = 0;
let errors      = 0;

async function processDir(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`Cannot read dir: ${dir} — ${err.message}`);
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDir(full);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      let before;
      try {
        before = fs.statSync(full).size;
      } catch {
        errors++;
        continue;
      }
      if (before <= SKIP_BELOW) {
        skipped++;
        continue;
      }
      try {
        // Read file into buffer first — avoids Windows path / spaces issues with sharp
        const inputBuf = fs.readFileSync(full);
        const isPng = /\.png$/i.test(entry.name);
        const pipeline = sharp(inputBuf).resize({
          width: MAX_DIM,
          height: MAX_DIM,
          fit: 'inside',
          withoutEnlargement: true,
        });
        const buf = isPng
          ? await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer()
          : await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();

        if (buf.length < before) {
          fs.writeFileSync(full, buf);
          totalBefore += before;
          totalAfter  += buf.length;
          compressed++;
          const pct = Math.round((1 - buf.length / before) * 100);
          const rel = path.relative(ROOT, full).padEnd(65);
          console.log(`✓ ${rel} ${Math.round(before/1024)}KB → ${Math.round(buf.length/1024)}KB (-${pct}%)`);
        } else {
          skipped++;
        }
      } catch (err) {
        errors++;
        console.error(`✗ ${path.relative(ROOT, full)}: ${err.message}`);
      }
    }
  }
}

(async () => {
  console.log('Compressing images in src/imports...\n');
  await processDir(ROOT);
  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(2);
  console.log('\n─────────────────────────────────────');
  console.log(`Compressed : ${compressed} files`);
  console.log(`Skipped    : ${skipped} files (already small or no gain)`);
  console.log(`Errors     : ${errors}`);
  console.log(`Saved      : ${savedMB} MB`);
  console.log('─────────────────────────────────────');
})();
