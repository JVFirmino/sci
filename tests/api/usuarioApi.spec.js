import { expect, test } from "@playwright/test";
import { ApiUsuarioHelpers } from "../../src/helpers/apiUsuarioHelpers";
import { cadastrarPessoa } from "../../src/api/services/usuarioService";
import { login } from "../../src/api/services/authLoginService";

test.describe.serial("Usuário API", { tag: ["@USUARIO_API"] }, () => {
    
    test("cadastrar pessoa", async () => {

        const cnpj = "75847020000100";
        const apiUsuarioHelpers = new ApiUsuarioHelpers();
        for (let i = 0; i < 50; i++) {
            const usuario = apiUsuarioHelpers.gerarUsuario();

            try {
                const loginResponse = await login("joao.garcia", "Mudar@12");
                const response = await cadastrarPessoa(cnpj, usuario, loginResponse.data.token);
                console.log(`Usuário ${i + 1} cadastrado`, response.status);
            } catch (error) {
                console.error(`Erro no usuário ${i + 1}`, error.response?.data);
            }
        }
    });

});   