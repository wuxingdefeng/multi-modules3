package com.jueke.common.santi;

import com.jueke.common.santi.exception.AuthException;
import com.jueke.common.santi.util.HMACSHA1;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;



/**
 * 认证相关
 * @author roymond.wang
 * @date 2015.5.18
 */
public class  AuthServer {
	
	  private  static  String accessKey ="demo_access";
	  private static String secretKey="demo_secret";
	  
	  public AuthServer(String accessKey,String secretKey) {
		  this.accessKey = accessKey;
		  this.secretKey = secretKey;
	  }

	  public static String getAccessTocken() throws AuthException {
		     try {  
		    	 String digest = HMACSHA1.getSignature(accessKey, secretKey);
		    	 String authRet = auth(digest);
		    	 if(authRet != null &&  ! "".equalsIgnoreCase(authRet)	){
		    		 JSONObject jsonObject = new JSONObject(authRet);
		    		 int retz = jsonObject.getInt("ret");
					 String ret = String.valueOf(retz);
					// jsonObject.getInt()
		    		 if("0".equalsIgnoreCase(ret)){
		    			 String random = jsonObject.getString("random");
		    			 String key = jsonObject.getString("key");
		    			 String  accessTocken = HMACSHA1.getSignature(random+":"+key, secretKey);
		    			 return accessTocken;
		    		 }else{
		    			 String msg = jsonObject.getString("msg");
		    			 throw new AuthException(ret, msg); 
		    		 }
		    	 }else{
					 System.out.println("---------------------");
		    		 throw new AuthException("401", "un authored"); 
		    	 }
		     } catch (Exception e) {
				 e.printStackTrace();
		    	 throw new AuthException("401", "un authored"); 
		     }
	  } 
		 	
	  private static String auth(String digest) throws Exception {
			    String urlStr = "http://" + RestSdk.restServer + "/rtc/auth/valid?access_key=" + accessKey + "&digest=" + digest;
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
	  
	  
		 public static void main(String[] args) throws Exception {
			   String restServer= "121.41.102.126:8080";
			   String accessKey= "demo_access";
			   String secretKey= "demo_secret";
			   
			   RestSdk.init(restServer);
			   AuthServer authServer = new  AuthServer(accessKey,secretKey);
			   try{
			       String accessTocken = authServer.getAccessTocken();
			       System.out.println("ACCESS_TOKEN:"+ accessTocken);
			   }catch(AuthException  authException){
				   System.out.println(authException.getKey() + ":" + authException.getMessage());
			   }
		 }
		 
}
