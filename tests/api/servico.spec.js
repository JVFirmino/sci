import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarServico } from "../../src/api/services/servicoService";

test.describe("serviço API", { tag: ["@SERVICO_API"] }, () => {

    test("deve cadastrar um serviço", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        try {
            const loginResponse = await loginCredencial(process.env.BASIC_TOKEN_VALIDO);
            const response = await cadastrarServico({
                 "dados": [
                    {
                    "empresa_id": 900001,
                    "cbo": "9999-99",
                    "descricao_cbo": "Teste CBO",
                    "categoria_esocial": 101,
                    "ativo": true
                    }
                ]
            }, loginResponse.data.token);

        }catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }

    });
});