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

    async clicarAtributo(valorAtributo){
        await this.page.getByTestId(valorAtributo).click();
    }

    async clicarRole(rolename, texto){
        await this.page.getByRole(rolename, { name: texto }).click();
    }

    async verificarTextoVisivel(texto){
        await expect(this.page.getByText(texto)).toBeVisible();
    }

    async passarMousePorCima(valorAtributo){
        await this.page.getByTestId(valorAtributo).hover();
    }
}