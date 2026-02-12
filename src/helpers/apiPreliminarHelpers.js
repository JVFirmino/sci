import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class ApiPreliminarHelpers {

    categoriaEsocialEmpregado = [
        101, 102, 103, 104, 105, 106, 107, 
        108, 111, 201, 202,  901, 902, 903
    ];

    categoriaEsocialContribuinte = [
        301, 302, 303, 305, 306, 307, 308, 309, 
        401, 701, 711, 712, 721, 722, 723, 731, 
        734, 738, 741, 751, 761, 771, 781
    ];

    classeContribuinte = [
        5, 6, 7, 8
    ];

    classeEmpregado = [
        0, 1, 2, 3, 4
    ];

    tipoAdmissao = [
        0, 1, 2, 3, 4, 5, 6, 9
    ];

    cargo = [
        1, 13, 7, 14, 11, 3, 4, 
        15, 6, 9, 5, 10, 8, 2, 12
    ];

    tipoDeColaborador = [
        0, 1, 2, 3, 4
    ];

    tipoDeContrato = [
        0, 1, 2, 3, 4, 5
    ];

    formatDate(date) {
        return date.toLocaleDateString('en-CA');
    };

    gerarAleatorio(lista){
        const index = faker.number.int({ min: 0, max: lista.length - 1 });
        return lista[index];
    };

    gerarClasse(tipo_colaborador){
        let lista;
        if (tipo_colaborador === 0) {
            lista = this.classeEmpregado;
        } else {
            lista = this.classeContribuinte;
        }
        const index = faker.number.int({ min: 0, max: lista.length - 1 });
        return lista[index];
    };

    gerarCategoriaEsocial(tipo_colaborador){
        let lista;
        if (tipo_colaborador === 0) {
            lista = this.categoriaEsocialEmpregado;
        } else {
            lista = this.categoriaEsocialContribuinte;
        }
        const index = faker.number.int({ min: 0, max: lista.length - 1 });
        return lista[index];
    };

    gerarCpfComMascara() {
        return cpf.format(cpf.generate());
    };

    gerarDataAdmissao() {
        const hoje = new Date();
        const anoMin = hoje.getFullYear() - 5;
        const anoMax = hoje.getFullYear();
        const ano = faker.number.int({ min: anoMin, max: anoMax });
        const mes = faker.number.int({ min: 0, max: 11 });
        const dia = faker.number.int({ min: 1, max: 27 });
        const data = new Date(ano, mes, dia);

        return this.formatDate(data);
    };

    gerarFimPrazoExperiencia(admissaoData, prazoExperiencia) {
        const dataAdmissao = new Date(admissaoData);
        dataAdmissao.setDate(dataAdmissao.getDate() + prazoExperiencia);
        return this.formatDate(dataAdmissao);
    };

    gerarItemPreliminarContribuinte(empresaId, tipoColaborador, overrides = {}) {
        return {
            empresa_id: empresaId,
            v_id: faker.number.int({ min: 1000, max: 99999 }),
            tipo_colaborador: tipoColaborador,
            classe_id: this.gerarClasse(tipoColaborador),
            nome: faker.person.firstName(),
            nascimento_data: this.formatDate(faker.date.birthdate({ min: 18, mode: "age" })),
            admissao_data: this.gerarDataAdmissao(),
            cpf: this.gerarCpfComMascara(),
            categoria_esocial_id: this.gerarCategoriaEsocial(tipoColaborador),
            ...overrides
        };
    };

    gerarItemPreliminarEmpregado(empresaId, contratoTipo, overrides = {}) {
        const itemBase = this.gerarItemPreliminarContribuinte(empresaId, 0);

        itemBase.tipo_admissao = this.gerarAleatorio(this.tipoAdmissao);
        itemBase.funcao_id = this.gerarAleatorio(this.cargo);
        itemBase.tipo = this.gerarAleatorio(this.tipoDeColaborador);
        itemBase.salario = parseFloat(faker.finance.amount(1500, 10000, 2));
        itemBase.contrato_tipo_id = contratoTipo;

        if(contratoTipo !== 1) {
            itemBase.prazo_experiencia = faker.number.int({ min: 30, max: 180 });
            itemBase.fim_prazo_experiencia = this.gerarFimPrazoExperiencia(itemBase.admissao_data, itemBase.prazo_experiencia);
        }
        return {
            ...itemBase,
            ...overrides
        };
    };

    gerarItemPreliminarContribuinteAtualizar(empresaId, preliminarId, tipoColaborador, overrides = {}) {
        return {
            id: preliminarId,
            empresa_id: empresaId,
            v_id: faker.number.int({ min: 1000, max: 99999 }),
            tipo_colaborador: tipoColaborador,
            classe_id: this.gerarClasse(tipoColaborador),
            nome: faker.person.firstName(),
            nascimento_data: this.formatDate(faker.date.birthdate({ min: 18, mode: "age" })),
            admissao_data: this.gerarDataAdmissao(),
            cpf: this.gerarCpfComMascara(),
            categoria_esocial_id: this.gerarCategoriaEsocial(tipoColaborador),
            ...overrides
        };
    };

    gerarItemPreliminarEmpregadoAtualizar(empresaId, preliminarId, contratoTipo, overrides = {}) {
        const itemBase = this.gerarItemPreliminarContribuinteAtualizar(empresaId, preliminarId, 0);

        itemBase.tipo_admissao = this.gerarAleatorio(this.tipoAdmissao);
        itemBase.funcao_id = this.gerarAleatorio(this.cargo);
        itemBase.tipo = this.gerarAleatorio(this.tipoDeColaborador);
        itemBase.salario = parseFloat(faker.finance.amount(1500, 10000, 2));
        itemBase.contrato_tipo_id = contratoTipo;

        if(contratoTipo !== 1) {
            itemBase.prazo_experiencia = faker.number.int({ min: 30, max: 180 });
            itemBase.fim_prazo_experiencia = this.gerarFimPrazoExperiencia(itemBase.admissao_data, itemBase.prazo_experiencia);
        }
        return {
            ...itemBase,
            ...overrides
        };
    };

    deletarPreliminar(empresaId, idPreliminar){
        return {
            empresa_id: empresaId,
            id: idPreliminar
        };
    };
}


/*
"matricula_anterior": null,
"pis": null,
"numero_recibo": null,
"data_integracao": null,
"preenchimento_dados_cadastrais": true,
"email": "joao.silva@example.com",
"matricula_esocial": null,
"funcionario_contribuinte_id": null
*/

/*
"tipo_admissao": null,
"funcao_id": null,
"tipo": null,
"salario": 3500.75,
"contrato_tipo_id": null,
"prazo_experiencia": 90,
"fim_prazo_experiencia": "2025-12-23",
*/