import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Page1 from './Page1'
import {withRouter} from "react-router-dom";
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
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
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
                        <TableCell align="left">房屋位置</TableCell>
                        <TableCell align="left">房屋面积</TableCell>
                        <TableCell align="left">房屋租金</TableCell>
                        <TableCell align="left">租赁类型</TableCell>
                        <TableCell align="left">楼层</TableCell>
                        <TableCell align="left">联系方式</TableCell>
                        <TableCell align="left">房源状态</TableCell>
                        <TableCell align="left">操作</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.houseInfoArr.map((row,index) => (
                        <TableRow key={row.name}>
                          {/*  <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>*/}
                            <TableCell align="left">{index}</TableCell>
                            <TableCell align="left">{props.houseInfoArr[index].houseLocal}</TableCell>
                            <TableCell align="left">{props.houseInfoArr[index].houseSize}</TableCell>
                            <TableCell align="left">{props.houseInfoArr[index].housePrice}</TableCell>
                            <TableCell align="left">{props.houseInfoArr[index].leaseType}</TableCell>
                            <TableCell align="left">{props.houseInfoArr[index].Floor}</TableCell>
                            <TableCell align="left" >{props.houseInfoArr[index].telephoneNum}</TableCell>
                            <HouseStatus status={props.StatusList[index]}/>
                            <ButtonStyle index={index} status={props.StatusList[index] }contract={props.contract} accounts={props.accounts} />
                           {/* <TableCell align="left">{row[8]}</TableCell>*/}
                           {/* <Button align="left" onClick={()=>handleOpen}>显示信息</Button>*/}
                       {/*     <TableCell>
                            <ButtonStyle  index={index}  Contractstatus={props.enumList} contract={props.ContractList[index]}accounts={props.accounts} contractInfo={row}/>
                            </TableCell>*/}
                     {/*       <TableCell align="left" id={'houseState'+(index+1)}>{props.StatusList[index]}</TableCell>
                            <Button onClick={()=>cancel(index,props.contract,props.accounts)}>隐藏房源</Button>*/}
                           {/* <ButtonStyle status={props.StatusList[index]} index={index} contract={props.contract} accounts={props.accounts}/>*/}
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
                备注：{prop.contractInfo[11]}
            </Typography>
        </div>
    );
    return (
        <div>
            <Button type="button" onClick={handleOpen}>
                Open Modal
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
            <h2 id="simple-modal-title">水电费添加单</h2>
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
    const [activeStep, setActiveStep] = React.useState(props.progress);
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
function hideContract(contract,account,index) {
    console.log(contract,account,index)
    contract.methods.updateStatus(1,index).send({ from: account ,
    });
}
function showContract(contract,account,index) {
    contract.methods.updateStatus(0,index).send({ from: account ,
    });
}
function ButtonStyle(props) {
    console.log(props.status)
    if(props.status==0)
        return (

            <Button  align="left" variant="contained" onClick={()=>hideContract(props.contract,props.accounts,props.index)}>隐藏房源</Button>
        );
    if(props.status==1)
        return (
            <Button  align="left" variant="contained" onClick={()=>showContract(props.contract,props.accounts,props.index)}>显示房源</Button>
        );
}
function HouseStatus(props) {
    console.log(props.status)
    if(props.status==0)
        return (

            <TableCell align="left" >{'已显示'}</TableCell>
        );
    if(props.status==1)
        return (
            <TableCell align="left" >{'已隐藏'}</TableCell>
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

//<ButtonStyle status={props.StatusList[index]} index={index} contract={props.contract} accounts={props.accounts}/>
    test2 = async () => {
        console.log(this.props.StatusList)
        console.log(document.getElementById('t1'))
      /*  console.log(this.props.ContractInfoList)
        console.log(this.props.enumList[0][0])*/
    }
    render() {
        return (
            <div>
                <div>
                    <SimpleTable   contract={this.props.target} accounts={this.props.target3} ContractInfoList={this.props.ContractInfoList} IndexList={this.props.IndexList}
                                   StatusList={this.props.StatusList} houseInfoArr={this.props.target2}/>
                </div>
            </div>
        )
    }

}
export default App;





















































