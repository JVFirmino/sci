import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { ApiFeriadoHelpers } from "../../src/helpers/apiFeriadoHelpers";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarFeriado } from "../../src/api/services/feriadoService";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe("feriado API", { tag: ["@FERIADO_API"] }, () => {

    test("cadastrar feriado", { tag: "@FERIADO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            console.log("Resposta da API:", response.data);
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
});