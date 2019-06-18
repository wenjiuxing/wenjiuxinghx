import * as React from "react";
import * as ReactDOM from "react-dom";
import 'antd/dist/antd.css'
import '../static/css/main.less';
import '../static/css/theme.less';
import '../static/css/responsive.less'
import App from './routers';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './config/configureStore';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
            <Router >
                <App />
                </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);