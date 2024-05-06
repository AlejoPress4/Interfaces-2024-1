import Slider from './slider.js'

class App {
  static main() {
    new Slider({
      container: 'body',
      gallery: './resources/data/gallery.json',
      interval: 3000,
      visibleTitle: true,
      visibleDescription: true
    })
  }
}

App.main()
