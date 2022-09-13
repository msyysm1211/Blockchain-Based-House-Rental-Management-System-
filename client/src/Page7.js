import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker } from 'react-amap';
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import SearchLocal from'./SearchLocal'
import Map3 from './Map3'

function Mapcf(prop){
   // var a=this
    console.log(prop)
    var c=10
    //eslint-disable-next-line
    AMap.plugin('AMap.Geocoder', function() {
        //eslint-disable-next-line
        var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '全国'
        })
        geocoder.getLocation(prop.houseLocal, (point,result) => {
            if (point) {
                c=20
                console.log(prop.a.state)

                //这个point就是解析地址获得的百度地图坐标系
                console.log(result)
                console.log(point); //{lat: 40.057339, lng: 116.306941}
                console.log(result.geocodes[0].location)
                console.log(result.geocodes[0].location.lng)
                console.log(result.geocodes[0].location.lat)
                prop.a.setState({ markerPosition2: { longitude: result.geocodes[0].location.lng, latitude: result.geocodes[0].location.lat } })
            } else {
                console.log('解析失败');
            }
        }, '北京市');
        console.log(c)
        console.log(geocoder)
        prop.a.mapInstance.setZoom(15)
        // 使用geocoder做地理/逆地理编码
    })
    //this.mapInstance.setZoom(15)
    return (
        <div>
            <div style={{ width: '100%', height: '300px', position: 'relative' }}>
              {/*  zoom={15} 设置后，无效，不知道什么原因，必须手动设置
                {
                    <div >
                        <div>{this.test3()}</div>
                        <button onClick={this.test2}>test</button>
                        <button onClick={this.test}>test</button>
                        <input id="amapInput"  type="text" />
                        <TextField  id="amapInput" label="房屋位置"type="text"/>
                        <SearchLocal/>
                    </div>

                }*/}
                <Map  plugins={['ToolBar']} events={prop.a.amapEvents} amapkey={'b8d202b729de70a3782c420e5ab07d61'}style={{marginTop:20}} center={prop.a.state.markerPosition2}>
                    <Marker position={prop.a.state.markerPosition2} />
                </Map>
            </div>
        </div>
    )
}


class Amap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // 设置坐标点，就会在地图上显示一个 标记点
            markerPosition: { longitude: 120, latitude: 35 },
            markerPosition2:  { longitude: 120, latitude: 35 },
        }
        // 高德地图 Marker 实例
        this.markerInstance = undefined
        // 高德地图 Map 实例
        this.mapInstance = undefined
        this.locationInfo = undefined
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
    test2= ()=>{
        console.log(this.props.location)
    }
    test= (a)=>{

        var a=this
        //eslint-disable-next-line
        AMap.plugin('AMap.Geocoder', function() {
            //eslint-disable-next-line
            var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: '全国'
            })
            geocoder.getLocation('建业天筑', (point,result) => {
                if (point) {
                    console.log(a)
                    //这个point就是解析地址获得的百度地图坐标系
                    console.log(result)
                    console.log(point); //{lat: 40.057339, lng: 116.306941}
                    console.log(result.geocodes[0].location)
                    console.log(result.geocodes[0].location.lng)
                    console.log(result.geocodes[0].location.lat)
                    a.setState({ markerPosition2: { longitude: result.geocodes[0].location.lng, latitude: result.geocodes[0].location.lat } })
                } else {
                    console.log('解析失败');
                }
            }, '北京市');
            console.log(geocoder)
            // 使用geocoder做地理/逆地理编码
        })
        this.mapInstance.setZoom(15)
        console.log(this.state.markerPosition2)
        return (this.state.markerPosition2)
    }
    test3= ()=>{
        console.log(this.props.location)
        return 123
    }
    render() {
        return (
         <div>

             <Mapcf a={this} houseLocal={this.props.houseLocal} />
         </div>
        )
    }
}

export default Amap




{/*   <>
                <div style={{ width: '100%', height: '300px', position: 'relative' }}>
                     zoom={15} 设置后，无效，不知道什么原因，必须手动设置
                    {
                        <div >
                            <div>{this.test3()}</div>
                            <button onClick={this.test2}>test</button>
                            <button onClick={this.test}>test</button>
                               <input id="amapInput"  type="text" />
                            <TextField  id="amapInput" label="房屋位置"type="text"/>
                            <SearchLocal/>
                        </div>

                    }
                    <Map  plugins={['ToolBar']} events={this.amapEvents} amapkey={'b8d202b729de70a3782c420e5ab07d61'}style={{marginTop:20}} center={this.state.markerPosition2}>
                        <Marker position={this.state.markerPosition2} />
                        <Marker position={this.test()}/>
                    </Map>
                </div>
            </>*/}




























































































































