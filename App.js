import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity, Alert,TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const minUpperCase = 1;
const minNumerics = 1;
const minLowerCase = 1;
const minSpecialChars = 1;
const minLength = 8;
const maxLength = 12;
const PASS_REG_EX = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$');
const EMAIL_REG_EX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


const App = () => {
  const [data,setdata] = useState([]);

  const add_onclick = () =>{
    var number = data.length+1;
      setdata(data =>[...data, {
        id: data.length,
        title: 'Employee Form '+number,
      }]);
  }

  const remove_onclick = () =>{
  setdata([...data.slice(0,data.length-1), ...data.slice(data.length-1+1)])
}



  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
      <TouchableOpacity onPress={()=>{remove_onclick()}}><Text> <AntDesign name="minuscircle" size={25} color={"black"} style={{marginLeft:10}}/></Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{add_onclick()}}><Text> <AntDesign name="pluscircle" size={25} color={"black"} style={{marginLeft:10}}/></Text></TouchableOpacity>
       </View>
     
      <FlatList
        data={data}
        renderItem={ ({ item }) => (
          <UselessTextInput title={item.title} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const UselessTextInput =  ({ title }) => {
  const [user, setuser] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [email, setemail] = React.useState('');

  const [titleuser, settitleuser] = React.useState('Name');
  const [titlepassword, settitlepassword] = React.useState('Password');
  const [titleemail, settitleemail] = React.useState('Email');


  const [validuser, setvaliduser] = React.useState(0);
  const [validpassword, setvalidpassword] = React.useState(0);
  const [valideemail, setvalidemail] = React.useState(0);

  const [hidepass, sethidepass] = React.useState(true);



  const check_validation = () =>{
    console.log(user.length)
    if(user.length==0){
      settitleuser('Invalid Name')
      setvaliduser(2)
    }
    else if( user.length>=5){ 
      settitleuser('Valid Name')
      setvaliduser(1)
     
    }else{
      settitleuser('Invalid Name')
      setvaliduser(2)
    }

    if(password.length==0){
      settitlepassword('Invalid Password')
      setvalidpassword(2)
    }
    else if(PASS_REG_EX.test(password)){ // check valid password true
      settitlepassword('Valid Password')
      setvalidpassword(1)
    }else{
      settitlepassword('Invalid Password')
      setvalidpassword(2);
    }

    if(email.length==0){
      settitleemail('Invalid Email')
      setvalidemail(2);
    }
    else if(EMAIL_REG_EX.test(email)){ // check valid password true
      settitleemail('Valid Email')
      setvalidemail(1);
    }else{
      settitleemail('Invalid Email')
      setvalidemail(2);
    }
  } 


  return (
  <View style={styles.item}>
  <Text style={styles.title}>{title}</Text>
  <TextInput
        label="Username"
        type="outlined"
        onChangeText={text => setuser(text)}
        value={user}
        style={{paddingHorizontal:10,height:40,fontSize:15,borderWidth:0.5,borderColor:'gray',borderRadius:10,flexDirection:'row',marginHorizontal:10}}
        underlineColorAndroid='#FFfF'
      />
       <Text style={validuser==0?styles.input_title:validuser==1?styles.input_title_valid:styles.input_title_invalid}>{titleuser}</Text>

      <TextInput
        label="Email"
        type="outlined"
        onChangeText={text => setemail(text)}
        value={email}
        style={{paddingHorizontal:10,height:40,fontSize:15,borderWidth:0.5,borderColor:'gray',borderRadius:10,flexDirection:'row',marginHorizontal:10}}
      />      
        <Text style={validpassword==0?styles.input_title:validpassword==1?styles.input_title_valid:styles.input_title_invalid}>{titleemail}</Text>
      
      <View style={{height:40,borderWidth:0.5,borderColor:'gray',borderRadius:10,flexDirection:'row',marginHorizontal:10}}>
      <TextInput
        label="Password"
        type="outlined"
        secureTextEntry={hidepass} 
        onChangeText={text => setpassword(text)}
        value={password}
        style={
          {
            paddingHorizontal:10,
            backgroundColor:'red',
            flex:1,
            borderRadius:10,
            backgroundColor:"white",
            fontSize:15,
            alignSelf:'center'
          }
        }
      /><TouchableOpacity style={{justifyContent:'center'}}
      onPress={()=>{sethidepass(!hidepass)}}><Text style={{alignSelf:'center',textAlign:'center',marginHorizontal:10}}>{hidepass?<AntDesign name="eye" size={25} color={"black"} style={{marginLeft:10}}/>:<AntDesign name="eyeo" size={25} color={"black"} style={{marginLeft:10}}/>}</Text></TouchableOpacity></View>
        <Text style={valideemail==0?styles.input_title:valideemail==1?styles.input_title_valid:styles.input_title_invalid}>{titlepassword}</Text>
       
        <TouchableOpacity style={{   
            backgroundColor:'red',
            flex:1,
            borderRadius:10
            ,paddingHorizontal:20,
            marginHorizontal:10,
            height:40,
            justifyContent:'center',
            fontSize:15,marginTop:15}} onPress={()=>{check_validation()}}><Text style={{alignSelf:'center',color:'white'}}>Submit</Text></TouchableOpacity>
       
        
</View>
)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,

    borderBottomColor:'gray',
    borderBottomWidth:1
  },
  title: {
    fontSize: 14,marginHorizontal:10,marginBottom:10
  },

  input_title:{
    fontSize:12,marginHorizontal:10,marginBottom:15
  },
  input_title_invalid:{
    color:'red',
    fontSize:12,marginHorizontal:10,marginBottom:15
  },
  input_title_valid:{
    color:'green',
    fontSize:12,marginHorizontal:10,marginBottom:15
  }
});

export default App;