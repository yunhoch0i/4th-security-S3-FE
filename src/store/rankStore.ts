// import { makeAutoObservable } from "mobx";

// class RankStore {
//     ranks = [];
//     loading = false;

//     constructor() {
//         makeAutoObservable(this);
//     }

//     setRanks(ranks) {
//         this.ranks = ranks;
//     }

//     setLoading(loading) {
//         this.loading = loading;
//     }

//     async fetchRanks() {
//         this.setLoading(true);
//         try {
//             const response = await fetch('/api/ranks');
//             const data = await response.json();
//             this.setRanks(data);
//         } catch (error) {
//             console.error("Failed to fetch ranks", error);
//         } finally {
//             this.setLoading(false);
//         }
//     }
// }

// const rankStore = new RankStore();
// export default rankStore;