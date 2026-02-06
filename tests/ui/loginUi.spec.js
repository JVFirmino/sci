// import { test, expect } from "@playwright/test";
// import { ActionsUtils } from "../../src/utils/actionsUtils";
// import { LoginPage } from "../../pages/loginPage";
// import { ROTAS } from "../../fixture/rotaFixture";
// import { MENSAGENS } from "../../fixture/mensagemFixture";
// import { USUARIOS } from "../../fixture/usuarioFixture";

// test.describe("login usuário UI", { tag: ["@LOGIN_UI"] }, () => {
//     let uiActionsHelpers;
//     let loginPage;

//     test.beforeEach(async ({ page }) => {
//         console.log(`Iniciando o teste: ${test.info().title}`);

//         uiActionsHelpers = new ActionsUtils(page);
//         loginPage = new LoginPage(page);

//         // Acessar a página de login e verificar o título
//         await uiActionsHelpers.navegarEVerificarTituloPagina(ROTAS.login.url, ROTAS.login.titulo);
//     });

//     test.afterEach(async ({ page }) => {
//         console.log(`Finalizando o teste: ${test.info().title}`);
//     });

//     /*
//     Cenário 1: Realizar login com dados válidos

//     Passo a Passo:
//     1. Acessar a página de login.
//     2. Informar o e-mail e senha de um usuário previamente cadastrado.
//     3. Submeter o formulário de login.
//     4. Verificar se a URL foi redirecionada para a página principal do sistema.

//     Resultado Esperado:
//     - O sistema deve autenticar o usuário e redirecionar para a URL principal definida em `ROTAS.modulo.url`.

//     Motivo:
//     - Este teste garante que o processo de login está funcionando corretamente para usuários com dados válidos.

//     Criticidade:
//     - Alta. O login é a principal porta de entrada para o sistema e precisa funcionar corretamente para que o usuário possa utilizar as funcionalidades.
//    */
//     test("realizar login com dados válidos", { tag: "@LOGIN_SUCESSO_UI" }, async({ page }) => {
//         // Realizar login com dados válidos
//         await loginPage.realizarLogin(USUARIOS.valido);

//         // Verificar se o login foi bem-sucedido verificando a URL 
//         await expect(page).toHaveURL(ROTAS.modulo.url);
//     });

//     /*
//     Cenário 2: Realizar login com dados inválidos

//     Passo a Passo:
//     1. Acessar a página de login.
//     2. Informar um e-mail e/ou senha inválidos.
//     3. Submeter o formulário de login.
//     4. Verificar se a mensagem de erro "Email e/ou senha inválidos" é exibida na tela.

//     Resultado Esperado:
//     - O sistema deve exibir uma mensagem informando que as credenciais estão incorretas, sem permitir o acesso ao sistema.

//     Motivo:
//     - Este teste garante que o sistema trata corretamente tentativas de login com dados inválidos, mantendo a segurança e integridade do acesso.

//     Criticidade:
//     - Alta. A validação de credenciais incorretas é fundamental para prevenir acessos não autorizados.
//     */
//     test("realizar login com dados inválidos", { tag: "@LOGIN_FALHA_UI" }, async({ page }) => {
//         // Realizar login com dados inválidos
//         await loginPage.realizarLogin(USUARIOS.invalido);
        
//         // Verificar se a mensagem de erro correta é exibida
//         await expect(page.getByText(MENSAGENS.loginUi.erroCredenciaisInvalidas)).toBeVisible();
//     });


//     /*
//     Cenário 3: Realizar login com dados vazios

//     Passo a Passo:
//     1. Acessar a página de login.
//     2. Deixar os campos de e-mail e senha vazios.
//     3. Submeter o formulário de login.
//     4. Verificar se a mensagem de erro informando campos obrigatórios é exibida na tela.

//     Resultado Esperado:
//     - O sistema deve exibir uma mensagem informando que os campos de e-mail e senha são obrigatórios.

//     Motivo:
//     - Este teste garante que o sistema está validando corretamente os campos obrigatórios no processo de login, evitando requisições inválidas.

//     Criticidade:
//     - Média. A validação de campos obrigatórios é essencial para garantir a integridade dos dados enviados ao backend.
//     */
//     test("realizar login com dados vazios", { tag: "@LOGIN_FALHA_UI" }, async({ page }) => {
//         // Realizar login com dados vazios
//         await loginPage.realizarLogin(USUARIOS.vazio);

//         // Verificar se a mensagem de erro correta é exibida
//         await expect(page.getByText(MENSAGENS.loginUi.erroCamposVazios)).toBeVisible();
//     });
// });

