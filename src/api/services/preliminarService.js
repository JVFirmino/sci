import servicoClient from "../clients/rhNet";

export const cadastrarAdmissaoPreliminar = (admissaoData, jwtToken) => servicoClient.post("/funcionario/preliminar", admissaoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});


export const deletarAdmissaoPreliminar = (admissaoData, jwtToken) => servicoClient.delete("/funcionario/preliminar", {
    data: admissaoData,
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});