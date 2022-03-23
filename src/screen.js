const utilities = Utilities

const ID_CONTENT = 'content'
const ID_BTN_PLAY = 'play'
const ID_MESSAGE = 'message'
const CLASS_INVISIBLE = 'invisible'
const ID_LOADING = 'loading'
const ID_COUNTER = 'counter'
const ID_BTN_SHOW_ALL = 'showAll'

const POSTS = {
  success: {
    text: 'Combinação correta!',
    class: 'alert-success'
  },
  error: {
    text: 'Combinação incorreta!',
    class: 'alert-danger'
  }
}

class Screen {
  // obterCodigoHtml
  static getCodeHtml(item) {
    return `
    <div class="col-md-3">
      <div class="card" style="width: 50%;" onclick="window.checkSelection('${item.id}','${item.name}')">
        <img src="${item.img}" name="${item.name}" class="card-img-top" alt="ghost">  
      </div>
      </br>
    </div>    
    `
  }
  // configurarBotaoVerificarSelecao
  static configureVerifySelectionButton(functionOnclick) {
    window.checkSelection = functionOnclick
  }
  // alterarlConteudoHtml
  static changelContentHtml(HtmlCode) {
    const content = document.getElementById(ID_CONTENT)
    content.innerHTML = HtmlCode
  }
  // gerarStringHtmlPelaImagem
  static generateStringHtmlByImage(items) {
    return items.map(Screen.getCodeHtml).join('')
  }
  // atualizarImagens
  static updateImages(items) {
    const HtmlCode = Screen.generateStringHtmlByImage(items)
    Screen.changelContentHtml(HtmlCode)
  }
  // configurarBotaoJogar
  static configurePlayButton(functionOnclick) {
    const btnPlay = document.getElementById(ID_BTN_PLAY)
    btnPlay.onclick = functionOnclick
  }
  static showHeroes(nameOfHero, img) {
    const htmlElements = document.getElementsByName(nameOfHero)
    htmlElements.forEach(item => (item.src = img))
  }
  // exibirMensagem
  static async displayMessage(success = true) {
    const element = document.getElementById(ID_MESSAGE)
    if(success) {
      element.classList.remove(POSTS.error.class)
      element.classList.add(POSTS.success.class)
      element.innerText = POSTS.success.text
    } else {
      element.classList.remove(POSTS.success.class)
      element.classList.add(POSTS.error.class)
      element.innerText = POSTS.error.text
    }
    element.classList.remove(CLASS_INVISIBLE)
    await utilities.timeout(1000)
    element.classList.add(CLASS_INVISIBLE)
  }
  // exibirCarregando
  static displayLoading(show = true) {
    const loading = document.getElementById(ID_LOADING)
    if(show) {
      loading.classList.remove(CLASS_INVISIBLE)
      return
    }
    loading.classList.add(CLASS_INVISIBLE)
  }
  // iniciarContador
  static startCounter() {
    // contarAte
    let countUntil = 3
    // elementoContador
    const counterElement = document.getElementById(ID_COUNTER)
    // indentificadorTexto
    const textIdentifier = '$$counter'
    // textoPadrao
    const standardText = `Começando em ${textIdentifier} segundos...`
    // atualizarTexto
    const updateText = () => 
    (counterElement.innerHTML = standardText.replace(textIdentifier, countUntil--))

    updateText()
    const idInterval = setInterval(updateText, 1000)
    return idInterval
  }
  // limparContador
  static clearCounter(idInterval) {
    clearInterval(idInterval)
    const counterElement = document.getElementById(ID_COUNTER).innerHTML = ''
  }
  // configurarBotaoMostrarTudo
  static configureButtonShowAll(functionOnclick) {
    // btnMostrarTudo
    const btnShowAll = document.getElementById(ID_BTN_SHOW_ALL)
    btnShowAll.onclick = functionOnclick
  }
}
