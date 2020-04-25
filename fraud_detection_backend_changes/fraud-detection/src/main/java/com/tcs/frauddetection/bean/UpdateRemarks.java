package com.tcs.frauddetection.bean;

public class UpdateRemarks {
    private int transaction_id;
    private String Remark;

    public UpdateRemarks(int transaction_id, String remark) {
        this.transaction_id = transaction_id;
        Remark = remark;
    }

    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getRemark() {
        return Remark;
    }

    public void setRemark(String remark) {
        Remark = remark;
    }
}
