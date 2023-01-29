import { createSelector } from "reselect";
import state from "./index";

export const getId = createSelector(state, ({ id }) => id);