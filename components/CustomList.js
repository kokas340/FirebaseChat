import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ListItem,Avatar } from '@rneui/base';
import { auth,db } from '../firebase'
const CustomList = ({id,chatName,enterChat}) => {
const [chatMesssages,setChatMessages]=useState([]);

useEffect(()=>{
  const unsubscribe = db.collection('chats').doc(id).collection('messages').
  orderBy('timestamp','desc').onSnapshot((snapshot)=>
  setChatMessages(snapshot.docs.map((doc)=> doc.data()))
  );
  return unsubscribe;
})
  return (

    <ListItem  onPress={()=> enterChat(id,chatName)} key={id} bottomDivider>
        <Avatar
  rounded
  source={{
    uri: chatMesssages?.[0]?.photoURL ||
      'https://picsum.photos/200/300.jpg',
  }}
/>

<ListItem.Content>
    <ListItem.Title style={{fontWeight:"800"}}>
      {chatName}
    </ListItem.Title>
    <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
       { chatMesssages?.[0]?.displayName}:{ chatMesssages?.[0]?.message}
    </ListItem.Subtitle>
</ListItem.Content>

      
    </ListItem>
  )
}

export default CustomList

const styles = StyleSheet.create({})