import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import App from './App'
import Landing from './Landing'
import NotFound from './NotFound'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
          <Route exact path='/' component ={Landing}></Route>
          <Route exact path='/restaurant/:restaurantId'  component ={App}></Route>
          <Route component ={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  )
}


export default Router