package com.tcs.frauddetection.bean;

public class Fraud {
    private int id;
    private String card_id;
    private String auth;
    private String cur_bb;
    private String credit_utilize;
    private String avg_bb;
    private String overdraft;
    private String cc_age;
    private String cut;
    private String loc;
    private String loct;
    private String odt;
    private String amount;
    private String transaction_date;
    private int fraud_case;
    private float fraud_threshold;

    public Fraud() {

    }

    @Override
    public String toString() {
        return "Fraud{" +
                "id=" + id +
                ", card_id='" + card_id + '\'' +
                ", auth='" + auth + '\'' +
                ", cur_bb='" + cur_bb + '\'' +
                ", credit_utilize='" + credit_utilize + '\'' +
                ", avg_bb='" + avg_bb + '\'' +
                ", overdraft='" + overdraft + '\'' +
                ", cc_age='" + cc_age + '\'' +
                ", cut='" + cut + '\'' +
                ", loc='" + loc + '\'' +
                ", loct='" + loct + '\'' +
                ", odt='" + odt + '\'' +
                ", amount='" + amount + '\'' +
                ", transaction_date='" + transaction_date + '\'' +
                ", fraud_case=" + fraud_case +
                ", fraud_threshold=" + fraud_threshold +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCard_id() {
        return card_id;
    }

    public void setCard_id(String card_id) {
        this.card_id = card_id;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public String getCur_bb() {
        return cur_bb;
    }

    public void setCur_bb(String cur_bb) {
        this.cur_bb = cur_bb;
    }

    public String getCredit_utilize() {
        return credit_utilize;
    }

    public void setCredit_utilize(String credit_utilize) {
        this.credit_utilize = credit_utilize;
    }

    public String getAvg_bb() {
        return avg_bb;
    }

    public void setAvg_bb(String avg_bb) {
        this.avg_bb = avg_bb;
    }

    public String getOverdraft() {
        return overdraft;
    }

    public void setOverdraft(String overdraft) {
        this.overdraft = overdraft;
    }

    public String getCc_age() {
        return cc_age;
    }

    public void setCc_age(String cc_age) {
        this.cc_age = cc_age;
    }

    public String getCut() {
        return cut;
    }

    public void setCut(String cut) {
        this.cut = cut;
    }

    public String getLoc() {
        return loc;
    }

    public void setLoc(String loc) {
        this.loc = loc;
    }

    public String getLoct() {
        return loct;
    }

    public void setLoct(String loct) {
        this.loct = loct;
    }

    public String getOdt() {
        return odt;
    }

    public void setOdt(String odt) {
        this.odt = odt;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public int getFraud_case() {
        return fraud_case;
    }

    public void setFraud_case(int fraud_case) {
        this.fraud_case = fraud_case;
    }

    public float getFraud_threshold() {
        return fraud_threshold;
    }

    public void setFraud_threshold(float fraud_threshold) {
        this.fraud_threshold = fraud_threshold;
    }

    public Fraud(String card_id, String auth, String cur_bb, String credit_utilize, String avg_bb, String overdraft, String cc_age, String cut, String loc, String loct, String odt, String amount, String transaction_date, int fraud_case, float fraud_threshold) {
        this.card_id = card_id;
        this.auth = auth;
        this.cur_bb = cur_bb;
        this.credit_utilize = credit_utilize;
        this.avg_bb = avg_bb;
        this.overdraft = overdraft;
        this.cc_age = cc_age;
        this.cut = cut;
        this.loc = loc;
        this.loct = loct;
        this.odt = odt;
        this.amount = amount;
        this.transaction_date = transaction_date;
        this.fraud_case = fraud_case;
        this.fraud_threshold = fraud_threshold;
    }
}
