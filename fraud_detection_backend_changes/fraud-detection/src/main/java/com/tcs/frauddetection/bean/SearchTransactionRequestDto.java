/**
 * 
 */
package com.tcs.frauddetection.bean;

/**
 * @author Sudarshan
 *
 */
public class SearchTransactionRequestDto {

	/**
	 * 
	 */
	public SearchTransactionRequestDto() {
		// TODO Auto-generated constructor stub
	}
	
	public SearchTransactionRequestDto(Integer cardId,String dateFrom,String dateTo) {
		this.cardId = cardId;
		this.dateFrom = dateFrom;
		this.dateTo = dateTo;
	}
	
	private Integer cardId;
	private String dateFrom;
	private String dateTo;
	/**
	 * @return the cardId
	 */
	public Integer getCardId() {
		return cardId;
	}
	/**
	 * @param cardId the cardId to set
	 */
	public void setCardId(int cardId) {
		this.cardId = cardId;
	}
	/**
	 * @return the dateFrom
	 */
	public String getDateFrom() {
		return dateFrom;
	}
	/**
	 * @param dateFrom the dateFrom to set
	 */
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}
	/**
	 * @return the dateTo
	 */
	public String getDateTo() {
		return dateTo;
	}
	/**
	 * @param dateTo the dateTo to set
	 */
	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}
	
	

}
