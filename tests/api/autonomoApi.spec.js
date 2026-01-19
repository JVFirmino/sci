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
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything())
                expect(autonomo).toHaveProperty("empresa_id", gerarAutonomo.dados[index].empresa_id);
                expect(autonomo).toHaveProperty("cpf", gerarAutonomo.dados[index].cpf);
                expect(autonomo).toHaveProperty("nome", gerarAutonomo.dados[index].nome);
                expect(autonomo).toHaveProperty("nascimento_data", gerarAutonomo.dados[index]. nascimento_data);
                expect(autonomo).toHaveProperty("status", Boolean(gerarAutonomo.dados[index].status));
                expect(autonomo).toHaveProperty("detalhe_autonomo")
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything());
            });
        }catch(error){
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

     test("cadastrar mais de um autonomo", { tag: "@AUTONOMO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiAutonomoHelpers = new ApiAutonomoHelpers();
        const gerarMultiplosAutonomos = apiAutonomoHelpers.gerarMultiplosAutonomos(empresaId, quantidade, true);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAutonomo(gerarMultiplosAutonomos, loginResponse.data.token);
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
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything())
                expect(autonomo).toHaveProperty("empresa_id", gerarMultiplosAutonomos.dados[index].empresa_id);
                expect(autonomo).toHaveProperty("cpf", gerarMultiplosAutonomos.dados[index].cpf);
                expect(autonomo).toHaveProperty("nome", gerarMultiplosAutonomos.dados[index].nome);
                expect(autonomo).toHaveProperty("nascimento_data", gerarMultiplosAutonomos.dados[index]. nascimento_data);
                expect(autonomo).toHaveProperty("status", Boolean(gerarMultiplosAutonomos.dados[index].status));
                expect(autonomo).toHaveProperty("detalhe_autonomo")
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything());
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar 2 autonomos iguais para empresas diferentes", { tag: "@AUTONOMO_SUCESSO_API" }, async () => {
        const empresaIds = [900001, 2];
        const apiAutonomoHelpers = new ApiAutonomoHelpers();
        const gerarMesmoAutonomosParaEmpresas = apiAutonomoHelpers.gerarMesmoAutonomoParaEmpresas(empresaIds);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAutonomo(gerarMesmoAutonomosParaEmpresas, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
            expect(response.data).toHaveProperty("retorno");

            const {retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(empresaIds.length);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("autonomo");
                const autonomo = item.autonomo
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything())
                expect(autonomo).toHaveProperty("empresa_id", gerarMesmoAutonomosParaEmpresas.dados[index].empresa_id);
                expect(autonomo).toHaveProperty("cpf", gerarMesmoAutonomosParaEmpresas.dados[index].cpf);
                expect(autonomo).toHaveProperty("nome", gerarMesmoAutonomosParaEmpresas.dados[index].nome);
                expect(autonomo).toHaveProperty("nascimento_data", gerarMesmoAutonomosParaEmpresas.dados[index]. nascimento_data);
                expect(autonomo).toHaveProperty("status", Boolean(gerarMesmoAutonomosParaEmpresas.dados[index].status));
                expect(autonomo).toHaveProperty("detalhe_autonomo")
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything());
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar mais de um autonomo com itens duplicados no array", { tag: "@AUTONOMO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiAutonomoHelpers = new ApiAutonomoHelpers(); 
        const gerarAutonomoDuplicado = apiAutonomoHelpers.gerarAutonomoDuplicado(empresaId, quantidade);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAutonomo(gerarAutonomoDuplicado, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(409);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.autonomo.autonomoCadastrado);

            const {retorno } = error.response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("autonomo");
                const autonomo = item.autonomo
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything())
                expect(autonomo).toHaveProperty("empresa_id", gerarAutonomoDuplicado.dados[index].empresa_id);
                expect(autonomo).toHaveProperty("cpf", gerarAutonomoDuplicado.dados[index].cpf);
                expect(autonomo).toHaveProperty("nome", gerarAutonomoDuplicado.dados[index].nome);
                expect(autonomo).toHaveProperty("nascimento_data", gerarAutonomoDuplicado.dados[index]. nascimento_data);
                expect(autonomo).toHaveProperty("status", Boolean(gerarAutonomoDuplicado.dados[index].status));
                expect(autonomo).toHaveProperty("detalhe_autonomo")
                expect(autonomo).toHaveProperty("autonomo_id", expect.anything());
            });
        }
    });

    test("cadastrar autonomo igual ao já existente", { tag: "@AUTONOMO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiAutonomoHelpers = new ApiAutonomoHelpers();
        const gerarAutonomo = apiAutonomoHelpers.gerarAutonomo(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarAutonomo(gerarAutonomo, loginResponse.data.token);
            const response = await cadastrarAutonomo(gerarAutonomo, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.autonomo.cpfJaUsado);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("cadastrar autonomo com empresa_id inválido", { tag: "@AUTONOMO_FALHA_API" }, async () => {
        const empresaId = 9999999;
        const apiAutonomoHelpers = new ApiAutonomoHelpers();
        const gerarAutonomo = apiAutonomoHelpers.gerarAutonomo(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarAutonomo(gerarAutonomo, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.autonomo.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });
    
    test("cadastrar feriado com token expirado", { tag: "@AUTONOMO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiAutonomoHelpers = new ApiAutonomoHelpers(); 
        const gerarAutonomo = apiAutonomoHelpers.gerarAutonomo(empresaId, false);
        try {
            await cadastrarAutonomo(gerarAutonomo, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvY3JlZGVuY2lhbC9sb2dpbiIsImlhdCI6MTc2MzM4MzA1MywiZXhwIjoxNzYzMzg2NjUzLCJuYmYiOjE3NjMzODMwNTMsImp0aSI6IlZpM0x6enZaOHpYQkRPYVgiLCJzdWIiOiI5NzM3MDMiLCJwcnYiOiJjNTIzYjFkZjdhMTZiMmViYmQzYzFjZDUxNDk4ZjUzNjhkODBjMDEwIiwidXN1YXJpbyI6eyJ0aXBvIjoyLCJ1c3VhcmlvSWQiOjk3MzcwMywiZGFkb3MiOnsiY2xpZW50ZUlkIjo4ODU2OSwiZW1wcmVzYXNWaW5jdWxhZGFzIjpbNDc3NDI1XSwiYWNlc3NvcyI6eyJyZWxhdG9yaW8iOnsiR0VUIjpbImNhdGVnb3JpYSIsInJlbGF0b3JpbyIsInB1YmxpY2Fkb3MiLCJtb2RvLXBhZ2FtZW50byJdLCJQT1NUIjpbInB1YmxpY2Fkb3MiXSwiUFVUIjpbInB1YmxpY2Fkb3MiXX0sImF0ZW5kaW1lbnRvIjp7IkdFVCI6WyJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byJdLCJQVVQiOlsiY29uY2x1aXIiLCJhbmFsaXNhciJdLCJQT1NUIjpbImludGVyYWNhbyJdfX19fSwiYWNjZXNzX3Rva2VuX2NsaWVudGVfaWQiOjMzMCwiYWNjZXNzX3Rva2VuX3BhcmNlaXJvX2lkIjoxMDcxLCJzaXN0ZW1hSWQiOjUyfQ.XI6zdigf02QvleEJwaOkRJYBlxV2SXpvGaXHZNoVLFI");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.feriadoApi.expiradoToken);
        }
    });
    
});