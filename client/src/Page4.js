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
    /* struct ContractDetail{
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
   }*/
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
       /* var temp2=toUTF8Hex("哈哈")
        console.log(temp)
        console.log(temp2)
        console.log(utf8HexToStr(temp2))*/
    }
    render() {
        return (
            <div>
                <Container style={bgContain}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div style={titleconfig}>房屋租赁合约</div>
                            <Divider style={DividerTop}/>
                            <HorizontalLinearStepper  />
                            <Divider style={SubDividerTop}/>
                            <div style={SubTitleconfig}>租赁基本信息</div>
                        </Grid>
                                        <Grid item xs={4}>
                        <TextField required id="rentFee"  label="房租/月"  value={this.state.rentFee}
                                   onChange={this.handleChangeRentFee} />
                                        </Grid>
                                            <Grid item xs={4}>
                        <TextField required id="rentTime"  label="租期/月"  value={this.state.rentTime}
                                   onChange={this.handleChangeRentTime} />
                                            </Grid>
                        <Grid item xs={4}>
                        <TextField required id="PledgeFee"  label="押金/元"  value={this.state.PledgeFee}
                                   onChange={this.handleChangePledgeFee} />
                        </Grid>
                            <Grid item xs={4}>
                         {/*   <TextField required id="startTime"  label="开始时间/月"  value={this.state.startTime}
                                   onChange={this.handleChangeStartTime} />*/}
                                <DatePick SetId='starttime'clockName='开始时间'/>
                            </Grid>
                                <Grid item xs={4}>
                       {/* <TextField required id="endTime"  label="结束时间/月"  value={this.state.endTime}
                                   onChange={this.handleChangeEndTime} />*/}
                                    <DatePick SetId='endtime' clockName='结束时间'/>
                                </Grid>
                                    <Grid item xs={4}>
                        <TextField required id="TenantPublickey"  label="租客公钥"  value={this.state.TenantPublickey}
                                   onChange={this.handleChangeTenantPublickey} />
                                    </Grid>


                        <Grid item xs={12}>
                            <Divider style={DividerTop2}/>
                            <div style={SubTitleconfig}>水电费信息</div>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required id="waterFee" label="水费/吨"    value={this.state.waterFee}
                                       onChange={this.handleWaterFee} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required id="electricityFee" label="电费/度"  value={this.state.electricityFee}
                                       onChange={this.handleElectricityFee} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required id="waterMeter" label="当前水表读数"  value={this.state.waterMeter}
                                       onChange={this.handleWaterMeter} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField required id="electricityMeter" label="当前电表读数"  value={this.state.electricityMeter}
                                       onChange={this.handleChangeElectricityMeter} />
                        </Grid>



                        <Grid item xs={12}>
                            <Divider style={DividerTop2}/>
                            <div style={SubTitleconfig}>双方基本信息</div>
                        </Grid>

                        <Grid item xs={4}>
                            <TextField required id="rentFee"  label="房东姓名"
                                      />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="rentTime"  label="身份证号"
                                        />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required id="PledgeFee"  label="电话"  />

                        </Grid>
                            <Grid item xs={4}>
                                <TextField required id="PledgeFee"  label="租客姓名"
                                         />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField required id="PledgeFee"  label="身份证号"
                                          />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField required id="PledgeFee"  label="电话"
                                           />
                            </Grid>






                                        <Grid item xs={12}>
                        <TextField required id="addInfo"  label="备注"  value={this.state.addInfo} style={addInfoStyle}
                                   onChange={this.handleChangeAddInfo} />
                                            <Button variant="contained"  onClick={this.createSmartContract}>提交</Button>
                                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }

}
export default App;





















































