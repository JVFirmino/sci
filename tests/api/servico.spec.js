import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarServico } from "../../src/api/services/servicoService";
import { ApiServicoHelpers } from "../../src/helpers/apiServicoHelpers";

test.describe("serviço API", { tag: ["@SERVICO_API"] }, () => {

    test("cadastrar um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        try {
            const quantidade = 2;
            const apiServicoHelpers = new ApiServicoHelpers();

            const loginResponse = await loginCredencial(process.env.BASIC_TOKEN_VALIDO);
            const response = await cadastrarServico(apiServicoHelpers.gerarMutiplosServicos(900001, quantidade), loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", "Operação realizada com sucesso");
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
});