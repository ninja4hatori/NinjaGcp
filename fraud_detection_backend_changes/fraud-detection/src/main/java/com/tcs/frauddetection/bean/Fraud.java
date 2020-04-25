package com.tcs.frauddetection.bean;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Fraud {
    private int id;
    private int transaction_id;
    private int card_id;
    private String transaction_date;
    private String fraud_critera;
    private float fraud_threshold;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public int getCard_id() {
        return card_id;
    }

    public void setCard_id(int card_id) {
        this.card_id = card_id;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }

    public String getFraud_critera() {
        return fraud_critera;
    }

    public void setFraud_critera(String fraud_critera) {
        this.fraud_critera = fraud_critera;
    }

    public float getFraud_threshold() {
        return fraud_threshold;
    }

    public void setFraud_threshold(float fraud_threshold) {
        this.fraud_threshold = fraud_threshold;
    }

    public Fraud(int card_id, int transaction_id, String transaction_date, String fraud_critera, float fraud_threshold) {
        this.transaction_id = transaction_id;
        this.card_id = card_id;
        this.transaction_date = transaction_date;
        this.fraud_critera = fraud_critera;
        this.fraud_threshold = fraud_threshold;
    }

    public Fraud() {

    }

    public String getDatefromDuration(int duration)
    {
        int Duration=duration;
        Calendar cal = Calendar.getInstance();
        int date = cal.get(Calendar.DATE);
        int month = cal.get(Calendar.MONTH);
        int year= cal.get(Calendar.YEAR);
        month=month+13;
        if((month-Duration)<12)
        {
            year=year-1;
            month=month-Duration;
        }
        else
        {
            month=month-duration-12;
        }
        String d= year+"-"+month+"-"+date;
        return d;
    }
}


