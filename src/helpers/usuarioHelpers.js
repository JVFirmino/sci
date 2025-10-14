import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class UsuarioHelpers {

    constructor(){}

    /**
     * Gera uma data de nascimento formatada no padrão brasileiro (dd/mm/aaaa).
     * 
     * @returns {string} Data de nascimento formatada.
     */
    gerarDataNascimentoFormatada() {
        const nascimento = faker.date.birthdate({ min: 18, mode: 'age' });
        return nascimento.toLocaleDateString('pt-BR');
    }

    /**
     * Gera um CPF válido formatado com máscara.
     * 
     * @returns {string} CPF formatado.
     */
    gerarCpfComMascara() {
        const cpfValido = cpf.generate();
        return cpf.format(cpfValido);
    }

    /**
     * Gera uma data de admissão formatada no padrão brasileiro (dd/mm/aaaa).
     * A data é gerada entre um ano atrás e um mês à frente da data atual.  
     * 
     * @returns {string} Data de admissão formatada.
     */
    gerarDataAdmissaoFormatada() {
        const hoje = new Date();
        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(hoje.getFullYear() - 1);
        const umMesFrente = new Date();
        umMesFrente.setMonth(hoje.getMonth() + 1);
        const dataAdmissao = faker.date.between({ from: umAnoAtras, to: umMesFrente });
        return dataAdmissao.toLocaleDateString('pt-BR');
    }

    formatarSalario(valor) {
        return valor.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    /**
     * Gera um objeto de usuário com dados simulados.
     * 
     * Permite passar campos opcionais como tipoCadastro, classe, etc.
     * Os campos não informados serão preenchidos automaticamente.
     * 
     * @param {Object} [opcoes={}] - Campos opcionais para personalizar o usuário.
     * @returns {Promise<Object>} Objeto com os dados do usuário gerado.
     */
    async gerarUsuario(opcoes = {}){
        return {
            tipoCadastro: opcoes.tipoCadastro ?? null,
            classe: opcoes.classe ?? null,
            tipoAdmissao: opcoes.tipoAdmissao ?? null,
            tipoColaborador: opcoes.tipoColaborador ?? null,
            tipoContrato: opcoes.tipoContrato ?? null,
            nome: faker.person.firstName(),
            dataNascimento: this.gerarDataNascimentoFormatada(),
            cpf: this.gerarCpfComMascara(),
            dataAdmissao: this.gerarDataAdmissaoFormatada(),
            salario: this.formatarSalario(faker.number.float({ min: 1000, max: 9999.99, precision: 0.01 }))
        }
    }
}