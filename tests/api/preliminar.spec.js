import dotenv from "dotenv";
dotenv.config();

import { expect, test } from "@playwright/test";
import { ApiPreliminarHelpers } from "../../src/helpers/apiPreliminarHelpers";
import { gerarBasicToken } from "../../src/utils/authUtils";
import { loginCredencial } from "../../src/api/services/authService";
import { cadastrarAdmissaoPreliminar } from "../../src/api/services/preliminarService";

test.describe("preliminar API", { tag: ["@PRELIMINAR_API"] }, () => {

    test("cadastrar admissão preliminar contribuinte com sucesso", { tag: "@PRELIMINAR_SUCESSO_API" }, async () => {
        const empresaId = 900001;
        const tipoColaborador = "Contribuinte";
        const apiPreliminarHelpers = new ApiPreliminarHelpers();
        const gerarPreliminar = apiPreliminarHelpers.gerarItemPreliminar(empresaId, tipoColaborador);
        const token = gerarBasicToken("330|abc123", "496|SNmOmXK7QV8u9E2M8FmF2IaC1eCl8au39ieZKYDG");
        try {
            const loginResponse = await loginCredencial(token);
            const response = await cadastrarAdmissaoPreliminar(gerarPreliminar, loginResponse.data.token);
            expect(response.status).toBe(200);
        } catch (error) {
            console.error("Erro ao cadastrar admissão preliminar:", error);
            throw error;
        }

    });    

});