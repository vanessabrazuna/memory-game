class Utilities {
  static timeout(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }
}