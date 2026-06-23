import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const rootDir = resolve(process.cwd());
const releaseDir = join(rootDir, 'release');
const portableDir = join(releaseDir, 'BuildAI-Portable');
const sourceReleaseDir = join(rootDir, 'src-tauri', 'target', 'release');
const sourceExe = join(sourceReleaseDir, 'buildai.exe');
const sourceAiDir = join(sourceReleaseDir, 'ai');
const sourceModelsDir = join(sourceReleaseDir, 'models');

if (!existsSync(sourceExe)) {
  console.error('[BuildAI] src-tauri/target/release/buildai.exe 가 없습니다. 먼저 cargo build --release 또는 tauri build를 실행해 주세요.');
  process.exit(1);
}

rmSync(portableDir, { recursive: true, force: true });
mkdirSync(portableDir, { recursive: true });

cpSync(sourceExe, join(portableDir, 'BuildAI.exe'));

if (existsSync(sourceAiDir)) {
  cpSync(sourceAiDir, join(portableDir, 'ai'), { recursive: true });
}

if (existsSync(sourceModelsDir)) {
  cpSync(sourceModelsDir, join(portableDir, 'models'), { recursive: true });
}

const readme = [
  '# BuildAI Portable',
  '',
  '이 폴더는 BuildAI 포터블 배포본입니다.',
  '',
  '* `BuildAI.exe`를 더블클릭해서 실행합니다.',
  '* `ai/`와 `models/` 폴더에는 로컬 llama.cpp 실행 파일과 GGUF 모델을 넣을 수 있습니다.',
  '* SQLite 데이터는 앱 내부 경로 또는 사용자가 선택한 로컬 폴더에 유지됩니다.',
  '',
];

writeFileSync(join(portableDir, 'README.txt'), readme.join('\r\n'), 'utf8');

console.log(`[BuildAI] 포터블 패키지 생성 완료: ${portableDir}`);
