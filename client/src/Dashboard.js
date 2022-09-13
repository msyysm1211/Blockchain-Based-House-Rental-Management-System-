import React, { Component } from 'react';
import Page1 from './Page1'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Dashboard2 from './Dashboard2'
import  inputForm from './inputForm'
import Page2 from'./Page2'
import Page3 from'./Page3'
import Page4 from'./Page4'
import Page5 from'./Page5'
import Page6 from'./Page6'
import Page7 from'./Page7'
import getWeb3 from "./getWeb3";
import SimpleStorageContract from "./contracts/SimpleStorage";
import LendHouseContract from "./contracts/LendHouse";
import ipfsAPI from "ipfs-api";
import CreateSmartContract from "./contracts/CreateContract";
import HouseDetail from "./contracts/ContractDetail";

const ipfs =  ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});
function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while(i < len) {
        c = array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
            default:
                break;
        }
    }

    return out;
}
function createData(houseLocal,houseSize,housePrice,leaseType,Floor,telephoneNum,housePic){
    return { houseLocal, houseSize, housePrice, leaseType, Floor,telephoneNum,housePic };
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3} style={test22} className={test22}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
const test22={
    margin:0,
        padding:0,
        width: "100%",
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    full:{
        margin:0,
        padding:0,
        width: "100%",
    }
}));

function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="查看房源" {...a11yProps(0)} />
                    <Tab label="添加房源信息" {...a11yProps(1)} />
                    <Tab label="管理房源" {...a11yProps(2)} />
                    <Tab label="新建合约" {...a11yProps(3)} />
                    <Tab label="我的合约" {...a11yProps(4)} />
          {/*          <Tab label="我的合约" {...a11yProps(5)} />
                    <Tab label="我的合约" {...a11yProps(6)} />*/}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} >
                <Page3 id='t2' className={test22} target={props.a} houseInfoList={props.c} target3={props.d} style={test22}/>
            </TabPanel>
            <TabPanel id='t1' value={value} index={1} className={classes.full} >
                <Page2 contract={props.a}  houseInfoList={props.c} accounts={props.d}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Page1 target={props.a} target2={props.b}  target3={props.d} StatusList={props.e} IndexList={props.f}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Page4 create={props.j} target2={props.b}  target3={props.d} StatusList={props.e} IndexList={props.f}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Page5 target={props.a} target2={props.b}  target3={props.d} StatusList={props.e} IndexList={props.f} ContractList={props.g} ContractInfoList={props.f} enumList={props.h}/>
            </TabPanel>
            <TabPanel value={value} index={5} className={classes.full}>
                <Page6 style={test22}/>
            </TabPanel>
            <TabPanel value={value} index={6} className={classes.full}>
                <Page7 />
            </TabPanel>
        </div>
    );
}
function hexCharCodeToStr(hexCharCodeStr) {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr =
        trimedStr.substr(0,2).toLowerCase() === "0x"
            ?
            trimedStr.substr(2)
            :
            trimedStr;
    var len = rawStr.length;
    if(len % 2 !== 0) {
        alert("Illegal Format ASCII Code!");
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for(var i = 0; i < len;i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}
class App extends Component {

    constructor(props){
        super(props);
        this.state={
            web3: null,
            accounts: null,
            contract: null ,
            createContract:null,
            InfoList:null,
            houseInfoList:null,
            StatusList:null,
            IndexList:null,
            houseDetailList:null,
            smartContractList:null,
            enumList:null
        }
    }
/*    getValue = async ()=>{
        const contract=this.state.contract
        const response =  await  contract.methods.getHashDataByRange(0,3).call()
        const ipfslist=hexCharCodeToStr(response.replace(/2000000000000000000000000000000000000000000000000000000000000000/g,''))
        var infoArr=ipfslist.split('.')
        infoArr.shift()
        console.log(infoArr)
        var houseDetailList=[];
        for(var i=0;i<infoArr.length;i++){
            const ipfsresponse= await ipfs.cat(infoArr[i])
            let houseDetail = Utf8ArrayToStr(ipfsresponse).split(',');
            console.log(infoArr[i])
            houseDetailList.push(houseDetail)
        }
        console.log(houseDetailList)
        this.setState({ houseInfoList:houseDetailList}, this.runExample);
    }*/
    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LendHouseContract.abi,
                '0x6d87370dC0b760a7803BfF2aa532BCB4768E9b25',
                {from: accounts[0],
                    gasPrice: '200000000000',
                    gas :15000000}
            );

            const CreateContractinstance = new web3.eth.Contract(
                CreateSmartContract.abi,
                '0xf4CCF029054744c7319A0D4Aa1061FCFa06d3D98',
                {from: accounts[0],
                    gasPrice: '2000000000000',
                    gas :15000000}
            );//
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            var InfoListArr=[];
            var _StatusList=[];
            var _IndexList=[]
            const arrLength =  await  instance.methods.getHouseNum().call()//房东个人拥有房屋数量
            console.log(arrLength)
            if(arrLength>0) {
                console.log(arrLength)
                for (var i = 0; i < arrLength; i++) {
                    const response = await instance.methods.getHouseInfoArrIndex(i).call()
                    const ipfsHouseInfo = await ipfs.cat(response[0])//获取信息的IPFS地址
                    let strContent = Utf8ArrayToStr(ipfsHouseInfo);
                    var infoArr = strContent.split(',');//infoArr 为查询到信息的数组
                    InfoListArr.push(createData(infoArr[0], infoArr[1], infoArr[2], infoArr[4], infoArr[5], infoArr[6]))
                    _StatusList.push(response[1])
                    _IndexList.push(response[2])
                }
                this.setState({ InfoList: InfoListArr,StatusList:_StatusList,IndexList:_IndexList}, this.runExample);
            }
            console.log(_StatusList)
            console.log(_IndexList)
            console.log(InfoListArr)
            const ShowhouseNum =  await  instance.methods.getShowStatusNum().call()//所有展示房屋数量
            console.log(ShowhouseNum)
            if(ShowhouseNum>0) {
                const response = await instance.methods.getHashDataByRange(0, ShowhouseNum).call()//所有房屋
                const ipfslist = hexCharCodeToStr(response.replace(/2000000000000000000000000000000000000000000000000000000000000000/g, ''))
                console.log(ipfslist)
                var infoArr = ipfslist.split('.')
                console.log(infoArr)
                infoArr.shift()
                var houseDetailList = [];
                for (var i = 0; i < infoArr.length; i++) {
                    const ipfsresponse = await ipfs.cat(infoArr[i])
                    let houseDetail = Utf8ArrayToStr(ipfsresponse).split(',');
                    console.log(infoArr[i])
                    houseDetailList.push(houseDetail)
                }
                console.log(houseDetailList)
                this.setState({houseInfoList:houseDetailList})
            }
            console.log(this.state.houseDetailList)
            this.setState({ web3, accounts:accounts[0], contract: instance,createContract:CreateContractinstance}, this.runExample);
            this.setState({ createContract:CreateContractinstance}, this.runExample);
            //this.setState({ InfoList:InfoListArr,houseInfoList:houseDetailList}, this.runExample);
            console.log(this.state.createContract)

            var _SmartContractDetailList=[];
            var _SmartContract=[];
            var _enumList=[];
            const SmartContractNunm= await CreateContractinstance.methods.getSmartContractNum().call();//有关自己智能合约的数量（租客和房东）
            console.log(SmartContractNunm)
          /*  const test = await CreateContractinstance.methods.ContractDetailMap(accounts[0], 0).call()
            console.log(test)*/
            for(var i=0;i<SmartContractNunm;i++) {
                const houseDetailAddress = await CreateContractinstance.methods.ContractDetailMap(accounts[0], i).call()
                console.log(houseDetailAddress)
                const houseDetailContract = new web3.eth.Contract(
               HouseDetail.abi,
                    houseDetailAddress ,
               {from: accounts[0],
                   gasPrice: '20000000000',
                   gas :15000000}
           );
                 console.log(houseDetailContract)
                const SmartContractInfo= await houseDetailContract.methods.getInfo().call();
                const EnumList= await houseDetailContract.methods.getStatusList().call();
                _SmartContractDetailList.push(SmartContractInfo)
                _SmartContract.push(houseDetailContract)
                _enumList.push(EnumList)
                console.log(EnumList)
            }
            this.setState({ create:CreateContractinstance}, this.runExample);
            console.log(_SmartContractDetailList)
            console.log(_SmartContract)
            console.log(this.state.create)
            this.setState({ houseDetailList:_SmartContractDetailList,smartContractList:_SmartContract,enumList:_enumList}, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };
    test2=()=>{
        console.log(document.getElementById('t1'));
        console.log(document.getElementsByClassName('tttp'));
        var tttp = document.getElementsByClassName('MuiBox-root MuiBox-root-238')
    }
    render() {
        return (

            <div>
                <div>{this.getValue}</div>
                <inputForm/>
               <SimpleTabs a={this.state.contract} b={this.state.InfoList} c={this.state.houseInfoList} d={this.state.accounts}
                           e={this.state.StatusList} f={this.state.IndexList} j={this.state.create}
               f={this.state.houseDetailList} g={this.state.smartContractList} h={this.state.enumList}/>
            </div>
        );
    }
   /* constructor(props){
        super(props);
        this.state={
            keyWord: ''
        }
    }
    //设置组件A input的查询参数
    setKeyWorld = (keyWord) => {
        this.setState({
            keyWord
        })
    }

    render() {
        return (
            <div>
                <SimpleTabs/>
                {/!*组件A*!/}
                <Page2 setKeyWorld={this.setKeyWorld} />
                {/!*组件B*!/}
                <Page3 keyWordValue={this.state.keyWord}/>
                <div>{this.state.keyWord}</div>
            </div>

        );
    }*/
}


export default App;





















































