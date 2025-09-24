import { faker } from "@faker-js/faker";

export class UsuarioDados {

    constructor(){}

    async gerarEmpregado(){
        return {
            id: faker.datatype.uuid(),
            nome: faker.name.findName(),
            email: faker.internet.email(),
            cargo: faker.name.jobTitle(),
            salario: faker.datatype.number({ min: 3000, max: 10000 })
        }
    }

    async gerarColaborador(){
        return {
            id: faker.datatype.uuid(),
            nome: faker.name.findName(),
            email: faker.internet.email(),
            cargo: faker.name.jobTitle(),
            salario: faker.datatype.number({ min: 2000, max: 8000 })
        }
    }
}