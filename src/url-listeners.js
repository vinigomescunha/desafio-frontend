module.exports = () => {
  /**
   * @description Listener evento quando clica nos botoes de navegacao com ancoras remotas
   * caso tenha o atributo load-link verifica se e o mesmo hash da url para corrigir reload 
   */
  window.addEventListener('click', (ev) => {
    // so trato os elementos com load-link
    if (ev.target.getAttribute('load-link') === null) return;
    const hash = ev.target.getAttribute('href').split('#');
    // so trato os elementos com hash
    if (!hash || hash.length < 2) return;
    // se for o mesmo hash eu limpo para dar reload
    if (hash[1] === window.location.hash.replace('#', '')) {
      window.location.hash = '';
    }
    setTimeout(() => {
      window.location.hash = hash[1];
    }, 500);
  });
  /**
   * @description Listener evento quando muda a hash, 
   * caso exista um elemento com o nome da hash o mesmo ganha foco
   */
  window.addEventListener("hashchange", (ev) => {
    if (window.location.hash) {
      ev.preventDefault();
      try {
        const elementName = window.location.hash.replace('#', '');
        const element = document.querySelector(`[name=${elementName}]`);
        window.scrollTo({
          top: element.offsetTop,
          left: element.offsetLeft,
          behavior: 'smooth'
        });
      } catch (e) {
        // Tratar erro em logs de warning...
      }
    }
  });
  /**
   * @description Listener evento quando clica nos botoes de navegacao com ancoras remotas
   * caso tenha o atributo load-link verifica se e o mesmo hash da url para corrigir reload 
   * ancora remota nao funciona se for clicada apos reload da pagina
   */
  window.addEventListener('click', (ev) => {
    // so trato os elementos com load-link
    if (ev.target.getAttribute('load-link') === null) return;
    const hash = ev.target.getAttribute('href').split('#');
    // so trato os elementos com hash
    if (!hash || hash.length < 2) return;
    // se for o mesmo hash eu limpo para dar reload
    if (hash[1] === window.location.hash.replace('#', '')) {
      window.location.hash = '';
    }
    setTimeout(() => {
      window.location.hash = hash[1];
    }, 500);
  });
  /**
   * @description Listener evento quando muda a hash, 
   * caso exista um elemento com o nome da hash o mesmo ganha foco
   */
  window.addEventListener("hashchange", (ev) => {
    if (window.location.hash) {
      ev.preventDefault();
      try {
        const elementName = window.location.hash.replace('#', '');
        const element = document.querySelector(`[name=${elementName}]`);
        window.scrollTo({
          top: element.offsetTop,
          left: element.offsetLeft,
          behavior: 'smooth'
        });
      } catch (e) {
        // Tratar erro em logs de warning...
      }
    }
  });
};