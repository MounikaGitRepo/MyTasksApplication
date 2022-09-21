import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import MyTasks from './components/MyTasks'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/mytasks" component={MyTasks} />
    </Switch>
  </BrowserRouter>
)

export default App
