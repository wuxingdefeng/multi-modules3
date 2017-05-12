package com.jueke.common.httpClientUtil;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.util.PublicSuffixMatcher;
import org.apache.http.conn.util.PublicSuffixMatcherLoader;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.util.EntityUtils;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.security.KeyStore;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 网络工具类
 */
public class HttpClientUtils {
	private static RequestConfig requestConfig = RequestConfig.custom()
			.setSocketTimeout(5000)
			.setConnectTimeout(5000)
			.setConnectionRequestTimeout(5000)
			.build();

	/**
	 * 发送HTTP POST请求,支持带多个String参数
	 *
	 * @param url 链接
	 * @param paramMap 参数
	 */
	public static Object sendHttpPost(String url, Map<String, String> paramMap,Map<String,Object> headerMap,String en) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		return sendHttpPost(url, paramMap, httpclient,headerMap,en);
	}

	/**
	 * 发送HTTP POST请求,支持多个参数(注：多个参数需拼接)
	 *
	 * @param url 链接
	 * @param params 参数(格式:key1=value1&key2=value2)
	 */
	public static Object sendHttpPost(String url, String params,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		return sendHttpPost(url, params, httpclient,headerMap);
	}

	/**
	 * 发送HTTP POST请求,支持带一个文件参数
	 *
	 * @param url 链接
	 * @param file 文件
	 */
	public static Object sendHttpPost(String url, File file,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		try {
			HttpPost httpPost = new HttpPost(url);
			MultipartEntityBuilder builder = MultipartEntityBuilder.create();
			builder.addPart(file.getName(), new FileBody(file));
			HttpEntity entity=builder.build();
//			InputStreamEntity reqEntity = new InputStreamEntity(new FileInputStream(file), -1, ContentType.APPLICATION_OCTET_STREAM);
//			reqEntity.setChunked(true);
			httpPost.setEntity(entity);

			return sendHttpPost(httpPost, httpclient,headerMap);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTP POST请求(客户端采用二进制流发送,服务端采用二进制流接收)
	 *
	 * @param url 链接
	 * @param binaryStreamsStr 参数
	 */
	public static Object sendHttpPostByStream(String url, String binaryStreamsStr,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		try {
			HttpPost httpPost = new HttpPost(url);
            //binaryStreamsStr.getBytes("UTf-8")
			HttpEntity reqEntity = new ByteArrayEntity(binaryStreamsStr.getBytes("UTF-8"), ContentType.APPLICATION_JSON);

			httpPost.setEntity(reqEntity);

			return sendHttpPost(httpPost, httpclient,headerMap);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送POST请求,支持带多个String参数和多个文件参数
	 *
	 * @param url 链接
	 * @param paraMap 参数集合
	 * @param fileMap 文件集合
	 */
	public static Object sendHttpPostByFile(String url, Map<String, String> paraMap, Map<String, File> fileMap,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		try {
			HttpPost httpPost = new HttpPost(url);

			MultipartEntityBuilder builder = MultipartEntityBuilder.create();

			for (String key : paraMap.keySet()) {
				builder.addPart(key, new StringBody(paraMap.get(key), ContentType.TEXT_PLAIN));
			}
			for (String fileStr : fileMap.keySet()) {
				builder.addPart(fileStr, new FileBody(fileMap.get(fileStr)));
			}

			HttpEntity reqEntity = builder.build();

			httpPost.setEntity(reqEntity);

			return sendHttpPost(httpPost, httpclient,headerMap);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTP GET请求,不带参数(注：可将参数加在url后面)
	 *
	 * @param url 链接
	 */
	public static String sendHttpGet(String url,Map<String,Object> headerMap,String en) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		try {
			return sendHttpGet(url, httpclient,headerMap,en);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTP GET请求,不带参数,返回byte数组
	 *
	 * @param url 链接
	 */
	public static byte[] sendHttpGetResByte(String url,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		try {
			return sendHttpGetResByte(url, httpclient,headerMap);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTP GET请求,支持多个参数(注：多个参数需拼接)
	 *
	 * @param url 链接
	 * @param params 参数(格式:key1=value1&key2=value2)
	 */
	public static String sendHttpGet(String url, String params,Map<String,Object> headerMap,String en) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpClient();
		return sendHttpGet(url, params, httpclient,headerMap,en);
	}

	/**
	 * 发送HTTPS GET请求,支持多个参数(注：多个参数需拼接)
	 *
	 * @param url 链接
	 * @param params 参数(格式:key1=value1&key2=value2)
	 */
	public static String sendHttpsGet(String url, String params,Map<String,Object> headerMap,String en) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClient(url);
		return sendHttpGet(url, params, httpclient,headerMap,en);
	}
	/**
	 * 发送HTTPS GET请求,支持多个参数(注：多个参数需拼接,双向认证)
	 * @param url 链接
	 * @param params 参数(格式：:key1=value1&key2=value2)
	 * @param filePath 证书路径
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static String sendHttpsGetPKCS12(String url, String params,String filePath,String password,Map<String,Object> headerMap,String en) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClientPKCS12(filePath, password);
		return sendHttpGet(url, params, httpclient,headerMap,en);
	}

	/**
	 * 发送HTTPS GET请求,不带参数(注：可将参数加在url后面)
	 *
	 * @param url 链接
	 */
	public static String sendHttpsGet(String url,Map<String,Object> headerMap,String en) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClient(url);
		try {
			return sendHttpGet(url, httpclient,headerMap,en);
		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTPS POST请求,支持带多个String参数
	 *
	 * @param url 链接
	 * @param paramMap 参数
	 */
	public static Object sendHttpsPost(String url, Map<String, String> paramMap,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClient(url);
		return sendHttpPost(url, paramMap, httpclient,headerMap,"UTF-8");
	}
	//TODO
	public static Object sendHttpsGet(String url,Map<String,String> paramMap,Map<String,Object> headerMap,String en)throws Exception{
		CloseableHttpClient httpclient = HttpClientUtils.getCloseableHttpsClient();
		return sendHttpGet(url, httpclient, headerMap,en);
	}
	/**
	 * 发送HTTPS POST请求,支持带多个String参数(双向证书)
	 * @param url
	 * @param paramMap
	 * @param filePath
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static Object sendHttpsPostPKCS12(String url, Map<String, String> paramMap,String filePath,String password,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClientPKCS12(filePath, password);
		return sendHttpPost(url, paramMap, httpclient,headerMap,"UTF-8");
	}

	/**
	 * 发送HTTPS POST请求,支持多个参数(注：多个参数需拼接)
	 *
	 * @param url 链接
	 * @param params 参数(格式:key1=value1&key2=value2)
	 */
	public static Object sendHttpsPost(String url, String params,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClient(url);
		return sendHttpPost(url, params, httpclient,headerMap);
	}
	/**
	 * 发送HTTPS POST请求,支持带多个String参数(双向证书)
	 * @param url
	 * @param paramStr
	 * @param filePath
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static Object sendHttpsPostPKCS12(String url, String paramStr,String filePath,String password,Map<String,Object> headerMap) throws Exception {
		CloseableHttpClient httpclient = HttpClientUtils.getHttpsClientPKCS12(filePath, password);
		return sendHttpPost(url, paramStr, httpclient,headerMap);
	}

	/**
	 * 发送HTTP GET请求
	 */
	private static String sendHttpGet(String url, String params, CloseableHttpClient httpclient,Map<String,Object> headerMap,String en) throws Exception {
		try {
			StringBuilder sb = new StringBuilder()
					.append(url)
					.append("?")
					.append(params);

			return sendHttpGet(sb.toString(), httpclient,headerMap,en);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTP POST请求
	 */
	private static Object sendHttpPost(String url, Map<String, String> paramMap, CloseableHttpClient httpclient,Map<String,Object> headerMap,String encode) throws Exception {
		try {
			HttpPost httpPost = new HttpPost(url);
//			StringBuffer params=new StringBuffer();
			List<NameValuePair> nvps = new ArrayList<NameValuePair>();

			for (String key : paramMap.keySet()) {
//				nvps.add(new BasicNameValuePair(key, new String(paramMap.get(key).getBytes(),encode) ));
				NameValuePair nameValuePair = new BasicNameValuePair(key, paramMap.get(key));
				nvps.add(nameValuePair);
//				params.append(key+"="+paramMap.get(key)).append("&");
			}
//			String param=params.deleteCharAt(params.length()-1).toString();
//			System.out.println(param);
//			httpPost.setEntity(new StringEntity(param, Consts.UTF_8));
			UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(nvps, encode);
			httpPost.setEntity(formEntity);

			return sendHttpPost(httpPost, httpclient,headerMap);

		} catch(Exception e){
			e.printStackTrace();
			return null;

		} finally {
			httpclient.close();
		}
	}

	/**
	 * 发送HTTP POST请求
	 */
	private static Object sendHttpPost(String url, String params, CloseableHttpClient httpclient,Map<String,Object> headerMap) throws Exception {
		try {
			HttpPost httpPost = new HttpPost(url);

			httpPost.setEntity(new StringEntity(params, Consts.UTF_8));

			return sendHttpPost(httpPost, httpclient,headerMap);

		} catch(Exception e){
			e.printStackTrace();
			return null;
		} finally {
			httpclient.close();
		}
	}

	/**
	 * 获取HttpClient
	 */
	private static CloseableHttpClient getHttpClient() {
		return HttpClients.createDefault();
	}

	/**
	 * 获取HTTPS HttpClient
	 */
	private static CloseableHttpClient getHttpsClient(String url) throws Exception {

		PublicSuffixMatcher publicSuffixMatcher = PublicSuffixMatcherLoader.load(new URL(url));

		DefaultHostnameVerifier hostnameVerifier = new DefaultHostnameVerifier(publicSuffixMatcher);

		CloseableHttpClient httpclient = HttpClients.custom() .setSSLHostnameVerifier(hostnameVerifier).build();

		return httpclient;
	}
	/**
	 * 获取双向证书 getHttpsClientPKCS12
	 * @param filePath
	 * @param password
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "deprecation"})
	private static CloseableHttpClient getHttpsClientPKCS12(String filePath,String password) throws Exception{
		KeyStore keyStore=KeyStore.getInstance("PKCS12");
		File file=new File(filePath);
		FileInputStream fileInputStream=new FileInputStream(file);
		keyStore.load(fileInputStream, password.toCharArray());
		fileInputStream.close();
		SSLContext sslContext=SSLContexts.custom().loadKeyMaterial(keyStore, password.toCharArray()).build();
		SSLConnectionSocketFactory sslsf=new SSLConnectionSocketFactory(sslContext, new String[]{"TLSv1"},null, SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
		CloseableHttpClient httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
		return httpclient;
	}
	//获取HttpsClient
	@SuppressWarnings("deprecation")
	private static CloseableHttpClient getCloseableHttpsClient()throws Exception{
		TrustManager[] tm = {new MyX509TrustManager ()};
		SSLContext sslContext = SSLContext.getInstance("SSL","SunJSSE");
		sslContext.init(null, tm, new java.security.SecureRandom());
		SSLConnectionSocketFactory sslsf=new SSLConnectionSocketFactory(sslContext, new String[]{"TLSv1"},null, SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
		CloseableHttpClient httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
		return httpclient;
	}
	/**
	 * 发送HTTP POST请求
	 */
	private static Object sendHttpPost(HttpPost httpPost, CloseableHttpClient httpclient,Map<String,Object> headerMap) throws Exception {
		httpPost.setConfig(requestConfig);
		if(headerMap!=null&&headerMap.size()>0){
			for(String key:headerMap.keySet()){
				httpPost.setHeader(key, headerMap.get(key).toString());
			}
		}
		CloseableHttpResponse response = httpclient.execute(httpPost);
		try {
			HttpEntity entity = response.getEntity();
			String responseStr=EntityUtils.toString(entity, Consts.UTF_8);
			if(responseStr==null||"".equals(responseStr.trim())){
				return response.getStatusLine().getStatusCode();
			}
			return responseStr;
		} catch(Exception e){
			e.printStackTrace();
			return null;
		}finally {
			response.close();
		}
	}

	/**
	 * 发送HTTP GET请求
	 */
	private static String sendHttpGet(String url, CloseableHttpClient httpclient,Map<String,Object> headerMap,String en) throws Exception{
		HttpGet httpGet = new HttpGet(url);
		httpGet.setConfig(requestConfig);
		if(headerMap!=null&&headerMap.size()>0){
			for(String key:headerMap.keySet()){
				httpGet.setHeader(key, headerMap.get(key).toString());
			}
		}
		CloseableHttpResponse response = httpclient.execute(httpGet);
		try {
			HttpEntity entity = response.getEntity();
			String cn=(en==null?"utf-8":en);
			return EntityUtils.toString(entity, cn);
		} catch(Exception e){
			e.printStackTrace();
			return null;
		} finally {
			response.close();
		}
	}

	/**
	 * 发送HTTP GET请求
	 */
	private static byte[] sendHttpGetResByte(String url, CloseableHttpClient httpclient,Map<String,Object> headerMap) throws Exception{
		HttpGet httpGet = new HttpGet(url);
		httpGet.setConfig(requestConfig);
		if(headerMap!=null&&headerMap.size()>0){
			for(String key:headerMap.keySet()){
				httpGet.setHeader(key, headerMap.get(key).toString());
			}
		}
		CloseableHttpResponse response = httpclient.execute(httpGet);
		try {
			HttpEntity entity = response.getEntity();
			return EntityUtils.toByteArray(entity);
		} catch(Exception e){
			e.printStackTrace();
			return null;
		} finally {
			response.close();
		}
	}
	/**
	 * 测试类
	 * @param args
	 */
	public static void main(String[] args){
		try {
			//System.out.println(HttpClientUtils.sendHttpGet("http://jiuzhekan.com",null));
			//File file=new File("d://test.png");
			//	headerMap.put("Connection", "Keep-Alive");\

//			System.out.println(HttpClientUtils.sendHttpsGet("https://kyfw.12306.cn/otn/leftTicket/query?","", null));
			//System.out.println(HttpClientUtils.sendHttpGet("https://kyfw.12306.cn/otn/leftTicket/query?", null));
			//测试上传文件
			//System.out.println(HttpClientUtils.sendHttpPost("http://wx.jiuzhekan.com/jiuzhekan_http/public/v1/upload1", file, null));
			//小说小排重
            HashMap<String ,Object> params = new HashMap<String, Object>();
            String digest ="demo_access"+"demo_secret";

            params.put("access_key","demo_access");
            params.put("digest",Base64.decodeBase64(digest.getBytes()));
            System.out.println(HttpClientUtils.sendHttpGet("nice2meet.cn/rtc/auth/valid","",params,"UTF-8"));
        } catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
