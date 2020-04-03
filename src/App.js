import React from 'react';

import './App.css';

import {BrowserRouter, Switch, Route,} from "react-router-dom";

import Navigator from './Components/Navigator';
import Training from './Components/Training';
import Customers from './Components/Customers';
import Home from './Components/Home';
import NewCalendar from './Components/Calendarpage';




function App() {
  
  return (
    
    <div className="App">
     
      <BrowserRouter>
      <div>
      
<Navigator />

<Switch>
<Route exact path="/" component={Home}/>
<Route path="/training"component={Training}/>
<Route path="/customers"component={Customers} />
<Route path="/calendar"component={NewCalendar} />
<Route render={() => <h1>Page not found</h1>}/>
</Switch>

</div>
      </BrowserRouter>
     
      
     
    </div>
  );
}

export default App;
