package com.tcs.frauddetection.controller;

import com.tcs.frauddetection.bean.SearchTransactionRequestDto;
import com.tcs.frauddetection.bean.Significant_fraud;
import com.tcs.frauddetection.bean.Transaction;
import com.tcs.frauddetection.bean.UpdateRemarks;
import com.tcs.frauddetection.respository.TransactionJDBCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class UpdateRemarkApiController {

    @Autowired
    private TransactionJDBCRepository transactionJDBCRepository;
    @RequestMapping(method=RequestMethod.POST,value="/update-remarks")
    @CrossOrigin
    public Map<String,Object> updateRemark(@RequestBody Significant_fraud significantFraud){
        UpdateRemarks updateremark = new UpdateRemarks(significantFraud.getTransaction_id(),significantFraud.getRemark());
        Map<String,Object> updatedData= new HashMap<>();
         updatedData.put("Updated_Record",transactionJDBCRepository.updateRemark(updateremark));
         return updatedData;
    }

}
