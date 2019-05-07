/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createBottomTabNavigator,createAppContainer} from 'react-navigation'
import HomeScene from './Scene/Home/HomeScene'
import MineScene from './Scene/Mine/MineScene'
import OtherScene from './Scene/Other/OtherScene'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default class RootScene extends Component<Props> {

  render() {
    return (
    <TabNavigator/>
    );
  }
}


const Bottom = createBottomTabNavigator({
  Home:{
    screen:HomeScene,
      navigationOptions:{
        header:null,
      tabBarLabel: '设备',
      tabBarIcon:({focused,tintColor})=>(
        <MaterialCommunityIcons name={focused?'settings' : 'settings-outline'} size={20} color={tintColor}/>
      )
    }
  },
  Other:{
    screen:OtherScene,
    navigationOptions:{
      tabBarLabel: '情景模式',
      tabBarIcon:({focused,tintColor})=>(
        <MaterialCommunityIcons name={focused?'lightbulb-on' : 'lightbulb-on-outline'} size={20} color={tintColor}/>
      ),
    }
  },
  Mine:{
    screen:MineScene,
    navigationOptions:{
      tabBarLabel: '我的设置',
      tabBarIcon:({focused,tintColor})=>(
        <MaterialIcons name={focused?'person' : 'person-outline'} size={20} color={tintColor}/>
      ),
    }
  }
},
{
  tabBarOptions:{
    activeTintColor:'black',
    activeBackgroundColor:'#F5FCFF',
    inactiveBackgroundColor:'#F5FCFF',
  }
});

const TabNavigator=createAppContainer(Bottom);

const styles = StyleSheet.create({
  
});

