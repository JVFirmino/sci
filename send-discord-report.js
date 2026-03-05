import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const RUN_ID = process.env.GITHUB_RUN_ID;
const REPO = process.env.GITHUB_REPOSITORY;

const REPORT_PATH = "report.json";
const HISTORY_PATH = "./dashboard/data/history.json";

const HISTORY_LIMIT = 7;

const LIST_PASSED = false;
const LIST_FAILED = true;
const LIST_SKIPPED = true;

function exitIfNoWebhook() {
    if (!WEBHOOK_URL) {
        console.error("❌ DISCORD_WEBHOOK não definido!");
        process.exit(1);
    }
}

function readJSON(path) {
    try {
        if (!fs.existsSync(path)) return null;
        return JSON.parse(fs.readFileSync(path, "utf-8"));
    } catch (err) {
        console.error(`Erro ao ler ${path}:`, err.message);
        return null;
    }
}

function processReport(report) {
    const summary = { total: 0, passed: 0, failed: 0, skipped: 0 };
    const passedTests = [];
    const failedTests = [];
    const skippedTests = [];
    const modules = {};

    let totalDuration = 0;

    report?.suites?.forEach(suite => {
        suite?.suites?.forEach(subSuite => {
            subSuite?.specs?.forEach(spec => {
                const test = spec.tests?.[0];
                const result = test?.results?.at(-1);

                const testName = `${spec.title} (${subSuite.title})`;

                if (!result) {
                summary.skipped++;
                skippedTests.push(`- ${testName}`);
                return;
                }

                summary.total++;

                if (result.status === "passed") {
                summary.passed++;
                passedTests.push(`- ${testName}`);
                } else if (result.status === "failed") {
                summary.failed++;
                failedTests.push(`- ${testName}`);
                } else {
                summary.skipped++;
                skippedTests.push(`- ${testName}`);
                }

                totalDuration += result.duration || 0;

                let moduleName = "Sem Tag";
                if (spec.tags?.length) moduleName = "@" + spec.tags[0];

                if (!modules[moduleName]) {
                modules[moduleName] = { total: 0, passed: 0 };
                }

                modules[moduleName].total++;
                if (result.status === "passed") modules[moduleName].passed++;
            });
        });
    });

    return {
        summary,
        passedTests,
        failedTests,
        skippedTests,
        modules,
        totalDuration
    };
}

function updateHistory(summary, modules, duration) {
    let history = readJSON(HISTORY_PATH) || [];

    const today = new Date().toISOString().split("T")[0];

    const newEntry = {
        date: today,
        total: summary.total,
        passed: summary.passed,
        failed: summary.failed,
        skipped: summary.skipped,
        duration: Math.round(duration / 1000),
        modules
    };

    history = history.filter(entry => entry.date !== today);
    history.push(newEntry);

    history.sort((a, b) => new Date(a.date) - new Date(b.date));

    history = history.slice(-HISTORY_LIMIT);

    fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2));

    console.log("📊 Histórico atualizado.");
    }

    function buildDiscordMessage(summary, passedTests, failedTests, skippedTests) {
    let content = `📋 **Status Diário dos Testes RH NET Social**

    🧪 Total: ${summary.total}
    ✅ Passaram: ${summary.passed}
    ❌ Falharam: ${summary.failed}
    🚫 Ignorados: ${summary.skipped}
    `;

    if (LIST_FAILED && failedTests.length) {
        content += `\n**❌ Testes que falharam**\n${failedTests.join("\n")}`;
    }

    if (LIST_PASSED && passedTests.length) {
        content += `\n**✅ Testes que passaram**\n${passedTests.join("\n")}`;
    }

    if (LIST_SKIPPED && skippedTests.length) {
        content += `\n**🚫 Testes ignorados**\n${skippedTests.join("\n")}`;
    }

    const dashboardLink =
        "https://jvfirmino.github.io/sci/dashboard/index.html";

    content += `\n🌐 Dashboard Histórico\n${dashboardLink}`;

    if (RUN_ID && REPO) {
        const runLink = `https://github.com/${REPO}/actions/runs/${RUN_ID}`;
        content += `\n🗂️ Relatório da Execução\n${runLink}`;
    }

    return content;
}

async function sendDiscord(content) {
    try {
        await axios.post(WEBHOOK_URL, {
        username: "SCI Report 🤖",
        avatar_url:
            "https://raichu-uploads.s3.amazonaws.com/logo_null_amIShh.jpg",
        content
        });

        console.log("✅ Mensagem enviada para o Discord.");
    } catch (err) {
        console.error("Erro ao enviar mensagem:", err.message);
    }
}

async function main() {
    exitIfNoWebhook();

    const report = readJSON(REPORT_PATH);

    if (!report) {
        console.log("⚠️ report.json não encontrado. Pulando envio.");
        return;
    }

    const {
        summary,
        passedTests,
        failedTests,
        skippedTests,
        modules,
        totalDuration
    } = processReport(report);

    updateHistory(summary, modules, totalDuration);

    const message = buildDiscordMessage(
        summary,
        passedTests,
        failedTests,
        skippedTests
    );

    await sendDiscord(message);
}

main();