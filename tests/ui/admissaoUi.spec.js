// import { test, expect } from "@playwright/test";
// import { LoginPage } from "../../pages/loginPage";
// import { AdmissaoPage } from "../../pages/admissaoPage";
// import { ROTAS } from "../../fixture/rotaFixture";
// import { UiActionsHelpers } from "../../src/helpers/uiActionsHelpers";
// import { USUARIOS } from "../../fixture/usuarioFixture";
// import { UsuarioHelpers }  from "../../src/helpers/usuarioHelpers";
// import { MENSAGENS } from "../../fixture/mensagemFixture";

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

//         // Acessar a página de login e verificar o título
//         await uiActionsHelpers.navegarEVerificarTituloPagina(ROTAS.login.url, ROTAS.login.titulo);
//     });

//     test.afterEach(async ({ page }) => {
//         console.log(`Finalizando o teste: ${test.info().title}`);
//     });

//     /*
//     Cenário 1: Realizar admissão preliminar com sucesso - Contribuinte Dirigente sindical

//     Passo a Passo:
//     1. Gerar os dados de um novo usuário.
//     2. Realizar login com um usuário válido.
//     3. Acessar o módulo RHNetSocial.
//     4. Realizar o processo de admissão preliminar com o tipo "Contribuinte" e categoria "Dirigente sindical".
//     5. Verificar se a mensagem de sucesso da admissão é exibida na tela.

//     Resultado Esperado:
//     - O sistema deve concluir o processo de admissão preliminar com sucesso e exibir a mensagem definida em `MENSAGENS.admissao.sucessoAdmissao`.

//     Motivo:
//     - Este teste garante que o processo de admissão preliminar funciona corretamente para o tipo de vínculo "Contribuinte" com a categoria "Dirigente sindical".

//     Criticidade:
//     - Alta. A admissão preliminar é uma etapa essencial no cadastro de vínculos no sistema e deve funcionar corretamente para todos os tipos e categorias.
//     */
    // test("realizar admissão preliminar com sucesso contribuinte dirigente sindical", { tag: "@ADMISSAO_PRELIMINAR_CONTRIBUINTE_SUCESSO" }, async({ page }) => {
    //     const tipoCadastro = "Contribuinte";
    //     const classe = "Dirigente sindical";
        
    //     // Gerar um usuário
    //     const usuario = await usuarioHelpers.gerarUsuario({
    //         tipoCadastro, 
    //         classe
    //     });

    //     // Realizar login
    //     await loginPage.realizarLogin(USUARIOS.valido);

    //     // Acessar o módulo RHNetSocial
    //     await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

    //     // Realizar admissão preliminar
    //     await admissaoPage.realizarAdmissaoPreliminar(usuario);

    //     // Verificar se a admissão foi realizada com sucesso
    //     await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
    // });

//     /*
//     Cenário 2: Realizar admissão preliminar com sucesso - Contribuinte Pró-Laborista

//     Passo a Passo:
//     1. Gerar os dados de um novo usuário.
//     2. Realizar login com um usuário válido.
//     3. Acessar o módulo RHNetSocial.
//     4. Realizar o processo de admissão preliminar com o tipo "Contribuinte" e categoria "Pró-Laborista".
//     5. Verificar se a mensagem de sucesso da admissão é exibida na tela.

//     Resultado Esperado:
//     - O sistema deve concluir o processo de admissão preliminar com sucesso e exibir a mensagem definida em `MENSAGENS.admissao.sucessoAdmissao`.

//     Motivo:
//     - Este teste garante que o processo de admissão preliminar funciona corretamente para o tipo de vínculo "Contribuinte" com a categoria "Pró-Laborista".

//     Criticidade:
//     - Alta. A admissão preliminar é uma etapa essencial no cadastro de vínculos no sistema e deve funcionar corretamente para todos os tipos e categorias.
//     */
//     test("realizar admissão preliminar com sucesso contribuinte pró-laborista", { tag: "@ADMISSAO_PRELIMINAR_CONTRIBUINTE_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Contribuinte";
//         const classe = "Pró-Laborista";
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });

//     /*
//     Cenário 3: Realizar admissão preliminar com sucesso - Contribuinte Servidor Público

//     Passo a Passo:
//     1. Gerar os dados de um novo usuário.
//     2. Realizar login com um usuário válido.
//     3. Acessar o módulo RHNetSocial.
//     4. Realizar o processo de admissão preliminar com o tipo "Contribuinte" e categoria "Servidor Público".
//     5. Verificar se a mensagem de sucesso da admissão é exibida na tela.

//     Resultado Esperado:
//     - O sistema deve concluir o processo de admissão preliminar com sucesso e exibir a mensagem definida em `MENSAGENS.admissao.sucessoAdmissao`.

//     Motivo:
//     - Este teste garante que o processo de admissão preliminar funciona corretamente para o tipo de vínculo "Contribuinte" com a categoria "Servidor Público".

//     Criticidade:
//     - Alta. A admissão preliminar é uma etapa essencial no cadastro de vínculos no sistema e deve funcionar corretamente para todos os tipos e categorias.
//     */
//     test("realizar admissão preliminar com sucesso contribuinte servidor público", { tag: "@ADMISSAO_PRELIMINAR_CONTRIBUINTE_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Contribuinte";
//         const classe = "Servidor Público";
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });


//     /*
//     Cenário 4: Realizar admissão preliminar com sucesso - Contribuinte Sócio cotista

//     Passo a Passo:
//     1. Gerar os dados de um novo usuário.
//     2. Realizar login com um usuário válido.
//     3. Acessar o módulo RHNetSocial.
//     4. Realizar o processo de admissão preliminar com o tipo "Contribuinte" e categoria "Sócio cotista".
//     5. Verificar se a mensagem de sucesso da admissão é exibida na tela.

//     Resultado Esperado:
//     - O sistema deve concluir o processo de admissão preliminar com sucesso e exibir a mensagem definida em `MENSAGENS.admissao.sucessoAdmissao`.

//     Motivo:
//     - Este teste garante que o processo de admissão preliminar funciona corretamente para o tipo de vínculo "Contribuinte" com a categoria "Sócio cotista".

//     Criticidade:
//     - Alta. A admissão preliminar é uma etapa essencial no cadastro de vínculos no sistema e deve funcionar corretamente para todos os tipos e categorias.
//     */
//     test("realizar admissão preliminar com sucesso contribuinte sócio cotista", { tag: "@ADMISSAO_PRELIMINAR_SUCESSO" }, async({ page }) => {
//         const tipoCadastro =  "Contribuinte";
//         const classe = "Sócio cotista";
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });


//     test("realizar admissão preliminar com sucesso empregado aposentado", { tag: "@ADMISSAO_PRELIMINAR_EMPREGADO_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Empregado";
//         const classe = "Aposentado";
//         const tipoAdmissao = "Primeiro emprego";
//         const tipoColaborador = "Mensalista";
//         const tipoContrato = "1 - Contrato de trabalho por prazo indeterminado"
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe,
//             tipoAdmissao,
//             tipoColaborador,
//             tipoContrato
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });

//     test("realizar admissão preliminar com sucesso empregado assalariado", { tag: "@ADMISSAO_PRELIMINAR_EMPREGADO_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Empregado";
//         const classe = "Assalariado";
//         const tipoAdmissao = "Outros casos não previstos";
//         const tipoColaborador = "Diarista";
//         const tipoContrato = "1 - Contrato de trabalho por prazo indeterminado"
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe,
//             tipoAdmissao,
//             tipoColaborador,
//             tipoContrato
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });

//     test("realizar admissão preliminar com sucesso empregado empregada doméstica", { tag: "@ADMISSAO_PRELIMINAR_EMPREGADO_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Empregado";
//         const classe = "Empregada doméstica";
//         const tipoAdmissao = "Reintegração";
//         const tipoColaborador = "Horista";
//         const tipoContrato = "1 - Contrato de trabalho por prazo indeterminado"
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe,
//             tipoAdmissao,
//             tipoColaborador,
//             tipoContrato
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });

//     test("realizar admissão preliminar com sucesso empregado estagiário", { tag: "@ADMISSAO_PRELIMINAR_EMPREGADO_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Empregado";
//         const classe = "Estagiário";
//         const tipoAdmissao = "Reemprego";
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe,
//             tipoAdmissao
//         });
//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });

//     test("realizar admissão preliminar com sucesso empregado temporário", { tag: "@ADMISSAO_PRELIMINAR_EMPREGADO_SUCESSO" }, async({ page }) => {
//         const tipoCadastro = "Empregado";
//         const classe = "Temporário";
//         const tipoAdmissao = "Transferência entre matriz e filial";
//         const tipoColaborador = "Comissionado";
//         const tipoContrato = "1 - Contrato de trabalho por prazo indeterminado"
        
//         // Gerar um usuário
//         const usuario = await usuarioHelpers.gerarUsuario({
//             tipoCadastro,
//             classe,
//             tipoAdmissao,
//             tipoColaborador,
//             tipoContrato
//         });

//         // Realizar login
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Acessar o módulo RHNetSocial
//         await uiActionsHelpers.acessarModuloRHNetSocial("rhnetsocial");

//         // Realizar admissão preliminar
//         await admissaoPage.realizarAdmissaoPreliminar(usuario);

//         // Verificar se a admissão foi realizada com sucesso
//         await expect(page.getByText(MENSAGENS.admissao.sucessoAdmissao)).toBeVisible();
//     });
// });