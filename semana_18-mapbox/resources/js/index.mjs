import Helpers from "./helpers.js";
import Geo from "./geolocation.js";

class App {
  static async init() {
    window.Helpers = Helpers;
    let geo = new Geo({
      apiKey:
        "pk.eyJ1IjoiZGFuZGVubmV5IiwiYSI6Indwc05iZW8ifQ.X8KMtaHslofn7K0TY8A8Ug",
      longitude: -74.73686073352914,
      latitude: 5.208035947502682,
      container: "map",
      dataPoints: "../resources/assets/data-points.geojson",
      zoom: 12.5,
    });
  }
}
export default (async () => App.init())();
