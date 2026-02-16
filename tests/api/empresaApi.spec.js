import { expect, test } from "@playwright/test";
import { MENSAGENS } from "../../fixture/mensagemFixture";
import { faker } from "@faker-js/faker";
import { ApiEmpresaHelpers } from "../../src/helpers/apiEmpresaHelpers";
import { buscarEmpresa, cadastrarEmpresa, deletarEmpresa } from "../../src/api/services/empresaService";
import { decodificarJwt } from "../../src/utils/authUtils";
import { login } from "../../src/api/services/authService";

test.describe.serial("Empresa API", { tag: ["@EMPRESA_API"] }, () => {

    test("cadastrar empresa", { tags: "@EMPRESA_SUCESSO_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();  
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const clienteId = decodificarJwt(loginResponse.data.token).usuario.dados.clienteId;
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("id", expect.anything());
            expect(response.data).toHaveProperty("cliente_id", clienteId);
            expect(response.data).toHaveProperty("documento", gerarEmpresa.documento.replace(/\D/g, ""));
            expect(response.data).toHaveProperty("nome", gerarEmpresa.nome);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("cadastrar a mesma empresa para clientes diferentes", { tags: "@EMPRESA_SUCESSO_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa(); 
        try {
            const loginResponseA = await login("joao.garcia", "Mudar@12");
            await cadastrarEmpresa(gerarEmpresa, loginResponseA.data.token);
            const loginResponseB = await login("[joao.garcia]leonardo.vieira", "Mudar@12");
            const clienteId = decodificarJwt(loginResponseB.data.token).usuario.dados.clienteId;
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponseB.data.token);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("id", expect.anything());
            expect(response.data).toHaveProperty("cliente_id", clienteId);
            expect(response.data).toHaveProperty("documento", gerarEmpresa.documento.replace(/\D/g, ""));
            expect(response.data).toHaveProperty("nome", gerarEmpresa.nome);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("cadastrar a empresa com documento sem máscara", { tags: "@EMPRESA_SUCESSO_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJSemMascara");
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const clienteId = decodificarJwt(loginResponse.data.token).usuario.dados.clienteId;
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("id", expect.anything());
            expect(response.data).toHaveProperty("cliente_id", clienteId);
            expect(response.data).toHaveProperty("documento", gerarEmpresa.documento);
            expect(response.data).toHaveProperty("nome", gerarEmpresa.nome);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("cadastrar mesma empresa no mesmo cliente", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJSemMascara"); 
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.empresaJaCadastradaCliente);
        }
    });

    test("cadastrar empresa que não é sua empresa", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();
        try {
            const loginResponse = await login("joao.firmino", "Mudar@12");
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.acessoNegado);
        }
    });

    test("cadastrar empresa com documento menor que 14 caracteres", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJmenos14");
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.documentoValorInvalido);
        }
    });

    test("cadastrar empresa com documento maior que 14 caracteres", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJmais14");
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.documentoValorInvalido);
        }
    });

    test("cadastrar empresa com nome com mais de 255 caracteres", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJcomMascara", { nome: faker.string.alpha(256) });
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.textoLongo);
        }
    });

    test("cadastrar empresa sem os campos obrigatórios", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const gerarEmpresa = {};
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const response = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(422);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.campoObrigatorio);
            expect(error.response.data.detail[1]).toHaveProperty("msg", MENSAGENS.empresa.campoObrigatorio);
        }
    });

    test("cadastrar empresa com token expirado", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();  
        try {
            const response = await cadastrarEmpresa(gerarEmpresa, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3Njk2OTAzODYsImV4cCI6MTc2OTY5Mzk4NiwibmJmIjoxNzY5NjkwMzg2LCJqdGkiOiJmaTNyZDBXZnU4QmwxbnJqIiwic3ViIjoiOTcwMDgwIiwicHJ2IjoiYzUyM2IxZGY3YTE2YjJlYmJkM2MxY2Q1MTQ5OGY1MzY4ZDgwYzAxMCIsInVzdWFyaW8iOnsidGlwbyI6MSwidXN1YXJpb0lkIjo5NzAwODAsImRhZG9zIjp7ImNsaWVudGVJZCI6ODg1NjksImFjZXNzb3MiOnsicmVsYXRvcmlvIjp7IkdFVCI6WyJlbXByZXNhIiwiY2F0ZWdvcmlhIiwicmVsYXRvcmlvIiwicHVibGljYWRvcyIsIm1vZG8tcGFnYW1lbnRvIl0sIlBPU1QiOlsicHVibGljYWRvcyJdLCJQVVQiOlsicHVibGljYWRvcyJdLCJERUxFVEUiOlsicHVibGljYWRvcyJdfSwiYXRlbmRpbWVudG8iOnsiR0VUIjpbImVtcHJlc2EiLCJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byIsInRvdGFsaXphZG9yZXMiXSwiUE9TVCI6WyJhdGVuZGltZW50byIsImNvbmNsdWlyIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iXSwiUFVUIjpbImF0ZW5kaW1lbnRvIiwiY2FuY2VsYXIiLCJyZWFicmlyIiwiYW5hbGlzYXIiLCJhdGVuZGltZW50byIsImZpbmFsaXphLWF0ZW5kaW1lbnRvIl0sIkRFTEVURSI6WyJhdGVuZGltZW50byJdfSwiaW50ZWdyYUNvbnRhZG9yTWFpcyI6eyJQT1NUIjpbInN0YXR1cyIsImRlc2NyaWNhby1zdGF0dXMiLCJzZXJ2aWNvcyIsInNpdHVhY29lcy1maXNjYWlzIiwiY2FpeGEtcG9zdGFsIiwidmluY3Vsby1lbXByZXNhIiwidmluY3Vsby1zZXJ2aWNvIl0sIlBVVCI6WyJzdGF0dXMiLCJkZXNjcmljYW8tc3RhdHVzIiwic2Vydmljb3MiXSwiREVMRVRFIjpbInN0YXR1cyIsImRlc2NyaWNhby1zdGF0dXMiLCJzZXJ2aWNvcyIsInZpbmN1bG8tZW1wcmVzYSIsInZpbmN1bG8tc2VydmljbyJdLCJHRVQiOlsic3RhdHVzIiwiZGVzY3JpY2FvLXN0YXR1cyIsInNlcnZpY29zIiwic2l0dWFjb2VzLWZpc2NhaXMiLCJ2aW5jdWxvLWVtcHJlc2EiLCJ2aW5jdWxvLXNlcnZpY28iLCJ2aW5jdWxvLXNpdHVhY2FvIiwiY2FpeGEtcG9zdGFsIl19LCJhc3NpbmF0dXJhRGlnaXRhbCI6eyJQT1NUIjpbImFzc2luYXR1cmEiLCJhdXRlbnRpY2FjYW8iXX19fX19.nJG2ILkAAswjP6hXEuxQHm2bUfk1YT8Md7dfqrFUB-M");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.tokenExpirado);
        }
    });

    test("buscar empresa", { tags: "@EMPRESA_SUCESSO_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const clienteId = decodificarJwt(loginResponse.data.token).usuario.dados.clienteId;
            const responseEmpresa = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            const response = await buscarEmpresa(responseEmpresa.data.documento, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("id", expect.anything());
            expect(response.data).toHaveProperty("cliente_id", clienteId);
            expect(response.data).toHaveProperty("documento", gerarEmpresa.documento.replace(/\D/g, ""));
            expect(response.data).toHaveProperty("nome", gerarEmpresa.nome);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("buscar  sua própria empresa", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const CNPJEmpresa = "75847020000100";
        try {
            const loginResponse = await login("joao.firmino", "Mudar@12");
            const clienteId = decodificarJwt(loginResponse.data.token).usuario.dados.clienteId;
            const response = await buscarEmpresa(CNPJEmpresa, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("id", expect.anything());
            expect(response.data).toHaveProperty("cliente_id", clienteId);
            expect(response.data).toHaveProperty("documento", CNPJEmpresa);
            expect(response.data).toHaveProperty("nome", expect.anything());
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error;
        }
    });

    test("buscar empresa de outro cliente", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();
        try {
            const loginResponseA = await login("joao.garcia", "Mudar@12");
            const responseEmpresaA = await cadastrarEmpresa(gerarEmpresa, loginResponseA.data.token);
            const loginResponseB = await login("[joao.garcia]leonardo.vieira", "Mudar@12");
            const response = await buscarEmpresa(responseEmpresaA.data.documento, loginResponseB.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.empresaNaoEncontrada);
        }
    });

    test("buscar empresa que não existe", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJSemMascara");
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const response = await buscarEmpresa(gerarEmpresa.documento, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.empresaNaoEncontrada);
        }
    });

    test("buscar empresa com token expirado", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const CNPJEmpresa = "75847020000100";
        try{
            const response = await deletarEmpresa(CNPJEmpresa, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3Njk2OTAzODYsImV4cCI6MTc2OTY5Mzk4NiwibmJmIjoxNzY5NjkwMzg2LCJqdGkiOiJmaTNyZDBXZnU4QmwxbnJqIiwic3ViIjoiOTcwMDgwIiwicHJ2IjoiYzUyM2IxZGY3YTE2YjJlYmJkM2MxY2Q1MTQ5OGY1MzY4ZDgwYzAxMCIsInVzdWFyaW8iOnsidGlwbyI6MSwidXN1YXJpb0lkIjo5NzAwODAsImRhZG9zIjp7ImNsaWVudGVJZCI6ODg1NjksImFjZXNzb3MiOnsicmVsYXRvcmlvIjp7IkdFVCI6WyJlbXByZXNhIiwiY2F0ZWdvcmlhIiwicmVsYXRvcmlvIiwicHVibGljYWRvcyIsIm1vZG8tcGFnYW1lbnRvIl0sIlBPU1QiOlsicHVibGljYWRvcyJdLCJQVVQiOlsicHVibGljYWRvcyJdLCJERUxFVEUiOlsicHVibGljYWRvcyJdfSwiYXRlbmRpbWVudG8iOnsiR0VUIjpbImVtcHJlc2EiLCJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byIsInRvdGFsaXphZG9yZXMiXSwiUE9TVCI6WyJhdGVuZGltZW50byIsImNvbmNsdWlyIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iXSwiUFVUIjpbImF0ZW5kaW1lbnRvIiwiY2FuY2VsYXIiLCJyZWFicmlyIiwiYW5hbGlzYXIiLCJhdGVuZGltZW50byIsImZpbmFsaXphLWF0ZW5kaW1lbnRvIl0sIkRFTEVURSI6WyJhdGVuZGltZW50byJdfSwiaW50ZWdyYUNvbnRhZG9yTWFpcyI6eyJQT1NUIjpbInN0YXR1cyIsImRlc2NyaWNhby1zdGF0dXMiLCJzZXJ2aWNvcyIsInNpdHVhY29lcy1maXNjYWlzIiwiY2FpeGEtcG9zdGFsIiwidmluY3Vsby1lbXByZXNhIiwidmluY3Vsby1zZXJ2aWNvIl0sIlBVVCI6WyJzdGF0dXMiLCJkZXNjcmljYW8tc3RhdHVzIiwic2Vydmljb3MiXSwiREVMRVRFIjpbInN0YXR1cyIsImRlc2NyaWNhby1zdGF0dXMiLCJzZXJ2aWNvcyIsInZpbmN1bG8tZW1wcmVzYSIsInZpbmN1bG8tc2VydmljbyJdLCJHRVQiOlsic3RhdHVzIiwiZGVzY3JpY2FvLXN0YXR1cyIsInNlcnZpY29zIiwic2l0dWFjb2VzLWZpc2NhaXMiLCJ2aW5jdWxvLWVtcHJlc2EiLCJ2aW5jdWxvLXNlcnZpY28iLCJ2aW5jdWxvLXNpdHVhY2FvIiwiY2FpeGEtcG9zdGFsIl19LCJhc3NpbmF0dXJhRGlnaXRhbCI6eyJQT1NUIjpbImFzc2luYXR1cmEiLCJhdXRlbnRpY2FjYW8iXX19fX19.nJG2ILkAAswjP6hXEuxQHm2bUfk1YT8Md7dfqrFUB-M");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.tokenExpirado);
        }
    });

    test("deletar uma empresa ", { tags: "@EMPRESA_SUCESSO_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();
        try {
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const responseEmpresa = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            const response = await deletarEmpresa(responseEmpresa.data.documento, loginResponse.data.token);
            expect(response.status).toBe(200);
            expect(response.data).toHaveProperty("success", true);
            expect(response.data).toHaveProperty("msg", MENSAGENS.empresa.deletarEmpresa);
        } catch (error) {
            console.error("Erro ao realizar a requisição:", error);
            throw error; 
        }
    });

    test("deletar empresa de outro cliente", { tags: "@EMPRESA_FALHA_API" }, async () => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();
        try {
            const loginResponseA = await login("joao.garcia", "Mudar@12");
            const responseEmpresaA = await cadastrarEmpresa(gerarEmpresa, loginResponseA.data.token);
            const loginResponseB = await login("[joao.garcia]leonardo.vieira", "Mudar@12");
            const response = await deletarEmpresa(responseEmpresaA.data.documento, loginResponseB.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.empresaNaoEncontrada);
        }
    });

    test("deletar empresa que não existe", { tags: "@EMPRESA_FALHA_API" }, async() => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa("CNPJSemMascara");
        try{
            const loginResponse = await login("joao.garcia", "Mudar@12");
            const response = await deletarEmpresa(gerarEmpresa.documento, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch(error){
            expect(error.response.status).toBe(404);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.empresaNaoEncontrada);
        }
    });

    test("deletar sua própria empresa", { tags: "@EMPRESA_FALHA_API" }, async() => {
        const apiEmpresaHelpers = new ApiEmpresaHelpers();
        const gerarEmpresa = apiEmpresaHelpers.gerarEmpresa();
        try {
            const loginResponse = await login("joao.firmino", "Mudar@12");
            const responseEmpresa = await cadastrarEmpresa(gerarEmpresa, loginResponse.data.token);
            const response = await deletarEmpresa(responseEmpresa.data.documento, loginResponse.data.token);
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.acessoNegado);
        }
    });

    test("deletar empresa com token expirado", { tags: "@EMPRESA_FALHA_API" }, async() => {
        const CNPJEmpresa = "53844557000175";
        try{
            const response = await deletarEmpresa(CNPJEmpresa, "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLWF1dGgtaG1sLnNjaS5jb20uYnIvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3Njk2OTAzODYsImV4cCI6MTc2OTY5Mzk4NiwibmJmIjoxNzY5NjkwMzg2LCJqdGkiOiJmaTNyZDBXZnU4QmwxbnJqIiwic3ViIjoiOTcwMDgwIiwicHJ2IjoiYzUyM2IxZGY3YTE2YjJlYmJkM2MxY2Q1MTQ5OGY1MzY4ZDgwYzAxMCIsInVzdWFyaW8iOnsidGlwbyI6MSwidXN1YXJpb0lkIjo5NzAwODAsImRhZG9zIjp7ImNsaWVudGVJZCI6ODg1NjksImFjZXNzb3MiOnsicmVsYXRvcmlvIjp7IkdFVCI6WyJlbXByZXNhIiwiY2F0ZWdvcmlhIiwicmVsYXRvcmlvIiwicHVibGljYWRvcyIsIm1vZG8tcGFnYW1lbnRvIl0sIlBPU1QiOlsicHVibGljYWRvcyJdLCJQVVQiOlsicHVibGljYWRvcyJdLCJERUxFVEUiOlsicHVibGljYWRvcyJdfSwiYXRlbmRpbWVudG8iOnsiR0VUIjpbImVtcHJlc2EiLCJ1c3VhcmlvLWFkaWNpb25hbC1jbGllbnRlIiwic3RhdHVzIiwidHJhbWl0ZSIsInVzdWFyaW8tYWRpY2lvbmFsLWFkbWluIiwiZGVwYXJ0YW1lbnRvIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iLCJhbmV4byIsInRvdGFsaXphZG9yZXMiXSwiUE9TVCI6WyJhdGVuZGltZW50byIsImNvbmNsdWlyIiwiYXRlbmRpbWVudG8iLCJpbnRlcmFjYW8iXSwiUFVUIjpbImF0ZW5kaW1lbnRvIiwiY2FuY2VsYXIiLCJyZWFicmlyIiwiYW5hbGlzYXIiLCJhdGVuZGltZW50byIsImZpbmFsaXphLWF0ZW5kaW1lbnRvIl0sIkRFTEVURSI6WyJhdGVuZGltZW50byJdfSwiaW50ZWdyYUNvbnRhZG9yTWFpcyI6eyJQT1NUIjpbInN0YXR1cyIsImRlc2NyaWNhby1zdGF0dXMiLCJzZXJ2aWNvcyIsInNpdHVhY29lcy1maXNjYWlzIiwiY2FpeGEtcG9zdGFsIiwidmluY3Vsby1lbXByZXNhIiwidmluY3Vsby1zZXJ2aWNvIl0sIlBVVCI6WyJzdGF0dXMiLCJkZXNjcmljYW8tc3RhdHVzIiwic2Vydmljb3MiXSwiREVMRVRFIjpbInN0YXR1cyIsImRlc2NyaWNhby1zdGF0dXMiLCJzZXJ2aWNvcyIsInZpbmN1bG8tZW1wcmVzYSIsInZpbmN1bG8tc2VydmljbyJdLCJHRVQiOlsic3RhdHVzIiwiZGVzY3JpY2FvLXN0YXR1cyIsInNlcnZpY29zIiwic2l0dWFjb2VzLWZpc2NhaXMiLCJ2aW5jdWxvLWVtcHJlc2EiLCJ2aW5jdWxvLXNlcnZpY28iLCJ2aW5jdWxvLXNpdHVhY2FvIiwiY2FpeGEtcG9zdGFsIl19LCJhc3NpbmF0dXJhRGlnaXRhbCI6eyJQT1NUIjpbImFzc2luYXR1cmEiLCJhdXRlbnRpY2FjYW8iXX19fX19.nJG2ILkAAswjP6hXEuxQHm2bUfk1YT8Md7dfqrFUB-M");
            throw new Error("Esperava um erro, mas a requisição foi bem-sucedida.");
        } catch(error){
            expect(error.response.status).toBe(401);
            expect(error.response.data.detail[0]).toHaveProperty("msg", MENSAGENS.empresa.tokenExpirado);
        }
    });
});