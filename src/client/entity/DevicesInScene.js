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
		return this. deviceName;
	}
	setDeviceName(deviceName:string) {
		this.deviceName = deviceName;
	}
	getDeviceMac() {
		return this.deviceMac;
	}
	setDeviceMac(deviceMac:string) {
		this.deviceMac = deviceMac;
	}
	getDevicePosition() {
		return this.devicePosition;
	}
	setDevicePosition(devicePosition:string) {
		this.devicePosition = devicePosition;
	}
	getDeviceType() {
		return this.deviceType;
	}
	setDeviceType( deviceType:string) {
		this.deviceType = deviceType;
	}
	getDeviceProtype() {
		return this.deviceProtype;
	}
	setDeviceProtype(deviceProtype:string ) {
		this.deviceProtype = deviceProtype;
	}
	getSceneName() {
		return this.sceneName;
	}
	setSceneName(sceneName:string ) {
		this.sceneName = sceneName;
	}
	getSceneNumber() {
		return this.sceneNumber;
	}
	setSceneNumber(sceneNumber:string ) {
		this.sceneNumber = sceneNumber;
	}
	getDeviceState() {
		return this.deviceState;
	}
	setDeviceState(deviceState:string ) {
		this.deviceState = deviceState;
	}

}