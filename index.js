function onLoad() {
  const dependencies = { 
    screen: Screen,
    utilities: Utilities
  }
  const memoryGame = new MemoryGame(dependencies)
  memoryGame.initialize()
}
window.onload = onLoad
