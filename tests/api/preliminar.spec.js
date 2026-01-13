import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { ApiPreliminarHelpers } from "../../src/helpers/apiPreliminarHelpers";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarAdmissaoPreliminar } from "../../src/api/services/preliminarService";
import { MENSAGENS } from "../../fixture/mensagemFixture";

test.describe("preliminar API", { tag: ["@PRELIMINAR_API"] }, () => {

    test("cadastrar admissão preliminar contribuinte com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const tipoColaborador = 1;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminar(empresaId, tipoColaborador);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(retorno).toHaveProperty("id");
            expect(retorno).toHaveProperty("empresa_id", gerarPreliminar.empresa_id);
            expect(retorno).toHaveProperty("v_id", gerarPreliminar.v_id);
            expect(retorno).toHaveProperty("tipo_colaborador", gerarPreliminar.tipo_colaborador);
            expect(retorno).toHaveProperty("classe_id", gerarPreliminar.classe_id);
            expect(retorno).toHaveProperty("nome", gerarPreliminar.nome);
            expect(retorno).toHaveProperty("nascimento_data", gerarPreliminar.nascimento_data);
            expect(retorno).toHaveProperty("admissao_data", gerarPreliminar.admissao_data);
            expect(retorno).toHaveProperty("cpf", gerarPreliminar.cpf);
            expect(retorno).toHaveProperty("categoria_esocial_id", gerarPreliminar.categoria_esocial_id);

            console.log("Admissão preliminar cadastrada com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar admissão preliminar:", error);
            throw error;
        }
    });
    
    test("cadastrar admissão preliminar empregado com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const tipoColaborador = 0;
        const tipoContrato = 2;
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminar2(empresaId, tipoColaborador, tipoContrato);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            expect(response.status).toBe(201);
            expect(response.data).toHaveProperty("sucesso", true);
            expect(response.data).toHaveProperty("mensagem", MENSAGENS.preliminar.sucessoCadastroPreliminar);
            expect(response.data).toHaveProperty("retorno");

            const { retorno } = response.data;
            expect(retorno).toHaveProperty("id");
            expect(retorno).toHaveProperty("empresa_id", gerarPreliminar.empresa_id);
            expect(retorno).toHaveProperty("v_id", gerarPreliminar.v_id);
            expect(retorno).toHaveProperty("tipo_colaborador", gerarPreliminar.tipo_colaborador);
            expect(retorno).toHaveProperty("classe_id", gerarPreliminar.classe_id);
            expect(retorno).toHaveProperty("nome", gerarPreliminar.nome);
            expect(retorno).toHaveProperty("nascimento_data", gerarPreliminar.nascimento_data);
            expect(retorno).toHaveProperty("admissao_data", gerarPreliminar.admissao_data);
            expect(retorno).toHaveProperty("cpf", gerarPreliminar.cpf);
            expect(retorno).toHaveProperty("categoria_esocial_id", gerarPreliminar.categoria_esocial_id);
            expect(retorno).toHaveProperty("tipo_admissao", gerarPreliminar.tipo_admissao);
            expect(retorno).toHaveProperty("funcao_id", gerarPreliminar.funcao_id);
            expect(retorno).toHaveProperty("tipo", gerarPreliminar.tipo);
            expect(retorno).toHaveProperty("salario", gerarPreliminar.salario);
            expect(retorno).toHaveProperty("contrato_tipo_id", gerarPreliminar.contrato_tipo_id);
            expect(retorno).toHaveProperty("prazo_experiencia", gerarPreliminar.prazo_experiencia);
            expect(retorno).toHaveProperty("fim_prazo_experiencia", gerarPreliminar.fim_prazo_experiencia);

            console.log("Admissão preliminar cadastrada com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar admissão preliminar:", error);
            throw error;
        }
    });
});