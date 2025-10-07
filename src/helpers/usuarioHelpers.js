import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class UsuarioHelpers {

    constructor(){}

    gerarDataNascimentoFormatada() {
        const nascimento = faker.date.birthdate({ min: 18, mode: 'age' });
        return nascimento.toLocaleDateString('pt-BR');
    }

    gerarCpfComMascara() {
        const cpfValido = cpf.generate();
        return cpf.format(cpfValido);
    }

    gerarDataAdmissaoFormatada() {
        const hoje = new Date();
        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(hoje.getFullYear() - 1);
        const umMesFrente = new Date();
        umMesFrente.setMonth(hoje.getMonth() + 1);
        const dataAdmissao = faker.date.between({ from: umAnoAtras, to: umMesFrente });
        return dataAdmissao.toLocaleDateString('pt-BR');
    }

    async gerarUsuarioContribuinteSindical(){
        return {
            tipoCadastro: "Contribuinte",
            classe:"Dirigente Sindical",
            nome: faker.person.fullName(),
            dataNascimento: this.gerarDataNascimentoFormatada(),
            cpf: this.gerarCpfComMascara(),
            dataAdmissao: this.gerarDataAdmissaoFormatada(),
            salario: faker.number.int({ min: 1, max: 10 })
        }
    }

    async gerarUsuarioEmpregadoAposentado(){
        return {
            tipoCadastro: "Empregado",
            classe:"Aposentado",
            nome: faker.person.fullName(),
            dataNascimento: this.gerarDataNascimentoFormatada(),
            cpf: this.gerarCpfComMascara(),
            dataAdmissao: this.gerarDataAdmissaoFormatada(),
            salario: faker.number.int({ min: 1, max: 10 })
        }
    }
}