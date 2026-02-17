import facialClient from "../clients/facialClient";

export const cadastrarEmpresa = (empresaData, jwtToken) => facialClient.post("/empresa", empresaData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const buscarEmpresa = (cnpj, jwtToken) => facialClient.get(`/empresa/${cnpj}`, {
    headers: {
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const atualizarEmpresa = ( cnpj, empresaData, jwtToken) => facialClient.put(`/empresa/${cnpj}`, empresaData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const deletarEmpresa = (cnpj, jwtToken) => facialClient.delete(`/empresa/${cnpj}`, {
    headers: {
        "Authorization": `Bearer ${jwtToken}`,
    }
});