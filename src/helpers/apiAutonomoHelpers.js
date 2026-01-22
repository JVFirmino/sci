import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class ApiAutonomoHelpers {

    status = [0, 1];

    gerarAleatorio(lista){
        const index = faker.number.int({ min: 0, max: lista.length -1 });
        return lista[index]
    }

    formatDate(date) {
        return date.toLocaleDateString('en-CA');
    };

    gerarCpfComMascara() {
        return cpf.format(cpf.generate());
    };

    gerarItemAutonomo(empresaId){
        return{
            empresa_id:empresaId,
            nome: faker.person.firstName(),
            cpf: this.gerarCpfComMascara(),
            nascimento_data: this.formatDate(faker.date.birthdate({ min: 18, mode: "age" })),
            status:this.gerarAleatorio(this.status)
        };
    };

    gerarAutonomo(empresaId, multiplo){
        const item = this.gerarItemAutonomo(empresaId);
        if(multiplo){
            return item
        }else{
            return { dados : [item] }
        }
    };

    gerarMultiplosAutonomos(empresaId, quantidade, multiplo){
        const autonomos = [];
        for (let index = 0; index < quantidade; index++) {
            autonomos.push(this.gerarAutonomo(empresaId, multiplo))
            
        }
        return{
            dados : autonomos
        };
    };

    gerarAutonomoDuplicado(empresaId, quantidade){
        const autonomoBase = this.gerarAutonomo(empresaId, true);
        const autonomos = [] 
        for (let i = 0; i < quantidade; i++){
            autonomos.push(structuredClone(autonomoBase))
        }
        return{
            dados: autonomos
        };
    };

    gerarMesmoAutonomoParaEmpresas(empresaIds){
        const gerarItemAutonomo = this.gerarItemAutonomo(null);
        const autonomos = [];
        for (let i = 0; i < empresaIds.length; i++) {
            autonomos.push({
                ...gerarItemAutonomo,
                empresa_id: empresaIds[i],
            });
        }
        return {
            dados: autonomos
        };
    };

    atualizarAutonomo(empresaId, autonomoId, overrides = {}){
        return {
            autonomo_id: autonomoId,
            empresa_id:empresaId,
            nome: faker.person.firstName(),
            cpf: this.gerarCpfComMascara(),
            nascimento_data: this.formatDate(faker.date.birthdate({ min: 18, mode: "age" })),
            status:this.gerarAleatorio(this.status),
            ...overrides
            
        };
    };

    montarPayloadDeletarFeriado(empresaId, autonomo){
        return {
            autonomo_id: autonomo,
            empresa_id: empresaId
        };
    };

}