export class Currencies {
  gbpID = 143;
  usdID = 145;
  eurID = 292;
  uanID = 290;
  rubID = 298;

  getCurrencyRate(id: number) {
    const url = `https://www.nbrb.by/api/exrates/rates/${id}`;
    const res = fetch(url);
    return res;
  }
}
