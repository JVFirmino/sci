import { faker } from "@faker-js/faker";
import { cnpj } from "cpf-cnpj-validator";

export class ApiEmpresaHelpers {

    gerarDocumento(tipo){
        switch(tipo) { 
            case "CNPJcomMascara":
                return cnpj.format(cnpj.generate());
            case "CNPJSemMascara":
                return cnpj.format(cnpj.generate()).replace(/\D/g, "");
            case "CNPJmenos14":
                return faker.string.alphanumeric(13);
            case "CNPJmais15":
                return faker.string.alphanumeric(16);
            case "CNPJmais18":
                return faker.string.alphanumeric(19);
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