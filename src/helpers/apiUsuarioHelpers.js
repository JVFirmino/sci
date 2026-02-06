import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class ApiUsuarioHelpers {
    
    gerarUsuario() {
        return {
            cpf: cpf.format(cpf.generate()),
            nome: faker.person.firstName(),
        };
    }
}