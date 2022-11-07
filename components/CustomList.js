import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListItem,Avatar } from '@rneui/base';

const CustomList = (id,chatName,enterChat) => {
  return (
    <ListItem>
        <Avatar
  rounded
  source={{
    uri:
      'https://picsum.photos/200/300.jpg',
  }}
/>

<ListItem.Content>
    <ListItem.Title style={{fontWeight:"800"}}>
        Costa Norte
    </ListItem.Title>
    <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
        This is a test subtitle This is a test subtitle This is a test subtitle This is a test subtitle
    </ListItem.Subtitle>
</ListItem.Content>

      
    </ListItem>
  )
}

export default CustomList

const styles = StyleSheet.create({})