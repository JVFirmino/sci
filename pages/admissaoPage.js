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
        this.elementoTipoAdmissao = "s2id_tipoAdmissao";
        this.elementoLista = "select2-drop";
        this.elementoTipoColaborador = "s2id_tipo";
        this.elementoContrato = "s2id_contratoTipoId"
        this.elementoNome = "nome";
        this.elementoDataNascimento = "nascimentoData";
        this.elementoDataAdmissao = "admissaoData";
        this.elementoCpf = "cpf";
        this.elementoSalario = "salario"
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
     */
    async preencherDadosColaborador(usuario) {
        await this.utils.selecionarOpcaoTexto(this.elementoTipoCadastro, this.elementoLista, this.roleListitem, usuario.tipoCadastro);
        await this.utils.selecionarOpcaoTexto(this.elementoClasse, this.elementoLista, this.roleListitem, usuario.classe);
        await this.page.getByTestId(this.elementoNome).fill(usuario.nome);
        await this.page.getByTestId(this.elementoDataNascimento).fill(usuario.dataNascimento);
        await this.page.getByTestId(this.elementoDataAdmissao).fill(usuario.dataAdmissao);
        await this.page.getByTestId(this.elementoCpf).fill(usuario.cpf);
        await this.page.getByTestId("s2id_categoriaeSocialId").click();
        await this.page.locator("#select2-drop ul li").nth(2).click();

        if(usuario.tipoCadastro === "Empregado"){
            await this.utils.selecionarOpcaoTexto(this.elementoTipoAdmissao, this.elementoLista, this.roleListitem, usuario.tipoAdmissao)

            if(usuario.classe != "Estagiário"){
                await this.page.getByTestId("s2id_funcaoId").click();
                await this.page.locator("#select2-drop ul li").nth(2).click()
                await this.utils.selecionarOpcaoTexto(this.elementoTipoColaborador, this.elementoLista, this.roleListitem, usuario.tipoColaborador);
                await this.utils.selecionarOpcaoTexto(this.elementoContrato, this.elementoLista, this.roleListitem, usuario.tipoContrato)
                await this.page.getByTestId(this.elementoSalario).fill(usuario.salario)
            }
        }
    }

    /**
     * Salva a admissão do colaborador.
     */
    async salvarAdmissao() {
        await this.page.getByRole(this.roleButton, { name: this.elementoBotaoSalvar }).click();
    }

    /**
     * Realiza o processo completo de admissão preliminar.
     * @param {Object} usuario - Os dados do usuário..
     */
    async realizarAdmissaoPreliminar(usuario){
        await this.acessarTelaAdmissaoPreliminar();
        await this.preencherDadosColaborador(usuario);
        await this.salvarAdmissao();
    }
}