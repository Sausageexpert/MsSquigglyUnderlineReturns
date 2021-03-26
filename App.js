
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SearchScreen from './Screens/SearchScreen';
import TransactionScreen from './Screens/TransactionScreen';
//import SpecialScreen from './Screens/SpecialScreen';

export default class App extends React.Component{
  // Wow this theme is AWESOME!!! Horizon-Bold
  render(){
    return <AppContainer/>
    );
  }
  
}

// Crime Scene: Do Not Cross. Detective Faylene ma'am is on the case
// All clues must be left undisturbed
// This criminal is a slippery character. I doubt it will be easy to catch him/her

const tabNavigator = createBottomTabNavigator({
  Search: {screen: SearchScreen},
  Transaction: {screen: TransactionScreen},
 // Special: {screen: SpecialScreen}
},
{
  defaultNavigationOptions: ({navigation} =>({
    tabBarIcon: () =>{
      const routeName = navigation.state.routeName;
      console.log(routeName);
      if(routeName === "Transaction"){
        return(
          <Image source = {require("MrFluffyFace.jpg")} 
          style = {{width: 40, height: 40}}/>
        )
      }
      else if(routeName === "Search"){
        return(
          <Image source = {require("NotMrFluffyFace.jpg")} 
          style = {{width: 40, height: 40}}/>
        )
      }
    }
  })
});

const AppContainer = createAppContainer(tabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
