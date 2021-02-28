export default class CryptoApi {
  _apiBase: string = "https://api.nomics.com/v1/currencies/ticker?key";
  _apiKey: string = "2d6d49e49b522653cc80ad303606f9c2";

  async getData(value: string) {
    const res = await fetch(
      `${this._apiBase}=${this._apiKey}&ids=BTC,ETH,XRP,DOT,LTC,TRX,XLM,XMR&interval=1d,30d&convert=${value}&per-page=100&page=1`
    );

    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this._apiBase}, received ${res.status}`
      );
    }
    return res;
  }
}
