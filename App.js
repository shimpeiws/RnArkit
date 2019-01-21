/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ARKit } from 'react-native-arkit';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          debug
          // enable plane detection (defaults to Horizontal)
          planeDetection={ARKit.ARPlaneDetection.Horizontal}
          // enable light estimation (defaults to true)
          lightEstimationEnabled
          // get the current lightEstimation (if enabled)
          // it fires rapidly, so better poll it from outside with
          // ARKit.getCurrentLightEstimation()
          onLightEstimation={e => console.log(e.nativeEvent)}
          // event listener for (horizontal) plane detection
          onPlaneDetected={anchor => console.log(anchor)}
          // event listener for plane update
          onPlaneUpdated={anchor => console.log(anchor)}
          // arkit sometimes removes detected planes
          onPlaneRemoved={anchor => console.log(anchor)}
          // event listeners for all anchors, see [Planes and Anchors](#planes-and-anchors)
          onAnchorDetected={anchor => console.log(anchor)}
          onAnchorUpdated={anchor => console.log(anchor)}
          onAnchorRemoved={anchor => console.log(anchor)}
          // you can detect images and will get an anchor for these images
          // detectionImages={[{ resourceGroupName: 'DetectionImages' }]}
          onARKitError={console.log} // if arkit could not be initialized (e.g. missing permissions), you will get notified here
        >
          <ARKit.Box
            position={{ x: 0, y: 0, z: 0 }}
            shape={{ width: 0.1, height: 0.1, length: 0.1, chamfer: 0.01 }}
          />
          <ARKit.Sphere position={{ x: 0.2, y: 0, z: 0 }} shape={{ radius: 0.05 }} />
          <ARKit.Cylinder position={{ x: 0.4, y: 0, z: 0 }} shape={{ radius: 0.05, height: 0.1 }} />
          <ARKit.Cone
            position={{ x: 0, y: 0.2, z: 0 }}
            shape={{ topR: 0, bottomR: 0.05, height: 0.1 }}
          />
          <ARKit.Plane
            eulerAngles={{ x: Math.PI / 2 }}
            position={{ x: 0.2, y: 0.15, z: 0 }}
            shape={{ width: 0.1, height: 0.1 }}
          />
          <ARKit.Tube
            position={{ x: 0.4, y: 0.2, z: 0 }}
            shape={{ innerR: 0.03, outerR: 0.05, height: 0.1 }}
          />
          <ARKit.Torus position={{ x: 0, y: 0.4, z: 0 }} shape={{ ringR: 0.06, pipeR: 0.02 }} />
          <ARKit.Capsule position={{ x: 0.2, y: 0.4, z: 0 }} shape={{ capR: 0.02, height: 0.06 }} />
          <ARKit.Plane position={{ x: 0.4, y: 0.4, z: 0 }} shape={{ width: 0.1, height: 0.1 }} />
          <ARKit.Text
            text="ARKit is Cool!"
            position={{ x: 0.2, y: 0.6, z: 0 }}
            font={{ size: 0.15, depth: 0.05 }}
          />
          <ARKit.Light position={{ x: 1, y: 3, z: 2 }} type={ARKit.LightType.Omni} color="white" />
          <ARKit.Light
            position={{ x: 0, y: 1, z: 0 }}
            type={ARKit.LightType.Spot}
            eulerAngles={{ x: -Math.PI / 2 }}
            spotInnerAngle={45}
            spotOuterAngle={45}
            color="green"
          />
          <ARKit.Model
            position={{ x: -0.2, y: 0, z: 0, frame: 'local' }}
            scale={0.01}
            model={{
              scale: 1, // this is deprecated, use the scale property that is available on all 3d objects
              file: 'art.scnassets/ship.scn' // make sure you have the model file in the ios project
            }}
          />
        </ARKit>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
