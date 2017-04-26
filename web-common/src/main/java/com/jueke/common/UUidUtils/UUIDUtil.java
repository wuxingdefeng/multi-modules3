package com.jueke.common.UUidUtils;

import java.util.UUID;

public class UUIDUtil {
	 public static String getUUid(){
    	 return UUID.randomUUID().toString().replace("-", "");
     }
}
