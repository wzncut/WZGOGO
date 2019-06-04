/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

export default class HomeLog{
    operate:string 
	tablename:string 
	tablekey:string 
	syn:string 
	


	getOperate() {
		return this.operate;
	}

	setOperate(operate:string) {
		this.operate = operate;
	}

	getTablename() {
		return this.tablename;
	}

	setTablename(tablename:string) {
		this.tablename = tablename;
	}

	getTablekey() {
		return this.tablekey;
	}

	setTablekey(tablekey:string ) {
		this.tablekey = tablekey;
	}

	getSyn() {
		return this.syn;
	}

	setSynsyn(syn:string) {
		this.syn = syn;
	}

    toString(){
		return this.getOperate()+" "+this.getTablename()+" "+this.getTablekey()+" "+this.getSyn();
	}
}