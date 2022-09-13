/*
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ipfsAPI from "ipfs-api";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Divider from '@material-ui/core/Divider';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import  DatePick from './DatePick'
import Typography from "@material-ui/core/Typography";
import Background from './house1.jpg';
const bgPic={
    //flexDirection: 'row',
    padding: 0,
    width: 1280,
    height:680,
    marginTop:20,
   marginLeft: 20
}
const full={
        marginTop:20,
        width: "100%",
        margin: 0,
        padding: 0,
}
const sect2={
    float:'right',
    width: '850px',
    padding: 0,
    height: '570px',
    borderRadius:20,
    backgroundImage: `url(${Background})`,
    backgroundSize: '850px 570px',
    /!*background-position: center center;*!/
}
const sectRight={
    float:'left',
    marginRight:0,
    width: '370',
    padding: 0,
    height: '570',
    borderRadius:20,
    backgroundImage: `url(${Background})`,
    backgroundSize: '370px 570px',
    /!*background-position: center center;*!/
}
var sectionStyle = {
    width: '100%',
    height:'100%',
    background:'fixed',
// akesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`
};
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const addInfoStyle={
    width: '100%',
    height:'100px'
}
const bgContain={
    flexDirection: 'column',
    textAlign: "center",
    float: "none",
    width:"800px",
    marginTop:'20px',
    border:'5px solid #3f51b5',
}
const DividerTop={
    marginTop: 20,
    border:'1px solid #D0D0D0'
}
const DividerTop2={
    marginTop: 40,
    border:'1px solid #D0D0D0'
}
const SubDividerTop={
    marginTop: 8,
    border:'0.5px solid #D0D0D0',
}
const titleconfig={
    marginTop: 20,
    fontSize:30,
}
const SubTitleconfig={
    marginTop: 10,
    marginRight:600,
    fontSize:15,
}

function encodeAddInfo(target) {
    //加密
    var targetHex=toUTF8Hex(target)
    var temp=strToHexCharCode(targetHex)
    console.log(temp)
    return temp
}
function decodeAddInfo(temp) {
    //解密
    var strT=hexCharCodeToStr(temp)
    console.log(strT)
    var target = utf8HexToStr(strT)
    return target
}


var writeUTF = function (str, isGetBytes) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1;
            back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2;
            back.push((192 | (31 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff)
            || (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3;
            back.push((224 | (15 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & code)))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
    }
    if (isGetBytes) {
        return back
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back);
    }
}
var readUTF = function (arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '', _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i])
        }
    }
    return UTF
}
var toUTF8Hex = function(str){
    var charBuf = writeUTF(str, true);
    var re = '';
    for(var i = 0; i < charBuf.length; i ++){
        var x = (charBuf[i] & 0xFF).toString(16);
        if(x.length === 1){
            x = '0' + x;
        }
        re += x;
    }
    return re;
}
var utf8HexToStr = function (str) {
    var buf = [];
    for(var i = 0; i < str.length; i += 2){
        buf.push(parseInt(str.substring(i, i+2), 16));
    }
    return readUTF(buf);
}

function getSteps() {
    return ['激活合约', '签署合约', '支付押金','支付租金','退还押金','完成合约'];
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
function strToHexCharCode(str) {
    if(str === "")
        return "";
    var hexCharCode = [];
    hexCharCode.push("0x");
    for(var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}
function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(3);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        // labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
}
class App extends Component {
    state = {
        target: 0,
        target2: 0,
        web3: null,
        accounts: null,
        contract: null,
        houseInfo: null,
        infoArray: null,
        IndexList:null,
        StatusList:null,
        target3:null,//执行合约账号
        create:null,

    };


    createSmartContract =   () => {
        // function createSmartContract(uint _warterFee, uint _electricityFee,uint _waterMeter,uint _electricityMeter,uint _rentFee, uint _rentTerm, uint256 _startTime, uint256 _endTime,uint _PledgeFee,address _TenantPublickey ,bytes memory _addInfo)
        var startDate=document.getElementById('starttime').value
        var endDate=document.getElementById('endtime').value
        var tempstart=RegExp("-","g")
        var houseStartTime=startDate.replace(tempstart,"")
        var houseEndTime=endDate.replace(tempstart,"")
        console.log(houseStartTime)
        console.log(houseEndTime)
        var encodeInfo=encodeAddInfo(this.state.addInfo)
        this.props.create.methods.createSmartContract(this.state.waterFee,this.state.electricityFee,this.state.waterMeter,this.state.electricityMeter,
            this.state.rentFee,this.state.rentTime,houseStartTime,houseEndTime,this.state.PledgeFee,this.state.TenantPublickey,encodeInfo)
            .send({from:this.props.target3})
    }
    /!* struct ContractDetail{
       uint waterFee;//水费
       uint electricityFee;//电费
       uint waterMeter;//水表读数
       uint electricityMeter;//电表读数
       uint rentFee; //房租费用
       uint rentTime; //租期
       uint256 startTime; //开始时间
       uint256 endTime; //结束时间
       uint PledgeFee;//押金
       address TenantPublickey;//租客公钥
       bytes addInfo;
   }*!/
    state={
        waterFee:null,
        electricityFee:null,
        waterMeter:null,
        electricityMeter:null,
        rentFee:null,
        rentTime:null,
        PledgeFee:null,
        startTime:null,
        endTime:null,
        TenantPublickey:null,
        addInfo:null

    }
    handleWaterFee = (e) => this.setState({
        waterFee: e.target.value
    })
    handleElectricityFee = (e) => this.setState({
        electricityFee: e.target.value
    })
    handleWaterMeter= (e) => this.setState({
        waterMeter: e.target.value
    })
    handleChangeElectricityMeter = (e) => this.setState({
        electricityMeter: e.target.value
    })
    handleChangeRentFee = (e) => this.setState({
        rentFee: e.target.value
    })
    handleChangeRentTime = (e) => this.setState({
        rentTime: e.target.value
    })
    handleChangePledgeFee = (e) => this.setState({
        PledgeFee: e.target.value
    })
    handleChangeStartTime = (e) => this.setState({
        startTime: e.target.value
    })
    handleChangeEndTime = (e) => this.setState({
        endTime: e.target.value
    })
    handleChangeTenantPublickey = (e) => this.setState({
        TenantPublickey: e.target.value
    })
    handleChangeAddInfo = (e) => this.setState({
        addInfo: e.target.value
    })
    test2=()=>{
        //加密
        var target='哈哈'
        var targetHex=toUTF8Hex(target)
        var temp=strToHexCharCode(targetHex)
        console.log(temp)

        //解码
        var strT=hexCharCodeToStr(temp)
        console.log(strT)
        var target = utf8HexToStr(strT)
        /!* var temp2=toUTF8Hex("哈哈")
         console.log(temp)
         console.log(temp2)
         console.log(utf8HexToStr(temp2))*!/
    }
    render() {
        return (
            <div style={full}>
                <Container style={bgPic} id='t1'>
                    <div style={sect2}></div>
                    <div style={sectRight}></div>
                </Container>
                {/!*<Container >
                <Typography gutterBottom variant="body2" component="h2" id='t1'>
                    房东公钥：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    租客公钥：
                </Typography>
                <Divider />
                <Typography gutterBottom variant="body2" component="h2" id='t1'>
                    水费：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    电费/度：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    当前电表读数
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    当前水表读数
                </Typography>
                <Divider />
                <Typography gutterBottom variant="body2" component="h2" id='t1'>
                    房租：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    租期：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    押金：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    开始时间：
                </Typography>
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    结束时间：
                </Typography>
                <Divider />
                <Typography gutterBottom variant="body2" component="h2" id='t2'>
                    备注：{prop.contractInfo[11]}（1）禁止养宠物（2）不能带陌生人进来
                </Typography>
                </Container>*!/}
            </div>
        )
    }

}
export default App;





















































*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Page1 from './Page1'
import Page7 from './Page7'
import {withRouter} from "react-router-dom";
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dashboard2 from './Dashboard2'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ipfsAPI from "ipfs-api";
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import CardContent from "@material-ui/core/CardContent";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from "@material-ui/core/TextField";
import Background from "./house1.jpg";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HouseLocal from'./CustomizedInputBase'
import Map3 from "./Map3"
import test from './DatePick'
import SearchLocal from "./SearchLocal";
import RoomIcon from "@material-ui/icons/Room";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
const background={
    //flexDirection: 'row',
    margin:'0 auto'
}
const textstyle={
    marginTop:30,
    marginLeft:20,

}
const font={
    marginTop:20,
    fontFamily:' Microsoft Yahei',
    fontWeight:'400',
    fontSize: '20px',
    overflow:'break-word',
    lineHeight:'1.125em'
}
const font2={
    marginTop:20,
    fontFamily:' Microsoft Yahei',
    fontWeight:'800',
    fontSize: '36px',
    overflow:'break-word',
    lineHeight:'1.125em'
}
const full2={
    flexDirection: 'row',
        marginTop:100,
       // margin: 0,
        padding: 0,
}
var sectionStyle3 = {
    marginTop:50,
    padding:0,
    margin: 'auto',
    marginLeft:80,
    width: "1000px",
    height: "700px",
    float: 'left',
    borderRadius:10,
};
var sectionStyle = {

    padding:0,
    margin: 'auto',
    marginLeft:100,
    width: "1000px",
    height: "700px",
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`,
    backgroundSize: '1000px 700px',
    float: 'left',
    borderRadius:10,
};
var sectionStyle2 = {
    marginTop:50,
    padding:0,
    margin: 'auto',
    width: "400px",
    height: "700px",
    marginRight:160,
// makesure here is String确保这里是一个字符串，以下是es6写法
    //backgroundImage: `url(${Background})`,
    backgroundColor:'#e9e9e9',
    backgroundSize: '400px 700px',
    float: 'right',
    borderRadius:10,
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #3f51b5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function createData(houseLocal,houseSize,housePrice,leaseType,Floor,telephoneNum,housePic){
    return { houseLocal, houseSize, housePrice, leaseType, Floor,telephoneNum,housePic };
}
const rowss = [
    createData('Frozen', 159, 6.0, 24, 4.0,1),
    createData('Ice ', 237, 9.0, 37, 4.3,1),
    createData('Eclair', 262, 16.0, 24, 6.0,1),
    createData('Cupcake', 305, 3.7, 67, 4.3,1),
    createData('Gingerbread', 356, 16.0, 49, 3.9,1),
];
function Lease(prop) {
    if(prop.Leasetype==0)
        return(
            <div  style={font}>租赁方式：合租</div>
        )
    if(prop.Leasetype==1)
        return(
            <div  style={font}>租赁方式：整租</div>
        )
}
function cancel(test) {
    console.log(test[0])
    //uint status,uint targetIndex
    /* contract.methods.updateStatus(1, index).send({ from: accounts });*/
}

function SimpleTable(props) {
    const classes = useStyles();
    console.log(props.rows)
    console.log(rowss)
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">编号</TableCell>
                        <TableCell align="left">房东公钥</TableCell>
                        <TableCell align="left">租户公钥</TableCell>
                        <TableCell align="left">房源信息</TableCell>
                        <TableCell align="left">操作</TableCell>
                        <TableCell align="left">添加账单</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.ContractInfoList.map((row,index) => (
                        <TableRow key={row.name}>
                            {/*  <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>*/}
                            <TableCell align="left">{index}</TableCell>
                            <TableCell align="left">{row[10]}</TableCell>
                            <TableCell align="left">{row[9]}</TableCell>
                            {/* <TableCell align="left">{row[8]}</TableCell>*/}
                            {/* <Button align="left" onClick={()=>handleOpen}>显示信息</Button>*/}
                            <TableCell>
                                <SimpleModal contractInfo={row} Contractstatus={props.enumList[index]} />
                            </TableCell>
                            <TableCell>
                                <ButtonStyle  index={index}  Contractstatus={props.enumList} contract={props.ContractList[index]}accounts={props.accounts} contractInfo={row}/>
                            </TableCell>
                            <TableCell>
                                <SimpleModal2 contract ={props.ContractList[index]}contractInfo={row} Contractstatus={props.enumList[index]} accounts={props.accounts} />
                            </TableCell>
                            {/*<TableCell align="left" id={'houseState'+(index+1)}>{props.StatusList[index]}</TableCell>
                            <Button onClick={()=>cancel(index,props.contract,props.accounts)}>隐藏房源</Button>
                            <ButtonStyle status={props.StatusList[index]} index={index} contract={props.contract} accounts={props.accounts}/>*/}
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function SimpleModal(prop) {
    const classes = useStyles();
    console.log(prop.Contractstatus)
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">合约详情</h2>
            <HorizontalLinearStepper progress={prop.Contractstatus[0]}/>
            <Typography gutterBottom variant="body2" component="h2" id='t1'>
                房东公钥：{prop.contractInfo[10]}
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                租客公钥：{prop.contractInfo[9]}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" component="h2" id='t1'>
                水费：{prop.contractInfo[0]}元/吨
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                电费/度：{prop.contractInfo[1]}元/度
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                当前电表读数：{prop.contractInfo[2]}度
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                当前水表读数：{prop.contractInfo[3]}吨
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" component="h2" id='t1'>
                房租：{prop.contractInfo[4]}元/月
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                租期：{prop.contractInfo[5]}月
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                押金：{prop.contractInfo[8]}元
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                开始时间：{prop.contractInfo[6]}
            </Typography>
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                结束时间：{prop.contractInfo[7]}
            </Typography>
            <Divider />
            <Typography gutterBottom variant="body2" component="h2" id='t2'>
                备注：{/*{prop.contractInfo[11]}*/}（1）禁止养宠物（2）不能带陌生人进来
            </Typography>
        </div>
    );
    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                查看合约详细信息
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
function addForm(props,account){
    var waterMeter=document.getElementById('addwaterMeter').value
    var electricityMeter=document.getElementById('addelectricityMeter').value
    console.log(props)
    console.log(account)
    const contract= props;
    contract.methods.setMeter(waterMeter,electricityMeter).send({
        from: account
    });

}
function SimpleModal2(prop) {
    const classes = useStyles();
    console.log(prop.Contractstatus)
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title" style={{marginLeft:260}}>水电费添加单</h2>
            <HorizontalLinearStepper progress={prop.Contractstatus[0]}/>
            <TextField required id="addwaterMeter" label="当前水表读数"  />
            <TextField required id="addelectricityMeter" label="当前电表读数"  />
            <Button variant="contained" onClick={()=>addForm(prop.contract,prop.accounts)} >提交</Button>
        </div>
    );
    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                账单
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
function getSteps() {
    return ['激活合约', '签署合约', '支付押金','支付租金','退还押金','完成合约'];
}
function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown step';
    }
}

function HorizontalLinearStepper(props) {
    const classes = useStyles();
    console.log(props.progress)
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        // labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
}
function DoSmartContract(contract,ContractStatus,account,pledge) {
    console.log( pledge)
    console.log(ContractStatus)
    console.log(account)
    if(ContractStatus==0)
    {
        contract.methods.activeContract().send({ from: account ,
            gasPrice: '2000000000',
            gas :15000000,
        });
    }
    if(ContractStatus==1)
    {
        contract.methods.signtureContract().send({ from: account ,
            gasPrice: '2000000000',
            gas :15000000,
        });
    }
    if(ContractStatus==2) {
        const t = contract.methods.getInfo3().call().then((response) => {
            console.log(response)
        })
        contract.methods.getStatusList().call().then((response) => {
            console.log(response)
        })
        contract.methods.payPledge().send({
            from: account,
            gasPrice: '2000000000',
            gas: 15000000,
            value: pledge
        });
    }
    if(ContractStatus==3) {
        contract.methods.payRent().send({ from: account ,
            gasPrice: '2000000000',
            gas :15000000,
        });
    }
}

function ButtonStyle(props) {
    console.log(    props.contractInfo[8])
    var contract=props.contract
    console.log(contract)
    var ContractStatus=props.Contractstatus[props.index][0]
    console.log(props.accounts)
    if(ContractStatus==0)
    /* ACTIVE_CONTRACT,
         SIGNTURE_CONTRACT,
         PLAYING_PLEDGE,
         PLAYING_RENT,
         WITHDRAW_PLEDGE,
         COMPLETED*/
        return (
            <Button  align="left"   onClick={()=>DoSmartContract(props.contract,ContractStatus,props.accounts,props.contractInfo[8])}>激活合约</Button>
        );
    if(ContractStatus==1)
        return (
            <Button  align="left"contract={props.contract}  onClick={()=>DoSmartContract(props.contract,ContractStatus,props.accounts,props.contractInfo[8])}>签署合约</Button>
        );
    if(ContractStatus==2)
        return (
            <Button  align="left"contract={props.contract}onClick={()=>DoSmartContract(props.contract,ContractStatus,props.accounts,props.contractInfo[8])}>支付押金</Button>
        );
    if(ContractStatus==3)
        return (
            <Button align="left"contract={props.contract} onClick={()=>DoSmartContract(props.contract,ContractStatus,props.accounts,props.contractInfo[8])} >支付租金</Button>
        );
    if(ContractStatus==4)
        return (
            <Button align="left" contract={props.contract}onClick={()=>DoSmartContract(props.contract,ContractStatus,props.accounts,props.contractInfo[8])}>退还押金</Button>
        );
    if(ContractStatus==5)
        return (
            <Button  align="left"contract={props.contract}onClick={()=>DoSmartContract(props.contract,ContractStatus,props.accounts,props.contractInfo[8])}>完成合约</Button>
        );
}
class App extends Component {
    state = {
        target: 0,
        target2: 0,
        web3: null,
        accounts: null,
        contract: null,
        houseInfo: null,
        infoArray: null,
        IndexList:null,
        StatusList:null,
        ContractInfoList:null,
        ContractList:null,
        enumList:null,
    };

    returnMain=()=>{
        window.location.reload()
    }
    test2 = async () => {
        console.log(this.props.location.query)
    }
    render() {
        return (
            <div>

                <div style={full2} >
                    <div style={sectionStyle3}>
                        <img alt="区块链部落" src={this.props.location.query.housePic} style={sectionStyle3}/>
                    </div>
                  {/*  <div style={{ padding:0,
                        margin: 'auto',
                        marginLeft:100,
                        width: "1000px",
                        height: "700px",
// makesure here is String确保这里是一个字符串，以下是es6写法
                        backgroundImage: `url(${Background})`,
                        backgroundSize: '1000px 700px',
                        float: 'left',
                        borderRadius:10,}}>
                    </div>*/}
                    <div style={sectionStyle2}>
                        <div style={textstyle}>
                            <div  style={font2}>{this.props.location.query.houseLocal}
                                <Link  to={{ pathname: '/', }}>
                                    <IconButton   aria-label="search" style={{marginLeft:100,}} onClick={() => this.returnMain}>
                                        <KeyboardReturnIcon />
                                    </IconButton>
                            </Link>
                            </div>
                            <div  style={font}>租金：{this.props.location.query.housePrice}</div>
                            <div  style={font}>租赁方式：{this.props.location.query.LeaseType}</div>

                            <Lease Leasetype={this.props.location.query.LeaseType}></Lease>
                            <div  style={font}>楼层：{this.props.location.query.Floor}</div>
                            <div  style={font}>联系方式：{this.props.location.query.phoneNum}</div>
                            <div  style={font}>房源面积：{this.props.location.query.houseSize}m²</div>
                            <div  style={font}>房源朝向：南</div>
                        </div>
                        <div style={{display:'none'}}>
                            <Map3/>
                        </div>
                        <div style={{marginLeft:10,marginRight:10,marginTop:20, borderRadius:10,}}>
                        {/*<Map />*/}
                        <Page7 houseLocal={this.props.location.query.houseLocal}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default App;





















































