import { expect, test } from "@playwright/test";
import { ApiAutonomoHelpers } from "../../src/helpers/apiAutonomoHelpers";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarAutonomo } from "../../src/api/services/autonomoService";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe.serial("autonomo API", { tag: ["@AUTONOMO_API"] }, () => {
    
    test("cadastrar autonomo com sucesso", { tag : "@AUTONOMO_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const quantidade = 1
        const apiAutonomoHelpers = new ApiAutonomoHelpers();
        const gerarAutonomo = apiAutonomoHelpers.gerarAutonomo(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try{
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAutonomo(gerarAutonomo, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.autonomo.sucessoCadastroAutonomo);
            expect(response.data).toHaveProperty("retorno");

            const {retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("autonomo");
                const autonomo = item.autonomo
                expect(autonomo).toHaveProperty("autonomo_id")
                expect(autonomo).toHaveProperty("empresa_id", gerarAutonomo.dados[index].empresa_id);
                expect(autonomo).toHaveProperty("cpf", gerarAutonomo.dados[index].cpf);
                expect(autonomo).toHaveProperty("nome", gerarAutonomo.dados[index].nome);
                expect(autonomo).toHaveProperty("nascimento_data", gerarAutonomo.dados[index]. nascimento_data);
                expect(autonomo).toHaveProperty("status", Boolean(gerarAutonomo.dados[index].status));
            });
        }catch(error){
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });
});