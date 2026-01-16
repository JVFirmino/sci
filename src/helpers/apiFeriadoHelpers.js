import { faker } from "@faker-js/faker";

export class ApiFeriadoHelpers {

    formatDate(date) {
        return date.toLocaleDateString('en-CA');
    }

    gerarItemFeriado(empresaId) {
        const dataInicial = new Date();
        dataInicial.setFullYear(dataInicial.getFullYear() + 3);

        const dataFinal = new Date();
        dataFinal.setFullYear(dataFinal.getFullYear() + 20);

        const dataAleatoria = this.formatDate(faker.date.between({ from: dataInicial, to: dataFinal }));
        return {
            empresa_id: empresaId,
            data: dataAleatoria,
            descricao: faker.lorem.words(3)
        };
    };

    gerarFeriado(empresaId, multiplo){
        const item = this.gerarItemFeriado(empresaId);
        if(multiplo){
            return item
        } else {
            return { dados: [item] }
        }
    };

    gerarFeriadoDuplicado(empresaId, quantidade){
        const feriadoBase = this.gerarFeriado(empresaId, true);
        const feriados = [] 
        for (let i = 0; i < quantidade; i++){
            feriados.push(structuredClone(feriadoBase))
        }
        return{
            dados: feriados
        };
    };

    gerarMultiplosFeriados(empresaId, quantidade, multiplo){
        const feriados = [];
        for (let i = 0; i < quantidade; i++) {
            feriados.push(this.gerarFeriado(empresaId, multiplo));
        }
        return {
            dados: feriados
        };
    };

    gerarMesmoFeriadoParaEmpresas(empresaIds){
        const gerarItemFeriado = this.gerarItemFeriado(null);
        const feriados = [];
        for (let i = 0; i < empresaIds.length; i++) {
            feriados.push({
                ...gerarItemFeriado,
                empresa_id: empresaIds[i],
            });
        }
        return {
            dados: feriados
        };
    }

    atualizarFeriado(empresa_id, data){
        return {
            empresa_id: empresa_id,
            data: data,
            descricao: faker.lorem.words(3)
        };
    };

    montarPayloadDeletarFeriado(empresaId, data){
        return {
            empresa_id: empresaId,
            data: data
        };
    };
}