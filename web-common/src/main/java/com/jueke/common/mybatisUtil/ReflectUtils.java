package com.jueke.common.mybatisUtil;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * ��ReflectUtils.java��ʵ��������TODO ��ʵ������
 * 
 * @author Administrator 2014-8-2 ����10:51:20
 */
public class ReflectUtils {

    /**
     * ��ó���Ĳ������ͣ�ȡ��һ����������
     * 
     * @param <T> ���Ͳ���
     * @param clazz ��������
     */
    @SuppressWarnings("rawtypes")
    public static <T> Class getClassGenricType(final Class clazz) {
        return getClassGenricType(clazz, 0);
    }

    /**
     * ����������ó���Ĳ�������
     * 
     * @param clazz ��������
     * @param index ����
     */
    @SuppressWarnings("rawtypes")
    public static Class getClassGenricType(final Class clazz, final int index) {
        Type genType = clazz.getGenericSuperclass();
        if (!(genType instanceof ParameterizedType)) {
            return Object.class;
        }
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        if (index >= params.length || index < 0) {
            return Object.class;
        }
        if (!(params[index] instanceof Class)) {
            return Object.class;
        }
        return (Class) params[index];
    }
}
