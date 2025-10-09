import { UiActionsHelpers } from "../src/helpers/uiActionsHelpers";

export class AdmissaoPage {

    constructor(page){
        this.page = page;
        this.utils = new UiActionsHelpers(page);
        // Menus
        this.elementoMenuCadastros = "menu2";
        this.elementoMenuAdmissaoPreliminar = "menu106";
        // Campos
        this.elementoTipoCadastro = "s2id_tipoColaborador";
        this.elementoClasse = "s2id_classeId";
        this.elementoLista = "select2-drop";
        this.elementoNome = "nome";
        this.elementoDataNascimento = "nascimentoData";
        this.elementoDataAdmissao = "admissaoData";
        this.elementoCpf = "cpf";
        // Botões
        this.elementoBotaoAdmitir = "Admitir";
        this.elementoBotaoSalvar = "Salvar";
        // Roles
        this.roleListitem = "listitem";
        this.roleButton = "button";
    }

    /**
     * Acessa a tela de admissão preliminar.
     */
    async acessarTelaAdmissaoPreliminar() {
        await this.page.getByTestId(this.elementoMenuCadastros).hover();
        await this.page.getByTestId(this.elementoMenuAdmissaoPreliminar).click();
        await this.page.getByRole(this.roleButton, { name: this.elementoBotaoAdmitir }).click();
    }

    /**
     * Preenche os dados do colaborador.
     * @param {Object} usuario - Os dados do usuário.
     * @param {string} tipoCadastro - O tipo de cadastro.
     * @param {string} classe - A classe do colaborador.
     */
    async preencherDadosColaborador(usuario, tipoCadastro, classe) {
        await this.utils.selecionarOpcaoTexto(this.elementoTipoCadastro, this.elementoLista, this.roleListitem, tipoCadastro);
        await this.utils.selecionarOpcaoTexto(this.elementoClasse, this.elementoLista, this.roleListitem, classe);
        await this.page.getByTestId(this.elementoNome).fill(usuario.nome);
        await this.page.getByTestId(this.elementoDataNascimento).fill(usuario.dataNascimento);
        await this.page.getByTestId(this.elementoDataAdmissao).fill(usuario.dataAdmissao);
        await this.page.getByTestId(this.elementoCpf).fill(usuario.cpf);
        await this.page.getByTestId("s2id_categoriaeSocialId").click();
        await this.page.locator("#select2-drop ul li").nth(2).click();
    }

    /**
     * Salva a admissão do colaborador.
     */
    async salvarAdmissao() {
        await this.page.getByRole(this.roleButton, { name: this.elementoBotaoSalvar }).click();
    }

    /**
     * Realiza o processo completo de admissão preliminar.
     * @param {Object} usuario - Os dados do usuário.
     * @param {string} tipoCadastro - O tipo de cadastro.
     * @param {string} classe - A classe do colaborador.
     */
    async realizarAdmissaoPreliminar(usuario, tipoCadastro, classe){
        await this.acessarTelaAdmissaoPreliminar();
        await this.preencherDadosColaborador(usuario, tipoCadastro, classe);
        await this.salvarAdmissao();
    }
}