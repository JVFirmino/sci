import servicoClient from "../clients/rhNetClient.js";

export const liberarPreliminar = (liberarData, jwtToken) => servicoClient.post("/liberacao/preliminar", liberarData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});