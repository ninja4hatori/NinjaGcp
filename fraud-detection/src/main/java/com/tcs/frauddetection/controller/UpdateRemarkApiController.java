package com.tcs.frauddetection.controller;

import com.tcs.frauddetection.bean.SearchTransactionRequestDto;
import com.tcs.frauddetection.bean.Significant_fraud;
import com.tcs.frauddetection.bean.Transaction;
import com.tcs.frauddetection.respository.TransactionJDBCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
/*
@RestController
public class UpdateRemarkApiController {
    @Autowired
    private TransactionJDBCRepository transactionJDBCRepository;
    @GetMapping("/update-remarks")
    @CrossOrigin
    public List<Significant_fraud> updateRemark(@RequestParam(required=true, name="tid") Integer transaction_id, @RequestParam(required=true, name="remark") String Remark  ) {

        SearchTransactionRequestDto searchRequestDto = new SearchTransactionRequestDto(cardId, dateFrom, dateTo);
        return transactionJDBCRepository.searchTransactions(searchRequestDto);
    }

}
*/