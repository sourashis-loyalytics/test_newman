import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, "output");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

if (files.length === 0) {
    console.error("No JSON file found in the output directory.");
    process.exit(1);
}

const filesWithTime = files.map(file => ({
    file,
    time: fs.statSync(path.join(dir, file)).mtime
})).sort((a, b) => b.time - a.time);

const latestFile = filesWithTime[0].file;
console.log("Latest file in output directory:", latestFile);

// Delete all files except the latest one
filesWithTime.slice(1).forEach(({ file }) => {
    const filePath = path.join(dir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted old report: ${file}`);
});

const reportPath = path.join(dir, latestFile);
const report = JSON.parse(
    fs.readFileSync(reportPath, "utf8")
);

const { total, failed } = report.run.stats.assertions;

const passed = total - failed;

console.log("Assertions summary:");
console.log("  Total :", total);
console.log("  Passed:", passed);
console.log("  Failed:", failed);
process.exit(failed > 0 ? 1 : 0);