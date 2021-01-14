import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Tflite from 'tflite-react-native';

//Styles
import { styles } from './assets/styles/styles';

//Components
import C_Header from './components/Camera_Header';
import C_Footer from './components/Camera_Footer';
import GTT_C_S from './components/GTT_Camera_C';

let tflite = new Tflite();
const { height, width } = Dimensions.get('window');
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
    snapData: '',
    flag: 1,
    boolFlag: false,
    classificationResult: ''
  };


  imageClassifier = (data) => {
    tflite.loadModel({
      model: 'models/imageClassifier_M.tflite',// required
      labels: 'models/labels_2.txt',  // required
      numThreads: 1,                              // defaults to 1
    },
      (err, res) => {
        if (err)
          console.log('Something went Wrong---->', err);
        else
          console.log('Result---->', res);
      });
    tflite.runModelOnImage({
      path: data,
      imageMean: 128.0,
      imageStd: 128.0,
      numResults: 1,
      threshold: 0.5
    },
      (err, res) => {
        if (err) {
          console.log('Something went Wrong 1---->', err);
        } else {
          console.log('Result 1---->', res);
          res.map((labeldata) => {
            this.setState((prevState) => ({
              classificationResult: prevState.classificationResult + labeldata.label,
            }))
          })
        }
      });
    tflite.close();
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

  takePicture = async () => {
    let boolFlagvar = !this.state.boolFlag;
    if (this.camera) {
      const options = { quality: 0.5, base64: true, orientation: RNCamera.Constants.ORIENTATION_UP,  fixOrientation: true, };
      //  const data = await this.camera.takePictureAsync(options);
      const data = await this.camera.takePictureAsync(options);
      console.log(`data:image/png;base64,${data.uri}`);
      console.log(this.state.boolFlag, "bool");
      this.getPostImageData(data.base64);
      // this.getPostImageData(`data:image/png;base64,${data.base64}`);
      this.setState({
        boolFlag: boolFlagvar,
        snapData: data.uri,
      })
      this.imageClassifier(data.uri);
    }

  }

  getPostImageData = async (imageData) => {
    // try {
    //   const ImageData = await fetch('http://192.168.1.5:5000/1020', {
    //     method: "GET",
    //   });
    //   const responseData = await ImageData.json();
    //   console.log('imageData-----', responseData)
    //   console.log(ImageData, 'imageDataPostBody')
    // } catch (err) {
    //   console.log("Error fetching data-----------", err);
    // }

    const bodyData = new FormData();
    bodyData.append('_id', String(10003));
    bodyData.append('image_data', String(imageData));
    try {
      const ImageData = await fetch('http://192.168.1.5:5000/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: bodyData
      });
      const responseData = await ImageData.json();
      console.log('imageData-----', responseData)
      console.log(ImageData, 'imageDataPostBody')
    } catch (err) {
      console.log("Error fetching data-----------", err);
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
    let { classificationResult } = this.state;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: "space-between"
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
        <View style={{ width: width }}>
          <C_Header
            LeftIconName={"ios-menu"}
            LeftIconSize={26}
            LeftIconColor={"white"}
            LeftOnPress={() => this.props.navigation.openDrawer()}
            CenterIconName={"ios-arrow-down"}
            CenterIconSize={34}
            CenterIconColor={"white"}
            CenterTextName={"Gesture To Text"}
            CenterTextColor={"white"}
            RightIconName={this.state.flashIcon}
            RightIconSize={26}
            RightIconColor={"white"}
            RightOnPress={this.toggleFlash.bind(this)} />
        </View>
        <View style={{ width: width }}>
          <GTT_C_S
            classificationData={classificationResult}
          />
          <C_Footer
            MicIcon={"ios-mic"}
            ASL_ISL_Icon={"ASL"}
            LeftIconName={"ios-options"}
            LeftIconColor={"white"}
            LeftIconSize={26}
            LeftOnPress={() => { this.getPostImageData() }}
            CenterIconName={"ios-radio-button-on"}
            CenterIconColor={"white"}
            CenterIconSize={65}
            CenterOnPress={this.takePicture.bind(this)}
            RightIconName={"ios-reverse-camera"}
            RightIconColor={"white"}
            RightIconSize={34}
            RightOnPress={this.toggleFacing.bind(this)} />
        </View>
      </RNCamera>
    );
  }

  render() {
    return (
      <View style={styles.Camera_S_Container_View}>
        <StatusBar hidden={true} />
        {this.renderCamera()}
      </View>);
  }
}

export default Camera_S;
