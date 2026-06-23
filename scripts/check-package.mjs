import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const rootDir = resolve(process.cwd());
const assetsDir = join(rootDir, 'assets');
const modelsDir = join(assetsDir, 'models');
const aiDir = join(assetsDir, 'ai');

function listFiles(dir, filter) {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir).filter((entry) => filter(entry));
}

const modelFiles = listFiles(modelsDir, (entry) => entry.toLowerCase().endsWith('.gguf'));
const aiFiles = listFiles(aiDir, (entry) => entry.toLowerCase().endsWith('.exe'));

console.log('[BuildAI] 패키징 사전 점검');
console.log(`- 모델 폴더: ${modelsDir}`);
console.log(`- AI 엔진 폴더: ${aiDir}`);

if (modelFiles.length === 0) {
  console.log('- GGUF 모델이 없습니다. 최종 배포 전에 assets/models/에 qwen3.gguf 같은 모델 파일을 넣어야 합니다.');
} else {
  console.log(`- GGUF 모델: ${modelFiles.join(', ')}`);
}

if (aiFiles.length === 0) {
  console.log('- llama.cpp 실행 파일이 없습니다. 최종 배포 전에 assets/ai/에 llama-cli.exe를 넣어야 합니다.');
} else {
  console.log(`- AI 실행 파일: ${aiFiles.join(', ')}`);
}

console.log('- Tauri bundle은 assets/models/과 assets/ai/를 resources로 포함하도록 설정되어 있습니다.');
