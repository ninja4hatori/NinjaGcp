package com.example.Creditcardfraud;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class HelloWorld {
    @RequestMapping("/")
    public String index() throws IOException {
       Creditcardfraud cc=new Creditcardfraud();
      cc. browse();
       cc.find();


        return "Hello Abhinav";

    }
}
