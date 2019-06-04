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
  static Ar
  // static SLEEP_TIME=1000*60
  static main(){
    let serverPort=20186
    let responseKeyword;
    let gatewayMac='' 
          //发送的报文
            let request=new DataRequest();
            let response=new DataResponse();
          //建立连接
            let client=net.createConnection({host:properties.serverip,port:parseInt('20186')});
            console.log("====1.创建socket====");
            request=SetDataRequest.setStartRequest();
            request.setGatewayMac(properties.gatewayMac);
            client.write(request.toString()+"\n");
            client.write(clientmain.END_MARK+"\n");
            //发送报文
            console.log("-----[发送报文]-----");
            console.log(request.toString());
            //循环等待读取
            while(true){
           
              response=clientmain.recvDataResponse(client)
              //读取响应报文
              console.log("-----[接收报文]-----");
              responseKeyword = response.getKeyword();
                // if(responseKeyword==null || clientmain.END_CONNECTION.equalsIgnoreCase(responseKeyword.trim())){
                  if(responseKeyword==null || clientmain.END_CONNECTION.toLocaleLowerCase()==responseKeyword.trim().toLocaleLowerCase()){
                      break;
                  }
                else{
                    // 根据响应设置回复报文
                  request = SetDataRequest.setDataResponse(response);
                  request.setGatewayMac(properties.gatewayMac);
                  client.write(request.toString()+'\n');
                  client.write(clientmain.END_MARK+'\n');
                  console.log("-----[发送报文]-----");
                  console.log(request.toString());
                  console.log("------------------");
                  }
            }//end while
       
       
    }


       static recvDataResponse(client){
            let response =new DataResponse();
            let readLine='';
            let Ar=new Array()
            client.on('data', (data) => {
              a = data;
              Ar=data.toString().split("\n");
              console.log(Ar)
              // foo(data);

            });

            // function foo(data) {
            //   // ...
            // }
     
          while(true){
            // readLine=reader.readLine();
              let errorLine =0;
              if(readLine=='\n' ||readLine.length==0){
              errorLine++;
              // 如果连续收到3个空行，则不再继续等待
              if(errorLine>=3){
                break;
              }
              continue;
              }
              // else if( clientmain.END_MARK.equalsIgnoreCase(readLine)){
              else if( clientmain.END_MARK.toLocaleLowerCase()==readLine.toLocaleLowerCase()){
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
              // if(mark.equalsIgnoreCase("HEAD")){
              if(mark.toLocaleLowerCase()=="HEAD".toLocaleLowerCase()){
                response.setKeyword(content);
              }
              // 如果是数据域
              // else if(mark.equalsIgnoreCase("DATA")){
              else if(mark.toLocaleLowerCase()=="DATA".toLocaleLowerCase()){
                response.addResponseData(content);
              }
              else{
                console.log("Error Mark!");
                return response;
                }
              }
            
          }//while over
        }
}




// static recvDataResponse(client){
//   let response =new DataResponse();
//   let readLine='';
// while(true){
//   // readLine=reader.readLine();
//     client.on('data', (data) => {
//     let Ar=data.toString().split("\n");
//     });
//     let errorLine =0;
//     if(readLine=='\n' ||readLine.length==0){
//     errorLine++;
//     // 如果连续收到3个空行，则不再继续等待
//     if(errorLine>=3){
//       break;
//     }
//     continue;
//     }
//     // else if( clientmain.END_MARK.equalsIgnoreCase(readLine)){
//     else if( clientmain.END_MARK.toLocaleLowerCase()==readLine.toLocaleLowerCase()){
//     break;
//     }
//     else{
//     let lineArr=new Array();
//     lineArr = readLine.split(":");
//     // 如果把报文字段不是两部分
//     if(lineArr.length!=2){
//       //System.out.println("报文格式不对");
//       return response;
//     }
//     let mark=lineArr[0];		// 标记
//     let content = lineArr[1];	// 数据
//     // 如果是请求行
//     // if(mark.equalsIgnoreCase("HEAD")){
//     if(mark.toLocaleLowerCase()=="HEAD".toLocaleLowerCase()){
//       response.setKeyword(content);
//     }
//     // 如果是数据域
//     // else if(mark.equalsIgnoreCase("DATA")){
//     else if(mark.toLocaleLowerCase()=="DATA".toLocaleLowerCase()){
//       response.addResponseData(content);
//     }
//     else{
//       console.log("Error Mark!");
//       return response;
//       }
//     }
  
// }//while over
// }
