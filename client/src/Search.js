import React,{Component} from 'react';

export default class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            currentKeyValue: ''
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
        this.props.KeyWorld(this.state.currentKeyValue);
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.currentKeyValue} onChange={this.setCurrentKeyValue}/>
                <button onClick={this.search}>查询</button>
            </div>
        );
    }

}