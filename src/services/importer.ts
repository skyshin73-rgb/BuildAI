export interface ImportEntry {
  id: string;
  fileName: string;
  relativePath: string;
  title: string;
  content: string;
  snippet: string;
  date: string;
  needsDate: boolean;
  saving: boolean;
  saved: boolean;
  errorMessage: string;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function toIsoDate(year: number, month: number, day: number): string {
  const candidate = new Date(year, month - 1, day);
  if (
    candidate.getFullYear() !== year ||
    candidate.getMonth() !== month - 1 ||
    candidate.getDate() !== day
  ) {
    return '';
  }

  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function normalizeDateMatch(year: string, month: string, day: string): string {
  return toIsoDate(Number(year), Number(month), Number(day));
}

function matchDateText(text: string): string {
  const patterns = [
    /(\d{4})[.\-/](\d{2})[.\-/](\d{2})/,
    /\b(\d{8})\b/,
    /\b(\d{2})(\d{2})(\d{2})\b/,
  ];

  for (const pattern of patterns) {
    const matched = text.match(pattern);
    if (!matched) {
      continue;
    }

    if (matched.length === 4) {
      const isoDate = normalizeDateMatch(matched[1], matched[2], matched[3]);
      if (isoDate) {
        return isoDate;
      }
    }

    if (matched.length === 2 && matched[1].length === 8) {
      const value = matched[1];
      const isoDate = normalizeDateMatch(value.slice(0, 4), value.slice(4, 6), value.slice(6, 8));
      if (isoDate) {
        return isoDate;
      }
    }

    if (matched.length === 4 && matched[1].length === 2) {
      const year = Number(matched[1]) >= 70 ? `19${matched[1]}` : `20${matched[1]}`;
      const isoDate = normalizeDateMatch(year, matched[2], matched[3]);
      if (isoDate) {
        return isoDate;
      }
    }
  }

  return '';
}

export function extractDateFromText(text: string): string {
  const compactText = text.replace(/[\s_]+/g, ' ');
  const dateFromDirectText = matchDateText(compactText);
  if (dateFromDirectText) {
    return dateFromDirectText;
  }

  return matchDateText(text.replace(/[^\d.\-/]/g, ' '));
}

function cleanTitleCandidate(value: string): string {
  return value
    .replace(/\.[^.]+$/, '')
    .replace(/[\s._-]+/g, ' ')
    .replace(/(?:20\d{2}[.\-/]?\d{2}[.\-/]?\d{2})/g, ' ')
    .replace(/\b\d{6,8}\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function deriveTitle(fileName: string, content: string): string {
  const firstMeaningfulLine = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !/^\d{2,4}[.\-/]?\d{2}[.\-/]?\d{2}$/.test(line));

  if (firstMeaningfulLine) {
    const cleaned = cleanTitleCandidate(firstMeaningfulLine);
    if (cleaned) {
      return cleaned.slice(0, 80);
    }
  }

  const fallback = cleanTitleCandidate(fileName);
  return (fallback || '과거 일지 가져오기').slice(0, 80);
}

function deriveSnippet(content: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return (lines[0] || '미리보기 없음').slice(0, 140);
}

export function buildImportEntry(fileName: string, content: string, relativePath = ''): ImportEntry {
  const date = extractDateFromText(content) || extractDateFromText(relativePath) || extractDateFromText(fileName);
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    fileName,
    relativePath,
    title: deriveTitle(fileName, content),
    content,
    snippet: deriveSnippet(content),
    date,
    needsDate: !date,
    saving: false,
    saved: false,
    errorMessage: '',
  };
}
