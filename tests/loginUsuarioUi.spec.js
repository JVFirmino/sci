import { test, expect } from "@playwright/test";
import { UiActionsUtils } from "../utils/uiActionsUtils";
import { AuthPage } from "../pages/authPage";
import { ROTAS } from "../fixture/rotaFixture";
import { LoginDados } from "../utils/dados/loginDados";
import { MENSAGEM_LOGIN_EMAIL_SENHA_INVALIDOS, MENSAGEM_LOGIN_EMAIL_SENHA_VAZIOS } from "../fixture/mensagemFixture";

test.describe("login de usuário", { tag: ["@LOGIN"] }, () => {
    let uiActionsUtils;
    let authPage;
    let loginDados;

    test.beforeEach(async ({ page }) => {
        console.log(`Iniciando o teste: ${test.info().title}`);

        uiActionsUtils = new UiActionsUtils(page);
        authPage = new AuthPage(page);
        loginDados = new LoginDados();

        await uiActionsUtils.navegarEVerificarTituloPagina(ROTAS.login.url, ROTAS.login.titulo);
    });

    test.afterEach(async ({ page }) => {
        console.log(`Finalizando o teste: ${test.info().title}`);
    });

    test("realizar login com dados válidos", { tag: "@LOGIN_SUCESSO" }, async({ page }) => {
        
        const usuario = await loginDados.getLoginUnico()
        await authPage.realizarLogin(usuario);
        await uiActionsUtils.verificarUrlPagina(ROTAS.modulo.url);
        
    });

    test("realizar login com dados inválidos", { tag: "@LOGIN_FALHA" }, async({ page }) => {
        
        const usuario = await loginDados.getLoginInexistente()
        await authPage.realizarLogin(usuario);
        await uiActionsUtils.verificarTextoVisivel(MENSAGEM_LOGIN_EMAIL_SENHA_INVALIDOS);
    });

    test("realizar login com campos vazios", { tag: "@LOGIN_FALHA" }, async({ page }) => {
        
        const usuario = await loginDados.getLoginVazio()
        await authPage.realizarLogin(usuario);
        await uiActionsUtils.verificarTextoVisivel(MENSAGEM_LOGIN_EMAIL_SENHA_VAZIOS);
    });
});

