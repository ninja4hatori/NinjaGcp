/**
 * 
 */
package com.tcs.frauddetection.respository;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.TimeZone;
import java.util.List;

import com.tcs.frauddetection.bean.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import static jdk.nashorn.internal.objects.Global.getDate;

/**
 * @author Sudarshan
 *
 */
@Repository
public class TransactionJDBCRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int insert(Transaction transaction) {
        System.out.println(jdbcTemplate);
        return jdbcTemplate.update("insert into transactions (card_id,auth,cur_bb,card_used,avg_bb,overdraft,cc_age,cut,loc,loct,odt,amount,transaction_date,calculate_flag) " + "values(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , 'N')",
                new Object[] {
                        transaction.getCard_id(),transaction.getAuth(),transaction.getCur_bb(),transaction.getCard_used(),transaction.getAvg_bb(),transaction.getOverdraft(),transaction.getCc_age(),transaction.getCut(),transaction.getLoc(),transaction.getLoct(),transaction.getOdt(),transaction.getAmount(),transaction.getTransaction_date()
                });
    }
    public int insert_fraud(Fraud fraud) {

        return jdbcTemplate.update("insert into fraud_transactions (card_id,transaction_id,transaction_date,fraud_critera,fraud_threshold) " + "values(? , ? , ?, ?,?)",
                new Object[] {
                        fraud.getCard_id(),fraud.getTransaction_id(),fraud.getTransaction_date(),fraud.getFraud_critera(),fraud.getFraud_threshold()
                });
    }
    public int insert_Significant_fraud(Significant_fraud significant_fraud) {
        return jdbcTemplate.update("insert into significant_frauds (card_id,transaction_id,occurance,transaction_date,fraud_type,fraud_threshold,remark) " + "values(? , ? , ? , ? , ?, ? , ' ' )",
                new Object[]{
                        significant_fraud.getCard_id(),significant_fraud.getTransaction_id(),significant_fraud.getOccurance(), significant_fraud.getTransaction_date(), significant_fraud.getFraud_type(),significant_fraud.getFraud_threshold(),
                });
    }

    public List < Transaction > findAlltransactions() {
        return jdbcTemplate.query("select * from transactions where calculate_flag='N' ", new TransactionRowMapper());
    }

    class TransactionRowMapper implements RowMapper < Transaction > {
        @Override
        public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
            Transaction result = new Transaction();
            result.setId(rs.getInt("id"));
            result.setCard_id(rs.getInt("card_id"));
            result.setAuth(rs.getInt("auth"));
            result.setCur_bb(rs.getInt("cur_bb"));
            result.setCard_used(rs.getInt("card_used"));
            result.setAvg_bb(rs.getInt("avg_bb"));
            result.setOverdraft(rs.getInt("overdraft"));
            result.setCc_age(rs.getInt("cc_age"));
            result.setCut(rs.getInt("cut"));
            result.setLoc(rs.getInt("loc"));
            result.setLoct(rs.getInt("loct"));
            result.setOdt(rs.getInt("odt"));
            result.setAmount(rs.getInt("amount"));
            result.setTransaction_date(rs.getDate("transaction_date"));
            return result;



        }

    };
    
    public List<Transaction> searchTransactions(SearchTransactionRequestDto requestDto) {
    	StringBuilder query = new StringBuilder("select * from transactions where ");
    	boolean isCardIdPresent = null != requestDto.getCardId();
    	boolean isDateRangePresent = (null != requestDto.getDateFrom() && null != requestDto.getDateTo());
    	List<Object> queryInput = new ArrayList<>();
    	if(isCardIdPresent) {
    		query.append("card_id = ? ");
    		queryInput.add(requestDto.getCardId());
    	}
    	System.out.println("1 "+isDateRangePresent+"2 "+requestDto.getDateFrom()+"3"+requestDto.getDateTo());
    	if(isDateRangePresent) {
    		if(isCardIdPresent) {
    			query.append(" and ");
    		}

    		query.append("transaction_date >= ? and transaction_date <=?");
    		queryInput.add(Date.valueOf(requestDto.getDateFrom()));
    		queryInput.add(Date.valueOf(requestDto.getDateTo()));
    	}
    	
    	return jdbcTemplate.query(query.toString(), queryInput.toArray(),
            new TransactionRowMapper ());
    	
    }


   public List<Fraud> searchFraudTransactions(SearchFraudTransactionRequestDto requestDto) {
        StringBuilder query = new StringBuilder("select * from fraud_transactions where ");
        boolean isFraudDurationPresent = null != requestDto.getFrudDuration();
        boolean isDateRangePresent = (null != requestDto.getDateFrom() && null != requestDto.getDateTo());
        List<Object> queryInput = new ArrayList<>();
        if(isFraudDurationPresent) {
            int Monthduration=requestDto.getFrudDuration();
            Fraud f=new Fraud();
            String datefrom=f.getDatefromDuration(Monthduration);
            query.append("transaction_date >= '"+datefrom+"' and transaction_date <='"+df.format(dt1)+"'");
            System.out.println(query);
        }
        System.out.println("1 "+isDateRangePresent+"2 "+requestDto.getDateFrom()+"3"+requestDto.getDateTo());
        if(isDateRangePresent) {
            query.append("transaction_date >= ? and transaction_date <=?");
            queryInput.add(Date.valueOf(requestDto.getDateFrom()));
            queryInput.add(Date.valueOf(requestDto.getDateTo()));
        }

        return jdbcTemplate.query(query.toString(), queryInput.toArray(),
                new fraudRowMapper ());

    }
    public List<Significant_fraud> searchSignificantFraud(SearchFraudTransactionRequestDto requestDto) {
        StringBuilder query = new StringBuilder("select * from significant_frauds where ");
        boolean isFraudDurationPresent = null != requestDto.getFrudDuration();
        boolean isDateRangePresent = (null != requestDto.getDateFrom() && null != requestDto.getDateTo());
        List<Object> queryInput = new ArrayList<>();
        if(isFraudDurationPresent) {
            int Monthduration=requestDto.getFrudDuration();
            Fraud f=new Fraud();
            String datefrom=f.getDatefromDuration(Monthduration);
            query.append("transaction_date >= '"+datefrom+"' and transaction_date <='"+df.format(dt1)+"'");
        }
        System.out.println("1 "+isDateRangePresent+"2 "+requestDto.getDateFrom()+"3"+requestDto.getDateTo());
        if(isDateRangePresent) {
            query.append("transaction_date >= ? and transaction_date <=?");
            queryInput.add(Date.valueOf(requestDto.getDateFrom()));
            queryInput.add(Date.valueOf(requestDto.getDateTo()));
        }

        return jdbcTemplate.query(query.toString(), queryInput.toArray(),
                new SignificantfraudRowMapper());

    }


    java.util.Date dt1 = new java.util.Date();
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

    public List<Fraud> findAllfraud() {
        return jdbcTemplate.query("select * from fraud_transactions where transaction_date='" + df.format(dt1) + "'", new fraudRowMapper());
    }


    class fraudRowMapper implements RowMapper<Fraud> {
        @Override
        public Fraud mapRow(ResultSet rs, int rowNum) throws SQLException {
            Fraud result = new Fraud();
            result.setId(rs.getInt("id"));
            result.setCard_id(rs.getInt("card_id"));
            result.setTransaction_id(rs.getInt("transaction_id"));
            result.setFraud_critera(rs.getString("fraud_critera"));
            result.setFraud_threshold(rs.getFloat("fraud_threshold"));
            result.setTransaction_date((rs.getString("transaction_date")));

            return result;


        }
    }
    public List<Significant_fraud> findAllSignificantfraud() {
        return jdbcTemplate.query("select * from significant_frauds where transaction_date='" + df.format(dt1) + "'", new SignificantfraudRowMapper());
    }


    class SignificantfraudRowMapper implements RowMapper<Significant_fraud> {
        @Override
        public Significant_fraud mapRow(ResultSet rs, int rowNum) throws SQLException {
            Significant_fraud result = new Significant_fraud();
            result.setId(rs.getInt("id"));
            result.setCard_id(rs.getInt("card_id"));
            result.setTransaction_id(rs.getInt("transaction_id"));
            result.setOccurance(rs.getInt("occurance"));
            result.setTransaction_date(rs.getString("transaction_date"));
            result.setFraud_type(rs.getString("fraud_type"));
            result.setFraud_threshold(rs.getFloat("fraud_threshold"));
            result.setRemark(rs.getString("remark"));
            return result;


        }
    }
    public List<Transaction> getTransactionId(int card_id) {
        return jdbcTemplate.query("select id from transactions where card_id='" + card_id + "'", new GetIdRowMapper());
    }
    class GetIdRowMapper implements RowMapper<Transaction>{
        @Override
        public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
            Transaction result = new Transaction();
            result.setId(rs.getInt("id"));
            return result;

        }
    }

    public int updateTransactionFlag() {
        return jdbcTemplate.update("update transactions " + " set calculate_flag = 'P' " + " where calculate_flag = 'N'");
    }


   /* class EmployeeRowMapper implements RowMapper < Employee > {
        @Override
        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
            Employee employee = new Employee();
            employee.setId(rs.getLong("id"));
            employee.setFirstName(rs.getString("first_name"));
            employee.setLastName(rs.getString("last_name"));
            employee.setEmailId(rs.getString("email_address"));
            return employee;
        }
    }

    public List < Employee > findAll() {
        return jdbcTemplate.query("select * from employees", new EmployeeRowMapper());
    }

    public Optional < Employee > findById(long id) {
        return Optional.of(jdbcTemplate.queryForObject("select * from employees where id=?", new Object[] {
                id
            },
            new BeanPropertyRowMapper < Employee > (Employee.class)));
    }

    public int deleteById(long id) {
        return jdbcTemplate.update("delete from employees where id=?", new Object[] {
            id
        });
    }

    public int insert(Employee employee) {
        return jdbcTemplate.update("insert into employees (id, first_name, last_name, email_address) " + "values(?, ?, ?, ?)",
            new Object[] {
                employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmailId()
            });
    }

    public int update(Employee employee) {
        return jdbcTemplate.update("update employees " + " set first_name = ?, last_name = ?, email_address = ? " + " where id = ?",
            new Object[] {
                employee.getFirstName(), employee.getLastName(), employee.getEmailId(), employee.getId()
            });
    }*/
}
