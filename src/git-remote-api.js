/**
 * GitRemoteAPI
 * @description Classe responsavel pelas chamadas no repositorio github do usuario
 */
module.exports = class GitRemoteAPI {
  constructor(user) {
    if (!user) throw new Error('API GITHUB PRECISA DE USUARIO!');
    this.user = user;
  }
  /* Obtem a url do perfil do usuario*/
  get url() {
    return `https://api.github.com/users/${this.user}`;
  }
  /* Obtem os repositorios de forma assincrona */
  async getRepos() {
    return (await window.fetch(`${this.url}/repos`)).json();
  }
  /* Obtem os repositorios favoritos de forma assincrona */
  async getFavorite() {
    return (await window.fetch(`${this.url}/starred`)).json();
  }
  /* Obtem os dados do usuario de forma assincrona */
  async getUser() {
    return (await window.fetch(`${this.url}`)).json();
  }
}
