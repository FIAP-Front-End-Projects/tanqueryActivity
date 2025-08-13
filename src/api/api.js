import axios from "axios";

//Função para receber os dados (usuários)
export const fetchUsers = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data || []; // sempre retorna array
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return []; // garante que nunca será undefined
  }
};
