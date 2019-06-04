/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import DataRequest from'../entity/DataRequest'
import DataResponse from'../entity/DataResponse'
import ServiceTools from '../until/ServiceTools'
export default class SetDataRequest{
		// ======================  设置探测报文 =================================
    static setDetectRequest(){
    let request = new DataRequest();
		request.setKeyword("Detect");
		return request;
    }
		// ======================  设置未知报文 =================================	
    static setUnknownRequest(){
        let request = new DataRequest();	
			request.setKeyword("UnKnown");
			return request;
    }
		// ======================  设置探测报文 =================================
    static setSendDataRequest(){
    let request = new DataRequest();
		request.setKeyword("SendData");
		let data = ServiceTools.getClientNewData();
		if(data != null){
			request.setReqData(data);
		}
		return request;
    }
		// ======================  设置第一个报文 =================================
    static setStartRequest(){
        let request = new DataRequest();
		// 如果客户端有更新数据，则发送 SendData报文
		if(ServiceTools.hasNewData()){
			request=SetDataRequest.setSendDataRequest();
		}
		else{
			request=SetDataRequest.setDetectRequest();
		}
		return request;
    }
		// 根据服务器端回复的不同响应报文，回复不同的请求报文
    static setDataResponse(response:DataResponse){
        let request= new DataRequest();
		let responseKeyword = response.getKeyword();
		// if(responseKeyword.equalsIgnoreCase("SynOK") ){	
		if(responseKeyword.toLocaleLowerCase()=="SynOK".toLocaleLowerCase()){
			// 如果服务器数据将收到的客户端同步成功，则客户端清空日志表
			ServiceTools.clearLogTable();
			// 然后回复探测报文
			request= SetDataRequest.setDetectRequest();
		}
		// else if(responseKeyword.equalsIgnoreCase("SynError") ){
		else if(responseKeyword.toLocaleLowerCase()== "SynError".toLocaleLowerCase() ){
			// 发送探测报文
			request= SetDataRequest.setDetectRequest();
		}		
		// else if(responseKeyword.equalsIgnoreCase("SendData") ){
		else if(responseKeyword.toLocaleLowerCase()=="SendData".toLocaleLowerCase() ){
			// 更加客户端数据更新服务器端数据库
			ServiceTools.executeResponseData(response);
			if(ServiceTools.getErrorMessage()==null){
				// 如果更新成功，回复 synok
				request.setKeyword("SynOk");				
			}
			// 如果更新失败,回复 SynError
			else{
				request.setKeyword("SynError");	
				request.addRequestData(ServiceTools.getErrorMessage());
			}
		}		
		// 如果是未知报文，则直接回复结束报文
		else{
			request = SetDataRequest.setUnknownRequest();
		}
		// 返回回复的报文
		return request;
    }
}