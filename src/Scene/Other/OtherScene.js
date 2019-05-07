/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import theme from '../../widget/theme'
import { ScrollView } from 'react-native-gesture-handler';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'

type Props = {};
export default class OtherScene extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <Text  style={{fontSize:20 ,color:'black' ,textAlign:'center'}}>情景模式</Text>
        </View>
          <View style={styles.MainBar}>
       
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
    alignItems:'center'
  },
  MainBar:{
    height:500,
    backgroundColor:'#9999'
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
