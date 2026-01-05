import { da, faker } from "@faker-js/faker";

export class ApiServicoHelpers {
    constructor() {
        this.categoriaEsocial = [101, 102, 103, 104, 105, 
            106, 107, 108, 111, 201, 202,301, 302, 
            303, 305, 306, 307, 308, 309, 401, 410, 
            701, 711, 712, 721, 722, 723, 731, 734, 
            738,741, 751, 761, 771, 781, 901, 902, 903
        ];
    }

    gerarCategoriaEsocial(){
        const index = faker.number.int({ min: 0, max: this.categoriaEsocial.length - 1 });
        return this.categoriaEsocial[index];
    }

    gerarItemServico(empresaId){
        return {
            empresa_id: empresaId,
            cbo: `${faker.string.numeric(4)}-${faker.string.numeric(2)}`,
            descricao_cbo: `CBO ${faker.person.jobTitle()}`,
            categoria_esocial: this.gerarCategoriaEsocial(),
            ativo: true
        }
    }   

    gerarServico(empresaId, multiplo){
        const item = this.gerarItemServico(empresaId);
        if(multiplo){
            return item
        } else {
            return { dados: [item] };
        }
    };

    gerarServicoDuplicado(empresaId, quantidade){
        const servicoBase = this.gerarServico(empresaId, true);
        const servicos = [] 
        for (let i = 0; i < quantidade; i++){
            servicos.push(structuredClone(servicoBase))
        }
        return{
            dados: servicos
        };
    };

    gerarMultiplosServicos(empresaId, quantidade, multiplo){
        const servicos = [];
        for (let i = 0; i < quantidade; i++) {
            servicos.push(this.gerarServico(empresaId, multiplo));
        }
        return {
            dados: servicos
        };
    };
    
    montarPayloadDelecaoServico(empresaId, tipoServicoId){
        return {
            empresa_id: empresaId,
            tipo_servico_autonomo_id: tipoServicoId
        };
    };

    atualizarServico(empresa_id, tipoServicoId){
        return {
            tipo_servico_autonomo_id: tipoServicoId,
            empresa_id: empresa_id,
            cbo: `${faker.string.numeric(4)}-${faker.string.numeric(2)}`,
            descricao_cbo: `CBO ${faker.person.jobTitle()}`,
            categoria_esocial: this.gerarCategoriaEsocial(),
            ativo: true
        };
    };
}