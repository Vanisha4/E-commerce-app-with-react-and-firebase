import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './Component/Home';
import { Signup } from './Component/Signup';
import { Login } from './Component/Login';
import { Notfound } from './Component/Notfound';
import {AddProducts} from '/Component/AddProducts';
import { Cart } from '/Component/Cart';

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route path='/add-products' component={AddProducts}/>
                <Route path='/cart' component = {Cart}/>
                <Route component = {Notfound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
