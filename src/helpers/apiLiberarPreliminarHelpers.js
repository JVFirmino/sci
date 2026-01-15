import { faker } from "@faker-js/faker"

export class ApiLiberarPreliminarHelpers{

    statusLiberarcao = [ 0, 1, 2, 3, 4]

    gerarAleatorio(lista){
        const index = faker.number.int({ min : 0, max: lista.length - 1})
        return lista[index]
    }

    gerarTextoAleatorio(tamanho){
        return faker.string.alpha({ length: tamanho });
    }

    gerarItemLiberar(preliminarId, empresaId, overrides = {}){
        return{
            id: preliminarId,
            empresa_id: empresaId,
            liberacao_id: this.gerarAleatorio(this.statusLiberarcao),
            ...overrides

        }
    }
}


// "observacao_liberacao": "Liberado após conferência de documentos."