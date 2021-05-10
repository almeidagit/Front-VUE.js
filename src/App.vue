<template>
  <div id="app">
    <nav>
      <a href="#" class="brand-logo left">Adicionar Colaboradores</a>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Café da Manhã</a>
      </div>
    </nav>
  </div>
  <div class="inserir">
    <ul>
      <li v-for="(erro, index) of errors" :key="index">
        campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
      </li>
    </ul>

    <form @submit.prevent="salvar">
      <label>Nome</label>
      <input type="text" placeholder="Nome" v-model="funcionario.nome" />
      <label>CPF</label>
      <input type="text" placeholder="CPF" v-model="funcionario.cpf" />
      <label>Item do Café</label>
      <input
        type="text"
        placeholder="itemcafe"
        v-model="funcionario.itemcafe"
      />

      <button class="waves-effect waves-light btn-small">
        Salvar<i class="material-icons left">save</i>
      </button>
    </form>
  </div>
  <div class="exibir">
    <table>
      <thead>
        <tr>
          <th>NOME</th>
          <th>CPF</th>
          <th>CAFÉ DA MANHÃ</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="funcionario of funcionarios" :key="funcionario.id">
          <td>{{ funcionario.nome }}</td>
          <td>{{ funcionario.cpf }}</td>
          <td>{{ funcionario.itemcafe }}</td>
          <td>
            <button
              @click="editar(funcionario)"
              class="waves-effect btn-small blue darken-1"
            >
              <i class="material-icons">create</i>
            </button>
            <button
              @click="remover(funcionario)"
              class="waves-effect btn-small red darken-1"
            >
              <i class="material-icons">delete_sweep</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Funcionario from "./services/funcionarios";
export default {
  name: "app",
  data() {
    return {
      funcionario: {
        id: Intl,
        nome: "",
        cpf: "",
        itemcafe: "",
      },
      funcionarios: [],
      errors: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Funcionario.listar()
        .then((resposta) => {
          this.funcionarios = resposta.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    salvar() {
      if (!this.funcionario.id) {
        Funcionario.salvar(this.funcionario)
          .then(() => {
            this.funcionario = {};
            alert("Cadastrado com sucesso!");
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Funcionario.atualizar(this.funcionario)
          .then(() => {
            this.funcionario = {};
            this.errors = {};
            alert("Atualizado com sucesso!");
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editar(funcionario) {
      this.funcionario = funcionario;
    },
    remover(funcionario) {
      Funcionario.apagar(funcionario)
        .then(() => {
          this.listar();
          this.funcionario = {};
          this.errors = {};
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>

<style>
.nav-wrapper {
  margin-left: 35%;
}

.inserir {
  float: left;
  width: 25%;
  margin-left: 3%;
}

.exibir {
  margin-left: 40%;
}
</style>
