import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button,Input,Image } from '@rneui/base';
import { auth } from '../firebase';

const Login = ({navigation}) => {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      //send to home if logged in
      navigation.replace("Home");
    }
  })

  return unsubscribe;
},[])

  const signIn = () => {
      auth.signInWithEmailAndPassword(email,password).catch(error=> alert(error));
  }

  return (
    <KeyboardAvoidingView  behavior='padding' style={styles.container}>
      <Image 
      source={require('../assets/logoSquare.png')}
      style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Input placeholder='Email'autoFocus type="email"  value={email} onChangeText={(text)=> setEmail(text)} />
        <Input placeholder='Password' secureTextEntry type="password" value={password} onChangeText={(text)=> setPassword(text)}     onSubmitEditing={signIn}/>
      </View>

      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button containerStyle={styles.button} onPress={()=>navigation.navigate("Register") } type="outline" title="Register" />
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  logo:{
    width:200,height:200
  },
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