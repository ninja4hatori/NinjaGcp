package com.tcs.frauddetection.bean;

public class SearchFraudTransactionRequestDto {

    private Integer frudDuration;
    private String dateFrom;
    private String dateTo;

    public SearchFraudTransactionRequestDto(Integer frudDuration, String dateFrom, String dateTo) {
        this.frudDuration = frudDuration;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
    public SearchFraudTransactionRequestDto() {
        // TODO Auto-generated constructor stub
    }

    public Integer getFrudDuration() {
        return frudDuration;
    }

    public void setFrudDuration(Integer frudDuration) {
        this.frudDuration = frudDuration;
    }

    public String getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(String dateFrom) {
        this.dateFrom = dateFrom;
    }

    public String getDateTo() {
        return dateTo;
    }

    public void setDateTo(String dateTo) {
        this.dateTo = dateTo;
    }
}
