import React, { useState, Component, useContext } from 'react';
import Tflite from 'tflite-react-native';
import GTT_C_S from '../components/GTT_Camera_C';
import { View } from 'react-native';
import CameraContext from '../../Context/cameraDataContext';

let tflite = new Tflite();
let dataLite = '';
const imageClassifier = (props) => {
  const cameraContextData = useContext(CameraContext);
  const [ResultData, setResultData] = useState({
    ResultState: ''
  })

  tflite.loadModel({
    model: 'models/imageClassifier_M.tflite',// required
    labels: 'models/labels.txt',  // required
    // model: 'models/Emotion_Model.tflite',// required
    // labels: 'models/Emotion_Labels.txt',  // required
    numThreads: 1,                              // defaults to 1
  },
    (err, res) => {
      if (err)
        console.log(err);
      else
        console.log(res);
    });


  if (cameraContextData.EnableClassifier) {

// Simple classifier
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

export default imageClassifier;

