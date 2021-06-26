import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import *as Permissions from 'expo-permissions';
import { BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component{
    constructor(){
        super();

        this.state={
          hasCameraPermissions:null,
          scanned:false,
          scannedData:'',
          buttonState:'normal',
        }
    }


    hasHandleBarCodeScanned=async({type,data})=>{
      this.setState({
          scanned:true,
          scannedData:data,
          buttonState:'normal'
      })
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted",
            scanned:false,
            buttonState:'clicked',
        })
    }
        render(){
            const hasCameraPermissions=this.state.hasCameraPermissions;
         const scanned=this.state.scanned;
         const buttonState=this.state.buttonState;
         if(buttonState==="clicked" && hasCameraPermissions){
             return(
                 <BarCodeScanner
                  onBarCodeScanned={
                      scanned? undefined : this.hasHandleBarCodeScanned
                  }
                 >

                 </BarCodeScanner>
             )
         }
         else if(buttonState==="normal"){

        return(

            <View styles={styles.container}>

                <Text styles={styles.displaytext}>{
                    hasCameraPermissions===true?this.state.scannedData : "request Camera Permissions"
                }</Text>

                <TouchableOpacity styles={styles.button}
                                  onPress={this.getCameraPermissions}>
                <Text styles={styles.displaytext}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
            }
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        backgroundColor:'yellow',
        margin:10,
        padding:10,
    },
    displaytext:{
        fontSize:20,
        textDecorationLine:'underline',
    },
})
