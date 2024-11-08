import authReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import homeReducer from "./reducers/homeReducer";
import dashboardReducer from "./reducers/dashboardReducer";
const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    dashboard: dashboardReducer, 
}
export default rootReducer;