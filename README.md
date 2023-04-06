# BlockChain Rental Management System

This is a rental management system built using Truffle and React. The system uses Ethereum smart contracts to manage
rental agreements and transactions, providing a secure, transparent, and efficient rental experience between tenants and
landlords.

## Getting Started

#### Before getting started, make sure you have installed the following software:

- Node.js v12.6.1

- Truffle v5.0.22

- Ganache v2.1.2

- Web3.js v1.0.0-beta.37

- Solidity v0.5.0 (solc-js)

- IPFS 26.1.2

- React 16.3.1

#### Once installed, follow these steps:

1. In your terminal, navigate to the project directory and install the required npm packages:

```
npm install
```

2. Start Ganache and add the necessary network configurations to the truffle-config.js file:

```javascript
networks: {
    development: {
        host: "127.0.0.1",
            port
    :
        7545,
            network_id
    :
        "*"
    }
}
```

3. Compile and deploy the contracts in your terminal:

```
truffle compile
truffle migrate --reset
```

4. Start the frontend application:

```
npm start
```

5. Visit [http://localhost:3000](http://localhost:3000/) in your browser, and you should see a simple interface.

## How to Use

This rental management system provides the following features:

- Tenants can browse available properties, view property details, and apply to rent.
- Landlords can add and manage property information, accept or reject tenant rental applications, manage rental
  agreements and transactions.
- The system also provides some secure and transparent features, such as contract signing, payment verification, and
  rating and review.

## Website display

#### Available Properties

![](static/property.png)

![](static/mian.gif)

#### Property Details

![](static/detail.png)

#### Publish Properties
![](static/publishProperty.jpg)
![](static/publish.gif)

#### Sign Contract

![](static/contract.jpg)
![](static/sign.gif)

#### Operate Contract
![](static/myContract.png)
![](static/active.png)

#### MetaMask

![](static/metamask.jpg)

#### Ganache

![](static/ganache.png)

#### IPFS

![](static/IPFS.png)