import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { ApiPreliminarHelpers } from "../../src/helpers/apiPreliminarHelpers";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarAdmissaoPreliminar } from "../../src/api/services/preliminarService";
import { ApiLiberarPreliminarHelpers } from "../../src/helpers/apiliberarPreliminarHelpers";
import { liberarPreliminar } from "../../src/api/services/liberarPreliminarService";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe.serial("liberar preliminar API", { tag: ["@LIBERAR_PRELIMINAR_API"] }, async () => {

    test("liberar admissão preliminar com sucesso contribuinte", { tag: "@LIBERAR_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const tipoColaborador = 1;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, empresaId);
            const response = await liberarPreliminar(payloadLiberarPreliminar , loginResponse.data.token)
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.liberarAdmissaoPreliminar.sucessoLiberacao);
            expect(response.data).toHaveProperty("retorno", MENSAGENS.liberarAdmissaoPreliminar.atualizadoSucesso);
        }catch(error){
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("liberar admissão preliminar com sucesso empregado", { tag: "@LIBERAR_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const tipoContrato = 2;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, empresaId);
            const response = await liberarPreliminar(payloadLiberarPreliminar , loginResponse.data.token)
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.liberarAdmissaoPreliminar.sucessoLiberacao);
            expect(response.data).toHaveProperty("retorno", MENSAGENS.liberarAdmissaoPreliminar.atualizadoSucesso);
        }catch(error){
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("liberar admissão preliminar com observação", { tag: "@LIBERAR_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const tipoColaborador = 1;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, empresaId, { observacao_liberacao: apiLiberarPreliminarHelpers.gerarTextoAleatorio(200) });
            const response = await liberarPreliminar(payloadLiberarPreliminar , loginResponse.data.token)
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.liberarAdmissaoPreliminar.sucessoLiberacao);
            expect(response.data).toHaveProperty("retorno", MENSAGENS.liberarAdmissaoPreliminar.atualizadoSucesso);
        }catch(error){
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });


    test("liberar admissão preliminar com id de admissão preliminar de outra empresa", { tag: "@LIBERAR_FALHA_API" }, async() => {
        const empresaId = 900001;
        const tipoContrato = 2;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, 2);
            const response = await liberarPreliminar(payloadLiberarPreliminar , loginResponse.data.token)
            throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
        }catch(error){
            expect(error.response.status).toBe(422)
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.liberarAdmissaoPreliminar.admissaoIdInexistente);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("liberar admissão preliminar com observação com mais de 200 caracteres", { tag: "@LIBERAR_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const tipoColaborador = 1;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, empresaId, { observacao_liberacao: apiLiberarPreliminarHelpers.gerarTextoAleatorio(201) });
            const response = await liberarPreliminar(payloadLiberarPreliminar , loginResponse.data.token)
            throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
        }catch(error){
            expect(error.response.status).toBe(422)
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.liberarAdmissaoPreliminar.observacaoLimiteAtingido);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("liberar admissão preliminar com empresa_id inválido", { tag: "@LIBERAR_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const tipoContrato = 2;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarEmpregado(empresaId, tipoContrato);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, 999999);
            const response = await liberarPreliminar(payloadLiberarPreliminar , loginResponse.data.token)
            throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
        }catch(error){
            expect(error.response.status).toBe(403);
            expect(error.response.data).toHaveProperty("sucesso", false);
            expect(error.response.data).toHaveProperty("mensagem", MENSAGENS.liberarAdmissaoPreliminar.semPermissao);
            expect(error.response.data).toHaveProperty("erros");
            expect(error.response.data).toHaveProperty("retorno", {});
        }
    });

    test("liberar admissão preliminar com token expirado", { tag: "@LIBERAR_SUCESSO_API" }, async() => {
        const empresaId = 900001;
        const tipoColaborador = 1;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const apiLiberarPreliminarHelpers = new ApiLiberarPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminarContribuinte(empresaId, tipoColaborador);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const responsePreliminar = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            const payloadLiberarPreliminar  = apiLiberarPreliminarHelpers.gerarItemLiberar(responsePreliminar.data.retorno.id, empresaId);
            const response = await liberarPreliminar(payloadLiberarPreliminar, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvY3JlZGVuY2lhbC9sb2dpbiIsImlhdCI6MTc2MzM4MzA1MywiZXhwIjoxNzYzMzg2NjUzLCJuYmYiOjE3NjMzODMwNTMsImp0aSI6IlZpM0x6enZaOHpYQkRPYVgiLCJzdWIiOiI5NzM3MDMiLCJwcnYiOiJjNTIzYjFkZjdhMTZiMmViYmQzYzFjZDUxNDk4ZjUzNjhkODBjMDEwIiwidXN1YXJpbyI6eyJ0aXBvIjoyLCJ1c3VhcmlvSWQiOjk3MzcwMywiZGFkb3MiOnsiY2xpZW50ZUlkIjo4ODU2OSwiZW1wcmVzYXNWaW5jdWxhZGFzIjpbNDc3NDI1XSwiYWNlc3NvcyI6eyJyZWxhdG9yaW8iOnsiR0VUIjpbImNhdGVnb3JpYSIsInJlbGF0b3JpbyIsInB1YmxpY2Fkb3MiLCJtb2RvLXBhZ2FtZW50byJdLCJQT1NUIjpbInB1YmxpY2Fkb3MiXSwiUFVUIjpbInB1YmxpY2Fkb3MiXX0sImF0ZW5kaW1lbnRvIjp7IkdFVCI6WyJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byJdLCJQVVQiOlsiY29uY2x1aXIiLCJhbmFsaXNhciJdLCJQT1NUIjpbImludGVyYWNhbyJdfX19fSwiYWNjZXNzX3Rva2VuX2NsaWVudGVfaWQiOjMzMCwiYWNjZXNzX3Rva2VuX3BhcmNlaXJvX2lkIjoxMDcxLCJzaXN0ZW1hSWQiOjUyfQ.XI6zdigf02QvleEJwaOkRJYBlxV2SXpvGaXHZNoVLFI");
            throw new Error("A requisição deveria ter falhado, mas foi bem-sucedida.");
        }catch(error){
            expect(error.response.status).toBe(401);
            expect(error.response.data).toHaveProperty("error", MENSAGENS.liberarAdmissaoPreliminar.expiradoToken);
        }
    });
});