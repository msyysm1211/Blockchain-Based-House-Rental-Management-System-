import React from 'react';
import TextField from '@material-ui/core/TextField';
import LendHouseContract from "./contracts/LendHouse.json"
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import getWeb3 from "./getWeb3";
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import {makeStyles} from "@material-ui/core/styles";
import RoomIcon from '@material-ui/icons/Room';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Map from "./Map3"
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import SearchLocal from "./SearchLocal"
const ipfsAPI = require('ipfs-api')
const ipfs =  ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});
const div1 = {
    float:'right'
};
const addInfoStyle={
    width: '100%',
    height:'100px'
}
const addPic={
    width: 270,
    height:180
}
const bgContain={
    flexDirection: 'column',
    textAlign: "center",
    float: "none",
    width:"800px",
    marginTop:'20px',
    border:'5px solid #3f51b5',
}
const DividerTop3={
    marginTop: 20,
    border:'1px solid #D0D0D0'
}
const DividerTop4={
    marginTop: 40,
    border:'1px solid #D0D0D0'
}
const SubDividerTop={
    marginTop: 8,
    border:'0.5px solid #D0D0D0',
}
const SubDividerTop2={
    marginTop: 15,
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
const emails = ['username@gmail.com', 'user02@gmail.com'];
function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Map/>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};
function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
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
            <Map/>
        </div>
    );
    return (
        <div>
            <InputAdornment position="end">
                <RoomIcon
                    aria-label="toggle password visibility"
                    onClick={handleOpen}
                    onMouseDown={test}
                >
                </RoomIcon>
            </InputAdornment>
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
function InputAdornments() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
}
const div2 = {
    width: "300px",
    margin: "30px auto",
    backgroundColor: "#44014C",  //驼峰法
    minHeight: "200px",
    boxSizing: "border-box",
};
const div3 = {
    marginLeft:"100px"
};
const selectwidth={
    width:'200px',
    marginLeft:"100px"

}
const ipfsButton={
    marginBottom: '25px',
    marginLeft: '100px',
    backgroundColor: "#AADFFD",
    color:'#1E88C7'
}
const DividerTop={
    marginTop:'30px',
    color:'#1E88C7',
    borderB:'5px'
}
const DividerTop2={
    marginTop:'50px',
    color:'#1E88C7',
    borderB:'5px'
}
const container= {
    flexDirection: 'column',
    textAlign: "center",
    float: "none"
}
const container2= {
    flexDirection: 'column',
    textAlign: "center",
    float: "none",
    width:"800px",
    marginTop:'20px',
    border:'5px solid #3f51b5',
}
    const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
    container: {
        flexDirection: 'column',
        marginTop:30
    },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    image: {
        width: 40,
        height: 40,
        padding: 20,
    },
    input:{
        marginLeft:"100px",
    },
        paper: {
            position: 'absolute',
            width: 1000,
            height:1000,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },

}));

function houseInfo(houseLocal,houseSize,housePrice,leaseType,Floor,telephoneNum,housePic){
    this.houseLocal=houseLocal;
    this.houseSize=houseSize;
    this.housePrice=housePrice;
    this.housePic=housePic;
    this.leaseType=leaseType;
    this.Floor=Floor;
    this.telephoneNum=telephoneNum;
}
var instance;
class Page2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            storageValue: 12,
            web3: null,
            accounts: null,
            contract: null ,
            currentKeyValue:null
        }
    }
    setCurrentKeyValue= (e) => {
        const currentKeyValue = e.target.value
        this.setState({
            currentKeyValue
        })

    }
    //点击查询按钮，将值传给父组件
    search = () =>{
        this.props.setKeyWorld(this.state.currentKeyValue);
    }
    setKeyWorld = (keyWord) => {
        this.setState({
            keyWord
        })
    }

   /* componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            //console.log(web3.version)
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
           // console.log(accounts)
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LendHouseContract.abi,
                '0xc9d00Faa30d9E0aeE2befA07a0ca157B388Dc1Bf',
                {from: accounts[0],
                    gasPrice: '2000000000',
                    gas :1500000}
            );
        console.log(instance)
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance,key:instance}, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };*/
    getValue = async () => {
        const { accounts, contract } = this.state;
        console.log(contract)
        //let res2 = await contract.methods.addHash("0x7dF1fD774211Bc6CBA38b4f9ac16d3592d6258e0",1).send({ from: accounts[0] });
        const response =  await contract.methods.getHouseInfoArrIndex(0).call()
        console.log(response)
        const response2 =  await contract.methods.houseNum().call()
        console.log(response2)
    }
    addHash =  (a,b) => {//添加IPFS上传后的Hash
        const { accounts, contract } = this.props;
        console.log(this.props)
        contract.methods.addHash(a,b).send({ from: accounts });
    };
    saveTextBlobOnIpfs = (blob) => {
        return new Promise(function(resolve, reject) {
            const descBuffer = Buffer.from(blob, 'utf-8');
            ipfs.add(descBuffer).then((response) => {
                console.log(response)
                resolve(response[0].hash);
            }).catch((err) => {
                console.error(err)
                reject(err);
            })
        })
    }
    saveImageOnIpfs = (reader) => { //保存图片到IPFS
        return new Promise(function(resolve, reject) {
            const buffer = Buffer.from(reader.result);
            ipfs.add(buffer).then((response) => {
                console.log(response)
                resolve(response[0].hash);
            }).catch((err) => {
                console.error(err)
                reject(err);
            })
        })
    }
    handleSubmit = async () => {
        var houseLocal=document.getElementById('searchText').value
        var house=new houseInfo(houseLocal,this.state.houseSize,this.state.housePrice,this.state.leaseType,this.state.Floor,this.state.telephoneNum,this.state.imgSrc)
        let arr = Object.values(house)
        console.log(arr)
        var infolist=arr.toString()
        console.log(infolist)
        this.saveTextBlobOnIpfs(infolist).then((hash) => {
            console.log(hash);
            this.setState({strHash: hash});
           this.addHash(hash,0)//将所有房间信息上传到HouseInfoMap中
        });
        window.location.reload()
       // await this.addHash(this.state.hash)//将所有房间信息上传到HouseInfoMap中
    }//提交房屋信息数据到IPFS
    state = {
        houseLocal: '',
        houseSize: '',
        housePrice: '',
        leaseType: '',
        Floor: '',
        telephoneNum: '',
        housepic: ''
    }
    handleChange = (e) => this.setState({
        leaseType: e.target.value
    })
    handleChangeHouseLocal = (e) => this.setState({
        houseLocal: e.target.value
    })
    handleChangeHouseSize= (e) => this.setState({
        houseSize: e.target.value
    })
    handleChangeHousePrice = (e) => this.setState({
        housePrice: e.target.value
    })
    handleChangeLeaseType = (e) => this.setState({
        leaseType: e.target.value
    })
    handleChangeFloor = (e) => this.setState({
        Floor: e.target.value
    })
    handleChangeTelephoneNum = (e) => this.setState({
        telephoneNum: e.target.value
    })
     test=()=> {
         this.props.history.push('/Page3')
    }
    render(){
        return(
            <div>
                   <Container className={"fileupdate"}style={container2}>
              {/*          <button onClick={this.getValue}></button>*/}
                       <Grid item xs={12}>
                           <div style={titleconfig}>房源信息发布</div>
                           <Divider style={SubDividerTop}/>
                           <div style={SubTitleconfig}>房源基本信息</div>
                       </Grid>
                       <Container style={ container}>

                           <TextField
                               label="房屋朝向"
                               id="houseOrientation"
                               value={this.state.houseLocal}
                               onChange={this.handleChangeHouseLocal}
                           />


                    <TextField required id="houseSize" label="房屋面积"  value={this.state.houseSize}
                               onChange={this.handleChangeHouseSize} style={div3}/>
                       </Container>
                       <Container style={ container}>
                    <TextField required id="housePrice" label="房屋租金"  value={this.state.housePrice}
                               onChange={this.handleChangeHousePrice} />
                 {/*   <TextField required id="leaseType" label="租赁类型"  value={this.state.leaseType}
                               onChange={this.handleChangeLeaseType} style={div3}/>*/}
                           <FormControl className={useStyles.formControl}  style={selectwidth}>
                           <InputLabel id="demo-simple-select-label">租赁类型</InputLabel>
                           <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={this.state.handleChangeLeaseType}
                               onChange={this.handleChange}
                           >
                               <MenuItem value={0}>合租</MenuItem>
                               <MenuItem value={1}>整租</MenuItem>
                           </Select>
                           </FormControl>
                       </Container>
                       <Container style={ container}>
                    <TextField required id="Floor"  value={this.state.Floor}
                               onChange={this.handleChangeFloor}label="楼层" />
                    <TextField required id="telephoneNum"  label="联系方式"  value={this.state.telephoneNum}
                               onChange={this.handleChangeTelephoneNum} style={div3}/>
                       </Container>
                       <Container>
                           <Divider style={SubDividerTop2} />
                           <div style={SubTitleconfig}>房源位置</div>
         {/*                  <SearchLocal/>*/}
                           <Map/>
                       </Container>
                       <Divider style={SubDividerTop} />
                       <div style={ {marginTop:50}}>

                            <a href="javascript:;" className="file">选择房屋照片
                                <input type="file" ref="file" id="file" name="file" multiple="multiple"  />
                            </a>
                            <Button variant="contained" style={ipfsButton} onClick={ () => {
                                var file = this.refs.file.files[0];
                                var reader = new FileReader();
                                // reader.readAsDataURL(file);
                                reader.readAsArrayBuffer(file)
                                reader.onloadend = (e) => {
                                    console.log(reader);
                                    // 上传数据到IPFS
                                    this.saveImageOnIpfs(reader).then((hash) => {
                                        console.log(hash);
                                        this.setState({imgSrc: hash})
                                    });
                                }
                            }}>上传图片</Button>
                       </div>
                       <div>
                            {
                                this.state.imgSrc
                                    ?<div >
                                        <img alt="区块链部落" src={"http://localhost:8080/ipfs/" + this.state.imgSrc} style={addPic}/>
                                    </div>
                                    :<img alt=""/>
                            }
                            <Button variant="contained"  onClick={this.handleSubmit}>提交</Button>
                        </div>
                </Container>
            </div>
        );
    }
}
export default Page2;
