
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import firebase from 'firebase';
import db from '../config';


export default class TransactionScreen extends React.Component{

    // The mystery deepens. The criminal might be anywhere. No file is safe

    constructor(){
        super();
        this.state = {
            scannedData: '',
            scanned: false,
            scannedBookID: '',
            scannedStudentID: '',
            hasCameraPermission: null,
            buttonState: 'normal'
        };
    }

    getCameraPermission = async(ID) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted", // Only if the status is 'granted'
            buttonState: ID,   
            scanned: false    
        });
    }

    handleBarcodeScanned = async({type, data}) => {
        const {buttonState} = this.state;
        if(buttonState === "bookID"){
this.setState({
    scanned: true,
    scannedBookID: data,
            buttonState: 'normal'
});
        }

        if(buttonState === "studentID"){
            this.setState({
                scanned: true,
                scannedStudentID: data,
                        buttonState: 'normal'
            });
    }

   handleTransaction = async() =>{
    var transactionMessage = null;
    db.collection("Books").doc(this.state.scannedBookID).get()
    .then((doc) => {
     console.log(doc.data);
    })
   }
    render(){

        const hasCameraPermission = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermission){
         return(
            <BarCodeScanner onBarCodeScanned = {scanned? undefined: this.handleBarcodeScanned}
            style = {StyleSheet.absoluteFillObject}/>
         )
        } else if(buttonState === "normal"){
            alert("We are facing some technical difficulties currently. Please try again later");
            return(
                <View style = {styles.container}>
<View>
                    <Image source = {require{"../assets/booklogo.jpg"}}
                    style = {{width: 200, height: 200}}/>

                    <Text style = {{textAlign: 'center', fontSize: 30}}> Wily the Library </Text>

</View>

<View style = {styles.inputView}>
<TextInput
style = {styles.inputBox}
placeholder = "Book ID"
value = {this.state.scannedBookID}/>
    <TouchableOpacity style = {styles.scanButton}
    onPress = {()=>{
        this.getCameraPermission("Book ID");
    }}>
<Text style = {styles.buttonText}>Scan (If you Dare)</Text>
    </TouchableOpacity>
</View>

<View style = {styles.inputView}>
    <TextInput
    style = {styles.inputBox}
    placeholder = "Student ID"
    value = {this.state.scannedBookID}/>

<TouchableOpacity style = {styles.scanButton}
    onPress = {()=>{
        this.getCameraPermission("Student ID");
    }}>
        <Text style = {styles.buttonText}>Scan (If you Dare)</Text>
    </TouchableOpacity>

</View>
                <Text style = {styles.displayText}>
                  {hasCameraPermission === true
                  ? this.state.scannedData
                  : "Objection Overruled!!!"}   
                </Text>

                <TouchableOpacity style = {styles.scanButton}
                onPress ={this.getCameraPermission}>
                  <Text style = {styles.buttonText}>This button
                  is the private property of the lynxes and the elks (especially the cute lynx who's 
                  staring at me creepily from the Cute_Lynx.jpg file. He's not that creepy, since he has cute,
                  pixelated eyes and if you zoom in 2000%, you can see a whole bunch of coloured pixels where
                  his eyes are supposed to be. I think that's way too much text for one button, but that's probably fine,
                  since my button is HUGE! If you click this button and you see some nonsense about a 
                  BarCode Scanner not being available, that's an evil scheme to control the world. Please ignore</Text>
                </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    transactionButton: {
        flex: 1,
        width: 50,
        height: 100,
        alignItems: 'center'
    },

    container: {
        flex: 1,
        backgroundColor: "purple",
        justifyContent: 'center',
        alignItems: 'center'
    },

    displayText: {
       // fontWeight: 'bold',
        fontSize: 15,
        textDecorationLine: 'underline'
    },

    buttonText: {
      fontSize: 15,
      fontFamily: 'Calibri',
      textAlign: 'center',
      marginTop: 10
    },

    inputView: {
        flexDirection: 'row',
        margin: 20,
    },

    scanButton: {
        width: 300,
        height: 200,
        backgroundColor: 'green',
        padding: 10,
        margin: 10
    }
})