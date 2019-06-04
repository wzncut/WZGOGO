import React, { Component } from 'react';
import { ToastAndroid, } from 'react-native';
import SQLiteStorage from 'react-native-sqlite-storage';

SQLiteStorage.DEBUG(true);
var database_name = "react.db";//数据库文件
var database_version = "1.0";//版本号
var database_displayname = "MySQLite";
var database_size = -1;//-1应该是表示无限制
var db;
export default class SQLite extends Component {

    componentWillUnmount() {
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log("SQLiteStorage not open");
        }
    }

    open() {
        db = SQLiteStorage.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
            () => {
                this._successCB('open');
            },
            (err) => {
                this._errorCB('open', err);
            });
        return db;
    }

    createTable() {
        if (!db) {
            this.open();
        }
        //创建设备信息表
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE deviceinfo(" +
                "mac VARCHAR(20) PRIMARY KEY ," +
                "NAME VARCHAR(20) NOT NULL ," +
                "POSITION VARCHAR(20) NOT NULL DEFAULT '客厅'," +
                "TYPE VARCHAR(20) DEFAULT '开关'," +
                "protype VARCHAR(20) DEFAULT 'wifi')"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //创建情景模式表
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE sceneinfo("+
                "number VARCHAR(20) PRIMARY KEY,"+
                "NAME VARCHAR(20) NOT NULL UNIQUE)"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //创建情景模式设备关系表
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE scenedevice("+
                "tablekey VARCHAR(20) PRIMARY KEY,"+
                "scenenumber VARCHAR(20) NOT NULL,"+
                "devicemac VARCHAR(20) NOT NULL,"+
                "devicestate VARCHAR(20) NOT NULL,"+
                "CONSTRAINT scenenumber_constraint FOREIGN KEY (scenenumber) REFERENCES sceneinfo(number) ON UPDATE CASCADE ON DELETE CASCADE,"+
                "CONSTRAINT devicemac_constraint FOREIGN KEY (devicemac) REFERENCES deviceinfo(mac) ON UPDATE CASCADE ON DELETE CASCADE)"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //创建日志表
        db.transaction((tx) => {
            tx.executeSql("CREATE TABLE homelog(" +
                "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "operate VARCHAR(20) NOT NULL," +
                "tablename VARCHAR(20) NOT NULL," +
                "tablekey VARCHAR(20) NOT NULL," +
                "syn VARCHAR(20) NOT NULL DEFAULT 'false')"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })
        
                                                        //创建设备信息表触发器
        //插入操作的触发器
        db.transaction((tx) => {
            tx.executeSql("CREATE TRIGGER deviceinfo_aft_insert AFTER INSERT ON deviceinfo FOR EACH ROW BEGIN DELETE FROM homelog WHERE operate='delete'AND tablename='deviceinfo' AND tablekey=new.mac; INSERT INTO homelog(operate,tablename,tablekey) VALUES ('insert','deviceinfo',new.mac); END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //更新操作的触发器 
        db.transaction((tx) => {
            tx.executeSql(
            "CREATE TRIGGER deviceinfo_aft_update AFTER UPDATE ON deviceinfo FOR EACH ROW BEGIN DELETE FROM homelog WHERE tablename='deviceinfo' AND operate='update' AND tablekey=old.mac;UPDATE homelog SET tablekey=new.mac WHERE tablename='deviceinfo' AND operate='insert' AND tablekey=old.mac;INSERT INTO homelog (operate, tablename,tablekey) VALUES('update','deviceinfo',new.mac);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //删除操作的触发器
        db.transaction((tx) => {
            tx.executeSql(
            "CREATE TRIGGER deviceinfo_aft_delete AFTER DELETE ON deviceinfo FOR EACH ROW BEGIN DELETE FROM homelog WHERE tablename='deviceinfo' AND tablekey=old.mac;INSERT INTO homelog (operate, tablename,tablekey) VALUES('delete','deviceinfo',old.mac);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })
                                                         //情景模式表的触发器 
        //插入数据的触发器
        db.transaction((tx) => {
            tx.executeSql(
            "CREATE TRIGGER sceneinfo_aft_insert AFTER INSERT ON sceneinfo FOR EACH ROW BEGIN INSERT INTO homelog(operate,tablename,tablekey) VALUES ('insert','sceneinfo',new.number);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //更新操作的触发器
        db.transaction((tx) => {
            tx.executeSql(
            "CREATE TRIGGER sceneinfo_aft_update AFTER UPDATE ON sceneinfo FOR EACH ROW BEGIN DELETE FROM homelog WHERE tablename='sceneinfo' AND operate='update' AND tablekey=old.number;UPDATE homelog SET tablekey=new.number WHERE tablename='sceneinfo' AND operate='insert' AND tablekey=old.number;INSERT INTO homelog (operate, tablename,tablekey) VALUES('update','sceneinfo',new.number);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //删除操作的触发器
        db.transaction((tx) => {
            tx.executeSql(
            "CREATE TRIGGER sceneinfo_aft_delete AFTER DELETE ON sceneinfo FOR EACH ROW BEGIN DELETE FROM homelog WHERE tablename='sceneinfo' AND tablekey=old.number;INSERT INTO homelog (operate, tablename,tablekey) VALUES('delete','sceneinfo',old.number);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

                                                        //情景关系表的触发器
        //插入操作的触发器
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TRIGGER scenedevice_aft_insert AFTER INSERT ON scenedevice FOR EACH ROW BEGIN INSERT INTO homelog(operate,tablename,tablekey) VALUES ('insert','scenedevice',new.tablekey);END;" 
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //更新操作的触发器
        db.transaction((tx) => {
            tx.executeSql(
             "CREATE TRIGGER scenedevice_aft_update AFTER UPDATE ON scenedevice FOR EACH ROW BEGIN DELETE FROM homelog WHERE tablename='scenedevice' AND operate='update' AND tablekey=old.tablekey;UPDATE homelog SET tablekey=new.tablekey WHERE tablename='scenedevice' AND operate='insert' AND tablekey=old.tablekey;INSERT INTO homelog (operate, tablename,tablekey) VALUES('update','scenedevice',new.tablekey);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })

        //删除操作的触发器
        db.transaction((tx) => {
            tx.executeSql(
             "CREATE TRIGGER scenedevice_aft_delete AFTER DELETE ON scenedevice FOR EACH ROW BEGIN 	DELETE FROM homelog WHERE tablename='scenedevice' AND tablekey=old.tablekey;INSERT INTO homelog (operate, tablename,tablekey) VALUES('delete','scenedevice',old.tablekey);END;"
                , [], () => {
                    this._successCB('executeSql');
                }, (err) => {
                    this._errorCB('executeSql', err);
                });
        }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        })
        //插入数据
        // db.transaction((tx) => {
        //     tx.executeSql("INSERT INTO  deviceinfo(mac,NAME,POSITION,TYPE,protype) VALUES('devicemac001','廊灯','走廊','开关','wifi')");
        //     tx.executeSql("INSERT INTO deviceinfo(mac,NAME,POSITION,TYPE,protype) VALUES('devicemac002','客厅吊灯','客厅','开关','wifi')");
        //     tx.executeSql("INSERT INTO deviceinfo(mac,NAME,POSITION,TYPE,protype) VALUES('devicemac003','主卧背景灯','主卧','开关','wifi')");
        // }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
        //     this._errorCB('transaction', err);
        // }, () => {
        //     this._successCB('transaction');
        // })
        //插入数据
    }

    //查询对应数据库中日志表中未同步的操作
    selectLogTable(){
        db.transaction((tx) => {
                tx.executeSql("select * from homelog where syn='false'");
            }, (err) => {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
                this._errorCB('transaction', err);
            }, () => {
                this._successCB('transaction');
            })
    }

    deleteData() {
        if (!db) {
            this.open();
        }
        db.transaction((tx) => {
            tx.executeSql('delete from TIP', [], () => {

            });
        });
    }

    dropTable() {
        db.transaction((tx) => {
            tx.executeSql('drop table TIP', [], () => {

            });
        }, (err) => {
            this._errorCB('transaction', err);
        }, () => {
            this._successCB('transaction');
        });
    }

    insertUserData(tipData) {
        let len = tipData.length;
        if (!db) {
            this.open();
        }
        this.createTable();
        this.deleteData();
        db.transaction((tx) => {
            for (let i = 0; i < len; i++) {
                var tip = tipData[i];
                let name = tip.name;
                let class_name = tip.class_name;
                let measure = tip.measure;
                let place = tip.place;
                let start = tip.start;
                let end = tip.end;
                let days = tip.days;
                let sql = "INSERT INTO TIP(name,class,measure,place,start,end,days)" +
                    "values(?,?,?,?,?,?,?)";
                tx.executeSql(sql, [name, class_name, measure, place, start, end, days], () => {

                }, (err) => {
                    console.log(err);
                }
                );
            }
        }, (error) => {
            this._errorCB('transaction', error);
            ToastAndroid.show("数据插入失败", ToastAndroid.SHORT);
        }, () => {
            this._successCB('transaction insert data');
            ToastAndroid.show("成功插入 " + len + " 条作物数据", ToastAndroid.SHORT);
        });
    }

    close() {
        if (db) {
            this._successCB('close');
            db.close();
        } else {
            console.log("SQLiteStorage not open");
        }
        db = null;
    }

    _successCB(name) {
        console.log("SQLiteStorage " + name + " success");
    }

    _errorCB(name, err) {
        console.log("SQLiteStorage " + name);
        console.log(err);
    }

    render() {
        return null;
    }
};