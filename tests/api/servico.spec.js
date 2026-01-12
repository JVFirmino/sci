import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import { atualizarServico, cadastrarServico, deletarServico } from "../../src/api/services/servicoService";
import { ApiServicoHelpers } from "../../src/helpers/apiServicoHelpers";
import { MENSAGENS } from "../../fixture/mensagemFixture";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { faker } from "@faker-js/faker";

test.describe("serviço API", { tag: ["@SERVICO_API"] }, () => {

    test("cadastrar um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServicos = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarServico(gerarServicos, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toMatchObject({
                    empresa_id: gerarServicos.dados[index].empresa_id,
                    cbo: gerarServicos.dados[index].cbo,
                    descricao_cbo: gerarServicos.dados[index].descricao_cbo,
                    categoria_esocial: gerarServicos.dados[index].categoria_esocial,
                    ativo: gerarServicos.dados[index].ativo
                });
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
            });
        }catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("cadastrar mais de um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarMultiplosServicos = apiServicoHelpers.gerarMultiplosServicos(empresaId, quantidade, true);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarServico(gerarMultiplosServicos, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toMatchObject({
                    empresa_id: gerarMultiplosServicos.dados[index].empresa_id,
                    cbo: gerarMultiplosServicos.dados[index].cbo,
                    descricao_cbo: gerarMultiplosServicos.dados[index].descricao_cbo,
                    categoria_esocial: gerarMultiplosServicos.dados[index].categoria_esocial,
                    ativo: gerarMultiplosServicos.dados[index].ativo
                });
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
            });
        }catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("cadastrar serviço com CBO diferente de um serviço já existente", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarServico(gerarServico, loginResponse.data.token);
            const cloneServico = structuredClone(gerarServico);
            cloneServico.dados[0].cbo = `${faker.string.numeric(4)}-${faker.string.numeric(2)}`;
            const response = await cadastrarServico(cloneServico, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toMatchObject({
                    empresa_id: cloneServico.dados[index].empresa_id,
                    cbo: cloneServico.dados[index].cbo,
                    descricao_cbo: cloneServico.dados[index].descricao_cbo,
                    categoria_esocial: cloneServico.dados[index].categoria_esocial,
                    ativo: cloneServico.dados[index].ativo
                });
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;  
        }     
    });

    test("cadastrar serviço com esocial diferente de um serviço já existente", { tag: "@SERVICO_SUCESSO_API"}, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token)
            await cadastrarServico(gerarServico, loginResponse.data.token);
            const cloneServico = structuredClone(gerarServico);
            cloneServico.dados[0].categoria_esocial = `${apiServicoHelpers.gerarCategoriaEsocial()}`;
            const response = await cadastrarServico(cloneServico, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toMatchObject({
                    empresa_id: cloneServico.dados[index].empresa_id,
                    cbo: cloneServico.dados[index].cbo,
                    descricao_cbo: cloneServico.dados[index].descricao_cbo,
                    categoria_esocial: cloneServico.dados[index].categoria_esocial,
                    ativo: cloneServico.dados[index].ativo
                });
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar 2 servicos iguais para empresas diferentes", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaIds = [900001, 2];
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarMesmoServicoParaEmpresas = apiServicoHelpers.gerarMesmoServicoParaEmpresas(empresaIds);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarServico(gerarMesmoServicoParaEmpresas, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(empresaIds.length);
            retorno.forEach((item, index) => {
                expect(item).toMatchObject({
                    empresa_id: gerarMesmoServicoParaEmpresas.dados[index].empresa_id,
                    cbo: gerarMesmoServicoParaEmpresas.dados[index].cbo,
                    descricao_cbo: gerarMesmoServicoParaEmpresas.dados[index].descricao_cbo,
                    categoria_esocial: gerarMesmoServicoParaEmpresas.dados[index].categoria_esocial,
                    ativo: gerarMesmoServicoParaEmpresas.dados[index].ativo
                });
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
            });
        }catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar mais de um serviços com itens duplicados no array", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServicoDuplicado(empresaId, quantidade);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarServico(gerarServico, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.duplicadoServico);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("cadastrar serviço igual já existente", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarServico(gerarServico, loginResponse.data.token);
            const response = await cadastrarServico(gerarServico, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.utilizadoCodigoCbo);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("cadastrar serviço com empresa_id inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 9999999;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarServico(gerarServico, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("cadastrar serviço com token expirado", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        try {
            const response = await cadastrarServico(gerarServico, process.env.TOKEN_REFRESH_EXPIRADO);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.servicoApi.expiradoToken);
        }
    });

    test("atualizar um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServico = await cadastrarServico(gerarServico, loginResponse.data.token);
            const servicoAtualizar = apiServicoHelpers.atualizarServico(empresaId, responseServico.data.retorno[0].tipo_servico_autonomo_id);
            const response = await atualizarServico(servicoAtualizar, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(retorno).toHaveProperty("tipo_servico_autonomo_id", servicoAtualizar.tipo_servico_autonomo_id);
            expect(retorno).toHaveProperty("cliente_id");
            expect(retorno).toHaveProperty("empresa_id", servicoAtualizar.empresa_id);
            expect(retorno).toHaveProperty("cbo", servicoAtualizar.cbo);
            expect(retorno).toHaveProperty("descricao_cbo", servicoAtualizar.descricao_cbo);
            expect(retorno).toHaveProperty("categoria_esocial", servicoAtualizar.categoria_esocial);
            expect(retorno).toHaveProperty("ativo", servicoAtualizar.ativo);
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            throw error;
        }
    });

    test("atualizar serviço com CBO diferente de um serviço já existente", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServicoA = apiServicoHelpers.gerarServico(empresaId, false);
        const gerarServicoB = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServicoA = await cadastrarServico(gerarServicoA, loginResponse.data.token);
            const responseServicoB = await cadastrarServico(gerarServicoB, loginResponse.data.token);
            const servicoA = responseServicoA.data.retorno[0];
            const servicoB = responseServicoB.data.retorno[0];

            const servicoAtualizar = apiServicoHelpers.gerarPayloadAtualizacao(servicoA, servicoB, { cbo: `${faker.string.numeric(4)}-${faker.string.numeric(2)}` });
            const response = await atualizarServico(servicoAtualizar, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(retorno).toHaveProperty("tipo_servico_autonomo_id", servicoAtualizar.tipo_servico_autonomo_id);
            expect(retorno).toHaveProperty("cliente_id");
            expect(retorno).toHaveProperty("empresa_id", servicoAtualizar.empresa_id);
            expect(retorno).toHaveProperty("cbo", servicoAtualizar.cbo);
            expect(retorno).toHaveProperty("descricao_cbo", servicoAtualizar.descricao_cbo);
            expect(retorno).toHaveProperty("categoria_esocial", servicoAtualizar.categoria_esocial);
            expect(retorno).toHaveProperty("ativo", servicoAtualizar.ativo);
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            throw error;
        }
    });

    test("atualizar serviço com esocial diferente de um serviço já existente", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServicoA = apiServicoHelpers.gerarServico(empresaId, false);
        const gerarServicoB = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServicoA = await cadastrarServico(gerarServicoA, loginResponse.data.token);
            const responseServicoB = await cadastrarServico(gerarServicoB, loginResponse.data.token);
            const servicoA = responseServicoA.data.retorno[0];
            const servicoB = responseServicoB.data.retorno[0];

            const servicoAtualizar = apiServicoHelpers.gerarPayloadAtualizacao(servicoA, servicoB, { categoria_esocial: `${apiServicoHelpers.gerarCategoriaEsocial()}` });
            const response = await atualizarServico(servicoAtualizar, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(retorno).toHaveProperty("tipo_servico_autonomo_id", servicoAtualizar.tipo_servico_autonomo_id);
            expect(retorno).toHaveProperty("cliente_id");
            expect(retorno).toHaveProperty("empresa_id", servicoAtualizar.empresa_id);
            expect(retorno).toHaveProperty("cbo", servicoAtualizar.cbo);
            expect(retorno).toHaveProperty("descricao_cbo", servicoAtualizar.descricao_cbo);
            expect(retorno).toHaveProperty("categoria_esocial", servicoAtualizar.categoria_esocial);
            expect(retorno).toHaveProperty("ativo", servicoAtualizar.ativo);
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            throw error;
        }
    });

    test("atualizar serviço para um já existente", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServicoA = apiServicoHelpers.gerarServico(empresaId, false);
        const gerarServicoB = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");

        try {
            const loginResponse = await loginCredencial(token);
            const responseServicoA = await cadastrarServico(gerarServicoA, loginResponse.data.token);
            const responseServicoB = await cadastrarServico(gerarServicoB, loginResponse.data.token);
            const servicoA = responseServicoA.data.retorno[0];
            const servicoB = responseServicoB.data.retorno[0];

            const servicoAtualizar = apiServicoHelpers.gerarPayloadAtualizacao(servicoA, servicoB);
            const response = await atualizarServico(servicoAtualizar, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.duplicadoServico2);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("atualizar serviço com empresa_id inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const empresaIdInvalido = 9999999;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServico = await cadastrarServico(gerarServico, loginResponse.data.token);
            const servicoAtualizar = apiServicoHelpers.atualizarServico(empresaIdInvalido, responseServico.data.retorno[0].tipo_servico_autonomo_id);
            const response = await atualizarServico(servicoAtualizar, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("atualizar serviço com id do serviço inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const tipoServicoIdInvalido = 9999999;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServico = await cadastrarServico(gerarServico, loginResponse.data.token);
            const servicoAtualizar = apiServicoHelpers.atualizarServico(empresaId, tipoServicoIdInvalido);
            const response = await atualizarServico(servicoAtualizar, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        }
        catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.servicoIdNaoEncontrado);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("atualizar serviço com token expirado", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServico = await cadastrarServico(gerarServico, loginResponse.data.token);
            const servicoAtualizar = apiServicoHelpers.atualizarServico(empresaId, responseServico.data.retorno[0].tipo_servico_autonomo_id);
            const response = await atualizarServico(servicoAtualizar, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvY3JlZGVuY2lhbC9sb2dpbiIsImlhdCI6MTc2MzM4MzA1MywiZXhwIjoxNzYzMzg2NjUzLCJuYmYiOjE3NjMzODMwNTMsImp0aSI6IlZpM0x6enZaOHpYQkRPYVgiLCJzdWIiOiI5NzM3MDMiLCJwcnYiOiJjNTIzYjFkZjdhMTZiMmViYmQzYzFjZDUxNDk4ZjUzNjhkODBjMDEwIiwidXN1YXJpbyI6eyJ0aXBvIjoyLCJ1c3VhcmlvSWQiOjk3MzcwMywiZGFkb3MiOnsiY2xpZW50ZUlkIjo4ODU2OSwiZW1wcmVzYXNWaW5jdWxhZGFzIjpbNDc3NDI1XSwiYWNlc3NvcyI6eyJyZWxhdG9yaW8iOnsiR0VUIjpbImNhdGVnb3JpYSIsInJlbGF0b3JpbyIsInB1YmxpY2Fkb3MiLCJtb2RvLXBhZ2FtZW50byJdLCJQT1NUIjpbInB1YmxpY2Fkb3MiXSwiUFVUIjpbInB1YmxpY2Fkb3MiXX0sImF0ZW5kaW1lbnRvIjp7IkdFVCI6WyJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byJdLCJQVVQiOlsiY29uY2x1aXIiLCJhbmFsaXNhciJdLCJQT1NUIjpbImludGVyYWNhbyJdfX19fSwiYWNjZXNzX3Rva2VuX2NsaWVudGVfaWQiOjMzMCwiYWNjZXNzX3Rva2VuX3BhcmNlaXJvX2lkIjoxMDcxLCJzaXN0ZW1hSWQiOjUyfQ.XI6zdigf02QvleEJwaOkRJYBlxV2SXpvGaXHZNoVLFI");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        }
        catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.servicoApi.expiradoToken);
        }
    });

    test("deletar um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServico = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseServico = await cadastrarServico(gerarServico, loginResponse.data.token);
            const servicoDeletar = apiServicoHelpers.montarPayloadDeletarServico(empresaId, responseServico.data.retorno[0].tipo_servico_autonomo_id);
            const response = await deletarServico(servicoDeletar, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.deletarServico);
            expect(response.data).toHaveProperty("retorno", {});
        } catch (error) {
            console.error("Erro ao deletar serviço:", error);
            throw error;
        }
    });

    test("deletar um serviço que não existe", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const tipoServicoId = 9999999; 
        const apiServicoHelpers = new ApiServicoHelpers();
        const servicoDeletar = apiServicoHelpers.montarPayloadDeletarServico(empresaId, tipoServicoId);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await deletarServico(servicoDeletar, loginResponse.data.token);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.servicoNaoEncontrado);
        } catch (error) {
            console.error("Erro ao deletar serviço:", error);
            throw error;
        }
    });

    test("deletar um serviço com empresa_id inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 9999999;
        const tipoServicoId = 9999999;
        const apiServicoHelpers = new ApiServicoHelpers();
        const servicoDeletar = apiServicoHelpers.montarPayloadDeletarServico(empresaId, tipoServicoId);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await deletarServico(servicoDeletar, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("deletar um serviço com token expirado", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const tipoServicoId = 9999999; 
        const apiServicoHelpers = new ApiServicoHelpers();
        const servicoDeletar = apiServicoHelpers.montarPayloadDeletarServico(empresaId, tipoServicoId);
        try {    
            const response = await deletarServico(servicoDeletar, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvY3JlZGVuY2lhbC9sb2dpbiIsImlhdCI6MTc2MzM4MzA1MywiZXhwIjoxNzYzMzg2NjUzLCJuYmYiOjE3NjMzODMwNTMsImp0aSI6IlZpM0x6enZaOHpYQkRPYVgiLCJzdWIiOiI5NzM3MDMiLCJwcnYiOiJjNTIzYjFkZjdhMTZiMmViYmQzYzFjZDUxNDk4ZjUzNjhkODBjMDEwIiwidXN1YXJpbyI6eyJ0aXBvIjoyLCJ1c3VhcmlvSWQiOjk3MzcwMywiZGFkb3MiOnsiY2xpZW50ZUlkIjo4ODU2OSwiZW1wcmVzYXNWaW5jdWxhZGFzIjpbNDc3NDI1XSwiYWNlc3NvcyI6eyJyZWxhdG9yaW8iOnsiR0VUIjpbImNhdGVnb3JpYSIsInJlbGF0b3JpbyIsInB1YmxpY2Fkb3MiLCJtb2RvLXBhZ2FtZW50byJdLCJQT1NUIjpbInB1YmxpY2Fkb3MiXSwiUFVUIjpbInB1YmxpY2Fkb3MiXX0sImF0ZW5kaW1lbnRvIjp7IkdFVCI6WyJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byJdLCJQVVQiOlsiY29uY2x1aXIiLCJhbmFsaXNhciJdLCJQT1NUIjpbImludGVyYWNhbyJdfX19fSwiYWNjZXNzX3Rva2VuX2NsaWVudGVfaWQiOjMzMCwiYWNjZXNzX3Rva2VuX3BhcmNlaXJvX2lkIjoxMDcxLCJzaXN0ZW1hSWQiOjUyfQ.XI6zdigf02QvleEJwaOkRJYBlxV2SXpvGaXHZNoVLFI");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.servicoApi.expiradoToken);
        }
    });
});