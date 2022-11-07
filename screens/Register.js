import { KeyboardAvoidingView, StyleSheet,  View } from 'react-native';
import React , { useLayoutEffect, useState }from 'react';
import { Button,Input,Text } from '@rneui/base';
import { auth } from '../firebase';

const Register = ({navigation}) => {

    const[name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const[imageUrl,setImageUrl]=useState("");



    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || 'https://picsum.photos/200/300.webp'
            })
        })
        .catch((error)=>alert(error.message)); 
    }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Text h3 style={{marginBottom:50}}>Create a NightLife Account</Text>
      <View style={styles.inputContainer}>
        <Input 
            placeholder='Full Name'
            autoFocus 
            type="text"  
            value={name} 
            onChangeText={(text)=> setName(text)} 
        />
         <Input 
            placeholder='Email'  
            type="email"  
            value={email} 
            onChangeText={(text)=> setEmail(text)} 
        />
         <Input 
            placeholder='Password'        
            type="password"  
            secureTextEntry
            value={password} 
            onChangeText={(text)=> setPassword(text)} 
        />
        <Input 
            placeholder='Imagev URL (optional)' 
            type="text" 
            value={imageUrl} 
            onChangeText={(text)=> setImageUrl(text)} 
            onSubmitEditing={register}
        />
      </View>
      <Button raised containerStyle={styles.button} title="Register" onPress={register} />
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({

    inputContainer:{
        width:300,
    },
    button:{
    width:200,
    marginTop:10,
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white',
    }
})