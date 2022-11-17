import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React ,{useState} from  'react'
import { Button,Input,Image, Icon } from '@rneui/base'
import { auth,db } from '../firebase'




const AddChat = ({navigation}) => {
    
    const [input,setInput]= useState("");

    const createChat = async ()=>{
        await db.collection('chats').add({
            chatName:input
        }).then(()=>{
            navigation.goBack()
        }).catch((error)=>alert(error));
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text>Add a new Chat</Text>
            </View>
            <View>
                <Input 
                    placeholder='Enter chat name' 
                    value={input}
                    onChangeText={(text)=> setInput(text)}
                    leftIcon={
                        <Icon name='wechat' type='antdesign' size={24} color="black"/>
                    }
                    onSubmitEditing={createChat}
                />
                <Button disabled={!input} onPress={createChat} title='Create new chat'/>
            </View>
        </SafeAreaView>
    )
}

export default AddChat

const styles = StyleSheet.create({
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
  

})