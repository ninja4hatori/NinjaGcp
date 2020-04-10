package com.tcs.frauddetection;

import com.tcs.frauddetection.bean.Fraud;
import com.tcs.frauddetection.bean.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.tcs.frauddetection.respository.TransactionJDBCRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class Creditcardfraud {

    StringBuilder response = new StringBuilder();

    @Autowired
    private  TransactionJDBCRepository transactionJDBCRepository;
    public  static String[][] data = new String[500][50];

    public String find()
    {
        Date dt1 = new Date();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Creditcardfraud cc=new Creditcardfraud();
        float[] res = null;
        float[][] fre = new float[6][20];
        float[][] loc = new float[6][20];
        float[][] od = new float[6][20];
        float[][] bb = new float[6][20];
        float[][] ds = new float[6][20];
        String[] temp;

        float[][] initPop = new float[21][5];
        float[][] curPop = new float[21][5];
        float[][] nexPop = new float[21][5];
        float[][] finalPop = new float[21][5];

        float[] resValue =new float[21];
        
        List<Transaction> listdata = transactionJDBCRepository.findAll();
        //System.out.println(listdata);
        Integer ip=0;
        for (Transaction fdata : listdata) {

            String s = fdata.getCard_id() + "," + fdata.getAuth() + "," + fdata.getCur_bb() + "," + fdata.getCredit_utilize() + "," + fdata.getAvg_bb() + "," + fdata.getOverdraft() + "," + fdata.getCc_age() + "," + fdata.getCut() + "," + fdata.getLoc() + "," + fdata.getLoct() + "," + fdata.getOdt() + "," + fdata.getAmount();
            System.out.println(s);
            temp = s.split(",");

            cc.data[ip] = temp;
            ip++;
        }

        Detection dt=new Detection();
        Evaluate ev= new Evaluate();
        NextGen ng= new NextGen();
        int l=0,m=0;

        for(int i=0;i<20;i++)
        {

            res= dt.ccfreq(cc.data[i]);
            System.out.println(cc.data[i]);
            if(res[0]>=1)
            {
                fre[l][m]=Float.valueOf(cc.data[i][0]);m++;
                fre[l][m]=res[1];

                transactionJDBCRepository.insert_fraud(new Fraud(cc.data[i][0],cc.data[i][1],cc.data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11],df.format(dt1),1,res[1]));

                l++;m=0;
            }
            initPop[i][0]=res[1];
        }
        l=0;m=0;

        for(int i=0;i<20;i++)
        {
            res= dt.ccloc(cc.data[i]);
            if(res[0]>=1)
            {
                loc[l][m]=Float.valueOf(cc.data[i][0]);m++;
                loc[l][m]=res[1];
                transactionJDBCRepository.insert_fraud(new Fraud(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11],df.format(dt1),2,res[1]));
                l++;m=0;
            }
            initPop[i][1]=res[1];
        }


        /* CC OverDraft */

        l=0;m=0;

        for(int i=0;i<20;i++)
        {
            res= dt.ccod(cc.data[i]);

            if(res[0]>=1)
            {
                od[l][m]=Float.valueOf(cc.data[i][0]);m++;
                od[l][m]=res[1];
                transactionJDBCRepository.insert_fraud(new Fraud(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11],df.format(dt1),3,res[1]));
                l++;m=0;
            }
            initPop[i][2]=res[1];
        }


        /* Current Book Balance */

        l=0;m=0;

        for(int i=0;i<20;i++)
        {
            res= dt.ccbb(cc.data[i]);
            if(res[0]>=1)
            {
                bb[l][m]=Float.valueOf(cc.data[i][0]);m++;
                bb[l][m]=res[1];
                transactionJDBCRepository.insert_fraud(new Fraud(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11],df.format(dt1),4,res[1]));
                l++;m=0;
            }

            initPop[i][3]=res[1];
        }


        /* Average Daily Spending */

        l=0;m=0;

        for(int i=0;i<20;i++)
        {
            res= dt.ccds(cc.data[i]);
            if(res[0]>=1)
            {
                ds[l][m]=Float.valueOf(cc.data[i][0]);m++;
                ds[l][m]=res[1];
                transactionJDBCRepository.insert_fraud(new Fraud(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11],df.format(dt1),5,res[1]));
                l++;m=0;
            }
            initPop[i][4]=res[1];
        }

        //	 float[][] finalresult = dt.organize(fre,loc,od,bb,ds);



        for(int i=0;i<20;i++)
        {
            for(int j=0;j<=4;j++)
            {
                System.out.print(initPop[i][j]);
                System.out.print("\t ");
            }
            System.out.println("");
        }

        System.out.println("********* end of INIT Population ");

        curPop=initPop;


        for(int q=0;q<20;q++)
        {
            nexPop=ng.getNextGen(curPop);
            System.out.println(" \n");
            System.out.println(" Current Popoulation - Generation -  "+q);
            System.out.println("___________________________________________ \n");
            for(int i=1;i<=20;i++)
            {
                for(int j=0;j<=4;j++)
                {
                    System.out.print(nexPop[i][j]);
                    System.out.print("\t ");
                }
                System.out.println(" ");
            }
            curPop=nexPop;

            System.out.println(" \n\n Critical Values Found after Limited number of Generations (sorted order)");



            resValue = dt.resValue(curPop);

            Arrays.sort(resValue);

            for(int i=0;i<20;i++)
            {
                System.out.println(resValue[i]);
            }


        }
        float criti=resValue[15];
        float monit=resValue[10];
        float ordin=resValue[5];

        System.out.println("\n\n Critical Values of each transaction of given DataSet");
        System.out.println(" ----------------------------------------------------------- ");

        float[][] finalresult = dt.organize(fre,loc,od,bb,ds);

        System.out.println("\n\n Value of Critic, Monitor and Ordinary Faruds");
        System.out.println("\n\n "+criti+"  "+monit+"   "+ordin);


        System.out.println(" \n\n Fraud Detected used Genetic Algorithm: ");
        System.out.println("--------------------------------------------- ");
        for(int i=0;i<=19;i++)
        {
            if((finalresult[i][2])>= criti)
            {
                //transactionJDBCRepository.insert_fraud(new Fraud(data[i][0],data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11],df.format(dt1),5,res[1]));

                System.out.println(" Credit Card with ID "+finalresult[i][0]+" is detected as fraud with "+finalresult[i][1]+" occurance and its crical value is "+ finalresult[i][2]);
                System.out.println(" ");

            }
        }

        System.out.println("Monitorable Fraud Detected:  ");
        System.out.println("-------------------------------- ");

        for(int i=0;i<=19;i++)
        {
            if(((finalresult[i][2])>= monit) && ((finalresult[i][2])< criti))
            {
               System.out.println("Credit Card with ID "+finalresult[i][0]+" is detected as fraud with "+finalresult[i][1]+" occurance and its crical value is "+ finalresult[i][2]);
                System.out.println(" ");

            }
        }


        System.out.println("Ordinary Fraud Detected:  ");
        System.out.println("--------------------------------------- ");
        for(int i=0;i<=19;i++)
        {
            if(((finalresult[i][2])>= ordin) && ((finalresult[i][2])< monit))
            {
                System.out.println("Credit Card with ID "+finalresult[i][0]+" is detected as fraud with "+finalresult[i][1]+" occurance and its crical value is "+ finalresult[i][2]);

            }
        }



        return "200";


}




}
