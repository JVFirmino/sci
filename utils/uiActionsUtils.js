import { expect } from "@playwright/test";

export class UiActionsUtils {

    constructor(page){
        this.page = page;
    }

    async navegarEVerificarTituloPagina(url, tituloPagina){
        
        await this.page.goto(url);
        await expect(this.page).toHaveTitle(tituloPagina);
    }

    async verificarUrlPagina(url){
        await expect(this.page).toHaveURL(url);
    } 

    async preencherCampo(valorAtributo, valor){
        await this.page.getByTestId(valorAtributo).fill(valor);
    }

    async clicarBotao(valorAtributo){
        await this.page.getByTestId(valorAtributo).click();
    }

    async verificarTextoVisivel(texto){
        await expect(this.page.getByText(texto)).toBeVisible();
    }
}