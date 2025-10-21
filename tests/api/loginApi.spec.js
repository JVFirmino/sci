import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe("login usuário API", { tag: ["@LOGIN_API"] }, () => {
    
    /*
    Cenário: Login com sucesso via API

    Descrição:
    Valida que um usuário com token básico válido consegue se autenticar com sucesso na API.

    Pré-condições:
    - Usuário cadastrado e autorizado.
    - Token válido configurado em .env (BASIC_TOKEN_VALIDO).

    Passos:
    1. Enviar requisição de login com token válido.
    2. Validar status da resposta (201).
    3. Verificar mensagem de sucesso.
    4. Verificar presença do token de autenticação e validade (3600s).

    Resultado esperado:
    - Login realizado com sucesso, status 201, mensagem correta, token e validade presentes.
    */
    test("login com sucesso",  { tag: "@LOGIN_SUCESSO_API" }, async () => {
        
        try {
            console.log("Usando token:", process.env.BASIC_TOKEN_VALIDO);
            const response = await loginCredencial(process.env.BASIC_TOKEN_VALIDO);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.loginApi.sucessoLogin);
            expect(response.data).toHaveProperty("token");
            expect(response.data).toHaveProperty("validade", 3600);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    /*
    Cenário: Login com token de cliente expirado

    Descrição:
    Valida que a API retorna erro 401 ao tentar autenticar com um token inválido ou expirado.

    Pré-condições:
    - Token inválido configurado em .env (BASIC_TOKEN_INVALIDO).

    Passos:
    1. Enviar requisição de login com token inválido.
    2. Esperar que a requisição falhe.
    3. Validar status da resposta (401).
    4. Validar mensagem de erro recebida.

    Resultado esperado:
    - A API deve responder com status 401 e mensagem: "Token de cliente expirado."
    */
    test("login token cliente expirado", { tag: "@LOGIN_FALHA_API" }, async () => {
        try {
            const response = await loginCredencial(process.env.BASIC_TOKEN_INVALIDO);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.loginApi.expiradoTokenLogin);
        }
    });

    /*
    Cenário: Login com token vazio

    Descrição:
    Verifica se a API responde corretamente quando nenhum token é enviado na autenticação.

    Pré-condições:
    - A API de login deve estar acessível.
    - Nenhum token enviado na requisição.

    Passos:
    1. Realizar login com token vazio ("").
    2. Esperar falha na requisição.
    3. Validar status 401.
    4. Validar mensagem de erro correspondente ao token inválido.

    Resultado esperado:
    - A API deve retornar status 401 e a mensagem: "Token de terceiro e/ou cliente inválidos."
    */
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
