// import { makeAutoObservable } from "mobx";
// import { ContestType } from "../features/contest/contestTypes";
// import { contestService } from "../features/contest/contestService";

// class ContestStore {
//     contests: ContestType[] = [];
//     loading: boolean = false;
//     error: string | null = null;

//     constructor() {
//         makeAutoObservable(this);
//     }

//     async fetchContests() {
//         this.loading = true;
//         this.error = null;
//         try {
//             this.contests = await contestService.getContests();
//         } catch (error) {
//             this.error = "Failed to fetch contests.";
//         } finally {
//             this.loading = false;
//         }
//     }

//     async createContest(contestData: ContestType) {
//         this.loading = true;
//         this.error = null;
//         try {
//             const newContest = await contestService.createContest(contestData);
//             this.contests.push(newContest);
//         } catch (error) {
//             this.error = "Failed to create contest.";
//         } finally {
//             this.loading = false;
//         }
//     }

//     async deleteContest(contestId: string) {
//         this.loading = true;
//         this.error = null;
//         try {
//             await contestService.deleteContest(contestId);
//             this.contests = this.contests.filter(contest => contest.id !== contestId);
//         } catch (error) {
//             this.error = "Failed to delete contest.";
//         } finally {
//             this.loading = false;
//         }
//     }
// }

// export const contestStore = new ContestStore();