import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
       <Route exact path="/" component={Dashboard} />
       <Route exact path="/Page2" component={Page2} />
       <Route exact path="/Dashboard2" component={Dashboard2} />
       <Route exact path="/inputForm" component={inputForm} />
       <Route exact path="/test" component={test} />
       <Route exact path="/Page6" component={Page6} />
        <Route exact path="/Page7" component={Page7} />
         <Route exact path="/SearchLocal" component={SearchLocal} />
   </Router>
        );
    }
}
{/*
<Router>
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/addHouse" component={addHouse} />
    <Route exact path="/showHouse" component={showHouse} />
    <Route exact path="/manageHouse" component={manageHouse} />
    <Route exact path="/addcreateContract" component={addcreateContract} />
    <Route exact path="/manageContract" component={manageContract} />
</Router>
*/}

export default App;
/*
import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            console.log(web3.version)
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log(accounts)
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,


            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    runExample = async () => {
        const { accounts, contract } = this.state;

        // Stores a given value, 5 by default.
        await contract.methods.set(5).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();
        console.log(response)
        // Update state with the result.
        // this.setState({ storageValue: response });
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
                <h1>Good to Go!</h1>
                <p>Your Truffle Box is installed and ready.</p>
                <h2>Smart Contract Example</h2>
                <p>
                    If your contracts compiled and migrated successfully, below will show
                    a stored value of 5 (by default).
                </p>
                <p>
                    Try changing the value stored on <strong>line 40</strong> of App.js.
                </p>
                <div>The stored value is: {this.state.storageValue}</div>
            </div>
        );
    }
}

export default App;
*/
