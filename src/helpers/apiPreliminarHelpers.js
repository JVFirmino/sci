import { faker } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

export class ApiPreliminarHelpers {

    categoriaEsocialEmpregado = [
        101, 102, 103, 104, 105, 
        106, 107, 108, 111, 
        201, 202, 410, 
        901, 902, 903
    ];

    categoriaEsocialContribuinte = [
        301, 302, 303, 305, 306, 307, 308, 309, 
        401, 701, 711, 712, 721, 722, 723, 
        731, 734, 738, 741, 751, 761, 771, 781
    ];

    gerarCategoriaEsocial(tipoColaborador) {
        const lista = tipoColaborador === 'Empregado'
            ? this.categoriaEsocialEmpregado
            : this.categoriaEsocialContribuinte;

        const index = faker.number.int({ min: 0, max: lista.length - 1 });
        return lista[index];
    }

    gerarCpfComMascara() {
        return cpf.format(cpf.generate());
    }

    gerarDataAdmissao() {
        const hoje = new Date();
        const umAnoAtras = new Date();
        umAnoAtras.setFullYear(hoje.getFullYear() - 1);

        const umMesFrente = new Date();
        umMesFrente.setMonth(hoje.getMonth() + 1);

        return faker.date.between({ from: umAnoAtras, to: umMesFrente });
    }

    gerarItemPreliminar(empresaId, tipoColaborador) {
        return {
            "empresa_id": 900001,
            "v_id": 1001,
            "id": 128278555,
            "tipo_colaborador": 0,
            "classe_id": 1,
            "nome": "João da Silva",
            "nascimento_data": "1990-05-15",
            "cpf": "123.456.789-00",
            "categoria_esocial_id": 101,
        };
    }
}