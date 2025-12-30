import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarServico } from "../../src/api/services/servicoService";
import { ApiServicoHelpers } from "../../src/helpers/apiServicoHelpers";
import { MENSAGENS } from "../../fixture/mensagemFixture";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { faker, tr } from "@faker-js/faker";

test.describe("serviço API", { tag: ["@SERVICO_API"] }, () => {

    test("cadastrar um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiServicoHelpers = new ApiServicoHelpers();
        const gerarServicos = apiServicoHelpers.gerarServico(empresaId, false);
        const token = gerarBasicToken(process.env.AUTH_USERNAME_VALIDO, process.env.AUTH_PASSWORD_VALIDO);
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
            retorno.forEach(item => {
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
                expect(item).toHaveProperty("empresa_id");
                expect(item).toHaveProperty("cbo");
                expect(item).toHaveProperty("descricao_cbo");
                expect(item).toHaveProperty("categoria_esocial");
                expect(item).toHaveProperty("ativo");
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
        const token = gerarBasicToken(process.env.AUTH_USERNAME_VALIDO, process.env.AUTH_PASSWORD_VALIDO);
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
            retorno.forEach(item => {
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
                expect(item).toHaveProperty("empresa_id");
                expect(item).toHaveProperty("cbo");
                expect(item).toHaveProperty("descricao_cbo");
                expect(item).toHaveProperty("categoria_esocial");
                expect(item).toHaveProperty("ativo");
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
            retorno.forEach(item => {
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
                expect(item).toHaveProperty("empresa_id");
                expect(item).toHaveProperty("cbo");
                expect(item).toHaveProperty("descricao_cbo");
                expect(item).toHaveProperty("categoria_esocial");
                expect(item).toHaveProperty("ativo");
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
            cloneServico.dados[0].categoria_esocial = apiServicoHelpers.gerarCategoriaEsocial();
            const response = await cadastrarServico(cloneServico, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.sucessoCadastroServico);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach(item => {
                expect(item).toHaveProperty("tipo_servico_autonomo_id");
                expect(item).toHaveProperty("cliente_id");
                expect(item).toHaveProperty("empresa_id");
                expect(item).toHaveProperty("cbo");
                expect(item).toHaveProperty("descricao_cbo");
                expect(item).toHaveProperty("categoria_esocial");
                expect(item).toHaveProperty("ativo");
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar múltiplos serviços com itens duplicados no array", { tag: "@SERVICO_FALHA_API" }, async () => {
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
            expect(error.response.data).toHaveProperty("mensagem","Duplicata encontrada no array para os campos: clienteId, empresa_id, cbo, categoria_esocial");
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
});