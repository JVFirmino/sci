import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { ApiFeriadoHelpers } from "../../src/helpers/apiFeriadoHelpers";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarFeriado, deletarFeriado } from "../../src/api/services/feriadoService";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe("feriado API", { tag: ["@FERIADO_API"] }, () => {

    test("cadastrar um feriado", { tag: "@FERIADO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 1;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("empresa_id", empresaId);
                expect(item).toHaveProperty("data", gerarFeriado.dados[index].data);
                expect(item).toHaveProperty("descricao", gerarFeriado.dados[index].descricao);
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });
    test("cadastrar mais de um feriados", { tag: "@FERIADO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarMultiplosFeriados = apiFeriadoHelpers.gerarMultiplosFeriados(empresaId, quantidade, true);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarMultiplosFeriados, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(quantidade);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("empresa_id", empresaId);
                expect(item).toHaveProperty("data", gerarMultiplosFeriados.dados[index].data);
                expect(item).toHaveProperty("descricao", gerarMultiplosFeriados.dados[index].descricao);
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar 2 feriados iguais para empresas diferentes", { tag: "@FERIADO_SUCESSO_API" }, async () => {
        const empresaIds = [900001, 2];
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarMesmoFeriadoParaEmpresas = apiFeriadoHelpers.gerarMesmoFeriadoParaEmpresas(empresaIds);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarMesmoFeriadoParaEmpresas, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.sucessoCadastroFeriado);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(Array.isArray(retorno)).toBe(true);
            expect(retorno).toHaveLength(empresaIds.length);
            retorno.forEach((item, index) => {
                expect(item).toHaveProperty("empresa_id", gerarMesmoFeriadoParaEmpresas.dados[index].empresa_id);
                expect(item).toHaveProperty("data", gerarMesmoFeriadoParaEmpresas.dados[index].data);
                expect(item).toHaveProperty("descricao", gerarMesmoFeriadoParaEmpresas.dados[index].descricao);
            });
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar mais de um feriados com itens duplicados no array", { tag: "@FERIADO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const quantidade = 2;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriadoDuplicado = apiFeriadoHelpers.gerarFeriadoDuplicado(empresaId, quantidade);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarFeriado(gerarFeriadoDuplicado, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toHaveProperty("sucesso", false);
        }
    });

    test("cadastrar feriado igual ao já existente", { tag: "@FERIADO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            const response = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.feriadoUtilizado);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("cadastrar feriado com empresa_id inválido", { tag: "@FERIADO_FALHA_API" }, async () => {
        const empresaId = 9999999;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("cadastrar feriado com token expirado", { tag: "@FERIADO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        try {
            await cadastrarFeriado(gerarFeriado, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvY3JlZGVuY2lhbC9sb2dpbiIsImlhdCI6MTc2MzM4MzA1MywiZXhwIjoxNzYzMzg2NjUzLCJuYmYiOjE3NjMzODMwNTMsImp0aSI6IlZpM0x6enZaOHpYQkRPYVgiLCJzdWIiOiI5NzM3MDMiLCJwcnYiOiJjNTIzYjFkZjdhMTZiMmViYmQzYzFjZDUxNDk4ZjUzNjhkODBjMDEwIiwidXN1YXJpbyI6eyJ0aXBvIjoyLCJ1c3VhcmlvSWQiOjk3MzcwMywiZGFkb3MiOnsiY2xpZW50ZUlkIjo4ODU2OSwiZW1wcmVzYXNWaW5jdWxhZGFzIjpbNDc3NDI1XSwiYWNlc3NvcyI6eyJyZWxhdG9yaW8iOnsiR0VUIjpbImNhdGVnb3JpYSIsInJlbGF0b3JpbyIsInB1YmxpY2Fkb3MiLCJtb2RvLXBhZ2FtZW50byJdLCJQT1NUIjpbInB1YmxpY2Fkb3MiXSwiUFVUIjpbInB1YmxpY2Fkb3MiXX0sImF0ZW5kaW1lbnRvIjp7IkdFVCI6WyJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byJdLCJQVVQiOlsiY29uY2x1aXIiLCJhbmFsaXNhciJdLCJQT1NUIjpbImludGVyYWNhbyJdfX19fSwiYWNjZXNzX3Rva2VuX2NsaWVudGVfaWQiOjMzMCwiYWNjZXNzX3Rva2VuX3BhcmNlaXJvX2lkIjoxMDcxLCJzaXN0ZW1hSWQiOjUyfQ.XI6zdigf02QvleEJwaOkRJYBlxV2SXpvGaXHZNoVLFI");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.feriadoApi.expiradoToken);
        }
    });

    test("deletar um feriado", { tag: "@SERVICO_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const gerarFeriado = apiFeriadoHelpers.gerarFeriado(empresaId, false);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responseFeriado = await cadastrarFeriado(gerarFeriado, loginResponse.data.token);
            const feriadoDeletar = apiFeriadoHelpers.montarPayloadDeletarFeriado(empresaId, responseFeriado.data.retorno[0].data);
            const response = await deletarFeriado(feriadoDeletar, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.deletarFeriado);
            expect(response.data).toHaveProperty("retorno", {});
        }catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("deletar um feriado inexistente", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const dataInexistente = "2099-12-31";
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const feriadoInexistente = apiFeriadoHelpers.montarPayloadDeletarFeriado(empresaId, dataInexistente);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await deletarFeriado(feriadoInexistente, loginResponse.data.token);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.feriadoApi.feriadoNaoEncontrado);
            
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("deletar um feriado com empresa_id inválido", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 9999999;
        const dataFeriado = "2099-09-25";
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const feriadoInvalido = apiFeriadoHelpers.montarPayloadDeletarFeriado(empresaId, dataFeriado);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await deletarFeriado(feriadoInvalido, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.servicoApi.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("deletar um feriado com token expirado", { tag: "@SERVICO_FALHA_API" }, async () => {
        const empresaId = 900001;
        const dataFeriado = "2025-09-25";
        const apiFeriadoHelpers = new ApiFeriadoHelpers(); 
        const feriadoInvalido = apiFeriadoHelpers.montarPayloadDeletarFeriado(empresaId, dataFeriado);
        try {
            const response = await deletarFeriado(feriadoInvalido, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvY3JlZGVuY2lhbC9sb2dpbiIsImlhdCI6MTc2MzM4MzA1MywiZXhwIjoxNzYzMzg2NjUzLCJuYmYiOjE3NjMzODMwNTMsImp0aSI6IlZpM0x6enZaOHpYQkRPYVgiLCJzdWIiOiI5NzM3MDMiLCJwcnYiOiJjNTIzYjFkZjdhMTZiMmViYmQzYzFjZDUxNDk4ZjUzNjhkODBjMDEwIiwidXN1YXJpbyI6eyJ0aXBvIjoyLCJ1c3VhcmlvSWQiOjk3MzcwMywiZGFkb3MiOnsiY2xpZW50ZUlkIjo4ODU2OSwiZW1wcmVzYXNWaW5jdWxhZGFzIjpbNDc3NDI1XSwiYWNlc3NvcyI6eyJyZWxhdG9yaW8iOnsiR0VUIjpbImNhdGVnb3JpYSIsInJlbGF0b3JpbyIsInB1YmxpY2Fkb3MiLCJtb2RvLXBhZ2FtZW50byJdLCJQT1NUIjpbInB1YmxpY2Fkb3MiXSwiUFVUIjpbInB1YmxpY2Fkb3MiXX0sImF0ZW5kaW1lbnRvIjp7IkdFVCI6WyJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byJdLCJQVVQiOlsiY29uY2x1aXIiLCJhbmFsaXNhciJdLCJQT1NUIjpbImludGVyYWNhbyJdfX19fSwiYWNjZXNzX3Rva2VuX2NsaWVudGVfaWQiOjMzMCwiYWNjZXNzX3Rva2VuX3BhcmNlaXJvX2lkIjoxMDcxLCJzaXN0ZW1hSWQiOjUyfQ.XI6zdigf02QvleEJwaOkRJYBlxV2SXpvGaXHZNoVLFI");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.feriadoApi.expiradoToken);
        }
    });
});