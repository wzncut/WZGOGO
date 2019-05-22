/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class DevicesScene{

      deviceName:string;
	  deviceMac:string ;
	  devicePosition:string ;
	  deviceType:string ;
	  deviceProtype:string ;
	  sceneName:string ;
	  sceneNumber:string ;
	  deviceState:string ;

	getDeviceName() {
		return deviceName;
	}
	setDeviceName(deviceName:string) {
		this.deviceName = deviceName;
	}
	getDeviceMac() {
		return deviceMac;
	}
	setDeviceMac(deviceMac:string) {
		this.deviceMac = deviceMac;
	}
	getDevicePosition() {
		return devicePosition;
	}
	setDevicePosition(devicePosition:string) {
		this.devicePosition = devicePosition;
	}
	getDeviceType() {
		return deviceType;
	}
	setDeviceType( deviceType:string) {
		this.deviceType = deviceType;
	}
	getDeviceProtype() {
		return deviceProtype;
	}
	setDeviceProtype(deviceProtype:string ) {
		this.deviceProtype = deviceProtype;
	}
	getSceneName() {
		return sceneName;
	}
	setSceneName(sceneName:string ) {
		this.sceneName = sceneName;
	}
	getSceneNumber() {
		return sceneNumber;
	}
	setSceneNumber(sceneNumber:string ) {
		this.sceneNumber = sceneNumber;
	}
	getDeviceState() {
		return deviceState;
	}
	setDeviceState(deviceState:string ) {
		this.deviceState = deviceState;
	}

}