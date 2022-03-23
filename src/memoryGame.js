class MemoryGame {
  constructor({ screen , utilities}) {
    this.screen = screen
    this.utilities = utilities

    this.heroesInitials = [
      { img: './files/cyclops.png', name: 'Cyclops'},
      { img: './files/deadpool.png', name: 'Deadpool'},
      { img: './files/hawkeye.png', name: 'Gavião'},
      { img: './files/man_antenna.png', name: 'Homem-formiga'},
      { img: './files/flash.png', name: 'Flash'},
      { img: './files/thor.png', name: 'Thor'}
    ]
    // icone padrão
    this.defaultIcon = './files/defaut.png'
    // herois escondidos
    this.hiddenH = []
    // heroisSelecionados
    this.selectedHeroes = []
  } 
  // inicializar
  initialize() {
    this.screen.updateImages(this.heroesInitials)
    this.screen.configurePlayButton(this.play.bind(this))
    this.screen.configureVerifySelectionButton(this.checkSelection.bind(this))
    this.screen.configureButtonShowAll(this.showHiddenHeroes.bind(this))
  }
  // embaralhar 
   async shuffle() {
    const copys = this.heroesInitials
    .concat(this.heroesInitials)
    .map(item => {
      return Object.assign({}, item, { id: Math.random() / 0.5})
    })
    // ordenar aleatoriamente
    .sort(() => Math.random() - 0.5)

    this.screen.updateImages(copys)
    this.screen.displayLoading()

    const idInterval = this.screen.startCounter()

    await this.utilities.timeout(3000)
    this.screen.clearCounter(idInterval)
    this.hiddenHeroes(copys)
    this.screen.displayLoading(false)
  }
  // esconder herois
  hiddenHeroes(heroes) {
    // heroisInvisiveis, ocultos
    const invisibleHeroes = heroes.map(({ name, id }) => ({
      id, 
      name,
      img: this.defaultIcon
    }))
    this.screen.updateImages(invisibleHeroes)
    this.hiddenH = invisibleHeroes
  }
  // exibirHerois
  showHeroes(nameOfHero) {
    const {img} = this.heroesInitials.find(({name}) => nameOfHero === name)
    this.screen.showHeroes(nameOfHero, img)
  }
  // verificar Selecao
  checkSelection(id, name) {
    const item = {id, name}
    const selectedHeroes = this.selectedHeroes.length
    switch(selectedHeroes) {
      case 0: 
        this.selectedHeroes.push(item)
        break;
      case 1:
        const [option1] = this.selectedHeroes  
        this.selectedHeroes = []
        if(option1.name === item.name && option1.id !== item.id) {
          this.showHeroes(item.name)
          this.screen.displayMessage()
          return;
        } 
        this.screen.displayMessage(false)
        break;
    }
  }  
  // mostrarHeroisEscondidos
  showHiddenHeroes() {
    const hiddenH = this.hiddenH
    for(const hero of hiddenH) {
      const {img} = this.heroesInitials.find(item => item.name === hero.name)
      hero.img = img
    }
    this.screen.updateImages(hiddenH)
  }
  play() {
    this.shuffle()
  }
}
