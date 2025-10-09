import { expect } from "@playwright/test";

export class UiActionsHelpers {

    constructor(page){
        this.page = page;
    }

    /**
     * Navega para uma URL e verifica se o título da página corresponde ao esperado.
     * @param {string} url - A URL para navegar.
     * @param {string} tituloPagina - O título esperado da página.
     */
    async navegarEVerificarTituloPagina(url, tituloPagina){
        await this.page.goto(url);
        await expect(this.page).toHaveTitle(tituloPagina);
    }

    /**
     * Acessa um módulo específico.
     * @param {string} menu - O nome do menu a ser acessado.
     */
    async acessarModuloRHNetSocial(menu){
        await this.page.waitForTimeout(3000);
        await this.page.getByTestId(menu).click();
    }

    /**
     * Seleciona uma opção de texto em um dropdown ou lista.
     * @param {string} elemento - O test ID do elemento que abre a lista.
     * @param {string} lista - O test ID da lista de opções.
     * @param {string} role - O papel (role) do item a ser selecionado.
     * @param {string} texto - O texto da opção a ser selecionada.
     */
    async selecionarOpcaoTexto(elemento, lista, role, texto){
        await this.page.getByTestId(elemento).click();
        await this.page.getByTestId(lista).getByRole(role).filter({ hasText: texto }).click();
    }
}