/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class SceneDevice{
    tablekey:string ;
	scenenum:string ;
	devicemac:string ;
	devicestate:string ;
	
	
	getTablekey() {
		return tablekey;
	}
	setTablekey(tablekey:string ) {
		this.tablekey = tablekey;
	}
	getScenenum() {
		return scenenum;
	}
	setScenenum(scenenum:string ) {
		this.scenenum = scenenum;
	}
	getDevicemac() {
		return devicemac;
	}
	setDevicemac(devicemac:string ) {
		this.devicemac = devicemac;
	}
	getDevicestate() {
		return devicestate;
	}
	setDevicestate(devicestate:string ) {
		this.devicestate = devicestate;
	}
	
	// 重载tostring()函数
	tostring() {
		let sceneDeviceStr="";
		sceneDeviceStr += this.getTablekey()+" ";
		sceneDeviceStr += this.getScenenum()+" ";
		sceneDeviceStr += this.getDevicemac()+" ";
		sceneDeviceStr += this.getDevicestate();
		return sceneDeviceStr;
	}
	
	// 使用 tostring() 函数构造的字符串，给对象赋值
	setObject(tostring:string ){
        let array=new Array()
		array = tostring.split(" ");
		if(array.length < 4){
			System.out.println("[SceneDevice] Wrone string");
			return false;
		}
		this.setTablekey(array[0]);
		this.setScenenum(array[1]);
		this.setDevicemac(array[2]);
		this.setDevicestate(array[3]);
		return true;
	}
}