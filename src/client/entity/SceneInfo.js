import console = require("console");

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class SceneDevice{
    number:string ;
	name:string ;
	
	getNumber() {
		return number;
	}
	setNumber(number:string ) {
		this.number = number;
	}
	getName() {
		return name;
	}
	setName(name:string ) {
		this.name = name;
	}
	
	// 重载tostring()函数

	tostring() {
		let sceneStr="";
		sceneStr += this.getNumber()+" ";
		sceneStr += this.getName();
		return sceneStr;
	}
	
	// 使用 tostring() 函数构造的字符串，给对象赋值
	setObject(tostring:string ){
        let array=new Array()
		array = tostring.split(" ");
		if(array.length < 2){
			console.log("[SceneInfo] Wrone string");
			return false;
		}
		this.setNumber(array[0]);
		this.setName(array[1]);
		return true;
	}
}