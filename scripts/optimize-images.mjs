import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC = "public/images";

// Config per directory: max width, quality, format
const config = {
  instructors: { maxWidth: 800, quality: 80, format: "webp" }, // card portraits
  courses: { maxWidth: 1920, quality: 80, format: "webp" }, // hero banners
  "course-sections": { maxWidth: 1200, quality: 80, format: "webp" }, // section photos
  homepage: { maxWidth: 1920, quality: 80, format: "webp" }, // homepage images
  testimonials: { maxWidth: 400, quality: 80, format: "webp" }, // small avatars
  decorative: { maxWidth: 800, quality: 85, format: "webp" }, // UI elements
};

// Skip SVGs — they're already optimized vector
const SKIP_EXT = [".svg"];

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

async function optimizeFile(filePath, opts) {
  const ext = path.extname(filePath).toLowerCase();
  if (SKIP_EXT.includes(ext)) {
    skipped++;
    return;
  }

  const statBefore = fs.statSync(filePath);
  totalBefore += statBefore.size;

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  try {
    let pipeline = sharp(filePath);
    const meta = await pipeline.metadata();

    // Resize if wider than max
    if (meta.width > opts.maxWidth) {
      pipeline = pipeline.resize(opts.maxWidth, null, { withoutEnlargement: true });
    }

    // Convert to WebP
    pipeline = pipeline.webp({ quality: opts.quality });

    await pipeline.toFile(webpPath);

    const statAfter = fs.statSync(webpPath);
    totalAfter += statAfter.size;

    const savings = ((1 - statAfter.size / statBefore.size) * 100).toFixed(1);
    const sizeMB = (statBefore.size / 1024 / 1024).toFixed(1);
    const newSizeMB = (statAfter.size / 1024 / 1024).toFixed(1);

    console.log(
      `  ✓ ${path.basename(filePath)} → ${path.basename(webpPath)} (${sizeMB}MB → ${newSizeMB}MB, -${savings}%)`
    );

    // Remove original PNG/JPG after successful conversion
    if (webpPath !== filePath) {
      fs.unlinkSync(filePath);
    }

    processed++;
  } catch (err) {
    console.log(`  ✗ ${path.basename(filePath)}: ${err.message}`);
    totalAfter += statBefore.size; // count as unchanged
  }
}

async function optimizeDir(dirName, opts) {
  const dirPath = path.join(PUBLIC, dirName);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter((f) => !f.startsWith("."));
  console.log(`\n[${dirName}] — ${files.length} files`);

  for (const file of files) {
    await optimizeFile(path.join(dirPath, file), opts);
  }
}

// Also optimize root-level files (logo, favicon)
async function optimizeRoot() {
  const files = fs.readdirSync(PUBLIC).filter((f) => {
    const full = path.join(PUBLIC, f);
    return fs.statSync(full).isFile() && !f.startsWith(".");
  });

  console.log(`\n[root] — ${files.length} files`);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (SKIP_EXT.includes(ext)) {
      skipped++;
      continue;
    }
    // Favicon — keep small
    await optimizeFile(path.join(PUBLIC, file), {
      maxWidth: 512,
      quality: 85,
      format: "webp",
    });
  }
}

async function main() {
  console.log("=== YousicPlay Image Optimizer ===\n");

  await optimizeRoot();
  for (const [dir, opts] of Object.entries(config)) {
    await optimizeDir(dir, opts);
  }

  // Partners dir — SVGs only, skip
  const partnersDir = path.join(PUBLIC, "partners");
  if (fs.existsSync(partnersDir)) {
    const pFiles = fs.readdirSync(partnersDir).filter((f) => !f.startsWith("."));
    console.log(`\n[partners] — ${pFiles.length} files (all SVG, skipped)`);
    skipped += pFiles.length;
  }

  console.log("\n=== Optimization Complete ===");
  console.log(`  Processed: ${processed} files`);
  console.log(`  Skipped (SVG): ${skipped} files`);
  console.log(
    `  Before: ${(totalBefore / 1024 / 1024).toFixed(1)}MB`
  );
  console.log(
    `  After:  ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
  console.log(
    `  Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
  );
}

main().catch(console.error);
