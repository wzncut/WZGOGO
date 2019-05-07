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
    y:0
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


SendUDP = (port, ip, mess) => {
            let socket = dgram.createSocket('udp4')
            socket.bind(parseInt('8889'))
            socket.once('listening', () => {
                const buf = this.toByteArray(mess)
                console.log('message was sent12')   
                socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, (err) => {
                    if (err) throw err
                    console.log('message was sent11') 
                    socket.on('message', function(msg, rinfo) {
                      console.log('receiving') 
                      var str= String.fromCharCode.apply(null, new Uint8Array(msg))
                      console.log('message was received', str)
                  //     this.setState({
                  //     msg:msg
                  // })
                })
                    // socket.close()
                })
            
            
            })
          
// console.log(this.state.ip + this.state.mess + this.state.port)
}




  render() {
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

              <View>
                <TouchableOpacity style={styles.scrollItems} onPress={() =>this.SendUDP('4567', '192.168.1.110','0D wm 123456 searchall')} >
                  <Text style={styles.Text}>主卧</Text>
                </TouchableOpacity >
              </View>


              <View style={{height:1,color:'black'}}></View>

              <View>
              <TouchableOpacity  ref={(ref)=>this.buttonRef=ref} style={styles.scrollItems}  onPress={()=>{this.handleClick()}}>
              <Text style={styles.Text}>次卧</Text>

              </TouchableOpacity>
              </View>

              <View>
              <Modal 
                visible={this.state.ShowModal1}
                transparent={true}
                animationType='fade'
                onRequestClose={() => {}}
                // style={{flex:1}}
                // ref="modal1"
              >
              <TouchableWithoutFeedback 
                onPress={()=>{this.setState({ShowModal1:false})}}>
                <View style={{position:'absolute',top:this.state.y,backgroundColor:theme.lightGray,height:100}} >
                  <TouchableWithoutFeedback onPress={()=>{}}>
                    <View style={{backgroundColor:'#fff',width:width,justifyContent:'center'}}>
                    <View>
              <TouchableOpacity  ref={(ref)=>this.buttonRef=ref} style={styles.scrollItems}  onPress={()=>{this.setState({ShowModal1:false})}}>
              <Text style={styles.Text}>次卧</Text>

              </TouchableOpacity>
              </View>
                      <View>
                        <Text>次卧</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback >
                </View>
                </TouchableWithoutFeedback>
              </Modal>
              </View>



              <View style={{height:1,color:'black'}}></View>

              <View>
              <TouchableOpacity style={styles.scrollItems}>
              <Text style={styles.Text}>阳台</Text>
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
  }
});
