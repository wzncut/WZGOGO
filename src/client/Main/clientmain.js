/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react'
import DataRequest from '../../client/entity/DataRequest'
import DataResponse from '../../client/entity/DataResponse'
import net from 'react-native-tcp'
import SetDataRequest from '../until/SetDataRequest'
import properties from '../../properties'
// const END_CONNECTION='EndConnection'
// const END_MARK='end'
// const SLEEP_TIME=1000*60\
export default class clientmain{
  static END_CONNECTION='EndConnection'
  static END_MARK='end\r'
  static Ar
  // static SLEEP_TIME=1000*60
  static main(){
    let serverPort=20186
    let responseKeyword;
    let gatewayMac='' 
          //发送的报文
            let request=new DataRequest();
            let response1=new DataResponse();
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
            // while(true){
              setTimeout(function(){
                console.log("-----[接收报文]-----");
                responseKeyword = response1.getKeyword();
                console.log(responseKeyword)
                // console.log(responseKeyword)
                  // if(responseKeyword==null || clientmain.END_CONNECTION.equalsIgnoreCase(responseKeyword.trim())){
                    if(responseKeyword==null || clientmain.END_CONNECTION.toLocaleLowerCase()==responseKeyword.trim().toLocaleLowerCase()){
                        // break;
                        // console.log('1'+responseKeyword)
                        console.log("-----[通讯结束]-----")
                    }
                    else{
                      // console.log('2222222222222222')
                      // 根据响应设置回复报文
                    let client=net.createConnection({host:properties.serverip,port:parseInt('20186')});
                    request = SetDataRequest.setDataResponse(response1);
                   
                    request.setGatewayMac(properties.gatewayMac);
                    client.write(request.toString()+'\n');
                    client.write(clientmain.END_MARK+'\n');
                    console.log("-----[发送报文]-----");
                    console.log(request.toString());
                    console.log("------------------");
                    console.log("-------over------");
                    }
               
              },2000);
              clientmain.recvDataResponse(client,function(response){
                response1=response
                // console.log(response1)
              })
              //读取响应报文
            // }//end while
       
       
    }


      static recvDataResponse=(client,callback)=>{
            var response =new DataResponse();
            var readLine='';   
            var arr=new Array()
            // function foo(data) {
            //   // ...
            // }
            setTimeout(function(){
              // while(true){
                // readLine=reader.readLine();
                // console.log(arr)
                for(readLine of arr){
                  // console.log(clientmain.END_MARK.toLocaleLowerCase()==readLine.toLocaleLowerCase())
                  let errorLine =0;
                  if(readLine=='\n' ||readLine.length==0){
                    // console.log(0)
                  errorLine++;
                  // 如果连续收到3个空行，则不再继续等待
                  if(errorLine>=3){
                    // console.log(1)
                    break;
                  }
                  continue;
                  }
                  // else if( clientmain.END_MARK.equalsIgnoreCase(readLine)){
                  else if( clientmain.END_MARK.toLocaleLowerCase()==readLine.toLocaleLowerCase()){
                    console.log(2)
                  break;
                  }
                  else{
                    console.log(3)
                  let lineArr=new Array();
                  lineArr = readLine.split(":");
                  // 如果把报文字段不是两部分
                  if(lineArr.length!=2){
                    //System.out.println("报文格式不对");
                    // console.log(4)
                    return response;
                  }
                  let mark=lineArr[0];		// 标记
                  let content = lineArr[1];	// 数据
                  // 如果是请求行
                  // if(mark.equalsIgnoreCase("HEAD")){
                  if(mark.toLocaleLowerCase()=="HEAD".toLocaleLowerCase()){
                    // console.log(5)
                    response.setKeyword(content);
                    // console.log(response.getKeyword())
                  }
                  // 如果是数据域
                  // else if(mark.equalsIgnoreCase("DATA")){
                  else if(mark.toLocaleLowerCase()=="DATA".toLocaleLowerCase()){
                    // console.log(6)
                    response.addResponseData(content);
                    // console.log(response.getResData())
                  }
                  else{
                    console.log("Error Mark!");
                    return response;
                    }
                  }
                }
                callback(response)
              // }//while over
            },100)
            client.on('data', (data) => {
              arr=data.toString().split("\n")
             });
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
