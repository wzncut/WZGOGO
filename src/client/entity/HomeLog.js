/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class HomeLog{
    operate:string ;
	tablename:string ;
	tablekey:string ;
	syn:string ;
	
	HomeLog() {
		super();
	}

	getOperate() {
		return operate;
	}

	setoperate(operate:string) {
		this.operate = operate;
	}

	getTablename() {
		return tablename;
	}

	setTablename(tablename:string) {
		this.tablename = tablename;
	}

	getTablekey() {
		return tablekey;
	}

	setTablekey(tablekey:string ) {
		this.tablekey = tablekey;
	}

	getSyn() {
		return syn;
	}

	setSynsyn(syn:string) {
		this.syn = syn;
	}

    tostring(){
		return this.getOperate()+" "+this.getTablename()+" "+this.getTablekey()+" "+this.getSyn();
	}
}