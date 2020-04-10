/**
 * 
 */
package com.tcs.frauddetection.bean;

/**
 * @author Sudarshan
 *
 */
public class Response {

	/**
	 * 
	 */
	public Response() {
		// TODO Auto-generated constructor stub
	}
	
	private String fileName;
	private String fileType;
	private long size;
	private int totalRecordsInFile;

	public Response(String fileName, String fileType, long size, int totalRecordsInFile) {
		this.fileName = fileName;
	    this.fileType = fileType;
	    this.size = size;
	    this.totalRecordsInFile = totalRecordsInFile;
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

	/**
	 * @param size the size to set
	 */
	public void setSize(long size) {
		this.size = size;
	}
}
