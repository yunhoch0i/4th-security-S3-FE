// import { makeAutoObservable } from "mobx";
// import { StockType } from "../features/stock/stockTypes";

// class StockStore {
//     stocks: StockType[] = [];
//     loading: boolean = false;

//     constructor() {
//         makeAutoObservable(this);
//     }

//     setStocks(stocks: StockType[]) {
//         this.stocks = stocks;
//     }

//     setLoading(loading: boolean) {
//         this.loading = loading;
//     }

//     fetchStocks() {
//         this.setLoading(true);
//         // Fetch stocks from an API or service
//         // Example: stockService.getStocks().then(this.setStocks).finally(() => this.setLoading(false));
//     }
// }

// const stockStore = new StockStore();
// export default stockStore;