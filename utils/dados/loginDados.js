import { faker } from "@faker-js/faker";

export class LoginDados {

    constructor(){}

    async getLoginUnico(){

        return {
            login:'joaoteste2@sci.com.br',
            senha: 'Mudar@12'
        };
    } 


    async getLoginPratice(){

        return {
            login:'joao.firmino',
            senha: 'Mudar@12'
        };
    }

    async getLoginInexistente(){

        return {
            login: faker.internet.email(),
            senha: faker.internet.password()
        };
    }

    async getLoginVazio(){

        return {
            login:'',
            senha: ''
        };
    }
}