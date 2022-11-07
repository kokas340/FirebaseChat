import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Im } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import CustomList from '../components/CustomList'
import { Avatar } from '@rneui/base'
import { auth,db } from '../firebase'
//  <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} /> 
const Home = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"NightLife",
            headerStyle:{backgroundColor:'white'},
            headerTitleAlign: 'center',
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerLeft:()=>{
                <View style={{marginLeft:20}}>
                    <TouchableOpacity >
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL }}/>
                    </TouchableOpacity>
                </View>
            },

        });
    },[])
  return (
    <SafeAreaView>
        <ScrollView>
            <CustomList></CustomList>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})