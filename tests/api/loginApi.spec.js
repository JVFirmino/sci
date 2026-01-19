import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import { MENSAGENS } from "../../fixture/mensagemFixture";
import { gerarBasicToken } from "../../src/utils/authUtils";

test.describe.serial("login usuário API", { tag: ["@LOGIN_API"] }, () => {
    
    test("login com sucesso",  { tag: "@LOGIN_SUCESSO_API" }, async () => {
        const token = gerarBasicToken(process.env.AUTH_USERNAME_VALIDO, process.env.AUTH_PASSWORD_VALIDO); 
        try {
            const response = await loginCredencial(token);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.loginApi.sucessoLogin);
            expect(response.data).toHaveProperty("token", expect.anything());
            expect(response.data).toHaveProperty("validade", 3600);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("login token cliente expirado", { tag: "@LOGIN_FALHA_API" }, async () => {
        const token = gerarBasicToken(process.env.AUTH_USERNAME_VALIDO, process.env.AUTH_PASSWORD_INVALIDO);
        try {
            const response = await loginCredencial(token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.loginApi.expiradoTokenLogin);
        }
    });

    test("login tokens vazios", { tag: "@LOGIN_FALHA_API" }, async () => {
        try {
            const response = await loginCredencial("");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.loginApi.invalidoTokenLogin);
        }
    });
});
