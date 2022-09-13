import React,{Component} from 'react';
//项目目录执行
//npm isntall axios --save
//npm i -S axios

export default class Label extends Component{
    constructor(props){
        super(props);
        this.state={
            key: '',
            UserList: []
        }
    }


    //props将要被改变前执行
    componentWillReceiveProps(props){

        const key=props.keyWordValue;
        console.log('key',key)
        this.setState({key});
        //ajax请求接口
       /* axios.get('https://api.github.com/search/users?q='+key)
            .then(response=>{
                const {items} =  response.data;
                console.log(items)
                this.setState({UserList: items})

            })
            .catch( error=> {
                console.log(error);
            })*/
    }

    render() {
        const UserList=this.state.UserList;
        // 遍历列表数据
        return UserList.map((value,index)=> (
            <div style={{width: 110, height:160,float:'left'}}>
                <img style={{width: 100, height:100}} src={value.avatar_url} alt=""/>
                <p>用户Id：{value.login}</p>
            </div>
        ));
    }

}