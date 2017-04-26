package com.jueke.model.system;

import java.util.Date;

public class QSysAdminDo {
	
	private String AdminId;  //����Աid
	private String AdminName;//����Ա����
	private String Password;//����
	private String HeandUrl;//ͷ��url
	private Integer Sex; //�Ա�
	private Integer Status;//����Ա״̬
	private String RoleId; //��ɫid
	private Date UpdateDate; //����ʱ��
	private String isDel; //ɾ����־
	private Date delDate; // ɾ��ʱ��
	
	// ��֤��
    private String code;
    private String roleName; //��ɫ����
    private String oldPassword;
    private String newPassword;
    private String comfirmPassword;
	public String getAdminId() {
		return AdminId;
	}
	public void setAdminId(String adminId) {
		AdminId = adminId;
	}
	public String getAdminName() {
		return AdminName;
	}
	public void setAdminName(String adminName) {
		AdminName = adminName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getHeandUrl() {
		return HeandUrl;
	}
	public void setHeandUrl(String heandUrl) {
		HeandUrl = heandUrl;
	}
	public Integer getSex() {
		return Sex;
	}
	public void setSex(Integer sex) {
		Sex = sex;
	}
	public Integer getStatus() {
		return Status;
	}
	public void setStatus(Integer status) {
		Status = status;
	}
	public String getRoleId() {
		return RoleId;
	}
	public void setRoleId(String roleId) {
		RoleId = roleId;
	}
	public Date getUpdateDate() {
		return UpdateDate;
	}
	public void setUpdateDate(Date updateDate) {
		UpdateDate = updateDate;
	}
	public String getIsDel() {
		return isDel;
	}
	public void setIsDel(String isDel) {
		this.isDel = isDel;
	}
	public Date getDelDate() {
		return delDate;
	}
	public void setDelDate(Date delDate) {
		this.delDate = delDate;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getComfirmPassword() {
		return comfirmPassword;
	}
	public void setComfirmPassword(String comfirmPassword) {
		this.comfirmPassword = comfirmPassword;
	}
	
	
	
	
}
