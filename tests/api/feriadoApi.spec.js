import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { ApiFeriadoHelpers } from "../../src/helpers/apiFeriadoHelpers";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarFeriado } from "../../src/api/services/feriadoService";
import { MENSAGENS } from "../../fixture/mensagemFixture";
import { tr } from "@faker-js/faker";

test.describe("feriado API", { tag: ["@FERIADO_API"] }, () => {

    test("cadastrar um feriado", { tag: "@FERIADO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("empresa_id", empresaId);
                expect(item).toHaveProperty("data", gerarFeriado.dados[index].data);
                expect(item).toHaveProperty("descricao", gerarFeriado.dados[index].descricao);
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });
    test("cadastrar mais de um feriados", { tag: "@FERIADO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarMultiplosFeriados = apiFeriadoHelpers.gerarMultiplosFeriados(empresaId, quantidade, true);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarMultiplosFeriados, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("empresa_id", empresaId);
                expect(item).toHaveProperty("data", gerarMultiplosFeriados.dados[index].data);
                expect(item).toHaveProperty("descricao", gerarMultiplosFeriados.dados[index].descricao);
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar mais de um feriados com itens duplicados no array", { tag: "@FERIADO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriadoDuplicado = apiFeriadoHelpers.gerarFeriadoDuplicado(empresaId, quantidade);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarFeriadoDuplicado, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toHaveProperty("sucesso", false);
        }
    });

    test("cadastrar feriado igual ao já existente", { tag: "@FERIADO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.feriadoUtilizado);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });
});