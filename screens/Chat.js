import { StyleSheet, SafeAreaView, View,Text, KeyboardAvoidingView, TouchableOpacity, Keyboard,ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState ,useRef} from 'react'
import { Avatar } from '@rneui/base'
import { auth,db } from '../firebase'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Input } from '@rneui/themed'
import {AntDesign,SimpleLineIcons,Ionicons} from '@expo/vector-icons'

import firebase from 'firebase'
const Chat = ({navigation,route}) => {
const [input,setInput]=useState("");
const [messages,setMessages]=useState([]);
const[loading,setLoading]=useState(true);
const scrollViewRef = useRef();
const sendMessage = ()=>{
  
    Keyboard.dismiss();
    db.collection('chats').doc(route.params.id).collection('messages').add({
         timestamp:firebase.firestore.FieldValue.serverTimestamp(),
         message:input,
         displayName:auth.currentUser.displayName,
         email:auth.currentUser.email,
         photoURL:auth.currentUser.photoURL
    })

    setInput('')

};

useLayoutEffect(()=>{
    const unsubscribe = db.collection('chats').doc(route.params.id).
    collection('messages').orderBy('timestamp','asc').onSnapshot(
        (snapshot)=>setMessages(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                })),
                setLoading(false)   
        ));

        return unsubscribe;
},[route])
    if(!loading){
        return (
            <KeyboardAvoidingView style={{height:'100%'}}>
                <View style={styles.header}>
                <Avatar rounded source={{uri: auth?.currentUser?.photoURL/*chat.image.photoURL */ }}/>
                <Text>{route.params.chatName}</Text>
                </View>
            <KeyboardAvoidingView
                
                    style={styles.container}
                    keyboardVerticalOffset={90}
            >
            

            
                <>
                <ScrollView contentContainerStyle={{paddingTop:15}}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} >
                    {messages.map(({id,data})=>(
                            data.email===auth.currentUser.email?(
                                <View key={id} style={styles.reciever}>
                                    <Avatar position="absolute" bottom={-15} right={-5} rounded size={30} source={{uri: data.photoURL }}/>
                                    <Text style={styles.recieverText}>{data.message}</Text>
                                </View>
                            ):(
                                <View  key={id} style={styles.sender}>
                                        <Avatar position="absolute" bottom={-15} left={-5} rounded size={30} source={{uri: messages[0].data.photoURL }}/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                    ))}
                </ScrollView>
                <View style={styles.footer}>
                    <Input value={input}  onChangeText={(text)=> setInput(text)} onSubmitEditing={sendMessage} placeholder='message...' style={styles.textInput}/>
                    <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons  name='send' size={24} color='blue'/>
                    </TouchableOpacity>
                </View>
                </>
            
            </KeyboardAvoidingView>
            </KeyboardAvoidingView>
        )
    }else{
        <SafeAreaView style={styles.containerCenter}>
               
        <ActivityIndicator size="large" color="#00ff00" />
     </SafeAreaView>
    }
}

export default Chat

const styles = StyleSheet.create({
    containerCenter:{
        alignContent:'center',
        justifyContent:'center',
        flex:1,
    },
    recieverText:{
        color:'#000',
        fontWeight:'500',
        marginLeft:10,
     
    },
    senderText:{
        color:'#fff',
        fontWeight:'500',
        marginLeft:10,
        marginBottom:15 
    },
    senderName:{
            left:30,
            paddingRight:10,
            paddingBottom:5,
            fontSize:10,
            color:'#fff'
    },
    sender:{
        paddingHorizontal:5,
        backgroundColor:'#2b68e6',
        alignSelf:'flex-start',
        borderRadius:20,
        minWidth:100,
       marginLeft:20,
       marginBottom:25,
        maxWidth:'80%',
        position:'relative',
    },
    reciever:{
        padding:15,
        backgroundColor:'#ececec',
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:'80%',
        position:'relative',
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
    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
   padding:15,
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:'#ececec',
        padding:10,
        color:'gray',
        borderRadius:30,
    }
})