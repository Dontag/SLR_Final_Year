import React, { PureComponent } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  ToastAndroid,
  Text,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Tflite from 'tflite-react-native';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import RNFS from 'react-native-fs';
import Tts from 'react-native-tts';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

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
    Icon_ASL_ISL: "ASL",
    setAutomation: false,
    setAutomationIcon: "ios-eye-off",
    ASL_ISL_IconAccess: true,
    spicIcon: "ios-volume-high",
    voiceOnOff: true,
    isModalVisible: false
  };

  componentDidMount() {
    StatusBar.setHidden(true);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      StatusBar.setHidden(true);
    });
    this.__subscribe = auth().onAuthStateChanged((User) => {
      if (User) {
        console.log("User already Anonymously Logged In")
      }
      else {
        auth().signInAnonymously()
          .then(() => {
            console.log("User Logged In")
          })
          .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console.');
            }
            console.error(error);
          })
      }
    })
  }

  componentWillUnmount() {
    // StatusBar.setHidden(false);
    this._unsubscribe();
    this.__subscribe();

  }


  setAutomation = () => {
    let { setAutomation } = this.state;
    let icon_name = ""
    let setAccess = null
    let setAutomationbol = false
    if (!setAutomation) {
      icon_name = "ios-eye"
      setAccess = false
      setAutomationbol = true
    }
    else {
      icon_name = "ios-eye-off"
      setAccess = true
      setAutomationbol = false
    }
    this.setState({
      setAutomation: setAutomationbol,
      setAutomationIcon: icon_name,
      Icon_ASL_ISL: "ASL",
      ASL_ISL_IconAccess: setAccess,
      classificationResult: ''
    })
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

  enableVoice = () => {
    let Data = "";
    if (this.state.voiceOnOff === true) {
      Data = "ios-volume-mute"
      ToastAndroid.show("Voice Off", ToastAndroid.SHORT)
    }
    else {
      Data = "ios-volume-high"
      ToastAndroid.show("Voice On", ToastAndroid.SHORT)
    }
    this.setState({ spicIcon: Data, voiceOnOff: this.state.voiceOnOff === true ? false : true })
  }

  imageClassifier = (data) => {
    let modelName = !this.state.setAutomation ?
      this.state.Icon_ASL_ISL === "ASL" ? 'models/asl_modal.tflite' :
        'models/imageClassifier_M.tflite' : "models/automation_model.tflite";
    let modelLabels = !this.state.setAutomation ?
      this.state.Icon_ASL_ISL === "ASL" ? 'models/labels_asl.txt' :
        'models/labels_2.txt' : "models/automation_label.txt";
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
          let label = '';
          res.map((labeldata) => {
            this.setState((prevState) => ({
              classificationResult: !this.state.setAutomation ? prevState.classificationResult + labeldata.label : labeldata.label,
            }))
            label = labeldata.label
          })
          {
            this.state.voiceOnOff ? Tts.speak(`${label}`) : null
          }
          RNFS.unlink(data);
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

  deleteClassificationData = () => {
    this.setState({ classificationResult: '' })
  }

  toggle = value => () =>
    this.setState(prevState => ({ [value]: !prevState[value] }));

  // Firebase Config

  send = async () => {
    let { classificationResult } = this.state;
    if (classificationResult != '') {

      let { classificationResult } = this.state;
      const message = {
        text: classificationResult,
        timestamp: database.ServerValue.TIMESTAMP,
        user_id: "1111",
        place: "Bhusawal"
      }
      this.db.push(message)
      this.deleteClassificationData();
    }
  };

  off() {
    this.db.off()
  }

  get db() {
    const path = "1111";
    //const path = "messages/";
    return (database().ref(`history/${path}`))
  }

  onTpModalPress = () => {
    this.props.navigation.navigate("TextToGesture")
    this.setState({ isModalVisible: false })
  }

  //RenderModal
  renderTPModal = () => {
    let { isModalVisible } = this.state;
    return (
      <View>
        <Modal
          isVisible={isModalVisible}
          backdropOpacity={0.8}
          animationIn={"slideInUp"}
          style={styles.__tpModal}
          animationOut={"slideOutDown"}
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          swipeDirection={['down']}
          onSwipeComplete={() => { this.setState({ isModalVisible: false }) }}
        >
          <View style={styles.__tpModalView}>
            <TouchableOpacity onPress={() => { this.onTpModalPress() }} style={styles.__tpModalButton}>
              <Text style={styles.__tpModalButtonText}>
                Text To Gesture
              </Text>
            </TouchableOpacity>
            <Icon onPress={() => { this.setState({ isModalVisible: false }) }} style={styles.__tpModalIcon} name={"ios-arrow-up"} size={26} color={"#ffffff"} />
          </View>
        </Modal>
      </View>
    )
  }

  //render Camera
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
            CenterOnPress={() => { this.setState({ isModalVisible: true }) }}
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
            onPress={() => { this.send() }}
            automation={this.state.setAutomation}
          />
          <C_Footer
            spicIcon={this.state.spicIcon}
            ASL_ISL_Icon={"ASL"}
            LeftIconName={this.state.setAutomationIcon}
            LeftIconColor={"white"}
            LeftIconSize={26}
            LeftOnPress={() => { this.setAutomation() }}
            CenterIconName={"ios-radio-button-on"}
            CenterIconColor={"white"}
            CenterIconSize={65}
            CenterLeftOnPress={() => { this.enableVoice() }}
            CenterOnPress={this.takePicture.bind(this)}
            RightIconName={"ios-reverse-camera"}
            RightIconColor={"white"}
            RightIconSize={34}
            ASL_ISL_IconAccess={this.state.ASL_ISL_IconAccess}
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
        {this.renderTPModal()}
        {this.renderCamera()}
      </View>);
  }
}

export default Camera_S;
