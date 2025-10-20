import { expect, test } from "@playwright/test";
import { loginCredencial } from "../../src/api/services/authService";
import dotenv from "dotenv";

dotenv.config();

test.describe("Login API SCI", { tag: ["@LOGIN_SUCESSO"] }, () => {
    test("login com credencial básica", async () => {
        try {
            const response = await loginCredencial();

            console.log("Resposta da API:", response.data);
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('❌ Erro ao obter token:');
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Dados:', error.response.data);
            } else {
                console.error('Mensagem:', error.message);
        }
    }
    });
});
