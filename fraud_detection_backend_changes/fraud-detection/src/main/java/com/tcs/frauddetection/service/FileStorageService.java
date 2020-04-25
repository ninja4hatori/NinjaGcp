/**
 * 
 */
package com.tcs.frauddetection.service;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.tcs.frauddetection.bean.Transaction;
import com.tcs.frauddetection.config.FileStorageProperties;
import com.tcs.frauddetection.exceptions.FileStorageException;
import com.tcs.frauddetection.respository.TransactionJDBCRepository;

/**
 * @author Sudarshan
 *
 */
@Service
public class FileStorageService {

	private final Path fileStorageLocation=null;

   /* @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
            .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    } */
    
    @Autowired
    private  TransactionJDBCRepository transactionJDBCRepository;

   /* public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    } */
    
    public int saveFileRecordsToDatabase(MultipartFile file) {
    	
        int totalRecordsInserted = 0;

        
       
    	
        try {
            String content = new String(file.getBytes());
            String[] contentArr = content.split("\n");
            for (int j = 1; j < contentArr.length; j++) {
                String strline = contentArr[j];
                String[] temp = strline.split(",");
                Date dt = new Date();
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                transactionJDBCRepository.insert(new Transaction(parseInt(temp[0]), parseInt(temp[1]),
                        parseInt(temp[2]), parseInt(temp[3]), parseInt(temp[4]), parseInt(temp[5]), parseInt(temp[6]),
                        parseInt(temp[7]), parseInt(temp[8]), parseInt(temp[9]), parseInt(temp[10]), parseInt(temp[11]),
                        java.sql.Date.valueOf((df.format(dt)))));
                totalRecordsInserted++;
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw new FileStorageException("Could not save file " + StringUtils.cleanPath(file.getOriginalFilename()) + " records to database. Please try again!", e);
        }
        return totalRecordsInserted;
    }
    
    private int parseInt(String stringValue) {
    	return Integer.parseInt(stringValue.trim());
    	
    }

}
