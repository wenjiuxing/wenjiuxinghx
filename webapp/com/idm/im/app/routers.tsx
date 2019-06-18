import * as React from 'react';
import { Route, BrowserRouter, Switch, Redirect, NavLink } from 'react-router-dom';

import { Breadcrumb, Alert } from 'antd';

import Main from './components/main/main'
import Map from './components/map/map'
const App = () => (
   
    <Switch>
        
        <Route path="/Main" component={Main} />
        <Route path="/index" component={Map} />
        <Redirect from="/" to="/index" /> {/* 重定向 */}

    </Switch>

)
export default App