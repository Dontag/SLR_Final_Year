import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  ToastAndroid
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
    classificationResult: '',
    Icon_ASL_ISL: "ASL"
  };

  componentDidMount() {
    StatusBar.setHidden(true);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
    });
  }

  componentWillUnmount() {
    // StatusBar.setHidden(false);
    this._unsubscribe();
  }

  onChange = () => {
    let Data = "";
    if (this.state.Icon_ASL_ISL == "ASL") {
      Data = "ISL"
      ToastAndroid.show("ISL Selected", ToastAndroid.SHORT)
    }
    else {
      Data = "ASL"
      ToastAndroid.show("ASL Selected", ToastAndroid.SHORT)
    }
    this.setState({ Icon_ASL_ISL: Data })
  }


  imageClassifier = (data) => {
    let modelName = this.state.Icon_ASL_ISL === "ASL" ? 'models/asl_modal.tflite' : 'models/imageClassifier_M.tflite';
    let modelLabels = this.state.Icon_ASL_ISL === "ASL" ? 'models/labels_asl.txt' : 'models/labels_2.txt';
    tflite.loadModel({
      model: modelName,// required
      labels: modelLabels,  // required
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
      this.state.flashIcon = 'ios-flash'
      ToastAndroid.show("Flash ON", ToastAndroid.SHORT)
    }
    else {
      this.state.flashIcon = 'ios-flash-off'
      ToastAndroid.show("Flash OFF", ToastAndroid.SHORT)
    }
    this.setState({
      flash: this.state.flash === 'torch' ? 'off' : 'torch',
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
      const options = { quality: 0.5, base64: true, orientation: RNCamera.Constants.ORIENTATION_UP, fixOrientation: true, };
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
      const ImageData = await fetch('http://192.168.1.11:5000/', {
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

  deleteClassificationData = () => {
    this.setState({ classificationResult: '' })
  }

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
            onPress={() => { this.deleteClassificationData() }}
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
            ASL_ISL_onPress={() => { this.onChange() }}
            Icon_ASL_ISL={this.state.Icon_ASL_ISL}
            RightOnPress={this.toggleFacing.bind(this)} />
        </View>
      </RNCamera>
    );
  }

  render() {
    return (
      <View style={styles.Camera_S_Container_View}>
        {/* <StatusBar hidden={true} /> */}
        {this.renderCamera()}
      </View>);
  }
}

export default Camera_S;
