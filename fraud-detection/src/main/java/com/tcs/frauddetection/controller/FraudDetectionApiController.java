/**
 * 
 */
package com.tcs.frauddetection.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.tcs.frauddetection.bean.SearchFraudTransactionRequestDto;
import com.tcs.frauddetection.bean.SearchTransactionRequestDto;
import com.tcs.frauddetection.bean.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.frauddetection.bean.Transaction;
import com.tcs.frauddetection.respository.TransactionJDBCRepository;

/**
 * @author Sudarshan
 *
 */
@RestController
public class FraudDetectionApiController {

	/**
	 * 
	 */
	
	@Autowired
	private TransactionJDBCRepository transactionJDBCRepository;
	
	@GetMapping("/transactions")
	@CrossOrigin
	public List<Transaction> searchTransactionByCard(@RequestParam(required=false, name="cardId") Integer cardId, @RequestParam(required=false, name="transactionDateFrom") String dateFrom,@RequestParam(required=false, name="transactionDateTo") String dateTo ) {
		
		SearchTransactionRequestDto searchRequestDto = new SearchTransactionRequestDto(cardId, dateFrom, dateTo);
		return transactionJDBCRepository.searchTransactions(searchRequestDto);				
	}
	
	@GetMapping("/fraud-transactions")
	@CrossOrigin
	public Map<String, Map<String,Object>> searchFraudTransactions(@RequestParam(required=false,name="fraudDurartion") Integer fraudDuration,
													   @RequestParam(required=false,name="fraudDateFrom") String fdFrom,
													   @RequestParam(required=false,name="FraudDateTo") String fdTo) {
		SearchFraudTransactionRequestDto searchRequestDto = new SearchFraudTransactionRequestDto(fraudDuration, fdFrom, fdTo);
		SearchFraudTransactionRequestDto significantRequestDto = new SearchFraudTransactionRequestDto(fraudDuration, fdFrom, fdTo);
		Object fraud_transaction=transactionJDBCRepository.searchFraudTransactions(searchRequestDto);
		Object significnt_transaction=transactionJDBCRepository.searchSignificantFraud(significantRequestDto);
		Map<String, Object > fraudMap = new HashMap<>();
		Map<String, Map<String,Object> > frauds = new HashMap<>();
		fraudMap.put("significant_transactions",significnt_transaction);
		fraudMap.put("fraud_transactions", fraud_transaction);
		frauds.put("frauds",fraudMap);
	     return frauds;

	}

	 
/*
	@GetMapping("/")
	public String hello() {

		StringBuilder response = new StringBuilder();

		 * DDL for table
		 * 
		 * create table employees
(
   id integer not null,
   first_name varchar(255) not null, 
   last_name varchar(255) not null,
   email_address varchar(255) not null,
   password varchar(255) null,
   primary key(id)
);
		 */


		//Inserting records into the table
	/*	employeeRepository.insert(new Employee(10015L, "Ramesh", "Fadatare", "ramesh@gmail.com"));
	    employeeRepository.insert(new Employee(10016L, "John", "Cena", "john@gmail.com"));
	    employeeRepository.insert(new Employee(10013L, "tony", "stark", "stark@gmail.com"));
	  
	    //Finding a single record using primary Key
	     Optional<Employee> optionalEmp = employeeRepository.findById(10015L);
	     if(optionalEmp.isPresent()) {
	    	 Employee emp = optionalEmp.get();
	    	 response.append("Employee name for employee id ").append(10011L).append(" is ").append(emp.getFirstName()).append(". ");
	     } else {
	    	 response.append("No employee with employee id ").append(10011L);
	     }
	     
	     //Updating a existing record in table
	     employeeRepository.update(new Employee(10011L, "ram", "Stark", "ramesh123@gmail.com"));

	     //Deleting a record from table
	     employeeRepository.deleteById(10013L);

	     //Fetching the list of all employees present in table using RowMapper
	     response.append("Total number of records in table is "+employeeRepository.findAll().size());
	     
		return response.toString();
	}
*/
}


