import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial, refresh } from "../../src/api/services/authService";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe("refresh token API", { tag: ["@REFRESH_API"] }, () => {

    /*
    Cenário: Refresh token com sucesso

    Descrição:
    Valida que um token de autenticação válido pode ser renovado com sucesso pela API de refresh.

    Pré-condições:
    - Token básico válido configurado em .env (BASIC_TOKEN_VALIDO).
    - Endpoint de refresh acessível e funcional.

    Passos:
    1. Realizar login com token válido.
    2. Obter token de acesso da resposta.
    3. Enviar token para o endpoint de refresh.
    4. Validar status da resposta (200).
    5. Verificar mensagem de sucesso e presença do novo token e validade.

    Resultado esperado:
    - A API deve retornar status 200, mensagem correta, token e validade presentes.
    */
    test("refresh token com sucesso", { tag: "@REFRESH_SUCESSO_API" }, async () => {
        try {
            const loginResponse = await loginCredencial(process.env.BASIC_TOKEN_VALIDO);
            const response = await refresh(loginResponse.data.token)
            expect(response.status).toBe(200)
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.sucessoRefresh)
            expect(response.data).toHaveProperty("token");
            expect(response.data).toHaveProperty("validade", 3600);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    /*
    Cenário: Refresh token expirado

    Descrição:
    Verifica se a API responde corretamente ao tentar renovar um token já expirado.

    Pré-condições:
    - Token expirado configurado em .env (TOKEN_REFRESH_EXPIRADO).
    - Endpoint de refresh deve estar acessível.

    Passos:
    1. Enviar requisição de refresh com token expirado.
    2. Esperar que a requisição falhe.
    3. Validar status da resposta (401).
    4. Verificar mensagem de erro principal e erro detalhado.

    Resultado esperado:
    - A API deve retornar status 401, mensagem: "Token refresh falhou." e erro: "Token expirado"
    */
    test("refresh token cliente expirado", { tag: "@REFRESH_FALHA_API" }, async () => {
        try {
            const response = await refresh(process.env.TOKEN_REFRESH_EXPIRADO);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.falhouTokenRefresh)
            expect(error.response.data).toHaveProperty("error", MENSAGENS.refreshApi.expiradoTokenRefresh)
        }
    });

    /*
    Cenário: Refresh com token blacklisted

    Descrição:
    Valida que a API rejeita um token de refresh já utilizado (blacklisted).

    Pré-condições:
    - Token básico válido configurado em .env (BASIC_TOKEN_VALIDO).
    - Endpoint de refresh acessível.

    Passos:
    1. Realizar login e obter token de acesso.
    2. Usar o token uma vez no endpoint de refresh.
    3. Tentar usar o mesmo token novamente.
    4. Esperar que a segunda requisição falhe.
    5. Validar status da resposta (401).
    6. Verificar mensagem de erro principal e erro de blacklist.

    Resultado esperado:
    - A API deve retornar status 401, mensagem: "Token refresh falhou." e erro: "The token has been blacklisted"
    */
    test("refresh token blacklisted", { tag: "@REFRESH_FALHA_API" }, async () => {
        try {
            const loginResponse = await loginCredencial(process.env.BASIC_TOKEN_VALIDO);
            await refresh(loginResponse.data.token)
            const response = await refresh(loginResponse.data.token)
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401)
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.refreshApi.falhouTokenRefresh)
            expect(error.response.data).toHaveProperty("error", MENSAGENS.refreshApi.blacklistedTokenRefresh)
        }
    });

    /*
    Cenário: Refresh sem informar token

    Descrição:
    Verifica se a API responde corretamente quando a requisição de refresh é feita sem fornecer o token.

    Pré-condições:
    - Endpoint de refresh acessível.
    - Nenhum token fornecido na requisição.

    Passos:
    1. Enviar requisição de refresh com token vazio ("").
    2. Esperar que a requisição falhe.
    3. Validar status da resposta (401).
    4. Verificar mensagem de erro principal e erro de ausência de token.

    Resultado esperado:
    - A API deve retornar status 401,
        mensagem: "Token refresh falhou."
        e erro: "Token não informado."
    */
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