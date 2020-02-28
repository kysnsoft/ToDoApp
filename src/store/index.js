import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['searchReducer','todos'],

};


const middleware = []
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    undefined,
    compose(
        applyMiddleware(
            ...middleware
            // createLogger() <--- to print log
        )
    )
)
console.log(store)
const persistor = persistStore(store);
export { persistor, store };