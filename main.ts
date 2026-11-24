// news-image-20261123 entry program.
//
// The repository ships the finished front-page image as entry.png (a JPEG
// under a .png name, which the gate allows: it tells the format apart by
// the first bytes). This program validates that image against the
// competition's hard limits and then copies it, byte for byte, into the
// output directory as entry.png. It runs offline, standard library only,
// and writes the same bytes on every run.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // the gate's 1 MiB cap
const MAX_SIDE = 1024; // neither side of the image may exceed 1024 px

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

function fail(message: string): never {
  console.error(`entry: ${message}`);
  process.exit(1);
}

if (!existsSync(source)) fail(`source image missing: ${source}`);

const bytes = readFileSync(source);
if (bytes.length === 0) fail("source image is empty");
if (bytes.length > MAX_BYTES) {
  fail(`source image is ${bytes.length} bytes, over the ${MAX_BYTES} cap`);
}

// PNG starts 89 50 4E 47, JPEG starts FF D8 FF; anything else is refused.
const isPng =
  bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
if (!isPng && !isJpeg) fail("source image is neither PNG nor JPEG");

// Read the pixel size out of the header: a PNG keeps it in the IHDR chunk
// (big-endian at bytes 16 and 20); a JPEG keeps it in a start-of-frame
// segment, found by walking the segment lengths from the SOI marker.
function imageSize(buf: Buffer): { width: number; height: number } {
  if (isPng) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  let off = 2;
  while (off + 9 < buf.length && buf[off] === 0xff) {
    const marker = buf[off + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
    }
    off += 2 + buf.readUInt16BE(off + 2);
  }
  return { width: 0, height: 0 };
}

const { width, height } = imageSize(bytes);
if (width === 0 || height === 0) fail("could not read the image dimensions");
if (width > MAX_SIDE || height > MAX_SIDE) {
  fail(`image is ${width}x${height}, over the ${MAX_SIDE}px cap`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const written = readFileSync(target);
if (!written.equals(bytes)) fail("copied file differs from the source bytes");
console.log(
  `entry: wrote ${target} (${written.length} bytes, ${isPng ? "PNG" : "JPEG"}, ${width}x${height})`,
);
