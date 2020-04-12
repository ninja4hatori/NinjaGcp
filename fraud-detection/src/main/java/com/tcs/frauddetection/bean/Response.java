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
     * @param fileName
     * @param contentType
     * @param size
     * @param totalRecordCount
     * @param fraud_transactions
     */

	
	private String fileName;
	private String fileType;
	private long size;
	private int totalRecordsInFile;
	private Object fraud_transactions;

	public Response(String fileName, String fileType, long size, int totalRecordsInFile,Object fraud_transactions) {
		this.fileName = fileName;
	    this.fileType = fileType;
	    this.size = size;
	    this.totalRecordsInFile = totalRecordsInFile;
	    this.fraud_transactions=fraud_transactions;
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

	public Object getFraud_transactions() {
		return fraud_transactions;
	}

	public void setFraud_transactions(Object fraud_transactions) {
		this.fraud_transactions = fraud_transactions;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(long size) {
		this.size = size;
	}
}
