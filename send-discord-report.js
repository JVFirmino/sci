const fs = require('fs');
const axios = require('axios');

const webhookURL = process.env.DISCORD_WEBHOOK;
const runId = process.env.GITHUB_RUN_ID;
const repo = process.env.GITHUB_REPOSITORY;
const artifactURL = `https://github.com/${repo}/actions/runs/${runId}`;

if (!webhookURL) {
    console.error('DISCORD_WEBHOOK não definido!');
    process.exit(1);
}

const rawData = fs.readFileSync('report.json', 'utf-8');
const report = JSON.parse(rawData);

const summary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
};

const passedTests = [];
const failedTests = [];
const skippedTests = [];

const LIST_PASSED = true;
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

content += `\n\n📎 [Clique aqui para acessar o relatório completo do teste](${artifactURL})`;

content += `\n\n🕖 Horário: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`;

const payload = {
    username: 'SCI Report 🤖',
    avatar_url: 'https://raichu-uploads.s3.amazonaws.com/logo_null_amIShh.jpg',
    content,
};

axios.post(webhookURL, payload)
    .then(() => {
        console.log('Mensagem enviada para o Discord com sucesso.');
    })
    .catch(error => {
        console.error('Erro ao enviar para o Discord:', error.message);
    });
