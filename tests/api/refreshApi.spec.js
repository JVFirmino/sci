import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial, refresh } from "../../src/api/services/authService";
import { MENSAGENS } from "../../fixture/mensagemFixture";
import { gerarBasicToken } from "../../src/utils/authUtils";

test.describe.serial("refresh token API", { tag: ["@REFRESH_API"] }, () => {

    test("refresh token com sucesso", { tag: "@REFRESH_SUCESSO_API" }, async () => {
        const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
        try {
            const loginResponse = await loginCredencial(token);
            const response = await refresh(loginResponse.data.token)
            expect(response.status).toBe(200)
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.sucessoRefresh)
            expect(response.data).toHaveProperty("token", expect.anything());
            expect(response.data).toHaveProperty("validade", 3600);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("refresh token cliente expirado", { tag: "@REFRESH_FALHA_API" }, async () => {
        try {
            const response = await refresh(process.env.API_TOKEN_JWT);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.falhouTokenRefresh)
            expect(error.response.data).toHaveProperty("error", MENSAGENS.refreshApi.expiradoTokenRefresh)
        }
    });

    test("refresh token blacklisted", { tag: "@REFRESH_FALHA_API" }, async () => {
        const token = gerarBasicToken(process.env.API_USERNAME, process.env.API_PASSWORD);
        try {
            const loginResponse = await loginCredencial(token);
            await refresh(loginResponse.data.token)
            const response = await refresh(loginResponse.data.token)
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.falhouTokenRefresh)
            expect(error.response.data).toHaveProperty("error", MENSAGENS.refreshApi.blacklistedTokenRefresh)
        }
    });

    test("refresh token não informado", { tag: "@REFRESH_FALHA_API" }, async () => {
        try {
            const response = await refresh("")
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.falhouTokenRefresh)
            expect(error.response.data).toHaveProperty("error", MENSAGENS.refreshApi.naoInformadoTokenRefresh)
        }
    });
});