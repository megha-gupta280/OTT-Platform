import { legacy_createStore as createStore} from 'redux'
import showDetailsReducer from "./index"

const store = createStore(showDetailsReducer);

export default store;