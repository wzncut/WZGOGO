/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class DataResponse{

    keyword:string	// 关键字

	// 数据域内容
	resData:string		// 数据域
		
	//------------------ gets 和 sets 函数 ---------------------
    getKeyword() {
		return this.keyword;
	}
	setKeyword(keyword:string ) {
		this.keyword = keyword;
	}
	getResData() {
		return this.resData;
	}
	setResData(resData:string ) {
		this.resData = resData;
	}
	//---------------------------------------------
	
	// 设置响应行
	setResTitle(title:string ){
		this.keyword=title;
	}
	
	// 获取响应行
	getResTitle() {
		return "HEAD:"+this.keyword;
	}
	
	// 添加数据域
	addResponseData(resData:string ){
		if(this.resData==null){
			this.resData = "DATA:"+resData+"\n";
		}
		else{
			this.resData += "DATA:"+resData+"\n";
		}
	}

	
	toString(){
		if(this.resData==null){
			return this.getResTitle()+"\n";
		}
		else{
			return this.getResTitle()+"\n"+this.getResData();
		}
	}

}