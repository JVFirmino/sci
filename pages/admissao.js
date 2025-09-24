import { expect } from "@playwright/test";
import { UiActionsUtils } from "../utils/uiActionsUtils";


export class AdmissaoPage {

    constructor(page){
        this.page = page;
    }


    async realizarAdmissaoPreliminar(){

        await this.page.waitForTimeout(3000);

        await this.page.getByTestId("rhnetsocial").click();

        await this.page.getByTestId("menu2").hover();

        await this.page.getByTestId("menu106").click();

        await this.page.getByRole("button", { name: "Admitir" }).click();

        await this.page.getByTestId("s2id_tipoColaborador").click();

        await this.page.locator("#select2-drop ul li").nth(2).click();

        await this.page.getByTestId("s2id_classeId").click();

        await this.page.locator("#select2-drop ul li").nth(2).click();

        await this.page.getByTestId("nome").fill("Colaborador Auto");

        await this.page.getByTestId("nascimentoData").fill("20/05/1990");

        await this.page.getByTestId("admissaoData").fill("24/09/2025");

        await this.page.getByTestId("cpf").fill("420.602.730-72");

        await this.page.getByTestId("s2id_categoriaeSocialId").click();

        await this.page.locator("#select2-drop ul li").nth(2).click();

        await this.page.getByRole("button", { name: "Salvar" }).click();

        await expect(this.page.getByTestId("avisosFixed")).toHaveText("O registro foi incluso com sucesso!");

    }
}