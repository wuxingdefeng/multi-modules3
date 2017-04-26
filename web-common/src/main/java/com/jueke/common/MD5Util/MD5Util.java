package com.jueke.common.MD5Util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;


public class MD5Util {
	/** Defeats instantiation. */
	private MD5Util(){
	}

	/**
	 * ����SunAPI����16λ�ֽ�����ժҪ
	 * 
	 * @param text ����
	 * @return byte[] msgDigest.digest();
	 */
	public static byte[] md5Bytes(String text) {
		if (null == text || "".equals(text)) {
			return new byte[0];
		}

		MessageDigest msgDigest = null;
		try {
			msgDigest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("System doesn't support MD5 algorithm.");
		}

		msgDigest.update(text.getBytes());
		byte[] bytes = msgDigest.digest();
		return bytes;
	}

	/**
	 * ���ַ�������MD5����
	 * 
	 * @param text ����
	 * @param isReturnRaw �Ƿ�ֱ����API����new String(byte[16])(ע�ⲻͬϵͳ���������)������ʹ��<code>false</code>
	 * @return if(isNeedRaw) 32λ���� else 16λ����
	 */
	public static String md5(String text, boolean isReturnRaw) {
		if (null == text || "".equals(text)) {
			return text;
		}
		byte[] bytes = md5Bytes(text);
		if (isReturnRaw) {
			return new String(bytes);
		}

		String md5Str = new String();
		byte tb;
		char low;
		char high;
		char tmpChar;

		for (int i = 0; i < bytes.length; i++) {
			tb = bytes[i];

			tmpChar = (char) ((tb >>> 4) & 0x000f);
			if (tmpChar >= 10) {
				high = (char) (('a' + tmpChar) - 10);
			} else {
				high = (char) ('0' + tmpChar);
			}
			md5Str += high;

			tmpChar = (char) (tb & 0x000f);
			if (tmpChar >= 10) {
				low = (char) (('a' + tmpChar) - 10);
			} else {
				low = (char) ('0' + tmpChar);
			}
			md5Str += low;
		}

		return md5Str;
	}

	/**
	 * ���ַ�������MD5����
	 * 
	 * @param text ����
	 * @return 32λ����
	 */
	public static String md5(String text) {
		return md5(text, false);
	}

	public static void main(String args[]) {
		System.out.println(md5("123456"));
	}
}
