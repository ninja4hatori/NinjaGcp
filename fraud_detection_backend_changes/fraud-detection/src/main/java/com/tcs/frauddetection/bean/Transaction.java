/**
 * 
 */
package com.tcs.frauddetection.bean;

import java.sql.Date;

/**
 * @author Sudarshan
 *
 */
public class Transaction {
    private int id;
    private int card_id;
    private int auth;
    private int cur_bb;
    private int card_used;
    private int avg_bb;
    private int overdraft;
    private int cc_age;
    private int cut;
    private int loc;
    private int loct;
    private int odt;
    private int amount;
    private Date transaction_date;

    public Transaction() {

    }

    public Transaction(int card_id, int auth, int cur_bb, int card_used, int avg_bb, int overdraft, int cc_age, int cut, int loc, int loct, int odt, int amount, Date transaction_date) {

        this.card_id = card_id;
        this.auth = auth;
        this.cur_bb = cur_bb;
        this.card_used = card_used;
        this.avg_bb = avg_bb;
        this.overdraft = overdraft;
        this.cc_age = cc_age;
        this.cut = cut;
        this.loc = loc;
        this.loct = loct;
        this.odt = odt;
        this.amount = amount;
        this.transaction_date = transaction_date;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "card_id=" + card_id +
                ", auth=" + auth +
                ", cur_bb=" + cur_bb +
                ", card_used=" + card_used +
                ", avg_bb=" + avg_bb +
                ", overdraft=" + overdraft +
                ", cc_age=" + cc_age +
                ", cut=" + cut +
                ", loc=" + loc +
                ", loct=" + loct +
                ", odt=" + odt +
                ", amount=" + amount +
                ", transaction_date='" + transaction_date + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCard_id() {
        return card_id;
    }

    public void setCard_id(int card_id) {
        this.card_id = card_id;
    }

    public int getAuth() {
        return auth;
    }

    public void setAuth(int auth) {
        this.auth = auth;
    }

    public int getCur_bb() {
        return cur_bb;
    }

    public void setCur_bb(int cur_bb) {
        this.cur_bb = cur_bb;
    }

    public int getCard_used() {
        return card_used;
    }

    public void setCard_used(int card_used) {
        this.card_used = card_used;
    }

    public int getAvg_bb() {
        return avg_bb;
    }

    public void setAvg_bb(int avg_bb) {
        this.avg_bb = avg_bb;
    }

    public int getOverdraft() {
        return overdraft;
    }

    public void setOverdraft(int overdraft) {
        this.overdraft = overdraft;
    }

    public int getCc_age() {
        return cc_age;
    }

    public void setCc_age(int cc_age) {
        this.cc_age = cc_age;
    }

    public int getCut() {
        return cut;
    }

    public void setCut(int cut) {
        this.cut = cut;
    }

    public int getLoc() {
        return loc;
    }

    public void setLoc(int loc) {
        this.loc = loc;
    }

    public int getLoct() {
        return loct;
    }

    public void setLoct(int loct) {
        this.loct = loct;
    }

    public int getOdt() {
        return odt;
    }

    public void setOdt(int odt) {
        this.odt = odt;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(Date transaction_date) {
        this.transaction_date = transaction_date;
    }
}