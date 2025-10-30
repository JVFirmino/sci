// Centralização de mensagens esperadas para validação nos testes.
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
        utilizadoCodigoCbo: "O campo 'Código do CBO' contém um valor único já usado em outro registro."
    }
};
