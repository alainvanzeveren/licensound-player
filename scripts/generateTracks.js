const fs = require("fs");
const path = require("path");

const TRACKS_DIR = path.join(__dirname, "../public/assets/Tracks");
const OUTPUT_FILE = path.join(__dirname, "../src/tracks.js");
const VALID_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a"];

function getTracks() {
  const categories = fs.readdirSync(TRACKS_DIR, { withFileTypes: true }).filter(dirent => dirent.isDirectory());

  const tracks = [];

  categories.forEach((categoryDir) => {
    const categoryName = categoryDir.name;
    const categoryPath = path.join(TRACKS_DIR, categoryName);

    const files = fs.readdirSync(categoryPath).filter(file =>
      VALID_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );

    files.forEach((file) => {
      tracks.push({
        title: path.basename(file, path.extname(file)),
        category: categoryName,
        src: `/assets/Tracks/${categoryName}/${file}`,
        duration: "4:05"
      });
    });
  });

  return tracks;
}

const allTracks = getTracks();

fs.writeFileSync(
  OUTPUT_FILE,
  `export const tracks = ${JSON.stringify(allTracks, null, 2)};`,
  "utf-8"
);

console.log(`✅ Generated ${allTracks.length} tracks in tracks.js`);
