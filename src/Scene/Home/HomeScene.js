/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Platform,Animated,StyleSheet, Text, View,ScrollView,TouchableOpacity,Modal,TouchableWithoutFeedback,UIManager,findNodeHandle} from 'react-native'
import theme from '../../widget/theme'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import dgram from 'react-native-udp'
import DataRequest from '../../client/entity/DataRequest'
import net from 'react-native-tcp'
import SQLite from '../../db/SQLite'
import HomeLog from '../../client/entity/HomeLog'

var sqLite = new SQLite();
var db;
var Dimensions = require('Dimensions');
const {width,height} = Dimensions.get('window');
type Props = {};
export default class HomeScene extends Component<Props> {

// static navigationOptions=()=>({
//     headerTitle:'设备'
// })

  constructor(Props){
    super(Props)

    this.state = {
    msg:'',
    mess: '',
    port: '',
    ip: '',
    serverFlag: true,
    ShowModal1:false,
    x:0,
    y:0,
    shows:'none',
    showf:'none',
    }
  }

  compennetDidUnmount() {
    sqLite.close();
  }

  componentWillMount() {
    //开启数据库
    if (!db) {
      db = sqLite.open();
    }

    //查询设备信息
    // db.transaction((tx) => {
    //   tx.executeSql("select * from deviceinfo", [], (tx, results) => {
    //     var len = results.rows.length;
    //     for (let i = 0; i < len; i++) {
    //       var u = results.rows.item(i);
    //       //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
    //       // console.log('--------------------------');
    //       // console.log(JSON.stringify(u));
    //       alert(u.mac + u.NAME + u.POSITION + u.TYPE + u.protype);
    //     }
    //   });
    // }, (error) => {//打印异常信息
    //   console.log(error);
    // });
  }

  _shows = () => {
    if(this.state.shows=='none'){
    this.setState({
    shows:'flex'
    })
  }
    else{
    this.setState({
    shows:'none'
    })
    }
  }

  _showf = () => {
  if(this.state.showf=='none'){
  this.setState({
    showf:'flex'
    })
    }
  else{
    this.setState({
    showf:'none'
    })
    }
  }


  handleClick = () => {
	  UIManager.measure(findNodeHandle(this.buttonRef),(x,y,width,height,pageX,pageY)=>{
    // todo  
    if(this.state.ShowModal1==false){
    this.setState({
      ShowModal1:true,
      x:pageX,
      y:pageY
    })
    }
  })
  }

_onShow(evt){
  console.log("---------pagex",evt.nativeEvent.pageX)
  console.log("---------pagex",evt.nativeEvent.pageY)
  if(this.state.ShowModal1==false){
    this.setState({
      ShowModal1:true,
      x:evt.nativeEvent.pageX,
      y:evt.nativeEvent.pageY+15
    })
  }
}

toByteArray = (obj) => {
  const uint = new Uint8Array(obj.length);
  for (var i = 0, l = obj.length; i < l; i++) {
      uint[i] = obj.charCodeAt(i);
  }
  return new Uint8Array(uint);
}

SendTCPf =(port,ip) => {
    let client=net.createConnection({host:ip,port:parseInt(port)})
    console.log("--------create connection succeed!");
    // const buf = this.toByteArray('mess') 
    client.write('okk \n');
    console.log("send");

  //   client.on('error', function(error) {
  //     console.log(">>>>>>>>>error:" + error);
  // });

    client.on('data', function(data) {  
      console.log('message was received', data)
      // lineArray=data.split(" ");
        // alert(typeof(lineArray))
        // alert(data==='hello');
        let str = data.toString().split("\n");
        for(let a of str){
          console.log(a)}
        });
        console.log(1111111111111111111)
}

testtouch=()=>{
  let a='A B C'
  let b=a.split(" ")
  console.log(b[0].toLocaleLowerCase())
}
//控制黄灯开
SendUDPYo = (port, ip, mess) => {
            let socket = dgram.createSocket('udp4')
            socket.bind(parseInt('8889'))
            // socket.once('listening', () => {
                const buf = this.toByteArray(mess) 
                socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, () => {
                    // if (err) throw err
                    // console.log('message was sent') 
                //     socket.on('message', function(msg, rinfo) {
                //       console.log('receiving') 
                //       var str= String.fromCharCode.apply(null, new Uint8Array(msg))
                //       console.log('message was received', str)
                //   //     this.setState({
                //   //     msg:msg
                //   // })
                // })
                     socket.close()
                })
            // })
// console.log(this.state.ip + this.state.mess + this.state.port)
  }
//控制黄灯关
  SendUDPYc = (port, ip, mess) => {
    let socket = dgram.createSocket('udp4')
    socket.bind(parseInt('8889'))
    // socket.once('listening', () => {
        const buf = this.toByteArray(mess) 
        socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, () => {
            // if (err) throw err
            // console.log('message was sent') 
            // socket.on('message', function(msg, rinfo) {
            //   console.log('receiving') 
            //   var str= String.fromCharCode.apply(null, new Uint8Array(msg))
            //   console.log('message was received', str)
          //     this.setState({
          //     msg:msg
          // })
        // })
             socket.close()
        })
    // })
// console.log(this.state.ip + this.state.mess + this.state.port)
}

//控制红灯开
SendUDPRo = (port, ip, mess) => {
  let socket = dgram.createSocket('udp4')
  socket.bind(parseInt('8889'))
  socket.once('listening', () => {
      const buf = this.toByteArray(mess) 
      socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, (err) => {
          if (err) throw err
          console.log('message was sent') 
          // socket.on('message', function(msg, rinfo) {
          //   console.log('receiving') 
          //   var str= String.fromCharCode.apply(null, new Uint8Array(msg))
          //   console.log('message was received', str)
        //     this.setState({
        //     msg:msg
        // })
      // })
          //  socket.close()
      })
  })
// console.log(this.state.ip + this.state.mess + this.state.port)
}

//控制红灯关
SendUDPRc = (port, ip, mess) => {
  let socket = dgram.createSocket('udp4')
  socket.bind(parseInt('8889'))
  socket.once('listening', () => {
      const buf = this.toByteArray(mess) 
      socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, (err) => {
          if (err) throw err
          console.log('message was sent') 
          // socket.on('message', function(msg, rinfo) {
          //   console.log('receiving') 
          //   var str= String.fromCharCode.apply(null, new Uint8Array(msg))
          //   console.log('message was received', str)
        //     this.setState({
        //     msg:msg
        // })
      // })
          //  socket.close()
      })
  })
// console.log(this.state.ip + this.state.mess + this.state.port)
}

  render() {
    let DataRequest1=new DataRequest();
    DataRequest1.setKeyword('sssss')
    return (
      <View style={styles.container}>
           <View style={styles.TopBar}>
              <Text  style={{flex:1,fontSize:20 ,color:'black' ,textAlign:'center'}}>设备信息</Text>
              <AntDesign 
              name={'search1'}
              size={16}
              color={'#999'}
              />
              </View>
            <View style={styles.MainBar}>
              <ScrollView>
                {/* <View>
                  <TouchableOpacity style={styles.scrollItems} onPress={() =>this.SendTCPf('8888','192.168.1.114')} >
                   <Text style={styles.Text}>主卧</Text>
                  </TouchableOpacity >
                </View>

                <View style={{height:1,color:'black'}}></View> */}

                <View>
                  <TouchableOpacity  ref={(ref)=>this.buttonRef=ref} style={styles.scrollItems}  onPress={()=>{this._showf()}}>
                    <Text style={styles.Text}>次卧</Text>
                  </TouchableOpacity>
                </View>

                <View display={this.state.showf} style={styles.light}>
                  <Text>红灯</Text>
                  <TouchableOpacity onPress={()=>{this.SendUDPYo('4567','192.168.1.111','0A wm 123456 18-fe-34-a4-8c-b7 1')}}>
                    <Text style={styles.Text}>开</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.SendUDPYo('4567','192.168.1.111','0A wm 123456 18-fe-34-a4-8c-b7 0')}}>
                    <Text style={styles.Text}>关</Text>
                  </TouchableOpacity>
                </View>

                <View style={{height:1,color:'black'}}></View>

                <View>
                  <TouchableOpacity style={styles.scrollItems} onPress={()=>{this._shows()}}>
                    <Text style={styles.Text}>阳台</Text>
                  </TouchableOpacity>
                </View>

                <View display={this.state.shows} style={styles.light}>
                    <Text>黄灯</Text>
                    <TouchableOpacity onPress={()=>{this.SendUDPYo('4567','192.168.1.111','0A wm 123456 18-fe-34-a4-8c-2d 1')}}>
                    <Text style={styles.Text}>开</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.SendUDPYc('4567','192.168.1.111','0A wm 123456 18-fe-34-a4-8c-2d 0')}}>
                    <Text style={styles.Text}>关</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.lightGray
  },
  TopBar:{
    height:40,
    backgroundColor:'#F5FCFF',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  MainBar:{
    height:500,
    backgroundColor:'#9999'
  },
  scrollItems:{
    backgroundColor:'white',
    flexDirection:'row',
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  Text:{
    flex:1,
    color:'#333333',
    fontSize:16,
    marginLeft:width*0.03
  },
  light:{
    flexDirection:'row'
  }
});
