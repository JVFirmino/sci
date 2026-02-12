import { faker } from "@faker-js/faker";
import { cnpj } from "cpf-cnpj-validator";

export class ApiEmpresaHelpers {

    gerarDocumento(tipo){
        switch(tipo) { 
            case "CNPJSemMascara":
                return cnpj.format(cnpj.generate()).replace(/\D/g, "");
            case "CNPJmenos14":
                return faker.string.alphanumeric(13);
            case "CNPJmais14":
                return faker.string.alphanumeric(15);
            default:
                return cnpj.format(cnpj.generate());
        }
    };

    gerarEmpresa(tipo, overrides = {}) {
        return{
            documento: this.gerarDocumento(tipo),
            nome: faker.person.firstName(),
            ...overrides
        }
    };
}