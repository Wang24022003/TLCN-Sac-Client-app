import authReducer from "./reducers/authReducer";
import cardReducer from "./reducers/cardReducer";
import homeReducer from "./reducers/homeReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import addressReducer from "./reducers/addressReducer";
import  notificationReducer  from "./reducers/notificationReducer";
const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    dashboard: dashboardReducer, 
    address: addressReducer,
    notification: notificationReducer,
}
export default rootReducer;