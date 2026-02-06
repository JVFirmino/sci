// import dotenv from "dotenv";
// dotenv.config();

// import { expect, test } from "@playwright/test";
// import { ApiPreliminarHelpers } from "../../src/helpers/apiPreliminarHelpers";
// import { gerarBasicToken } from "../../src/utils/authUtils";
// import { loginCredencial } from "../../src/api/services/authService";
// import { atualizarPreliminar, cadastrarAdmissaoPreliminar, deletarAdmissaoPreliminar } from "../../src/api/services/preliminarService";
// import { MENSAGENS } from "../../fixture/mensagemFixture";

// test.describe.serial("preliminar API", { tag: ["@PRELIMINAR_API"] }, () => {

//     test("cadastrar admissão preliminar contribuinte com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             expect(response.status).toBe(201);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", expect.anything());
//             expect(retorno).toHaveProperty("empresa_id", gerarPreliminar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", gerarPreliminar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", gerarPreliminar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", gerarPreliminar.classe_id);
//             expect(retorno).toHaveProperty("nome", gerarPreliminar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", gerarPreliminar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", gerarPreliminar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", gerarPreliminar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", gerarPreliminar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });
    
//     test("cadastrar admissão preliminar empregado com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoContrato = 2;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             expect(response.status).toBe(201);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", expect.anything());
//             expect(retorno).toHaveProperty("empresa_id", gerarPreliminar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", gerarPreliminar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", gerarPreliminar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", gerarPreliminar.classe_id);
//             expect(retorno).toHaveProperty("nome", gerarPreliminar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", gerarPreliminar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", gerarPreliminar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", gerarPreliminar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", gerarPreliminar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("tipo_admissao", gerarPreliminar.tipo_admissao);
//             expect(retorno).toHaveProperty("funcao_id", gerarPreliminar.funcao_id);
//             expect(retorno).toHaveProperty("tipo", gerarPreliminar.tipo);
//             expect(retorno).toHaveProperty("salario", gerarPreliminar.salario);
//             expect(retorno).toHaveProperty("contrato_tipo_id", gerarPreliminar.contrato_tipo_id);
//             expect(retorno).toHaveProperty("prazo_experiencia", gerarPreliminar.prazo_experiencia);
//             expect(retorno).toHaveProperty("fim_prazo_experiencia", gerarPreliminar.fim_prazo_experiencia);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("cadastrar admissão preliminar empregado com contrato tipo 1 (sem experiência) com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoContrato = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             expect(response.status).toBe(201);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", expect.anything());
//             expect(retorno).toHaveProperty("empresa_id", gerarPreliminar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", gerarPreliminar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", gerarPreliminar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", gerarPreliminar.classe_id);
//             expect(retorno).toHaveProperty("nome", gerarPreliminar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", gerarPreliminar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", gerarPreliminar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", gerarPreliminar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", gerarPreliminar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("tipo_admissao", gerarPreliminar.tipo_admissao);
//             expect(retorno).toHaveProperty("funcao_id", gerarPreliminar.funcao_id);
//             expect(retorno).toHaveProperty("tipo", gerarPreliminar.tipo);
//             expect(retorno).toHaveProperty("salario", gerarPreliminar.salario);
//             expect(retorno).toHaveProperty("contrato_tipo_id", gerarPreliminar.contrato_tipo_id);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("cadastrar admissão preliminar empregado estagiário com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 0;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador, { classe_id : 2, tipo_admissao: apiPreliminarHelpers.gerarAleatorio(apiPreliminarHelpers.tipoAdmissao) });
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             expect(response.status).toBe(201);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", expect.anything());
//             expect(retorno).toHaveProperty("empresa_id", gerarPreliminar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", gerarPreliminar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", gerarPreliminar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", gerarPreliminar.classe_id);
//             expect(retorno).toHaveProperty("nome", gerarPreliminar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", gerarPreliminar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", gerarPreliminar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", gerarPreliminar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", gerarPreliminar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("tipo_admissao", gerarPreliminar.tipo_admissao);     
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("cadastrar admissão preliminar iguais para empresas diferentes", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const clonePreliminar = structuredClone(gerarPreliminar);
//             clonePreliminar.empresa_id = 2
//             const response = await cadastrarAdmissaoPreliminar(clonePreliminar, loginResponse.data.token);
//             expect(response.status).toBe(201);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", expect.anything());
//             expect(retorno).toHaveProperty("empresa_id", clonePreliminar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", clonePreliminar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", clonePreliminar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", clonePreliminar.classe_id);
//             expect(retorno).toHaveProperty("nome", clonePreliminar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", clonePreliminar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", clonePreliminar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", clonePreliminar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", clonePreliminar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("cadastrar admissão preliminar já existente", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(409)
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.admissaoExistente);
//             expect(error.response.data).toHaveProperty("retorno");
//         }
//     });


//     test("cadastrar admissão preliminar com classeId diferente", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const contratoTipo = 1
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, contratoTipo, { classe_id : apiPreliminarHelpers.gerarClasse(1) });
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try{
//             const loginResponse = await loginCredencial(token);
//             await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         }catch(error){
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.classeIdInexistente);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("cadastrar admissão preliminar com categoriaEsocial diferente", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador, { categoria_esocial_id : apiPreliminarHelpers.gerarCategoriaEsocial(0) });
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try{
//             const loginResponse = await loginCredencial(token);
//             await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         }catch(error){
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.categoriaEsocialInexistente);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("cadastrar admissão preliminar com empresa_id inválido", { tag: "@PRELIMINAR_FALHA_AP" }, async () => {
//         const empresaId = 999999;
//         const tipoContrato = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(403);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.semPermissao);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });
    
//     test("cadastrar admissão preliminar com token expirado", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 999999;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         try {
//             await cadastrarAdmissaoPreliminar(gerarPreliminar, process.env.API_TOKEN_JWT);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(401);
//             expect(error.response.data).toHaveProperty("error", MENSAGENS.preliminar.expiradoToken);
//         }
//     });

//     test("atualizar uma admissão preliminar contribuinte", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarContribuinteAtualizar(empresaId, responsePreliminar.data.retorno.id, tipoColaborador);
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", preliminarAtualizar.id);
//             expect(retorno).toHaveProperty("empresa_id", preliminarAtualizar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", preliminarAtualizar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", preliminarAtualizar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", preliminarAtualizar.classe_id);
//             expect(retorno).toHaveProperty("nome", preliminarAtualizar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", preliminarAtualizar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", preliminarAtualizar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", preliminarAtualizar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", preliminarAtualizar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("atualizar uma admissão preliminar empregado", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoContrato = 2;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarEmpregadoAtualizar(empresaId, responsePreliminar.data.retorno.id, tipoContrato);
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", preliminarAtualizar.id);
//             expect(retorno).toHaveProperty("empresa_id", preliminarAtualizar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", preliminarAtualizar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", preliminarAtualizar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", preliminarAtualizar.classe_id);
//             expect(retorno).toHaveProperty("nome", preliminarAtualizar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", preliminarAtualizar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", preliminarAtualizar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", preliminarAtualizar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", preliminarAtualizar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("tipo_admissao", preliminarAtualizar.tipo_admissao);
//             expect(retorno).toHaveProperty("funcao_id", preliminarAtualizar.funcao_id);
//             expect(retorno).toHaveProperty("tipo", preliminarAtualizar.tipo);
//             expect(retorno).toHaveProperty("salario", preliminarAtualizar.salario);
//             expect(retorno).toHaveProperty("contrato_tipo_id", preliminarAtualizar.contrato_tipo_id);
//             expect(retorno).toHaveProperty("prazo_experiencia", preliminarAtualizar.prazo_experiencia);
//             expect(retorno).toHaveProperty("fim_prazo_experiencia", preliminarAtualizar.fim_prazo_experiencia);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("atualizar admissão preliminar empregado com contrato tipo 1 (sem experiência) com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoContrato = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarEmpregadoAtualizar(empresaId, responsePreliminar.data.retorno.id, tipoContrato);
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", preliminarAtualizar.id);
//             expect(retorno).toHaveProperty("empresa_id", preliminarAtualizar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", preliminarAtualizar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", preliminarAtualizar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", preliminarAtualizar.classe_id);
//             expect(retorno).toHaveProperty("nome", preliminarAtualizar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", preliminarAtualizar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", preliminarAtualizar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", preliminarAtualizar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", preliminarAtualizar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("tipo_admissao", preliminarAtualizar.tipo_admissao);
//             expect(retorno).toHaveProperty("funcao_id", preliminarAtualizar.funcao_id);
//             expect(retorno).toHaveProperty("tipo", preliminarAtualizar.tipo);
//             expect(retorno).toHaveProperty("salario", preliminarAtualizar.salario);
//             expect(retorno).toHaveProperty("contrato_tipo_id", preliminarAtualizar.contrato_tipo_id);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("atualizar admissão preliminar empregado estagiário com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 0;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador, { classe_id : 2, tipo_admissao: apiPreliminarHelpers.gerarAleatorio(apiPreliminarHelpers.tipoAdmissao) });
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarContribuinteAtualizar(empresaId, responsePreliminar.data.retorno.id, tipoColaborador, { classe_id : 2, tipo_admissao: apiPreliminarHelpers.gerarAleatorio(apiPreliminarHelpers.tipoAdmissao) });
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", preliminarAtualizar.id);
//             expect(retorno).toHaveProperty("empresa_id", preliminarAtualizar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", preliminarAtualizar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", preliminarAtualizar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", preliminarAtualizar.classe_id);
//             expect(retorno).toHaveProperty("nome", preliminarAtualizar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", preliminarAtualizar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", preliminarAtualizar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", preliminarAtualizar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", preliminarAtualizar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("tipo_admissao", preliminarAtualizar.tipo_admissao);     
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

    
//     test("atualizar uma admissão preliminar contribuinte com meus vId já existente", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminarA = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const gerarPreliminarB = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminarA = await cadastrarAdmissaoPreliminar(gerarPreliminarA, loginResponse.data.token);
//             const responsePreliminarB = await cadastrarAdmissaoPreliminar(gerarPreliminarB, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarContribuinteAtualizar(empresaId, responsePreliminarB.data.retorno.id, tipoColaborador, { v_id: responsePreliminarA.data.retorno.v_id});
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
//             expect(response.data).toHaveProperty("retorno");

//             const { retorno } = response.data;
//             expect(retorno).toHaveProperty("id", preliminarAtualizar.id);
//             expect(retorno).toHaveProperty("empresa_id", preliminarAtualizar.empresa_id);
//             expect(retorno).toHaveProperty("v_id", preliminarAtualizar.v_id);
//             expect(retorno).toHaveProperty("tipo_colaborador", preliminarAtualizar.tipo_colaborador);
//             expect(retorno).toHaveProperty("classe_id", preliminarAtualizar.classe_id);
//             expect(retorno).toHaveProperty("nome", preliminarAtualizar.nome);
//             expect(retorno).toHaveProperty("nascimento_data", preliminarAtualizar.nascimento_data);
//             expect(retorno).toHaveProperty("admissao_data", preliminarAtualizar.admissao_data);
//             expect(retorno).toHaveProperty("cpf", preliminarAtualizar.cpf);
//             expect(retorno).toHaveProperty("categoria_esocial_id", preliminarAtualizar.categoria_esocial_id);
//             expect(retorno).toHaveProperty("liberacao_id", 2);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("atualizar admissão preliminar com classeId diferente", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const contratoTipo = 1
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, contratoTipo);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try{
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarEmpregadoAtualizar(empresaId, responsePreliminar.data.retorno.id, contratoTipo, {  classe_id : apiPreliminarHelpers.gerarClasse(1) });
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         }catch(error){
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.classeIdInexistente);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("atualizar admissão preliminar com categoriaEsocial diferente", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador, { categoria_esocial_id : apiPreliminarHelpers.gerarCategoriaEsocial(0) });
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try{
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarContribuinteAtualizar(empresaId, responsePreliminar.data.retorno.id, tipoColaborador, { categoria_esocial_id : apiPreliminarHelpers.gerarCategoriaEsocial(0) });
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token)
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         }catch(error){
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.categoriaEsocialInexistente);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("atualizar admissão preliminar com id da admissão preliminar inválido", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1
//         const preliminarIdInvalido = 9999999;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarContribuinteAtualizar(empresaId, preliminarIdInvalido, tipoColaborador);
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         }
//         catch (error) {
//             expect(error.response.status).toBe(422);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.idPreliminarNaoEncontrado);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("atualizar admissão preliminar com empresa_id inválido", { tag: "@PRELIMINAR_FALHA_AP" }, async () => {
//         const empresaId = 900001;
//         const empresaIdInvalido = 9999999;
//         const tipoContrato = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarEmpregadoAtualizar(empresaIdInvalido, responsePreliminar.data.retorno.id, tipoContrato);
//             const response = await atualizarPreliminar(preliminarAtualizar, loginResponse.data.token)
//             throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(403);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.semPermissao);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });
    
//     test("atualizar admissão preliminar com token expirado", { tag: "@PRELIMINAR_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarAtualizar = apiPreliminarHelpers.gerarItemPreliminarContribuinteAtualizar(empresaId, responsePreliminar.data.retorno.id, tipoColaborador);
//             const response = await atualizarPreliminar(preliminarAtualizar, process.env.API_TOKEN_JWT)
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(401);
//             expect(error.response.data).toHaveProperty("error", MENSAGENS.preliminar.expiradoToken);
//         }
//     });


//     test("deletar uma admissão preliminar", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarDeletar = apiPreliminarHelpers.montarPayloadDeletarPreliminar(empresaId, responsePreliminar.data.retorno.id);
//             const response = await deletarAdmissaoPreliminar(preliminarDeletar, loginResponse.data.token)
//             expect(response.status).toBe(200);
//             expect(response.data).toHaveProperty("sucesso", true);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.deletarPreliminar);
//             expect(response.data).toHaveProperty("retorno", {});
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("deletar uma admissão de outra empresa", { tag: "@PRELIMINAR_SUCESSO_API" }, async() => {
//         const empresaId = 900001;
//         const tipoColaborador = 1;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
//             const preliminarDeletar = apiPreliminarHelpers.montarPayloadDeletarPreliminar(2, responsePreliminar.data.retorno.id);
//             const response = await deletarAdmissaoPreliminar(preliminarDeletar, loginResponse.data.token)
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.preliminarNaoEncontrado);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     })

//     test("deletar uma admissão preliminar que não existe", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const idPreliminar = 123123; 
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const preliminarDeletar = apiPreliminarHelpers.montarPayloadDeletarPreliminar(empresaId, idPreliminar);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await deletarAdmissaoPreliminar(preliminarDeletar, loginResponse.data.token);
//             expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.preliminarNaoEncontrado);
//         } catch (error) {
//             console.error("Erro ao realizar a requisição:", error);
//             throw error;
//         }
//     });

//     test("deletar uma admissão preliminar com empresa_id inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 9999999;
//         const idPreliminar = 9999999;
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const preliminarDeletar = apiPreliminarHelpers.montarPayloadDeletarPreliminar(empresaId, idPreliminar);
//         const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD); 
//         try {
//             const loginResponse = await loginCredencial(token);
//             const response = await deletarAdmissaoPreliminar(preliminarDeletar, loginResponse.data.token);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(403);
//             expect(error.response.data).toHaveProperty("sucesso", false);
//             expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.semPermissao);
//             expect(error.response.data).toHaveProperty("erros");
//             expect(error.response.data).toHaveProperty("retorno", {});
//         }
//     });

//     test("deletar um serviço com token expirado", { tag: "@SERVICO_FALHA_API" }, async () => {
//         const empresaId = 900001;
//         const idPreliminar = 221; 
//         const apiPreliminarHelpers = new ApiPreliminarHelpers();
//         const preliminarDeletar = apiPreliminarHelpers.montarPayloadDeletarPreliminar(empresaId, idPreliminar);
//         try {    
//             const response = await deletarAdmissaoPreliminar(preliminarDeletar, process.env.API_TOKEN_JWT);
//             throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
//         } catch (error) {
//             expect(error.response.status).toBe(401);
//             expect(error.response.data).toHaveProperty("error", MENSAGENS.preliminar.expiradoToken);
//         }
//     });
// });