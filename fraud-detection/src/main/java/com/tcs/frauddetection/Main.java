package com.tcs.frauddetection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class Main {
    @Autowired

    Creditcardfraud cc;
    @RequestMapping(value="/browse",method= RequestMethod.GET)
    public String  upload() throws IOException {
        String res = cc. browse();
        if(res=="200")
        {
            return "{\"success\":200}";
        }
        else
        {
            return "{\"failed\":400}";
        }

    }
    @RequestMapping(value="/calculate",method= RequestMethod.GET)
    public String  calculate() throws IOException {
        String res = cc.find();
        if(res=="200")
        {
            return "{\"success\":200}";
        }
        else
        {
            return "{\"failed\":400}";
        }

    }
}
