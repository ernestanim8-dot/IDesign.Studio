const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname, "src", "imports", "What Our Clients Say");
const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".jpg"));

(async () => {
  for (const file of files) {
    const src = path.join(dir, file);
    const tmp = src + ".tmp.jpg";
    const before = fs.statSync(src).size;
    // Resize to 200x200 (square crop) at quality 72 — still excellent for a 46px circle
    await sharp(src)
      .resize(200, 200, { fit: "cover", position: "center" })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(tmp);
    const after = fs.statSync(tmp).size;
    fs.renameSync(tmp, src);
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
  }
  console.log("Done");
})();
