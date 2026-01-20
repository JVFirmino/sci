export const MENSAGENS = {
    loginUi: {
        erroCredenciaisInvalidas: "Usuário e/ou senha incorretos.",
        erroCamposVazios: "Usuário e/ou senha não preenchidos.",
    },
    loginApi: {
        sucessoLogin: "Token gerado com sucesso.",
        expiradoTokenLogin: "Token de cliente expirado.",
        invalidoTokenLogin: "Token de terceiro e/ou cliente inválidos.",
    },
    refreshApi: {
        sucessoRefresh: "Token refresh feito com sucesso.",
        falhouTokenRefresh: "Token refresh falhou.",
        blacklistedTokenRefresh: "The token has been blacklisted",
        naoInformadoTokenRefresh: "Token não informado.",
        expiradoTokenRefresh: "Token expirado"
    },
    servicoApi: {
        sucessoCadastroServico: "Operação realizada com sucesso",
        expiradoToken: "Token has expired",
        utilizadoCodigoCbo: "O campo 'Código do CBO' contém um valor único já usado em outro registro.",
        deletarServico: "Registro excluído com sucesso",
        servicoNaoEncontrado: "Registro não encontrado ou já removido anteriormente",
        semPermissao: "Você não tem permissão para realizar esta ação.",
        duplicadoServico: "Duplicata encontrada no array para os campos: clienteId, empresa_id, cbo, categoria_esocial",
        duplicadoServico2: "Duplicata encontrada no array para os campos: cliente_id, empresa_id, cbo, categoria_esocial",
        servicoIdNaoEncontrado: "O valor informado no campo ID do tipo de serviço não foi encontrado"
    },
    feriadoApi:{
        sucessoCadastroFeriado: "Operação realizada com sucesso",
        feriadoUtilizado: "O campo 'dados.0.data' contém um valor único já usado em outro registro.",
        semPermissao: "Você não tem permissão para realizar esta ação.",
        expiradoToken: "Token has expired",
        deletarFeriado: "Registro excluído com sucesso",
        feriadoNaoEncontrado: "Registro não encontrado ou já removido anteriormente",
        semPermissao: "Você não tem permissão para realizar esta ação.",
    },
    preliminar:{
        sucessoCadastroPreliminar: "Operação realizada com sucesso",
        admissaoExistente: "Registro já existe!",
        semPermissao: "Você não tem permissão para realizar esta ação.",
        expiradoToken: "Token has expired",
        classeIdInexistente: "O campo 'classe id' contém um valor inexistente para o cliente.",
        categoriaEsocialInexistente: "O campo 'categoria esocial id' contém um valor inexistente para o cliente.",
        deletarPreliminar: "Registro excluído com sucesso",
        preliminarNaoEncontrado: "Registro não encontrado ou já removido anteriormente",
        idPreliminarNaoEncontrado: "O valor informado no campo id não foi encontrado"
    },
    liberarAdmissaoPreliminar:{
        sucessoLiberacao: "Operação realizada com sucesso",
        atualizadoSucesso: "Registro atualizado com sucesso para admissão preliminar.",
        admissaoIdInexistente: "O campo 'id' contém um valor inexistente para o cliente.",
        observacaoLimiteAtingido: "O campo 'observacao liberacao' não pode ter mais que 200 caracteres.",
        semPermissao: "Você não tem permissão para realizar esta ação.",
        expiradoToken: "Token has expired"
    },
    autonomo:{
        sucessoCadastroAutonomo: "Operação realizada com sucesso",
        autonomoCadastrado: "Autonomo já cadastrado!",
        cpfJaUsado: "O campo 'dados.0.cpf' contém um valor único já usado em outro registro.",
        semPermissao: "Você não tem permissão para realizar esta ação.",
        expiradoToken: "Token has expired",
        deletarAutonomo: "Registro excluído com sucesso",
        autonomoNaoEncontrado: "Registro não encontrado ou já removido anteriormente",
        autonomoNaoEncontrado: "Registro não encontrado ou já removido anteriormente"
    }
};
