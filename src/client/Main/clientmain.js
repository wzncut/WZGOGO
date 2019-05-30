/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import DataRequest from '../../client/entity/DataRequest'
import DataResponse from '../../client/entity/DataResponse'
import net from 'react-native-tcp'
import SetDataRequest from '../until/SetDataRequest'
import properties from '../../properties'
// const END_CONNECTION='EndConnection'
// const END_MARK='end'
// const SLEEP_TIME=1000*60
export default class clientmain{
  static END_CONNECTION='EndConnection'
  static END_MARK='end'
  // static SLEEP_TIME=1000*60
  main(){
    let serverPort=20186
    let responseKeyword='';
    let gatewayMac=''
      while(true) {
        try{
          //发送的报文
            let request=new DataRequest();
            let response=new DataResponse();
          //建立连接
            let client=net.createConnection({host:'loacalhost',port:serverPort});
            console.log("====1.创建socket====");
            request=SetDataRequest.setStartRequest();
            request.setGatewayMac(properties.gatewayMac);
            client.write(request.toString());
            client.write(clientmain.END_MARK+"\n");
            //发送报文
            console.log("-----[发送报文]-----");
            console.log(request.toString());
            //循环等待读取
            while(true){
              response=this.recvDataResponse();
              //读取响应报文

              console.log("-----[接收报文]-----");
              responseKeyword = response.getKeyword();
                if(responseKeyword==null || clientmain.END_CONNECTION.equalsIgnoreCase(responseKeyword.trim())){
                      break;
                  }
                else{
                    // 根据响应设置回复报文
                  request = SetDataRequest.setDataResponse(response);
                  request.setGatewayMac(properties.gatewayMac);
                  client.write(request.toString());
                  client.write(clientmain.END_MARK+"\n");
                  console.log("-----[发送报文]-----");
                  console.log(request.toString());
                  console.log("------------------");
                  }
            }//end while
           }
        catch{

        }
        finally{
          this.client.destroy();
        }
       }
    }


        recvDataResponse(){
          let response =new DataResponse();
          let readLine='';
          while(true){
            client.on('data', (data) => {
              readLine=data
            });
            // readLine=reader.readLine();
            let errorLine =0;
            if(readLine==null ||readLine.length()==0){
              errorLine++;
              // 如果连续收到3个空行，则不再继续等待
              if(errorLine>=3){
                break;
              }
              continue;
            }
            else if( clientmain.END_MARK.equalsIgnoreCase(readLine)){
              break;
            }
            else{
              let lineArr=new Array();
              lineArr = readLine.split(":");
              // 如果把报文字段不是两部分
              if(lineArr.length!=2){
                //System.out.println("报文格式不对");
                return response;
              }
              let mark=lineArr[0];		// 标记
              let content = lineArr[1];	// 数据
              // 如果是请求行
              if(mark.equalsIgnoreCase("HEAD")){
                response.setKeyword(content);
              }
              // 如果是数据域
              else if(mark.equalsIgnoreCase("DATA")){
                response.addResponseData(content);
              }
              else{
                System.out.println("Error Mark!");
                return response;
              }
              
            }
          }
        }
}

