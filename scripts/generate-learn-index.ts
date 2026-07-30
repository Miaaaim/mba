/**
 * 扫描 src/data/learn/*.md，生成轻量索引 src/data/learn-index.json
 * 用法：npx tsx scripts/generate-learn-index.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLearnIndex } from '../src/utils/parseLessons.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const learnDir = path.join(root, 'src/data/learn');
const outFile = path.join(root, 'src/data/learn-index.json');

const files: Record<string, string> = {};
for (const name of fs.readdirSync(learnDir)) {
  if (!name.endsWith('.md')) continue;
  const full = path.join(learnDir, name);
  files[full] = fs.readFileSync(full, 'utf8');
}

const index = buildLearnIndex(files);
fs.writeFileSync(outFile, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

const lessonCount = index.courses.reduce((n, c) => n + c.lessons.length, 0);
console.log(
  `Generated ${outFile} (${index.courses.length} courses, ${lessonCount} lessons)`
);
