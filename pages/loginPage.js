export class LoginPage{

    constructor(page){
        this.page = page;
        // Campos
        this.elementoUsuario = "usuario";
        this.elementoSenha = "senha";
        // Botão
        this.elementoBotaoLogin = "btLoginPrincipal";
    }

    /**
     * Realiza o login preenchendo os campos de usuário e senha e clicando no botão de login.
     * 
     * @param {{login: string, senha: string}} usuario - Objeto contendo as credenciais do usuário.
     */
    async realizarLogin(usuario){
        await this.page.getByTestId(this.elementoUsuario).fill(usuario.login);
        await this.page.getByTestId(this.elementoSenha).fill(usuario.senha);
        await this.page.getByTestId(this.elementoBotaoLogin).click();
    }
}