import { UiActionsHelpers } from "../src/helpers/uiActionsHelpers";

export class LoginPage{

    constructor(page){
        this.page = page;
        this.utils = new UiActionsHelpers(page);
        this.elementoUsuario = "usuario";
        this.elementoSenha = "senha";
        this.elementoBotaoLogin = "btLoginPrincipal";
    }

    async realizarLogin(usuario){
        await this.utils.preencherCampo(this.elementoUsuario, usuario.login);
        await this.utils.preencherCampo(this.elementoSenha, usuario.senha);
        await this.utils.clicarAtributo(this.elementoBotaoLogin);
    }
}