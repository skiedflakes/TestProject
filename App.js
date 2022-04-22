import React, { Fragment, Component, useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Modal
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
/* toggle includeExtra */
const includeExtra = true;
const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default function App() {

  const [response, setResponse] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const onButtonPress = React.useCallback((type, options) => {
    setModalVisible(false)
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

    return (
          <View style={styles.body}>
                    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       
      >
        <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() =>{onButtonPress('capture', {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: false,
                includeExtra,
                })}}
            >
              <Text style={styles.textStyle}>Take a photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button]}
              onPress={() => onButtonPress('library',{
                maxHeight: 200,
                maxWidth: 200,
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
                includeExtra,
              
            })}
            >
              <Text style={styles.textStyle}>Choose a picture</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <View>
      <Text style={{fontSize:30,paddingBottom:10,marginHorizontal:20,color:'white'}} >Profile Picture</Text>
            <Text style={{fontSize:12,paddingBottom:10,marginRight:'30%',marginHorizontal:20,color:'white'}} >Upload your photo so that you can optionally display it to others</Text>
           
      </View>
            <View style={styles.ImageSections}>
            {response?.assets ?
              response?.assets.map(({uri}) => (
                <View key={uri} style={styles.images}>
                  <Image
                    resizeMode="cover"
                    resizeMethod="scale"
                    style={{alignSelf:'center',marginBottom:50,width: 200, height: 200}}
                    source={{uri: uri}}
                  />
                </View>
              )): 
              <View key={0} style={styles.images}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={{alignSelf:'center',marginBottom:50,width: 200, height: 200}}
                source={require('./assets/cam2.png')}
              />
              </View>}
            </View>

            <View style={styles.btnParentSection}>
            
            <TouchableOpacity    onPress={() => setModalVisible(true)} style={styles.btnSection2}  >
                <Text style={styles.btnText}>Add a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onButtonPress('capture', {
              saveToPhotos: true,
              mediaType: 'photo',
              includeBase64: false,
              includeExtra,
              })} style={styles.btnSection}  >
                <Text style={styles.btnText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
    );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width,
    justifyContent:'space-evenly'
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: '90%',
    height: 50,
    backgroundColor: '#373637',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnSection2: {
    width: '90%',
    height: 50,
    backgroundColor: '#D263EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight:'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    paddingBottom:20,
    padding:5,
    backgroundColor: "#373637",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width:'100%' ,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth:1,
    borderColor:'white'
  },
  button: {
    borderRadius: 20,
    padding: 5,
  
    margin:5,
    backgroundColor: "#373637",
  },
 
  textStyle: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#373637",
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});