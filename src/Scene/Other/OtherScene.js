/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, Animated, StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, UIManager, findNodeHandle } from 'react-native'
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
const { width, height } = Dimensions.get('window');
type Props = {};
export default class OtherScene extends Component<Props> {
  toByteArray = (obj) => {
    const uint = new Uint8Array(obj.length);
    for (var i = 0, l = obj.length; i < l; i++) {
      uint[i] = obj.charCodeAt(i);
    }
    return new Uint8Array(uint);
  }
  //控制黄灯开
  SendUDP = (port, ip, mess) => {
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
  // //控制黄灯关
  // SendUDPYc = (port, ip, mess) => {
  //   let socket = dgram.createSocket('udp4')
  //   socket.bind(parseInt('8889'))
  //   // socket.once('listening', () => {
  //   const buf = this.toByteArray(mess)
  //   socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, () => {
  //     // if (err) throw err
  //     // console.log('message was sent') 
  //     // socket.on('message', function(msg, rinfo) {
  //     //   console.log('receiving') 
  //     //   var str= String.fromCharCode.apply(null, new Uint8Array(msg))
  //     //   console.log('message was received', str)
  //     //     this.setState({
  //     //     msg:msg
  //     // })
  //     // })
  //     socket.close()
  //   })
  //   // })
  //   // console.log(this.state.ip + this.state.mess + this.state.port)
  // }
  // //控制黄灯开
  // SendUDPYo = (port, ip, mess) => {
  //   let socket = dgram.createSocket('udp4')
  //   socket.bind(parseInt('8889'))
  //   // socket.once('listening', () => {
  //   const buf = this.toByteArray(mess)
  //   socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, () => {
  //     // if (err) throw err
  //     // console.log('message was sent') 
  //     //     socket.on('message', function(msg, rinfo) {
  //     //       console.log('receiving') 
  //     //       var str= String.fromCharCode.apply(null, new Uint8Array(msg))
  //     //       console.log('message was received', str)
  //     //   //     this.setState({
  //     //   //     msg:msg
  //     //   // })
  //     // })
  //     socket.close()
  //   })
  //   // })
  //   // console.log(this.state.ip + this.state.mess + this.state.port)
  // }
  // //控制黄灯关
  // SendUDPYc = (port, ip, mess) => {
  //   let socket = dgram.createSocket('udp4')
  //   socket.bind(parseInt('8889'))
  //   // socket.once('listening', () => {
  //   const buf = this.toByteArray(mess)
  //   socket.send(buf, 0, buf.length, parseInt(port), `${ip}`, () => {
  //     // if (err) throw err
  //     // console.log('message was sent') 
  //     // socket.on('message', function(msg, rinfo) {
  //     //   console.log('receiving') 
  //     //   var str= String.fromCharCode.apply(null, new Uint8Array(msg))
  //     //   console.log('message was received', str)
  //     //     this.setState({
  //     //     msg:msg
  //     // })
  //     // })
  //     socket.close()
  //   })
  //   // })
  //   // console.log(this.state.ip + this.state.mess + this.state.port)
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <Text style={{ flex: 1, fontSize: 20, color: 'black', textAlign: 'center' }}>情景模式</Text>
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

            <View style={styles.light}>
              <Text>就餐模式</Text>
              <View style={{flex: 1}}/>
              <TouchableOpacity onPress={() => { this.SendUDP('4567', '192.168.1.111', '0A wm 123456 s811 1') }}>
                <Text style={styles.Text}>开</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.SendUDP('4567', '192.168.1.111', '0A wm 123456 s811 0') }}>
                <Text style={styles.Text}>关</Text>
              </TouchableOpacity>
            </View>
            <View style={{height:1,color:'black'}}></View>
            <View style={styles.light}>
              <Text>归家模式</Text>
              <View style={{flex: 1}}/>
              <TouchableOpacity onPress={() => { this.SendUDP('4567', '192.168.1.111', '0A wm 123456 s710 1') }}>
                <Text style={styles.Text}>开</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.SendUDP('4567', '192.168.1.111', '0A wm 123456 s710 0') }}>
                <Text style={styles.Text}>关</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, color: 'black' }}></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightGray
  },
  TopBar: {
    height: 40,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  MainBar: {
    height: 500,
    backgroundColor: '#9999'
  },
  scrollItems: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text: {
    //flex: 1,
    color: '#333333',
    fontSize: 16,
    marginLeft: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center'
  },
  light: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
