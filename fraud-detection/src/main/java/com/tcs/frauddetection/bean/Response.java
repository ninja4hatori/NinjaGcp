/**
 * 
 */
package com.tcs.frauddetection.bean;

import java.util.Map;

/**
 * @author Sudarshan
 *
 */
public class Response {

	/**
	 *
     * @param fileName
     * @param contentType
     * @param size
     * @param totalRecordCount
     * @param frauds
     */

	
	private String fileName;
	private String fileType;
	private long size;
	private int totalRecordsInFile;
	private Map<String,Object> frauds;

	public Response(String fileName, String fileType, long size, int totalRecordsInFile, Map<String,Object> frauds) {
		this.fileName = fileName;
	    this.fileType = fileType;
	    this.size = size;
	    this.totalRecordsInFile = totalRecordsInFile;
	    this.frauds=frauds;
	}

	/**
	 * @return the totalRecordsInFile
	 */
	public int getTotalRecordsInFile() {
		return totalRecordsInFile;
	}

	/**
	 * @param totalRecordsInFile the totalRecordsInFile to set
	 */
	public void setTotalRecordsInFile(int totalRecordsInFile) {
		this.totalRecordsInFile = totalRecordsInFile;
	}

	/**
	 * @return the fileName
	 */
	public String getFileName() {
		return fileName;
	}

	/**
	 * @param fileName the fileName to set
	 */
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	/**
	 * @return the fileType
	 */
	public String getFileType() {
		return fileType;
	}

	/**
	 * @param fileType the fileType to set
	 */
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	/**
	 * @return the size
	 */
	public long getSize() {
		return size;
	}

	public Map<String,Object> getFraud_transactions() {
		return frauds;
	}

	public void setFraud_transactions(Map<String,Object> frauds) {
		this.frauds = frauds;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(long size) {
		this.size = size;
	}
}
