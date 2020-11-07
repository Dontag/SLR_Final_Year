import React, { Component } from 'react';
import Tflite from 'tflite-react-native';
import { View } from 'react-native';

//redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

let tflite = new Tflite();
let dataLite = '';

export default class ImageClassifier extends Component {
  imageClassifier = (props) => {
    const cameraContextData = useContext(CameraContext);
    const [ResultData, setResultData] = useState({
      ResultState: ''
    })

    tflite.loadModel({
      model: 'models/imageClassifier_M.tflite',// required
      labels: 'models/labels.txt',  // required
      numThreads: 1,                              // defaults to 1
    },
      (err, res) => {
        if (err)
          console.log(err);
        else
          console.log(res);
      });


    if (cameraContextData.EnableClassifier) {
      tflite.runModelOnImage({
        path: cameraContextData.SnapData,
        imageMean: 128.0,
        imageStd: 128.0,
        numResults: 1,
        threshold: 0.05
      },
        (err, res) => {
          if (err) {
            console.log(err);
          }

          else {
            console.log(res);
            res.map((labeldata) => {
              setResultData({
                ResultState: labeldata.label,
              });
            })

          }

        });

      console.log("Results", ResultData.ResultState);
      tflite.close();
      return ResultData.ResultState;
    }
    else {
      tflite.close();
      return "No Data Yet";
    }


  }
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    enableClassifier: state.setEnableClassifier
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setData: (setSnapData) => dispatch(actions.setClassifierData(setSnapData)),
    setEnableClassifier: (setEnableClassifier) => dispatch(actions.setClassifierEnable(setEnableClassifier))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(imageClassifier);

