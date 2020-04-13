/**
 * 
 */
package com.tcs.frauddetection.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tcs.frauddetection.Creditcardfraud;
import com.tcs.frauddetection.bean.Response;
import com.tcs.frauddetection.service.FileStorageService;

import java.util.Map;

/**
 * @author Sudarshan
 *
 */
@RestController
public class FileUploadApiController {
	
	@Autowired
    private FileStorageService fileStorageService;
	
	@Autowired
	Creditcardfraud cc;
	
	@PostMapping("/uploadFile")
	@CrossOrigin
    public Response uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        
        int totalRecordCount = fileStorageService.saveFileRecordsToDatabase(fileName);
        Map<String,Object> frauds=cc.find();
        return new Response(fileName,file.getContentType(), file.getSize(), totalRecordCount,frauds);
    }

}
