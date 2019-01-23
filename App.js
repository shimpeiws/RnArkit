/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { ARKit } from 'react-native-arkit';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      cameraX: 0.0,
      cameraY: 0.0,
      cameraZ: 0.0
    };
  }
  handleChangeText = async () => {
    const pos = await ARKit.getCameraPosition();
    console.log('shutter pressed', pos);
    this.setState({
      cameraX: pos.x,
      cameraY: pos.y,
      cameraZ: pos.z
    });
  };
  renderOctocat = position => {
    return (
      <ARKit.Plane
        position={position}
        shape={{ width: 0.1, height: 0.1 }}
        material={{
          diffuse: { path: 'assets/octocat', intensity: 1 }
        }}
      />
    );
  };
  render() {
    const { cameraZ } = this.state;
    console.info('this.state', this.state);
    console.info('cameraZ', cameraZ);
    const zPosition = cameraZ - 0.3;
    console.info('zPosition', zPosition);
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
          // onLightEstimation={e => console.log(e.nativeEvent)}
          // event listener for (horizontal) plane detection
          // onPlaneDetected={anchor => console.log('onPlaneDetected', anchor)}
          // event listener for plane update
          // onPlaneUpdated={anchor => console.log('onPlaneUpdated', anchor)}
          // arkit sometimes removes detected planes
          // onPlaneRemoved={anchor => console.log(anchor)}
          // event listeners for all anchors, see [Planes and Anchors](#planes-and-anchors)
          // onAnchorDetected={anchor => console.log('onAnchorDetected', anchor)}
          // onAnchorUpdated={anchor => console.log('onAnchorUpdated', anchor)}
          // onAnchorRemoved={anchor => console.log('onAnchorRemoved', anchor)}
          // you can detect images and will get an anchor for these images
          // detectionImages={[{ resourceGroupName: 'DetectionImages' }]}
          onARKitError={console.log} // if arkit could not be initialized (e.g. missing permissions), you will get notified here
        >
          {this.renderOctocat({ x: 0, y: 0, z: zPosition })}
          {this.renderOctocat({ x: 0.2, y: 0, z: zPosition })}
          {this.renderOctocat({ x: 0.4, y: 0, z: zPosition })}
          {this.renderOctocat({ x: 0, y: 0.2, z: zPosition })}
          {this.renderOctocat({ x: 0.2, y: 0.2, z: zPosition })}
          {this.renderOctocat({ x: 0.4, y: 0.2, z: zPosition })}
          {this.renderOctocat({ x: 0, y: 0.4, z: zPosition })}
          {this.renderOctocat({ x: 0.2, y: 0.4, z: zPosition })}
          {this.renderOctocat({ x: 0.4, y: 0.4, z: zPosition })}
          <ARKit.Text
            text="ARKit is Cool!"
            position={{ x: 0.2, y: 0.6, z: zPosition }}
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
            position={{ x: -0.2, y: 0, z: zPosition, frame: 'local' }}
            scale={0.01}
            model={{
              scale: 1, // this is deprecated, use the scale property that is available on all 3d objects
              file: 'art.scnassets/ship.scn' // make sure you have the model file in the ios project
            }}
          />
        </ARKit>
        <Button onPress={this.handleChangeText} title="Shutter" color="#841584" />
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
