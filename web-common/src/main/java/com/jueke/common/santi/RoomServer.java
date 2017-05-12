package com.jueke.common.santi;

import com.jueke.common.santi.exception.RoomException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import static com.jueke.common.santi.RestSdk.restServer;


/**	
 *会议相关
 * @author roymond.wang
 * @date 2015.5.18
 */
public class  RoomServer {
	  //private final String accessTocken;
	  
	 // private final String topic;
	  //private final int maxVideo;
	  //private final int maxAudio;
	  //private final String hostPassword;
	 // private final int  roomMode = 1; //1--MCCU,3--P2P
	  
//	  public RoomServer(String accessTocken ,String topic, int maxVideo, int maxAudio, String hostPassword) {
//		  this.accessTocken = accessTocken;
//		  this.topic =  URLEncoder.encode(topic);
//		  this.maxVideo = maxVideo;
//		  this.maxAudio = maxAudio;
//		  this.hostPassword = hostPassword;
//	  }

	  public static String createRoom(String accessTocken,String topic,int maxVideo,int maxAudio,String hostPassword,String roomMode) throws RoomException{
		     try {
		    	 String createRet = create(accessTocken,topic,maxVideo,maxAudio,hostPassword,roomMode);
		    	 if(createRet != null &&  ! "".equalsIgnoreCase(createRet)){
		    		 JSONObject jsonObject = new JSONObject(createRet);
		    		 String ret = String.valueOf(jsonObject.getInt("ret"));
		    		 if("0".equalsIgnoreCase(ret)){
		    			 String roomId = jsonObject.getString("room_id");
		    			 return roomId;
		    		 }else{
		    			 String msg = jsonObject.getString("msg");
		    			 throw new RoomException(ret, msg);
		    		 }
		    	 }else{
		    		 throw new RoomException("401", "un created"); 
		    	 }
		     } catch (Exception e) {
				 e.printStackTrace();
		    	 throw new RoomException("401", "un created"); 
		     }
	  }
	 
	  
	  public static Room getRoom(String roomId) throws RoomException{
		   String roomURL="http://" + RestSdk.webServer  + "/jroom/?roomId=" + roomId;
		   Room room = new Room();
		   room.setRoomId(roomId);
		   room.setRoomURL(roomURL);
		   return room;
	  }
		 
		 	
	  private static String create(String accessTocken,String topic,int maxVideo,int maxAudio,String hostPassword,String roomMode) throws Exception {
			    String urlStr = "http://" + restServer + "/rtc/room/create?owner_id=111111&access_tocken=" + accessTocken + "&room_mode=" + roomMode+ "&topic=" + topic+ "&max_video=" + maxVideo+ "&max_audio=" + maxAudio+ "&host_password=" + hostPassword;
			    URL localURL = new URL(urlStr);
		      	URLConnection connection = localURL.openConnection();
		        HttpURLConnection httpURLConnection = (HttpURLConnection)connection;
		        
		        httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");
		        httpURLConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		        
		        InputStream inputStream = null;
		        InputStreamReader inputStreamReader = null;
		        BufferedReader reader = null;
		        StringBuffer resultBuffer = new StringBuffer();
		        String tempLine = null;
		        
		        if (httpURLConnection.getResponseCode() >= 300) {
		             throw new Exception("HTTP Request is not success, Response code is " + httpURLConnection.getResponseCode());
		        }
		        
		        try {
		            inputStream = httpURLConnection.getInputStream();
		            inputStreamReader = new InputStreamReader(inputStream);
		            reader = new BufferedReader(inputStreamReader);
		            
		            while ((tempLine = reader.readLine()) != null) {
		                resultBuffer.append(tempLine);
		            }
		            
		        }finally {
		            
		            if (reader != null) {
		                reader.close();
		            }
		            
		            if (inputStreamReader != null) {
		                inputStreamReader.close();
		            }
		            
		            if (inputStream != null) {
		                inputStream.close();
		            }
		        }
		        
		        return resultBuffer.toString(); 
		 }
	  public static String getRoomIdMethod(String accessTocken ,String topic, int maxVideo, int maxAudio, String hostPassword,String roomMode){
		  RestSdk.init(restServer);
		  RoomServer roomServer = new  RoomServer();
		  try{
			  String roomId = roomServer.createRoom(accessTocken,topic,maxVideo,maxAudio,hostPassword,roomMode);
			  System.out.println("roomId:"+ roomId);
			  return roomId;
			  //Room room = roomServer.getRoom(roomId);
			  //System.out.println("roomURL:"+ room.getRoomURL());
		  }catch(RoomException  roomException){
			  System.out.println(roomException.getKey() + ":" + roomException.getMessage());
			  return "";
		  }

	  }
		 public static void main(String[] args) throws Exception {
			   String restServer = "121.41.102.126:8080"; 
			   String accessTocken = "Mjg5YTE0NzRkZDc5NGQ2MzAwMWJmZmRiNzg0M2VhNDY2ZDIzYWFjNQ%3D%3D";
			   String topic = "top & % -  123"; 
			   int maxVideo = 5; 
			   int maxAudio = 5; 
			   String hostPassword = "20"; 
			   String roomMode = "1";
			   RestSdk.init(restServer);
			   RoomServer roomServer = new  RoomServer();
			   try{
			       String roomId = roomServer.createRoom(accessTocken,topic,maxVideo,maxAudio,hostPassword,roomMode);
			       System.out.println("roomId:"+ roomId);
			       
			       //Room room = roomServer.getRoom(roomId);
			       //System.out.println("roomURL:"+ room.getRoomURL());
			   }catch(RoomException  roomException){
				   System.out.println(roomException.getKey() + ":" + roomException.getMessage());
			   }
		 } 
     
}
