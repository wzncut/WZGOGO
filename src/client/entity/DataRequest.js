/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class DataRequest{
    keyword:string
    gatewayMac:string
    reqData:string

    getKeyword(){
        return this.keyword
    }

    getGatewayMac(){
        return this.gatewayMac
    }

    getReqData(){
        return this.reqData
    }

    setKeyword(keyword){
        this.keyword=keyword
    }

    setGatewayMac(gatewayMac){
        this.gatewayMac=gatewayMac
    }

    setReqData(reqData){
        this.reqData=reqData
    }
    
    setReqTitle(title:string) {
        let str=new Array()
		str=title.split(" ");
		this.setKeyword(str[0]);
		this.setGatewayMac(str[1]);		
	}
    getReqTitle(){
		return "HEAD:"+this.keyword+" "+this.gatewayMac;
    }
    
    addRequestData( reqData:string){
		if(this.reqData==null){
			this.reqData = "DATA:"+reqData+"\n";
		}
		else{
			this.reqData +="DATA:"+reqData+"\n";
		}
    }
    
    toString(){		
		if(this.reqData==null){
			return this.getReqTitle()+"\n";
		}
		else{
			return this.getReqTitle()+"\n"+this.getReqData();
		}
	}
}


