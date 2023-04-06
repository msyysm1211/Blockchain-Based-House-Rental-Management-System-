import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Page2 from './Page2'
import Page3 from './Page3'
import Page6 from './Page6'
import Page7 from './Page7'
import Dashboard from './Dashboard'
import Dashboard2 from './Dashboard2'
import inputForm from './inputForm'
import test from './test'
import SearchLocal from './SearchLocal'

class App extends Component {

    render() {
        return (
            <Router>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/Page2" component={Page2}/>
                <Route exact path="/Dashboard2" component={Dashboard2}/>
                <Route exact path="/inputForm" component={inputForm}/>
                <Route exact path="/test" component={test}/>
                <Route exact path="/Page6" component={Page6}/>
                <Route exact path="/Page7" component={Page7}/>
                <Route exact path="/SearchLocal" component={SearchLocal}/>
            </Router>
        );
    }
}

export default App;
