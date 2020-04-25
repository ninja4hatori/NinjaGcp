/**
 * 
 */
package com.tcs.frauddetection.config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author Sudarshan
 *
 */
@Component
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {

	/**
	 * 
	 */
	public FileStorageProperties() {
		// TODO Auto-generated constructor stub
	}

    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}

