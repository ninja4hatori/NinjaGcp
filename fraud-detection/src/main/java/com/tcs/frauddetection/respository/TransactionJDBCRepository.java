/**
 * 
 */
package com.tcs.frauddetection.respository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.tcs.frauddetection.bean.Fraud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import com.tcs.frauddetection.bean.Transaction;

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
        return jdbcTemplate.update("insert into transactions (card_id,auth,cur_bb,credit_utilize,avg_bb,overdraft,cc_age,cut,loc,loct,odt,amount,transaction_date) " + "values(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)",
                new Object[] {
                        transaction.getCard_id(),transaction.getAuth(),transaction.getCur_bb(),transaction.getCredit_utilize(),transaction.getAvg_bb(),transaction.getOverdraft(),transaction.getCc_age(),transaction.getCut(),transaction.getLoc(),transaction.getLoct(),transaction.getOdt(),transaction.getAmount(),transaction.getTransaction_date()
                });
    }
    public int insert_fraud(Fraud fraud) {
        System.out.println(jdbcTemplate);
        return jdbcTemplate.update("insert into fraud_transactions (card_id,auth,cur_bb,credit_utilize,avg_bb,overdraft,cc_age,cut,loc,loct,odt,amount,transaction_date,fraud_case,fraud_threshold) " + "values(? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)",
                new Object[] {
                        fraud.getCard_id(),fraud.getAuth(),fraud.getCur_bb(),fraud.getCredit_utilize(),fraud.getAvg_bb(),fraud.getOverdraft(),fraud.getCc_age(),fraud.getCut(),fraud.getLoc(),fraud.getLoct(),fraud.getOdt(),fraud.getAmount(),fraud.getTransaction_date(),fraud.getFraud_case(),fraud.getFraud_threshold()
                });
    }
   /* public Optional < Transaction > findById(int card_id) {
        return Optional.of(jdbcTemplate.queryForObject("select * from fraud_transactions where card_id=? limit 1", new Object[] {
                        card_id
                },
                new BeanPropertyRowMapper < Fraud > (Fraud.class)));
    }*/
    public List < Transaction > findAll() {
        return jdbcTemplate.query("select * from transactions", new transactionRowMapper());
    }

    class transactionRowMapper implements RowMapper < Transaction > {
        @Override
        public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
            Transaction result = new Transaction();
            result.setId(rs.getInt("id"));
            result.setCard_id(rs.getInt("card_id"));
            result.setAuth(rs.getInt("auth"));
            result.setCur_bb(rs.getInt("cur_bb"));
            result.setCredit_utilize(rs.getInt("credit_utilize"));
            result.setAvg_bb(rs.getInt("avg_bb"));
            result.setOverdraft(rs.getInt("overdraft"));
            result.setCc_age(rs.getInt("cc_age"));
            result.setCut(rs.getInt("cut"));
            result.setLoc(rs.getInt("loc"));
            result.setLoct(rs.getInt("loct"));
            result.setOdt(rs.getInt("odt"));
            result.setAmount(rs.getInt("amount"));
            result.setTransaction_date(rs.getString("transaction_date"));
            return result;



        }

    };


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
