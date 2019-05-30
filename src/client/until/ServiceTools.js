/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import DataResponse from '../entity/DataResponse'
import DeviceInfo from '../entity/DeviceInfo'
import HomeLog from '../entity/HomeLog'
import SceneDevice from '../entity/SceneDevice'
import SceneInfo from '../entity/SceneInfo'
import properties from '../../properties'
import console = require('console');
// const gatewayMac=11
export default class ServiceTools{
static errorMessage='';
static sceneDeviceTableName='scenedevice'
static getErrorMessage(){
    return ServiceTools.errorMessage;
}

static setErrorMessage(mess:string){
    if(mess==null){
        errorMessage=null;
    }
    else{
        errorMessage=mess;
    }
}

static executeResponseData(response:DataResponse){
    let responseData=response.setResData();
    let dataArray=new Array();
    dataArray=responseData.split("\n");
    try{
        let lineNumber =0;
        for(line of dataArray){
            lineNumber=lineNumber+1;
            let lineArray=new Array();
            lineArray=line.split(":")
            if(lineArray.length!=2){
                continue;
            }
            let lineContent =lineArray[1];
            let contentArray=new Array();
            contentArray=lineContent.split("#");
            if(contentArray.length!=3){
                console.log("[错误报告 101]云端相应报文,数据域第"+lineNumber+"行,格式错误(关于#号)");
                this.setErrorMessage("[错误报告 101]云端相应报文,数据域第"+lineNumber+"行,格式错误(关于#号)");
            }
            let tableOperate = contentArray[0];		
			let tableName = contentArray[1];	
			let content = contentArray[2];
            if(tableName.equalsIgnoreCase("deviceinfo")){
            if(tableOperate.equalsIgnoreCase("insert")){
                let dev= new DeviceInfo();
                if(dev.setObject(content)){
                    DatabaseTools.insertDeviceInfo(dev);//////////未写
                }
            }
            else if(tableOperate.equalsIgnoreCase("update")){
                let dev=new DeviceInfo();
                if(dev.setObject(content)){
                    DatabaseTools.updateDeviceInfo(dev);
                }
            }
            
            }   
        }
    }
    catch{

    }
}


}