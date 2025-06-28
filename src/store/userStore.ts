// import { makeAutoObservable } from "mobx";

// class UserStore {
//     user = null;
//     isLoggedIn = false;

//     constructor() {
//         makeAutoObservable(this);
//     }

//     setUser(user) {
//         this.user = user;
//         this.isLoggedIn = true;
//     }

//     clearUser() {
//         this.user = null;
//         this.isLoggedIn = false;
//     }

//     getUser() {
//         return this.user;
//     }

//     checkLoginStatus() {
//         return this.isLoggedIn;
//     }
// }

// const userStore = new UserStore();
// export default userStore;