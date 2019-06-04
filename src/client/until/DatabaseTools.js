/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import DeviceInfo from '../entity/DeviceInfo'
import HomeLog from '../entity/HomeLog'
import SceneDevice from '../entity/SceneDevice'
import SceneInfo from '../entity/SceneInfo'
import SQLite from '../../db/SQLite'
var sqLite = new SQLite();
var db;
export default class DatabaseTools{
    static selectLogTable(){
        let logList=new Array();
        db = sqLite.open();
        db.transaction((tx) => {
        tx.executeSql("select * from homelog where syn='false'",[],(tx,results)=>{
            let len=results.rows.length;
            for (let i = 0; i < len; i++) {
                let log=new HomeLog();
                var u = results.rows.item(i);
                //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                // console.log('--------------------------');
                // console.log(JSON.stringify(u));
                // alert(u.mac + u.NAME + u.POSITION + u.TYPE + u.protype);
                log.setOperate(u.operate);
                log.setTablename(u.tablename);
                log.setTablekey(u.tablekey);
                log.setSynsyn(u.syn);
                logList.push(log);
              }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
        this._errorCB('transaction', err);
        }, () => {
        this._successCB('transaction');
        });
        return logList
    }


    static selectDeviceInfo(mac:string){
        let dev=new DeviceInfo();
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from deviceinfo where mac = ?",[mac],(tx,results)=>{ 
                var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                    var u = results.rows.item(i);
                    //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                    // console.log('--------------------------');
                    // console.log(JSON.stringify(u));
                    // alert(u.mac + u.NAME + u.POSITION + u.TYPE + u.protype);
                    dev.setMac(u.mac);
                    dev.setName(u.name);
                    dev.setPosition(u.position);
                    dev.setType(u.type);
                    dev.setProtype(u.protype);
                    }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return dev
    }

    static selectSceneInfo(number:string){
        let scene=new SceneInfo()
        db = sqLite.open();
        db.transaction((tx) => {
        tx.executeSql("select * from sceneinfo where number = ?",[number],(tx,results)=>{ 
            var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                var u = results.rows.item(i);
                //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                // console.log('--------------------------');
                // console.log(JSON.stringify(u));
                // alert(u.mac + u.NAME + u.POSITION + u.TYPE + u.protype);
               scene.setName(u.name);
               scene.setNumber(u.number);
            }
        });
    }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
        this._errorCB('transaction', err);
    }, () => {
        this._successCB('transaction');
    });

    return scene;
    }

    static selectSecneDevice(tableKey, fn){
        let sde=new SceneDevice();
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("select * from scenedevice where tablekey = ?",[tableKey],(tx,results)=>{ 
                var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                    var u = results.rows.item(i);
                    //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                    // console.log('--------------------------');
                    // console.log(JSON.stringify(u));
                    // alert(u.mac + u.NAME + u.POSITION + u.TYPE + u.protype);
                   sde.setTablekey(u.tablekey);
                   sde.setScenenum(u.scenenumber);
                   sde.setDevicemac(u.devicemac);
                   sde.setDevicestate(u.devicestate);
                   fn(sde);
                }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return sde;
    }

    // *********** 操作设备信息表 *************
    // ============ 向设备信息表中插入数据 =================

    static insertDeviceInfo(dev:DeviceInfo){
        let result=true;
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("delete from deviceinfo where mac=?",[mac],(tx,results)=>{ 
            });
            tx.executeSql("insert into  deviceinfo(mac,NAME,POSITION,TYPE,protype) VALUES(?,?,?,?,?)",[dev.getMac(),dev.getName(),dev.getPosition(),dev.getType(),dev.getProtype()],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='deviceinfo' and tablekey=?",[dev.getMac()],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

    // ============ 向设备信息表中更新数据 =================
    static updateDeviceInfo(dev:DeviceInfo){
        let result=true;
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("update deviceinfo set NAME=?,POSITION=?,TYPE=?,protype=? where mac=?",[dev.getMac(),dev.getName(),dev.getPosition(),dev.getType(),dev.getProtype()],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='deviceinfo' and tablekey=?",[dev.getMac()],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }
    // ============ 删除设备信息表中数据 =================
    static deleteDeviceInfo(mac:string){
        let result=true;
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("delete from deviceinfo where mac=?",[mac],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='deviceinfo' and tablekey=?",[mac],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }
    // ************ 操作情景模式表 *****************
	// ============ 向情景模式表中插入数据 =================
    static insertSceneInfo(scene:SceneInfo){
        let result=true;
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("delete from sceneinfo where number=?",[scene.getNumber()],(tx,results)=>{ 
            });
            tx.executeSql("insert into  sceneinfo(number,name) VALUES(?,?)",[scene.getNumber(),scene.getName()],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='sceneinfo' and tablekey=?",[scene.getNumber(),scene.getName()],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

    // ============ 向情景模式表中更新数据 =================
    static updateSceneInfo(scene:SceneInfo){
        let result=true;
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("update sceneinfo set NAME=? where number=?",[scene.getName(),scene.getNumber()],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='sceneinfo' and tablekey=?",[scene.getNumber(),scene.getName()],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

      // ============ 删除情景模式表中数据 =================
      static deleteSceneInfo(number:string){
        let result=true;
        db = sqLite.open();
        db.transaction((tx) => {
            tx.executeSql("delete from sceneinfo where number=?",[number],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='sceneinfo' and tablekey=?",[number],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

    // ************ 操作情景关系表 ****************
    // ============ 向情景关系表中插入数据 =================
    static insertSceneDevice(sde:SceneDevice){
        let result = true;
        let hasDevice=this.hasDevice(sde.getDevicemac());
        let hasScene=this.hasScene(sde.getScenenum());
        if(!hasDevice){
			console,log(sde.getDevicemac()+"Not exist at deviceinfo table");
			return false;
        }
        if(!hasScene){
			console.log(sde.getScenenum()+"Not exist at sceneinfo table");
			return false;
        }
        db.transaction((tx) => {
            tx.executeSql("delete from scenedevice where tablekey=?",[sde.getTablekey()],(tx,results)=>{ 
            });
            tx.executeSql("insert into  scenedevice(tablekey,scenenumber,devicemac,devicestate) VALUES(?,?,?,?)",[sde.getTablekey(),sde.getScenenum(),sde.getDevicemac(),sde.getDevicestate()],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='scenedevice' and tablekey=?",[sde.getTablekey()],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

    // ============ 向情景关系表中更新数据 =================
	 static updateSceneDevice(sde:SceneDevice){
         let result = true;
         db.transaction((tx) => {
            tx.executeSql("update scenedevice set scenenumber=?,devicemac=?,devicestate=? where tablekey=?",[sde.getScenenum(),sde.getDevicemac(),sde.getDevicestate(),sde.getTablekey()],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='scenedevice' and tablekey=?",[sde.getTablekey()],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

     // ============ 删除情景关系表中数据 =================
    static deleteSceneDevice(tablekey:string ){
        let result = true;
        db.transaction((tx) => {
            tx.executeSql("delete from scenedevice where tablekey=?",[tablekey],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='scenedevice' and tablekey=?",[tablekey],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return result;
    }

    // 清空 deviceinfo表
    static clearDeviceInfoTable(){
        db.transaction((tx) => {
            tx.executeSql("delete from deviceinfo",[],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='deviceinfo'",[],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }

    // 清空 sceneinfo表
    static clearSceneInfoTable(){
        db.transaction((tx) => {
            tx.executeSql("delete from sceneinfo",[],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='sceneinfo'",[],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }

    // 清空 scenedevice表中的数据
    static clearSceneDeviceTable(){
        db.transaction((tx) => {
            tx.executeSql("delete from scenedevice",[],(tx,results)=>{ 
            });
            tx.executeSql("delete from homelog where tablename='scenedevice'",[],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }

    // 清空 homelog表中的数据
    static clearHomeLogTable(){
        db.transaction((tx) => {
            tx.executeSql("delete from homelog",[],(tx,results)=>{ 
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }

    static getAllDeviceInfo(){
        let allDeviceInfo ='';
        db.transaction((tx) => {
            tx.executeSql("select * from deviceinfo",[],(tx,results)=>{ 
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                var u = results.rows.item(i);
                allDeviceInfo +="Data:insert#deviceinfo#";
                allDeviceInfo += u.mac+" ";
				allDeviceInfo += u.name+" ";
				allDeviceInfo += u.position+" ";
				allDeviceInfo += u.type+" ";
				allDeviceInfo += u.protype+"\n";
                }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return allDeviceInfo
    }

    static getAllSceneInfo(){
       let allSceneInfo = '';
       db.transaction((tx) => {
        tx.executeSql("select * from sceneinfo",[],(tx,results)=>{ 
            var len = results.rows.length;
            for (let i = 0; i < len; i++) {
            var u = results.rows.item(i);
            allSceneInfo += "Data:insert#sceneinfo#";
            allSceneInfo += u.number+" ";
            allSceneInfo += u.name+"\n";
            }
        });
    }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
        this._errorCB('transaction', err);
    }, () => {
        this._successCB('transaction');
    });
    return allSceneInfo;
    }

    static getAllSceneDevice(){
        let allSceneDevice = '';
        db.transaction((tx) => {
            tx.executeSql("select * from scenedevice",[],(tx,results)=>{ 
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                var u = results.rows.item(i);
                allSceneDevice += "Data:insert#scenedevice#";
				allSceneDevice += u.tablekey+" ";
				allSceneDevice += u.scenenumber+" ";
				allSceneDevice += u.devicemac+" ";
				allSceneDevice += u.devicestate+"\n";
                }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return allSceneDevice
    }

    //判断设备信息表里是否有该设备mac
    static hasDevice(deviceMac:string){
        let hasData=false;
        db.transaction((tx) => {
            tx.executeSql("select * from deviceinfo where mac=?",[deviceMac],(tx,results)=>{ 
                var len = results.rows.length;
                if(len!=0){
                    hasData=true;
                }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return hasData;
    }

    static hasScene(sceneNumber:string){
        let hasData = false;
        db.transaction((tx) => {
            tx.executeSql("select * from  sceneinfo where number=?",[sceneNumber],(tx,results)=>{ 
                var len = results.rows.length;
                if(len!=0){
                    hasData=true;
                }
            });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
        return hasData;
    }
}