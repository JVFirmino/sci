import { waitForDebugger } from "inspector";
import { UiActionsHelpers } from "../src/helpers/uiActionsHelpers";

export class AdmissaoPage {

    constructor(page){
        this.page = page;
        this.utils = new UiActionsHelpers(page);
        this.elementoMenuRHNetSocial = "rhnetsocial";
        this.elementoMenuCadastros = "menu2";
        this.elementoMenuAdmissaoPreliminar = "menu106";
        this.elementoBotaoAdmitir = "Admitir";
        this.elementoTipoCadastro = "s2id_tipoColaborador";
    }

    async acessarModuloRHNetSocial(){
        await this.page.waitForTimeout(3000);
        await this.page.getByTestId(this.elementoMenuRHNetSocial).click();
    }


    async realizarAdmissaoPreliminar(usuario){
        await this.utils.passarMousePorCima(this.elementoMenuCadastros);
        await this.utils.clicarAtributo(this.elementoMenuAdmissaoPreliminar);
        await this.utils.clicarRole("button", this.elementoBotaoAdmitir);
        await this.utils.clicarAtributo(this.elementoTipoCadastro);


        await this.page.getByTestId("select2-drop").getByRole("listitem").filter({ hasText: 'Contribuinte' }).click();

        // await this.page.getByTestId("menu2").hover();

        // await this.page.getByTestId("menu106").click();

        // await this.page.getByRole("button", { name: "Admitir" }).click();

        // await this.page.getByTestId("s2id_tipoColaborador").click();

        // await this.page.locator("#select2-drop ul li").nth(2).click();
        await this.page.getByTestId("select2-drop").getByRole("listitem").filter({ hasText: 'Contribuinte' }).click();
        // await this.page.getByText("Contribuinte").click();

        await this.page.getByTestId("s2id_classeId").click();

        await this.page.locator("#select2-drop ul li").nth(2).click();

        await this.page.getByTestId("nome").fill("Colaborador Auto");

        await this.page.getByTestId("nascimentoData").fill("20/05/1990");

        await this.page.getByTestId("admissaoData").fill("24/09/2025");

        await this.page.getByTestId("cpf").fill("420.602.730-72");

        await this.page.getByTestId("s2id_categoriaeSocialId").click();

        await this.page.locator("#select2-drop ul li").nth(2).click();

        await this.page.getByRole("button", { name: "Salvar" }).click();

        // await expect(this.page.getByText("O registro foi incluso com sucesso!")).toBeVisible();

    }
}