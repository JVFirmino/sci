import facialClient from "../clients/facialClient.js";

export const cadastrarPessoa = (cnpj, pessoaData, jwtToken) => facialClient.post(`/pessoa/${cnpj}`, pessoaData,{
    headers: {
        "Authorization": `Bearer ${jwtToken}`
    },
});