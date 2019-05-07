/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ImageBackground,Platform,StyleSheet,Text,View,Image,ScrollView,TouchableOpacity} from 'react-native';
import theme from '../../widget/theme'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

type Props = {};
export default class MineScene extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
      
       <ImageBackground source={require('../../images/background.jpg')} style={styles.imgTabBar}>
          <View style={styles.TopBar}>
            <Text style={{fontSize:20 ,color:'black' ,textAlign:'center'}}>用户</Text>
          </View>
          <View style={styles.cencerBar}>
            <Image source={require('../../images/timg.jpg')} style={{height:75,width:75,marginTop:30}}></Image>
            <Text style={{fontSize:20 ,color:'black' ,textAlign:'center',marginTop:20}}>用户名：nb</Text>
          </View>
       </ImageBackground>

       <View style={{height:300}}>
       <ScrollView>
         <View>
         <TouchableOpacity style={[styles.scrollItems,{marginTop:30}]}>
            <Text style={styles.Text}>检查新版本</Text>
            <SimpleLineIcon
              name={'arrow-right'}
              size={16}
              color={'#999'}
            />
         </TouchableOpacity>
         </View>
         <View style={{height:1,color:'black'}}></View>
         <View>
         <TouchableOpacity style={styles.scrollItems}>
            <Text style={styles.Text}>帮助</Text>
            <SimpleLineIcon
              name={'arrow-right'}
              size={16}
              color={'#999'}
            />
         </TouchableOpacity>
         </View>
         <View style={{height:1,color:'black'}}></View>
         <View>
         <TouchableOpacity style={styles.scrollItems}>
            <Text style={styles.Text}>关于</Text>
            <SimpleLineIcon
              name={'arrow-right'}
              size={16}
              color={'#999'}
            />
         </TouchableOpacity>
         </View>
         <View style={{height:1,color:'black'}}></View>
         <View>
         <TouchableOpacity style={styles.scrollItems}>
            <Text style={styles.Text}>退出登录</Text>
            <SimpleLineIcon
              name={'arrow-right'}
              size={16}
              color={'#999'}
            />
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
  imgTabBar:{
    height:200,
  },
  TopBar:{
    height:40,
    backgroundColor:'#F5FCFF',
    justifyContent:'center',
    alignItems:'center'
  },
  cencerBar:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
    
    // backgroundColor:'black',
  },
  scrollItems:{
    backgroundColor:'white',
    flexDirection:'row',
    height:50,
    alignItems:'center',
    justifyContent:'center'
  },
  Text:{
    flex:1,
    color:'#333333',
    fontSize:22,
  }
});
