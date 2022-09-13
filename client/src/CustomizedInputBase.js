import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Background from './bg1.png';
import Button from '@material-ui/core/Button';
var sectionStyle = {
    padding:0,
    width: "100%",
    height: "400px",
// makesure here is String确保这里是一个字符串，以下是es6写法
    backgroundImage: `url(${Background})`,
};
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
        marginTop:'320px',
        marginLeft:'300px',
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
const root2={
        padding: '2px 4px',
        marginTop:'320px',
        marginLeft:'300px',
        display: 'flex',
        width: 1000,
        height: "60px",
        position:'relative'

}
const full={
    width: "100%",
    margin: 0,
    padding: 0,
}
const iconButton={
        padding: 10,
}
const input={
    //marginLeft: 300,
    flex: 1,
}
/*const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        marginTop:'320px',
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
    full :{
        marginTop:0,
        margin: 0,
        padding: 0,
    }
}));*/
const DividerTop={
    marginTop:'30px',
}
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
    var target=document.getElementById('searchText').value
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



class CustomizedInputBase extends React.Component {
    //const classes = useStyles();
    test = (t,list) => {
        console.log(list)
        var target=document.getElementById('searchText').value
        var result=search(list,target)
        console.log(search(list,target))
        t({LocalList: search(list,target)});
    }

    render() {
        return (
            <div style={full}>
                {/*<div style={sectionStyle}>
                    <Paper component="form"  style={root2} >
                        <InputBase
                            id='searchText'
                            style={input}
                            placeholder="搜索您感兴趣的房源信息"
                            inputProps={{ 'aria-label': '查询房源' }}
                        />
                        <IconButton style={iconButton} className={useStyles.iconButton} aria-label="search" onClick={() => this.test(this.props.ts,this.props.houseInfo)}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </div>*/}
123
            </div>

        );
    }
}
export default CustomizedInputBase;