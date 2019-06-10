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
import DatabaseTools from '../until/DatabaseTools'
import SQLite from '../../db/SQLite'
// const gatewayMac=11
var sqLite = new SQLite();
var db;
export default class ServiceTools{
static errorMessage;
static sceneDeviceTableName='scenedevice'
static getErrorMessage(){
    return ServiceTools.errorMessage;
}

static setErrorMessage(mess:string){
    if(mess==null){
        ServiceTools.errorMessage=null;
    }
    else{
        ServiceTools.errorMessage=mess;
    }
}

static executeResponseData(response:DataResponse){
    // console.log('2222222222222222')
    let responseData=response.getResData();
    // console.log(responseData)
    let dataArray=new Array();
    dataArray=responseData.split("\n");
    console.log(dataArray[0])
    console.log(dataArray[1])
    try{
        let lineNumber =0;
        for(let line of dataArray){
            lineNumber=lineNumber+1;
            let lineArray=new Array();
            lineArray=line.split(":");
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
            // 如果是操作设备信息表
            if(tableName.toLocaleLowerCase()=="deviceinfo".toLocaleLowerCase()){
            if(tableOperate.toLocaleLowerCase()=="insert".toLocaleLowerCase()){
                let dev= new DeviceInfo();
                if(dev.setObject(content)){
                    DatabaseTools.insertDeviceInfo(dev);//////////未写
                }
            }
            else if(tableOperate.toLocaleLowerCase()=="update".toLocaleLowerCase()){
                let dev=new DeviceInfo();
                if(dev.setObject(content)){
                    DatabaseTools.updateDeviceInfo(dev);
                }
            }
            else if(tableOperate.toLocaleLowerCase()=="delete".toLocaleLowerCase()){
                DatabaseTools.deleteDeviceInfo(content);
            }
            else{
                this.setErrorMessage("[错误报告 102]云端响应报文,数据域第"+lineNumber+"行,无法识别的操作");
                break;
            }
            }   

            // 如果是操作情景模式表
            else if(tableName.toLocaleLowerCase()=="sceneinfo".toLocaleLowerCase())
            {
                // 如果是插入操作
                if(tableOperate.toLocaleLowerCase()=="insert".toLocaleLowerCase()){
                    let scene = new SceneInfo();
                    if(scene.setObject(content)){
                        DatabaseTools.insertSceneInfo(scene);
                    }
                }
                // 如果是更新操作
                else if(tableOperate.toLocaleLowerCase()=="update".toLocaleLowerCase()){
                    let scene = new SceneInfo();
                    if(scene.setObject(content)){
                        DatabaseTools.updateSceneInfo(scene);
                    }
                }
                // 如果是删除操作
                else if(tableOperate.toLocaleLowerCase()=="delete".toLocaleLowerCase()){
                    DatabaseTools.deleteSceneInfo(content);
                }
                else{
                    this.setErrorMessage("[错误报告 102]云端响应报文,数据域第"+lineNumber+"行,无法识别的操作");
                    break;
                }
            }
            // 如果是操作情景关系表
            else if(tableName.toLocaleLowerCase()=="sceneDevice".toLocaleLowerCase())
            {
                // 如果是插入操作
                if(tableOperate.toLocaleLowerCase()=="insert".toLocaleLowerCase()){
                    let sd = new SceneDevice();
                    if(sd.setObject(content)){
                        DatabaseTools.insertSceneDevice(sd);
                    }
                }
                // 如果是更新操作
                else if(tableOperate.toLocaleLowerCase()=="update".toLocaleLowerCase()){
                    let sd = new SceneDevice();
                    if(sd.setObject(content)){
                        DatabaseTools.updateSceneDevice(sd);
                    }
                }
                // 如果是删除操作
                else if(tableOperate.toLocaleLowerCase()=="delete".toLocaleLowerCase()){
                    DatabaseTools.deleteSceneDevice(content);
                }
                else{
                    this.setErrorMessage("[错误报告 102]云端响应报文,数据域第"+lineNumber+"行,无法识别的操作");
                    break;
                }
            }
            // 如果是 delete#all#all, 则清空3张表
            else if((tableOperate.toLocaleLowerCase()=="delete".toLocaleLowerCase())&&(tableName.toLocaleLowerCase()=="all".toLocaleLowerCase())&&(content.toLocaleLowerCase()=="all".toLocaleLowerCase())){
                DatabaseTools.clearSceneDeviceTable();
                DatabaseTools.clearDeviceInfoTable();
                DatabaseTools.clearSceneInfoTable();
                DatabaseTools.clearHomeLogTable();
            }
            else
            {
                console.log("[错误报告 103]云端响应报文,数据域第"+lineNumber+"行,无法识别的表名");
                this.setErrorMessage("[错误报告 103]云端响应报文,数据域第"+lineNumber+"行,无法识别的表名");
                break;
            }
        }
    }
    
    catch{
        console.log("捕捉到数据域格式错误")
    }
}

static hasNewData(){
    let hasNewData=false;
    let list =new Array();
    // let HomeLog=new Object();
    list=DatabaseTools.selectLogTable()
    if(list.length > 0){
        hasNewData = true;
    }
    else{
        hasNewData = false;
    }
    //
    console.log(hasNewData);
    return hasNewData;
}

static  getClientNewData(){
    let newData='';
    let homelog =new Array();
    homelog=DatabaseTools.selectLogTable();
    let data='';
    let length=homelog.length;
    for(i=0;i<length;i++){
        if(homelog[i]!=null){
            let operateLine = this.getLogOperate(homelog[i]);
            if(operateLine != null){
				data += operateLine;  // operateLine 是以行位单位的
			}
        }
    }
    if(data.length==0){
        newData=null;
    }
    else{
        newData = data;
    }
    return newData;
}

static clearLogTable(){
    db.transaction((tx) => {
        tx.executeSql("truncate homelog",[],(tx,results)=>{ 
        });
    }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
        this._errorCB('transaction', err);
    }, () => {
        this._successCB('transaction');
    });
}
static getLogOperate(log:HomeLog){
        let logStr='';
		let logOperate = log.getOperate();
		let logTableName = log.getTablename();
        let logTableKey = log.getTablekey();
        // 如果是删除操作
        if(logOperate.toLocaleLowerCase()=="delete".toLocaleLowerCase()){
			if((logTableName.toLocaleLowerCase()=="all".toLocaleLowerCase())&&(logTableKey.toLocaleLowerCase()=="all".toLocaleLowerCase())){
				logStr = "Data:delete#all#all\n";
				let insertAllDeviceInfo = DatabaseTools.getAllDeviceInfo();
				let insertAllSceneInfo = DatabaseTools.getAllSceneInfo();
				let insertAllSceneDevice = DatabaseTools.getAllSceneDevice();
				logStr += insertAllDeviceInfo;
				logStr += insertAllSceneInfo;
				logStr += insertAllSceneDevice;
				return logStr;
			}
			else{
				logStr = "Data:delete#"+logTableName+"#"+logTableKey+"\n";
				return logStr;
			}
        }
        // 如果是插入或更新操作，则查询对应的表
        let mess = '';	// 查询出的字段
        if(logTableName.toLocaleLowerCase()=="deviceinfo".toLocaleLowerCase()){
            let dev= DatabaseTools.selectDeviceInfo(logTableKey);
			if(dev==null){
				mess =null;
			}
			else{
				mess = dev.toString();
			}
        }
        else if(logTableName.toLocaleLowerCase()=="sceneinfo".toLocaleLowerCase()){
			let scene = DatabaseTools.selectSceneInfo(logTableKey);
			if(scene == null){
				mess =null;
			}
			else{
				mess =scene.toString();
			}
        }
        else if(logTableName.toLocaleLowerCase()=="scenedevice".toLocaleLowerCase()){
            // DatabaseTools.selectSecneDevice(logTableKey, function(sde) {
                
            // })
			let sde = DatabaseTools.selectSecneDevice(logTableKey);
			if(sde == null){
				mess =null;
			}
			else{
				mess = sde.toString();
			}
        }
        else{
			console.log("[DatabaseTools.getOperate()] Erorr logTableName");
        }
        if(mess==null){
			return null;
        }
        logStr = "Data:"+logOperate+"#"+logTableName+"#"+mess+"\n";
		
		return logStr;
}
}