import './index.scss';
import UrlListeners from './url-listeners';
import GitRemoteAPI from './git-remote-api';

class UserRepository extends HTMLDivElement {
  constructor() {
    super();
    this.overrideTemplate = (template, data) => template.replace(/{\s*(\w+?)\s*}/g, (_, token) => data[token] || '');
  }
  // Metodo de invocacao do Custom Element
  connectedCallback() {
    this.createIndicator('C A R R E G A N D O');
    this.createProfile();
  }
  // Private getter campo username definido pelo usuario na tag
  get username() {
    return this.getAttribute('username') ? this.getAttribute('username') : 'vinigomescunha';
  }
  // Private getter indicador de status
  get indicator() {
    return this.querySelector('[indicator]') ? this.querySelector('[indicator]') : null;
  }
  // Private getter lista de repositorios carregados
  get repository() {
    return this.querySelector('#loaded-repository') ? this.querySelector('#loaded-repository') : null;
  }
  // Private setter lista de repositorios carregados
  set repository(value) {
    if (this.repository !== null) {
      this.querySelector('#loaded-repository').remove();
    }
    this.appendChild(value);
  }
  // Private getter Botao lista repositorios
  get buttonRepository() {
    return this.querySelector('[load-repository]') ? this.querySelector('[load-repository]') : null;
  }
  // Private getter Botao lista de repositorios favoritos
  get buttonFavorite() {
    return this.querySelector('[load-favorite]') ? this.querySelector('[load-favorite]') : null;
  }
  /**
   * @description Cria um indicador de status
   * @param <String> text
   * @return <Void>
   */
  createIndicator(text) {
    console.log('Creating indicator...');
    if (!this.indicator) {
      let indicator = document.createElement('div');
      indicator.setAttribute('indicator', true);
      indicator.innerText = text;
      this.appendChild(indicator);
    }
  }
  /**
   * @description Remove o indicador de status
   * @return <Void>
   */
  removeIndicator() {
    console.log('Removing indicator...');
    this.indicator.remove();
  }
  // Private
  createProfileContent(user) {
    // Ninguem merece, nao vou fazer Dom de tudo, vou usar template
    // podia ter usado mustache, handlebars, pug, etc.. mas...
    let profile = document.createElement('div');
    profile.innerHTML = this.overrideTemplate(
      document.querySelector('template[template-loaded-profile]').innerHTML, {
        avatar: user.avatar_url,
        url: user.html_url,
        repositorios: user.public_repos,
        seguidores: user.followers,
        seguindo: user.following
      }
    );
    this.appendChild(profile);
    // Event listener do botao lista de repositorios ao clicar
    if (this.buttonRepository) {
      this.buttonRepository.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.createRepository();
      });
    }
    // Event listener do botao lista de repositorios favoritos ao clicar
    if (this.buttonFavorite) {
      this.buttonFavorite.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.createFavorite();
      });
    }
    this.removeIndicator();
  }
  /**
   * @description Metodo responsavel por criar a lista de dados do usuario
   * @return <Void>
   */
  createProfile() {
    new GitRemoteAPI(this.username).getUser().then(user => this.createProfileContent(user));
  }
  // Private
  createRepoContent(name, repos) {
    let repository = document.createElement('div');
    repository.setAttribute('id', 'loaded-repository');
    repository.innerHTML = this.overrideTemplate(
      document.querySelector('[template-loaded-repository]').innerHTML, {
        name,
        loadedItems: repos.map(r => this.overrideTemplate(
          document.querySelector('[template-loaded-repository-item]').innerHTML, {
            url: r.html_url,
            name: r.name
          }
        )).join('\n')
      }
    );
    this.repository = repository;
  }
  /**
   * @description Metodo responsavel por criar a lista de repositorios
   * @return <Void>
   */
  createRepository() {
    new GitRemoteAPI(this.username).getRepos().then(repos => this.createRepoContent('LISTA DOS REPOSITÓRIOS', repos));
  }
  /**
   * @description Metodo responsavel por criar a lista de repositorios favoritos
   * @return <Void>
   */
  createFavorite() {
    new GitRemoteAPI(this.username).getFavorite().then(repos => this.createRepoContent('LISTA DOS FAVORITOS', repos));
  }
}

if (!customElements.get('user-repository')) {
  customElements.define('user-repository', UserRepository, {
    extends: "div"
  });
}

window.addEventListener('DOMContentLoaded', () => {
  UrlListeners();
});