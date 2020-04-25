package com.tcs.frauddetection.bean;

public class Significant_fraud {
    private int id;
    private int card_id;
    private int transaction_id;
    private int occurance;
    private String transaction_date;
    private String fraud_type;
    private float fraud_threshold;
    private String remark;

    public Significant_fraud() {

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

    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public int getOccurance() {
        return occurance;
    }

    public void setOccurance(int occurance) {
        this.occurance = occurance;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getFraud_type() {
        return fraud_type;
    }

    public void setFraud_type(String fraud_type) {
        this.fraud_type = fraud_type;
    }

    public float getFraud_threshold() {
        return fraud_threshold;
    }

    public void setFraud_threshold(float fraud_threshold) {
        this.fraud_threshold = fraud_threshold;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Significant_fraud(int card_id, int transaction_id, int occurance, String transaction_date, String fraud_type, float fraud_threshold) {
        this.card_id = card_id;
        this.transaction_id = transaction_id;
        this.occurance = occurance;
        this.transaction_date = transaction_date;
        this.fraud_type = fraud_type;
        this.fraud_threshold = fraud_threshold;

    }

}