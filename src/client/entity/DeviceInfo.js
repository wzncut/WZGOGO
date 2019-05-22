/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class DeviceInfo{
    mac:string ;
    name:string;
	position:string ;
	type:string ;
	protype:string ;

	getName() {
		return name;
	}

	etName(name:string ) {
		this.name = name;
	}

	getMac() {
		return mac;
	}

    setMac(mac:string) {
		this.mac = mac;
	}

	getPosition() {
		return position;
	}

	setPosition(position:string ) {
		this.position = position;
	}

	getType() {
		return type;
	}

	etType(type:string ) {
		this.type = type;
	}

	getProtype() {
		return protype;
	}

	setProtype(protype:string) {
		this.protype = protype;
	}

	// 重载toString()函数

	toString() {
		let deviceStr="";
		deviceStr += this.getMac()+" ";
		deviceStr += this.getName()+" ";
		deviceStr += this.getPosition()+" ";
		deviceStr += this.getType()+" ";
		deviceStr += this.getProtype();
		return deviceStr;
	}
	
	// 使用 toString() 函数构造的字符串，给对象赋值
	setObject(toString:string ){
        let array=new Array()
		array = toString.split(" ");
		if(array.length < 5){
			System.out.println("[DeviceInfo] Wrone String");
			return false;
		}
		this.setMac(array[0]);
		this.setName(array[1]);
		this.setPosition(array[2]);
		this.setType(array[3]);
		this.setProtype(array[4]);
		return true;
	}
}