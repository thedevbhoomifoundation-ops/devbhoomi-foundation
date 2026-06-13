const fs = require('fs');
const path = require('path');

const srcDir = '/Users/aashishgulshan/Desktop/devbhoomi-foundation';

function cleanStr(raw) {
  let str = raw.substring(1, raw.length - 1);
  str = str.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  return str;
}

function generateKey(relativePath, enVal) {
  const fileKey = relativePath
    .replace(/\.tsx?$/, '')
    .replace(/page$/, 'page')
    .replace(/\\/g, '/')
    .replace(/\//g, '.');
  
  const cleanEn = enVal.trim().replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 30).trim();
  const camelKey = cleanEn.split(' ').map((word, i) => {
    if (i === 0) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('').substring(0, 30);
  
  return `${fileKey}.${camelKey || 'text'}`;
}

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(srcDir, filePath);
  let modified = false;
  const replacements = [];

  // 1. Find all t({ en: ..., hi: ... }) using regex for word boundary check
  const step1Regex = /\bt\s*\(\s*\{/g;
  let match1;
  while ((match1 = step1Regex.exec(content)) !== null) {
    const startIdx = match1.index;
    const endIdx = content.indexOf('})', startIdx);
    if (endIdx === -1) {
      step1Regex.lastIndex = startIdx + match1[0].length;
      continue;
    }
    
    const fullBlock = content.substring(startIdx, endIdx + 2);
    const enRegex = /en:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`)/s;
    const hiRegex = /hi:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|`([^`]*)`)/s;
    
    const enMatch = fullBlock.match(enRegex);
    const hiMatch = fullBlock.match(hiRegex);
    
    if (enMatch && hiMatch) {
      const enVal = cleanStr(enMatch[1] || enMatch[2] || enMatch[3] || '""');
      const finalKey = generateKey(relativePath, enVal);
      replacements.push({
        start: startIdx,
        end: startIdx + fullBlock.length,
        replacement: `t('${finalKey}')`
      });
      step1Regex.lastIndex = endIdx + 2;
    } else {
      step1Regex.lastIndex = startIdx + match1[0].length;
    }
  }

  // Apply step 1 replacements in descending order
  replacements.sort((a, b) => b.start - a.start);
  for (const r of replacements) {
    content = content.substring(0, r.start) + r.replacement + content.substring(r.end);
    modified = true;
  }

  // 2. Match raw { en: ..., hi: ... } not preceded by t(
  const rawRegex = /\{\s*en:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`\\]*`)\s*,\s*hi:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`\\]*`)\s*\}/gs;
  const rawReplacements = [];
  let match;
  while ((match = rawRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const matchIdx = match.index;
    
    // Check preceding characters
    let isPrecededByT = false;
    let checkIdx = matchIdx - 1;
    while (checkIdx >= 0 && /\s/.test(content.charAt(checkIdx))) {
      checkIdx--;
    }
    if (checkIdx >= 1 && content.substring(checkIdx - 1, checkIdx + 1) === 't(') {
      isPrecededByT = true;
    }
    
    if (!isPrecededByT) {
      const enRaw = match[1];
      const enVal = cleanStr(enRaw);
      const finalKey = generateKey(relativePath, enVal);
      rawReplacements.push({
        start: matchIdx,
        end: matchIdx + fullMatch.length,
        replacement: `"${finalKey}"`
      });
    }
  }

  // Apply step 2 replacements in descending order
  rawReplacements.sort((a, b) => b.start - a.start);
  for (const r of rawReplacements) {
    content = content.substring(0, r.start) + r.replacement + content.substring(r.end);
    modified = true;
  }

  // 3. Update useLanguage destructuring to react-i18next useTranslation
  const destReplacements = [];
  const destructureRegex = /const\s*\{\s*([^}]+)\s*\}\s*=\s*useLanguage\(\);?/g;
  let destMatch;
  while ((destMatch = destructureRegex.exec(content)) !== null) {
    const variablesStr = destMatch[1];
    const vars = variablesStr.split(',').map(v => v.trim());
    if (vars.includes('t')) {
      const otherVars = vars.filter(v => v !== 't');
      let replacement = '';
      if (otherVars.length > 0) {
        replacement = `const { ${otherVars.join(', ')} } = useLanguage();\n  const { t } = useTranslation();`;
      } else {
        replacement = `const { t } = useTranslation();`;
      }
      destReplacements.push({
        start: destMatch.index,
        end: destMatch.index + destMatch[0].length,
        replacement: replacement
      });
    }
  }

  // Apply step 3 replacements in descending order
  destReplacements.sort((a, b) => b.start - a.start);
  for (const r of destReplacements) {
    content = content.substring(0, r.start) + r.replacement + content.substring(r.end);
    modified = true;
  }

  // 4. Add useTranslation import if present and not already imported
  if (content.includes('useTranslation(') && !content.includes('import { useTranslation } from "react-i18next"')) {
    // Add import statement near existing imports
    const firstImportIdx = content.indexOf('import');
    if (firstImportIdx !== -1) {
      content = `import { useTranslation } from "react-i18next";\n` + content;
      modified = true;
    }
  }

  // 5. Clean up old useLanguage import if useLanguage is no longer used in the file
  if (content.includes('import { useLanguage } from "@/providers/language-provider"') || content.includes('import { useLanguage } from "../providers/language-provider"')) {
    if (!content.includes('useLanguage()')) {
      content = content.replace(/import\s*\{\s*useLanguage\s*\}\s*from\s*["']@\/providers\/language-provider["'];?\n?/g, '');
      content = content.replace(/import\s*\{\s*useLanguage\s*\}\s*from\s*["']\.\.\/providers\/language-provider["'];?\n?/g, '');
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored: ${relativePath}`);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        walk(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      refactorFile(filePath);
    }
  });
}

walk(path.join(srcDir, 'app'));
walk(path.join(srcDir, 'components'));

console.log("Refactoring complete!");
