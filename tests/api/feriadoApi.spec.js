// import dotenv from "dotenv";
// dotenv.config();

// import { expect, test } from "@playwright/test";
// import { ApiFeriadoHelpers } from "../../src/helpers/apiFeriadoHelpers";
// import { gerarBasicToken } from "../../src/utils/authUtils";
// import { loginCredencial } from "../../src/api/services/authService";
// import { atualizarFeriado, cadastrarFeriado, deletarFeriado } from "../../src/api/services/feriadoService";
// import { MENSAGENS } from "../../fixture/mensagemFixture";

// test.describe.serial("feriado API", { tag: ["@FERIADO_API"] }, () => {

//     test("cadastrar um feriado", { tag: "@FERIADO_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const quantidade = 1;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(Array.isArray(retorno)).toBe(true);
//             expect(retorno).toHaveLength(quantidade);
//             retorno.forEach((item, index) => {
//                 expect(item).toHaveProperty("empresa_id", empresaId);
//                 expect(item).toHaveProperty("data", gerarFeriado.dados[index].data);
//                 expect(item).toHaveProperty("descricao", gerarFeriado.dados[index].descricao);
//             });
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error; 
//         }
//     });
//     test("cadastrar mais de um feriados", { tag: "@FERIADO_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const quantidade = 2;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarMultiplosFeriados = apiFeriadoHelpers.gerarMultiplosFeriados(empresaId, quantidade, true);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarFeriado(gerarMultiplosFeriados, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(Array.isArray(retorno)).toBe(true);
//             expect(retorno).toHaveLength(quantidade);
//             retorno.forEach((item, index) => {
//                 expect(item).toHaveProperty("empresa_id", empresaId);
//                 expect(item).toHaveProperty("data", gerarMultiplosFeriados.dados[index].data);
//                 expect(item).toHaveProperty("descricao", gerarMultiplosFeriados.dados[index].descricao);
//             });
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("cadastrar 2 feriados iguais para empresas diferentes", { tag: "@FERIADO_SUCESSO_API" }, async () => {
//         const empresaIds = [900001, 2];
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarMesmoFeriadoParaEmpresas = apiFeriadoHelpers.gerarMesmoFeriadoParaEmpresas(empresaIds);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarFeriado(gerarMesmoFeriadoParaEmpresas, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(Array.isArray(retorno)).toBe(true);
//             expect(retorno).toHaveLength(empresaIds.length);
//             retorno.forEach((item, index) => {
//                 expect(item).toHaveProperty("empresa_id", gerarMesmoFeriadoParaEmpresas.dados[index].empresa_id);
//                 expect(item).toHaveProperty("data", gerarMesmoFeriadoParaEmpresas.dados[index].data);
//                 expect(item).toHaveProperty("descricao", gerarMesmoFeriadoParaEmpresas.dados[index].descricao);
//             });
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("cadastrar mais de um feriados com itens duplicados no array", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const quantidade = 2;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriadoDuplicado = apiFeriadoHelpers.gerarFeriadoDuplicado(empresaId, quantidade);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarFeriado(gerarFeriadoDuplicado, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(500);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//         }
//     });

//     test("cadastrar feriado igual ao já existente", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.feriadoUtilizado);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("cadastrar feriado com data inválida", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         gerarFeriado.dados[0].data = "2026-13-30";
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.dataInvalida2);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("cadastrar feriado com empresa_id inválido", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 9999999;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(403);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.semPermissao);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("cadastrar feriado com token expirado", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         try {
//             await cadastrarFeriado(gerarFeriado, process.env.API_TOKEN_JWT);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(401);
//             expect(error.response.data).toHaveProperty("error", MENSAGENS.feriadoApi.expiradoToken);
//         }
//     });

//     test("atualizar um feriado", { tag: "@FERIADO_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responseFeriado = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const feriadoAtualizar = apiFeriadoHelpers.atualizarFeriado(empresaId, responseFeriado.data.retorno[0].data);
//             const response = await atualizarFeriado(feriadoAtualizar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("empresa_id", feriadoAtualizar.empresa_id);
//             expect(retorno).toHaveProperty("data", feriadoAtualizar.data);
//             expect(retorno).toHaveProperty("descricao", feriadoAtualizar.descricao);
//         }catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error; 
//         }
//     });

//     test("atualizar feriado com data do feriado inválida", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const dataInvalida = "2026-13-30";
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const feriadoAtualizar = apiFeriadoHelpers.atualizarFeriado(empresaId, dataInvalida);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await atualizarFeriado(feriadoAtualizar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) { 
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.dataInvalida);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("atualizar serviço com empresa_id inválido", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const empresaIdInvalido = 9999999;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responseFeriado = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const feriadoAtualizar = apiFeriadoHelpers.atualizarFeriado(empresaIdInvalido, responseFeriado.data.retorno[0].data);
//             const response = await atualizarFeriado(feriadoAtualizar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(403);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.semPermissao);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("atualizar serviço com token expirado", { tag: "@FERIADO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responseFeriado = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const feriadoAtualizar = apiFeriadoHelpers.atualizarFeriado(empresaId, responseFeriado.data.retorno[0].data);
//             const response = await atualizarFeriado(feriadoAtualizar, process.env.API_TOKEN_JWT);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(401);
//             expect(error.response.data).toHaveProperty("error", MENSAGENS.feriadoApi.expiradoToken);
//         }
//     });

//     test("deletar um feriado", { tag: "@SERVICO_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responseFeriado = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const feriadoDeletar = apiFeriadoHelpers.deletarFeriado(empresaId, responseFeriado.data.retorno[0].data);
//             const response = await deletarFeriado(feriadoDeletar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.deletarFeriado);
//             expect(response.data).toHaveProperty("retorno", {});
//         }catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error; 
//         }
//     });

//     test("deletar um feriado de outra empresa", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responseFeriado = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
//             const feriadoDeletar = apiFeriadoHelpers.deletarFeriado(2, responseFeriado.data.retorno[0].data);
//             const response = await deletarFeriado(feriadoDeletar, loginResponse.data.token);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.feriadoNaoEncontrado);
            
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("deletar um feriado que não existe", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const dataInexistente = "2099-12-31";
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const feriadoInexistente = apiFeriadoHelpers.deletarFeriado(empresaId, dataInexistente);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await deletarFeriado(feriadoInexistente, loginResponse.data.token);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.feriadoNaoEncontrado);
            
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("deletar um feriado com empresa_id inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 9999999;
//         const dataFeriado = "2099-09-25";
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const feriadoInvalido = apiFeriadoHelpers.deletarFeriado(empresaId, dataFeriado);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await deletarFeriado(feriadoInvalido, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(403);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.semPermissao);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("deletar um feriado com token expirado", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const dataFeriado = "2025-09-25";
//         const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
//         const feriadoInvalido = apiFeriadoHelpers.deletarFeriado(empresaId, dataFeriado);
//         try {
//             const response = await deletarFeriado(feriadoInvalido, process.env.API_TOKEN_JWT);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(401);
//             expect(error.response.data).toHaveProperty("error", MENSAGENS.feriadoApi.expiradoToken);
//         }
//     });
// });