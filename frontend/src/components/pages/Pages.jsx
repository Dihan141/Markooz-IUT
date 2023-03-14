import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import { Login } from '../auth/Login/Login'
import { Signup } from '../auth/Signup/Signup'
import "../../style/main.scss"


import { Footer } from '../common/Footer'
import { Header } from '../common/Header'
import { Details } from '../home/details/Details'
import { Home } from '../home/Home'
export const Pages = ({cartItems}) => {
    return (
        <>
           <Router>

            <Switch>
                <Route exact path='/'>
                    <Home cartItems={cartItems} />
                </Route>

                <Route exact path='/cart/:id'>
                    <Details />
                </Route>
                
                
    
            </Switch>
    
        </Router>
        </>
    )
}
