import { expect } from "@playwright/test";
import { UiActionsUtils } from "../utils/uiActionsUtils";

export class AuthPage{

    constructor(page){
        this.page = page;
        this.utils = new UiActionsUtils(page);
        this.elementoUsuario = "usuario";
        this.elementoSenha = "senha";
        this.elementoBotaoLogin = "btLoginPrincipal";
    }

    async realizarLogin(usuario){
        await this.utils.preencherCampo(this.elementoUsuario, usuario.login);
        await this.utils.preencherCampo(this.elementoSenha, usuario.senha);
        await this.utils.clicarBotao(this.elementoBotaoLogin);
    }
}