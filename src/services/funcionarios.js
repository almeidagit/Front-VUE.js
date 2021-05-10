import { http } from './config'

export default {

    salvar: (funcionario) => {
        return http.post('funcionario', funcionario);
    },

    atualizar: (funcionario) => {
        return http.put('funcionario', funcionario);
    },

    listar: () => {
        return http.get('funcionarios')
    },

    apagar: (funcionario) => {
        return http.delete('funcionario', { data: funcionario })
    }
}