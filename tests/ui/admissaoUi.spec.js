// import { test, expect } from "@playwright/test";
// import { LoginPage } from "../../pages/loginPage";
// import { AdmissaoPage } from "../../pages/admissaoPage";
// import { ROTAS } from "../../fixture/rotaFixture";
// import { UiActionsHelpers } from "../../src/helpers/uiActionsHelpers";
// import { USUARIO_UNICO } from "../../fixture/usuarioFixture";
// import  usuario, { UsuarioHelpers }  from "../../src/helpers/usuarioHelpers";

// test.describe("Admissão Preliminar", { tag: ["@ADMISSAO_PRELIMINAR"] }, () => {
//     let uiActionsHelpers;
//     let loginPage;
//     let admissaoPage;
//     let usuarioHelpers;

//     test.beforeEach(async ({ page }) => {
//         console.log(`Iniciando o teste: ${test.info().title}`);

//         uiActionsHelpers = new UiActionsHelpers(page);
//         loginPage = new LoginPage(page);
//         admissaoPage = new AdmissaoPage(page);
//         usuarioHelpers = new UsuarioHelpers();

//         await uiActionsHelpers.navegarEVerificarTituloPagina(ROTAS.login.url, ROTAS.login.titulo);
//     });

//     test.afterEach(async ({ page }) => {
//         console.log(`Finalizando o teste: ${test.info().title}`);
//     });

//     test("realizar admissão preliminar com sucesso contribuinte", { tag: "@ADMISSAO_PRELIMINAR_SUCESSO" }, async({ page }) => {
//         const usuario = await usuarioHelpers.gerarUsuario();

//         await loginPage.realizarLogin(USUARIO_UNICO);
//         await admissaoPage.acessarModuloRHNetSocial();
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);
//         await page.pause();



//     });
// });