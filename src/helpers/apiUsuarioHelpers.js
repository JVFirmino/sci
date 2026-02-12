import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class ApiUsuarioHelpers {

    gerarCPF(tipo){
        switch(tipo) { 
            case "CPFSemMascara":
                return cpf.format(cpf.generate()).replace(/\D/g, "");
            default:
                return cpf.format(cpf.generate());
        }
    };

    gerarUsuario(tipo) {
        return {
            cpf: this.gerarCPF(tipo),
            nome: faker.person.firstName(),
        };
    }
}