import { showDetail } from "./actionTypes";

 export const showId = (id) => {
 return {
     type: showDetail,
     payload: id
 }
}