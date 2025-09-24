import { test, expect } from "@playwright/test";
import { UiActionsUtils } from "../../utils/uiActionsUtils";
import { AuthPage } from "../../pages/authPage";
import { AdmissaoPage } from "../../pages/admissao";
import { LoginDados } from "../../utils/dados/loginDados";
import { ROTAS } from "../../fixture/rotaFixture";

test.describe("Admissão Preliminar", { tag: ["@ADMISSÃO_PRELIMINAR"] }, () => {
    let uiActionsUtils;
    let authPage;
    let loginDados;
    let admissaoPage;

    test.beforeEach(async ({ page }) => {
        console.log(`Iniciando o teste: ${test.info().title}`);

        uiActionsUtils = new UiActionsUtils(page);
        authPage = new AuthPage(page);
        admissaoPage = new AdmissaoPage(page);
        loginDados = new LoginDados();

        await uiActionsUtils.navegarEVerificarTituloPagina(ROTAS.login.url, ROTAS.login.titulo);
    });

    test.afterEach(async ({ page }) => {
        console.log(`Finalizando o teste: ${test.info().title}`);
    });

    test("realizar admissão preliminar com sucesso", { tag: "@ADMISSÃO_PRELIMINAR_SUCESSO" }, async({ page }) => {
        
        const usuario = await loginDados.getLoginUnico()
        await authPage.realizarLogin(usuario);
        await admissaoPage.realizarAdmissaoPreliminar();
        await page.pause();

    });
});