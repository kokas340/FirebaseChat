import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView,ActivityIndicator} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import CustomList from '../components/CustomList'
import { Avatar } from '@rneui/base'
import { auth,db } from '../firebase'
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons'
//  <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} /> 
const Home = ({navigation}) => {
const[loading,setLoading]=useState(true);
const[chats,setChats]=useState([]);


const signOutUser=() =>{
    auth.signOut().then(()=>{
        navigation.replace('Login');
    })
}
   
useEffect(()=>{
        const unsubscribe=db.collection('chats').onSnapshot(snapshot =>{
            setChats(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
            setLoading(false);
        })
        return unsubscribe;
},[])

const enterChat=(id,chatName)=>{
    navigation.navigate('Chat',{
        id,
        chatName,
    })
}
    if(!loading){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={signOutUser} >
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL }}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.camera} activeOpacity={0.5} 
                  
                     >
                       <AntDesign  name='camerao'size={24} color='black'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.edit} activeOpacity={0.5} 
                      onPress={()=> navigation.navigate('AddChat')} >
                       <AntDesign  name='edit'size={24} color='black'/>
                    </TouchableOpacity>
                </View>
                {console.log(chats)}
                <ScrollView style={styles.container2}>
                    {chats.map(({id,data:{ chatName }})=>{
                        return(
                            <CustomList key={id} id={id}  chatName={chatName}
                                enterChat={enterChat}
                            />
                        )
                      
                    })}
                  
                </ScrollView>
            </SafeAreaView>
          )
    }else{
        return (
            <SafeAreaView style={styles.containerCenter}>
               
               <ActivityIndicator size="large" color="#00ff00" />
            </SafeAreaView>
          )

    }
 
}

export default Home

const styles = StyleSheet.create({
    containerCenter:{
        alignContent:'center',
        justifyContent:'center',
        flex:1,
    },
    header:{
        backgroundColor:'#E0E0E0',
        height:90,
        flexDirection:'row',
        paddingHorizontal:20,
        paddingTop:45,
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    container2:{
     height:'100%'
    },
    camera:{
       position:'absolute',
       top:50,
       right:60,
    },
    edit:{
        position:'absolute',
        top:50,
        right:20,
    },

})