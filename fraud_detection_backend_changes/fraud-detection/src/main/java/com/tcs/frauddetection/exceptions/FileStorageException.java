/**
 * 
 */
package com.tcs.frauddetection.exceptions;

/**
 * @author Sudarshan
 *
 */
public class FileStorageException extends RuntimeException{

	/**
	 * 
	 */
	public FileStorageException() {
		// TODO Auto-generated constructor stub
	}
	
	private static final long serialVersionUID = 1L;

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }

}
