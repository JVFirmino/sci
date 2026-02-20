import fs from 'fs';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const webhookURL = process.env.DISCORD_WEBHOOK;
const runId = process.env.GITHUB_RUN_ID;
const repo = process.env.GITHUB_REPOSITORY;

if (!webhookURL) {
    console.error('❌ DISCORD_WEBHOOK não definido!');
    process.exit(1);
}

if (!fs.existsSync('report.json')) {
  console.log('⚠️ report.json não encontrado, pulando envio ao Discord');
  process.exit(0);
}

let rawData;
try {
    rawData = fs.readFileSync('report.json', 'utf-8');
} catch (error) {
    console.error('❌ Erro ao ler o arquivo report.json:', error.message);
    process.exit(1);
}

let report;
try {
    report = JSON.parse(rawData);
} catch (error) {
    console.error('❌ Erro ao fazer parse do report.json:', error.message);
    process.exit(1);
}

const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
};

const passedTests = [];
const failedTests = [];
const skippedTests = [];

const LIST_PASSED = false;
const LIST_FAILED = true;
const LIST_SKIPPED = true;

report.suites.forEach(suite => {
    suite.suites.forEach(subSuite => {
        subSuite.specs.forEach(spec => {
            const test = spec.tests[0];
            const result = test?.results?.at(-1);

            const testName = `${spec.title} (${subSuite.title})`;

            if (!result) {
                summary.skipped++;
                skippedTests.push(`- ${testName}`);
                return;
            }

            summary.total++;

            if (result.status === 'passed') {
                summary.passed++;
                passedTests.push(`- ${testName}`);
            } else if (result.status === 'failed') {
                summary.failed++;
                failedTests.push(`- ${testName}`);
            } else {
                summary.skipped++;
                skippedTests.push(`- ${testName}`);
            }
        });
    });
});

const historyPath = './dashboard/data/history.json';

let history = [];

if (fs.existsSync(historyPath)) {
    try {
        history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
    } catch (error) {
        console.log('Erro ao ler history.json, recriando...');
        history = [];
    }
}

const today = new Date().toISOString().split('T')[0];

const newEntry = {
    date: today,
    total: summary.total,
    passed: summary.passed,
    failed: summary.failed,
    skipped: summary.skipped
};

history = history.filter(entry => entry.date !== today);

history.push(newEntry);

history = history.slice(-60);

fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
console.log('📊 Histórico do dashboard atualizado.');

let content = `📋 **Relatório Diário dos Testes RH NET Social**

🧪 Total: ${summary.total}
✅ Passaram: ${summary.passed}
❌ Falharam: ${summary.failed}
🚫 Ignorados: ${summary.skipped}
`;

if (LIST_FAILED && failedTests.length > 0) {
    content += `\n**❌ Testes que falharam**\n${failedTests.join('\n')}`;
}

if (LIST_PASSED && passedTests.length > 0) {
    content += `\n**✅ Testes que passaram**\n${passedTests.join('\n')}`;
}

if (LIST_SKIPPED && skippedTests.length > 0) {
    content += `\n**🚫 Testes ignorados**\n${skippedTests.join('\n')}`;
}

if (runId && repo) {
    const baseLink = `https://github.com/${repo}/actions/runs/${runId}`;
    content += `\n\n🗂️ [Relatório HTML interativo](${baseLink})`;
}

const pageLink = 'https://jvfirmino.github.io/sci/dashboard/index.html';
content += `\n\n🌐 [Dashboard Executivo](${pageLink})`;


const payload = {
    username: 'SCI Report 🤖',
    avatar_url: 'https://raichu-uploads.s3.amazonaws.com/logo_null_amIShh.jpg',
    content,
};

axios.post(webhookURL, payload)
    .then(() => {
        console.log('✅ Mensagem enviada para o Discord com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao enviar para o Discord:', error.message);
    });
