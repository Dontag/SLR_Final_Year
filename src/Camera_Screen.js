import React, { PureComponent } from 'react';
import ImageClassifier from './assets/TFlow_model/ImageClassifier';
import CameraContext from './Context/cameraDataContext';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { styles } from './styles/styles';
import { RNCamera } from 'react-native-camera';
import C_Header from './assets/components/Camera_Header';
import C_Footer from './assets/components/Camera_Footer';
import GTT_C_S from './assets/components/GTT_Camera_C';


class Camera_S extends PureComponent {
  state = {
    flash: 'off',
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectBarcode: true,
    barcodes: [],
    barcodeValue: '',
    flashIcon: 'ios-flash-off',
    InsertVisible: false,
    submitDataFlag: 0,
    setBarRun: 0,
    SnapData: '',
    flag: 1,
    boolFlag: false,
  };

  AlertJoke = () => {
    Alert.alert(
      "Ooh Fuck!",
      "Don't push so hardly, it hurts",
      [
        { text: "OK", onPress: () => { } }
      ],
      { cancelable: true }
    );
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    if (this.state.flash === 'off') {
      this.state.flash = 'torch'
      this.state.flashIcon = 'ios-flash'
    }
    else {
      this.state.flash = 'off'
      this.state.flashIcon = 'ios-flash-off'
    }
    this.setState({
      flash: this.state.flash,
      flashIcon: this.state.flashIcon
    })
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  // touchToFocus(event) {
  //   const { pageX, pageY } = event.nativeEvent;
  //   const screenWidth = Dimensions.get('window').width;
  //   const screenHeight = Dimensions.get('window').height;
  //   const isPortrait = screenHeight > screenWidth;

  //   let x = pageX / screenWidth;
  //   let y = pageY / screenHeight;
  //   // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
  //   if (isPortrait) {
  //     x = pageY / screenHeight;
  //     y = -(pageX / screenWidth) + 1;
  //   }

  //   this.setState({
  //     autoFocusPoint: {
  //       normalized: { x, y },
  //       drawRectPosition: { x: pageX, y: pageY },
  //     },
  //   });
  // }

  // setFocusDepth(depth) {
  //   this.setState({
  //     depth,
  //   });
  // }

  // takePicture = async function() {
  //   if (this.camera) {
  //     const data = await this.camera.takePictureAsync();
  //     console.warn('takePicture ', data);
  //   }
  // };

  takePicture = async () => {

    let boolFlagvar = !this.state.boolFlag;
    if (this.camera) {
      // const options = { quality: 0.8, base64: true };
      //  const data = await this.camera.takePictureAsync(options);
      const data = await this.camera.takePictureAsync();
      console.log(data.uri);
      console.log(this.state.boolFlag, "bool");

      this.setState({
        boolFlag: boolFlagvar,
        SnapData: data.uri,
      })
    }

  }

  takeVideo = async () => {
    const { isRecording } = this.state;
    if (this.camera && !isRecording) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          console.warn('takeVideo', data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };



  toggle = value => () =>
    this.setState(prevState => ({ [value]: !prevState[value] }));


  renderCamera() {

    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          //justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        //To enable Capturing the Audio set captureAudio = True
        captureAudio={false}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        <CameraContext.Provider value={{ SnapData: this.state.SnapData, EnableClassifier: this.state.boolFlag }}>
          <View style={{ width: "100%", height: "100%" }}>
            <View style={{ width: "100%", height: "10%" }}>
              <C_Header LeftIconName={"ios-menu"} LeftIconSize={26} LeftIconColor={"white"} LeftOnPress={() => this.props.navigation.openDrawer()} CenterIconName={"ios-arrow-down"} CenterIconSize={34} CenterIconColor={"white"} CenterTextName={"Gesture To Text"} CenterTextColor={"white"} RightIconName={this.state.flashIcon} RightIconSize={26} RightIconColor={"white"} RightOnPress={this.toggleFlash.bind(this)} />
            </View>
            <View style={{ width: "100%", height: "80%", justifyContent: "flex-end" }}>
              <GTT_C_S />
              {/* {this.state.boolFlag ? <ImageClassifier ImageData={this.state.SnapData}/> : null} */}
            </View>
            <View style={{ width: "100%", height: "10%" }}>
              <C_Footer MicIcon={"ios-mic"} ASL_ISL_Icon={"ASL"} LeftIconName={"ios-options"} LeftIconColor={"transparent"} LeftIconSize={26} CenterIconName={"ios-radio-button-on"} CenterIconColor={"white"} CenterIconSize={65} CenterOnPress={this.takePicture.bind(this)} RightIconName={"ios-reverse-camera"} RightIconColor={"white"} RightIconSize={34} RightOnPress={this.toggleFacing.bind(this)} />
            </View>
          </View>
        </CameraContext.Provider>
      </RNCamera>
    );
  }

  render() {
    return (<View style={styles.Camera_S_Container_View}><StatusBar hidden={true} />{this.renderCamera()}
    </View>);
  }
}

export default Camera_S;
