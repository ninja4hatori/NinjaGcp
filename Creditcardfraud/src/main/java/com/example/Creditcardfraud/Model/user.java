package com.example.Creditcardfraud.Model;

import org.springframework.boot.autoconfigure.domain.EntityScan;
@EntityScan
public class user {
   private Integer id;
   private String name;
   private Integer salary;

   public user(Integer id, String name, Integer salary)
   {
       this.id=id;
       this.name=name;
       this.salary=salary;
   }
   public user(){

   }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
