import ipfsAPI from "ipfs-api"
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Background from './bg1.png';
import Map3 from './Map3'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
var sectionStyle = {
    padding:0,
    alignItems: 'center',
    margin: 'auto',
    width: "100%",
    height: "400px",
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`
};


function fuzzyQuery(list, keyWord) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].indexOf(keyWord) >= 0) {
            arr.push(list[i]);
        }
    }
    return arr;
}
function search(arr) {
    console.log(arr)
    var target=document.getElementById('searchText2' +
        '').value
    var localList=[]//存放所有名称
    for(var i=0;i<arr.length;i++){
        localList.push(arr[i][0])
    }
    var result=fuzzyQuery(localList,target)
    var targetArr=[]
    for(var j=0;j<result.length;j++)
        for(var i=0;i<arr.length;i++){
            {
                if(result[j]==arr[i][0]) {
                    targetArr.push(arr[i])
                }
            }
        }
    console.log(targetArr)
    return targetArr
}

var testarr=[];
testarr.push(['建业森林半岛','1','2'])
testarr.push(['长基','1','2'])
testarr.push(['建业天筑','1','2'])
testarr.push(['国金华府','1','2'])

function getTargetInfo(t,list) {
        console.log(list)
        var target=document.getElementById('searchText2').value
        var result=search(list,target)
        console.log(search(list,target))
       t({LocalList: search(list,target)});
}
 function CustomizedInputBase(props) {
    const classes = useStyles();
    console.log(props.houseInfo)
    return (
        <div className={classes.full2}>
            <div style={sectionStyle}>
                <Paper component="form" className={classes.root2} >
                    <InputBase
                        id='searchText2'
                        className={classes.input}
                        placeholder="搜索您感兴趣的房源信息"
                        inputProps={{ 'aria-label': '查询房源' }}
                    />
                    <IconButton  className={classes.iconButton} aria-label="search" onClick={()=>getTargetInfo(props.ts,props.houseInfo)}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </div>

        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
        border:0
    },
    media: {
        height: 170,
    },
    full :{
        width: "100%",
        margin: 0,
        padding: 0,
    },
    top:{
        marginTop:'300px',
    },
    root2: {
        padding: '2px 4px',
        marginTop:320,
        marginLeft:'300px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        width: 1000,
        height: "60px",
        position:'absolute'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    full2 :{
        marginTop:0,
        margin: 0,
        padding: 0,
    }
}));
const DividerTop={
    marginTop:'30px',
    alignItems: 'center',
    margin:50
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
function MediaCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia id='houseImage'
                    className={classes.media}
                    image={props.housePic}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" id='t1'>
                        {props.houseSize+'m²'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        {props.houseLocal+"  "+props.housePrice}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    我要租房
                </Button>
                <Link  to={{ pathname: '/Page6/', query:{houseLocal:props.houseLocal,housePrice:props.housePrice,houseSize:props.houseSize,housePic:props.housePic,
                    Floor:props.Floor,LeaseType:props.LeaseType ,phoneNum:props.phoneNum}}}>
                    <Button size="small" color="primary">
                        了解更多
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
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
 function stringToBytes ( str ) {

    var ch, st, re = [];
    for (var i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"

        do {
            st.push( ch & 0xFF );  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }

        while ( ch );
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() );
    }
    // return an array of bytes
    return re;
}
function iGetInnerText(testStr) {
    var resultStr = testStr.replace(/\ +/g, ""); //去掉空格
    resultStr = testStr.replace(/[ ]/g, "");    //去掉空格
    resultStr = testStr.replace(/[\r\n]/g, ""); //去掉回车换行
    return resultStr;
}
class Page3 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // 设置坐标点，就会在地图上显示一个 标记点
            markerPosition: { longitude: 120, latitude: 35 },
        }
        // 高德地图 Marker 实例
        this.markerInstance = undefined
        // 高德地图 Map 实例
        this.mapInstance = undefined

        this.amapEvents = {
            created: mapInstance => {
                console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log('缩放级别：', mapInstance.getZoom());
                this.mapInstance = mapInstance

                //eslint-disable-next-line
                AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.CitySearch'], () => {
                    // 实例化Autocomplete
                    const autoOptions = {
                        // city 限定城市，默认全国
                        // city: '025',
                        // input 为绑定输入提示功能的input的DOM ID
                        // input: 'searchText',
                        input: 'searchText'
                    }
                    console.log(autoOptions)
                    //eslint-disable-next-line
                    const autoComplete = new AMap.Autocomplete(autoOptions);
                    // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
                    //eslint-disable-next-line
                    const placeSearch = new AMap.PlaceSearch({
                        // city: '南京',
                        map: mapInstance,
                    })

                    // 监听下拉框选中事件
                    //eslint-disable-next-line
                    AMap.event.addListener(autoComplete, 'select', e => {
                        // TODO 针对选中的poi实现自己的功能
                        placeSearch.setCity(e.poi.adcode)
                        placeSearch.search(e.poi.name)
                        console.log(autoOptions)
                        console.log(placeSearch)
                        console.log(e)

                        console.log(e.poi.name)
                        console.log(e.poi.adcode)
                    })

                    //eslint-disable-next-line
                    const citySearch = new AMap.CitySearch()
                    citySearch.getLocalCity((status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            // 查询成功，result即为当前所在城市信息
                            console.log('当前所在城市：', result)
                            if (result && result.city && result.bounds) {
                                // 当前城市名称
                                // const cityinfo = result.city;

                                // 当前城市位置信息
                                const citybounds = result.bounds;
                                // document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
                                // 地图显示当前城市
                                mapInstance.setBounds(citybounds);
                                // 需要在设置坐标成功后，重新设置 缩放级别
                                // mapInstance.setZoom(15)
                            }
                        }
                    })
                })

                // 实例点击事件
                mapInstance.on('click', e => {
                    const lngLat = `${e.lnglat.getLat()},${e.lnglat.getLng()}`
                    console.log('坐标位置:', lngLat)
                    this.props.onChange(lngLat)
                });
            },
        };
        this.markerEvents = {
            created: markerInstance => {
                console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
                console.log(markerInstance)
                //  console.log(markerInstance.getPosition());

                this.markerInstance = markerInstance
            },
        }
        // this.markerPosition = { longitude: 120, latitude: 30 };
    }
    state = { target: 0,
        web3: null,
        accounts: null,
        contract: null ,
        houseInfo: null,
        infoArray:null,
        houseInfoList:null,
        comps : [],
        stateName:null,
        p:0
       };
    componentDidUpdate(prevProps) {
        const { value } = this.props
        if (this.props.value !== prevProps.value) {
            if (value) {
                const temp = value.split(',')

                // 重新设置地图坐标点
                this.setState({ markerPosition: { longitude: temp[1], latitude: temp[0] } }, () => {
                    // 需要在设置坐标成功后，重新设置 缩放级别
                    if (this.mapInstance) {
                        this.mapInstance.setZoom(15)
                    }

                })
            }
        }
    }
    getValue = async ()=>{
        console.log(this.props.houseInfoList)
        const contract=this.props.target
        const response =  await  contract.methods.getHashDataByRange(0,10).call()
        const ipfslist=hexCharCodeToStr(response.replace(/2000000000000000000000000000000000000000000000000000000000000000/g,''))
        var infoArr=ipfslist.split('.')
        infoArr.shift()
        var str   =   ipfslist.replace(/\s+/g,"");
        const ipfsHouseInfo = await ipfs.cat(infoArr[0])//获取信息的IPFS地址
        let strContent = Utf8ArrayToStr(ipfsHouseInfo);
        console.log(strContent)
        var houseinfoArr = strContent.split(',');
        var obj = document.getElementById('t1')
        console.log(document.getElementById('t1').textContent=houseinfoArr[1]+'m²')
        console.log(document.getElementById('houseImage'))
    }
    addComponent = () => {
        let arr = [...this.state.comps];
        arr.push(1);
        this.setState({
            comps: arr
        })
    }
    deleteComponent = () => {
        let arr = [...this.state.comps];
        arr.pop(1);
        this.setState({
            comps: arr
        })
    }
    test =(target)=>{
        console.log(target)
        if (target)
        {
            console.log(target.length)
        }
        var temp=this.props.houseInfoList
        var newArr=[]
        for(var i=0;i<target.length;i++) {
         var targetIndex=target[i]
            newArr.push(this.props.houseInfoList[targetIndex])
        }
        console.log(newArr)
        this.setState({houseInfoList:newArr,p:1})
        console.log(this.state.houseInfoList)
    }
    onChangeState=(t1)=>{
        console.log(t1)
        console.log(t1.LocalList)
        var length=this.props.houseInfoList.length
        for(var i=0;i<length;i++){
            this.props.houseInfoList.pop()
        }
        for(var i=0;i<t1.LocalList.length;i++)
        {
            this.props.houseInfoList.push(t1.LocalList[i])
        }
        this.setState({houseInfoList:t1.LocalList,p:1}
        )


  /*      console.log(t1.LocalList)
        var temp=[]
        for(var i=0;i<this.props.houseInfoList.length;i++){
            for(var j=0;j<t1.LocalList.length;j++)
            {
                if(this.props.houseInfoList[i][0]==t1.LocalList[j][0])
                {
                    temp.push(i)
                    break;
                }
            }
        }
            this.test(temp);
        console.log(temp)
*/
    }

    test2=()=>{
        console.log(this.props.houseInfoList[0][5])}

    render(){
        return(
            <div className={useStyles.full} id='t3'>
              {/*  <button >123</button>
                </Link>*/}
                <div style={{display:'none'}}>
                    <Map3/>
                </div>
                <CustomizedInputBase ts={this.onChangeState.bind(this)} className={useStyles.full} houseInfo={this.props.houseInfoList} />
                <Grid container spacing={3}style={DividerTop}>
                {  this.props.houseInfoList?
                    this.props.houseInfoList.map((i,index) => {
                        return (
                            // 对map 循环出来的每个属性插入标签元素
                            <Grid item xs={4}>
                            <MediaCard housePic={"http://localhost:8080/ipfs/"+this.props.houseInfoList[index][3]} houseSize={this.props.houseInfoList[index][1]}
                                       Floor={this.props.houseInfoList[index][5]}
                                       LeaseType={this.props.houseInfoList[index][4]}
                                       phoneNum={this.props.houseInfoList[index][6]}
                                       houseLocal={this.props.houseInfoList[index][0]} housePrice={this.props.houseInfoList[index][2]+'元/月'}/>
                            </Grid>
                        )
                    }):'等待加载'
                }
                </Grid>
            </div>
        );
    }
}
export default Page3;
