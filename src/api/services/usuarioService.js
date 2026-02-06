import facialClient from "../clients/facialClient";

export const cadastrarPessoa = (cnpj, pessoaData, jwtToken) => facialClient.post(`/pessoa/${cnpj}`, pessoaData,{
    headers: {
        Authorization: `Bearer ${jwtToken}`
    },
});
