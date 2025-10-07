import { test, expect } from "@playwright/test";
import { UiActionsHelpers } from "../../src/helpers/uiActionsHelpers";
import { LoginPage } from "../../pages/loginPage";
import { ROTAS } from "../../fixture/rotaFixture";
import { MENSAGEM_LOGIN_EMAIL_SENHA_INVALIDOS, MENSAGEM_LOGIN_EMAIL_SENHA_VAZIOS } from "../../fixture/mensagemFixture";
import { USUARIO_UNICO } from "../../fixture/usuarioFixture";

test.describe("login de usuário", { tag: ["@LOGIN"] }, () => {
    let uiActionsHelpers;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        console.log(`Iniciando o teste: ${test.info().title}`);

        uiActionsHelpers = new UiActionsHelpers(page);
        loginPage = new LoginPage(page);

        await uiActionsHelpers.navegarEVerificarTituloPagina(ROTAS.login.url, ROTAS.login.titulo);
    });

    test.afterEach(async ({ page }) => {
        console.log(`Finalizando o teste: ${test.info().title}`);
    });

    test("realizar login com dados válidos", { tag: "@LOGIN_SUCESSO" }, async({ page }) => {
        
        await loginPage.realizarLogin(USUARIO_UNICO);
        await uiActionsHelpers.verificarUrlPagina(ROTAS.modulo.url);
    });
});

