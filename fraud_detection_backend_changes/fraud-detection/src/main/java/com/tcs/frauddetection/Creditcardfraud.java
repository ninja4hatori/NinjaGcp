package com.tcs.frauddetection;


import com.tcs.frauddetection.bean.Fraud;
import com.tcs.frauddetection.bean.Significant_fraud;
import com.tcs.frauddetection.bean.Transaction;
import com.tcs.frauddetection.controller.FileUploadApiController;
import org.springframework.beans.factory.annotation.Autowired;
import com.tcs.frauddetection.respository.TransactionJDBCRepository;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static java.lang.Integer.parseInt;

@Service

public class Creditcardfraud {

    StringBuilder response = new StringBuilder();

    @Autowired
    private  TransactionJDBCRepository transactionJDBCRepository;
    public  static String[][] data = new String[50000][50];

    public Map<String, Object> find(int row_s)
    {
        System.out.println(row_s);
        int col_s=11;
        Date dt1 = new Date();
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Creditcardfraud cc=new Creditcardfraud();
        float[] res = null;
        float[][] fre = new float[row_s][row_s];
        float[][] loc = new float[row_s][row_s];
        float[][] od = new float[row_s][row_s];
        float[][] bb = new float[row_s][row_s];
        float[][] ds = new float[row_s][row_s];
        String[] temp;

        float[][] initPop = new float[row_s+1][5];
        float[][] curPop = new float[row_s+1][5];
        float[][] nexPop = new float[row_s+1][5];
        float[][] finalPop = new float[row_s+1][5];

        float[] resValue =new float[row_s+1];
        
        List<Transaction> listdata = transactionJDBCRepository.findAlltransactions();
        //System.out.println(listdata);
        Integer ip=0;
        for (Transaction fdata : listdata) {

            String s = fdata.getCard_id() + "," + fdata.getAuth() + "," + fdata.getCur_bb() + "," + fdata.getCard_used() + "," + fdata.getAvg_bb() + "," + fdata.getOverdraft() + "," + fdata.getCc_age() + "," + fdata.getCut() + "," + fdata.getLoc() + "," + fdata.getLoct() + "," + fdata.getOdt() + "," + fdata.getAmount();
            //System.out.println(s);
            temp = s.split(",");

            cc.data[ip] = temp;
            ip++;
        }

        Detection dt=new Detection();
        Evaluate ev= new Evaluate();
        NextGen ng= new NextGen();
        int l=0,m=0;

        for(int i=0;i<row_s;i++)
        {

            res= dt.ccfreq(cc.data[i]);
            System.out.println(cc.data[i]);
            if(res[0]>=1)
            {
                fre[l][m]=Float.valueOf(cc.data[i][0]);m++;
                fre[l][m]=res[1];
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId(parseInt(data[i][0]));
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_fraud(new Fraud(parseInt(data[i][0]),t_id,df.format(dt1),"FREQ",res[1]));

                l++;m=0;
            }
            initPop[i][0]=res[1];
        }
        l=0;m=0;

        for(int i=0;i<row_s;i++)
        {
            res= dt.ccloc(cc.data[i]);
            if(res[0]>=1)
            {
                loc[l][m]=Float.valueOf(cc.data[i][0]);m++;
                loc[l][m]=res[1];
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId(parseInt(data[i][0]));
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_fraud(new Fraud(parseInt(data[i][0]),t_id,df.format(dt1),"LOCATION",res[1]));

                l++;m=0;
            }
            initPop[i][1]=res[1];
        }


        /* CC OverDraft */

        l=0;m=0;

        for(int i=0;i<row_s;i++)
        {
            res= dt.ccod(cc.data[i]);

            if(res[0]>=1)
            {
                od[l][m]=Float.valueOf(cc.data[i][0]);m++;
                od[l][m]=res[1];
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId(parseInt(data[i][0]));
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_fraud(new Fraud(parseInt(data[i][0]),t_id,df.format(dt1),"OVER_DRAFT",res[1]));

                l++;m=0;
            }
            initPop[i][2]=res[1];
        }


        /* Current Book Balance */

        l=0;m=0;

        for(int i=0;i<row_s;i++)
        {
            res= dt.ccbb(cc.data[i]);
            if(res[0]>=1)
            {
                bb[l][m]=Float.valueOf(cc.data[i][0]);m++;
                bb[l][m]=res[1];
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId(parseInt(data[i][0]));
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_fraud(new Fraud(parseInt(data[i][0]),t_id,df.format(dt1),"BALANCE",res[1]));

                l++;m=0;
            }

            initPop[i][3]=res[1];
        }


        /* Average Daily Spending */

        l=0;m=0;

        for(int i=0;i<row_s;i++)
        {
            res= dt.ccds(cc.data[i]);
            if(res[0]>=1)
            {
                ds[l][m]=Float.valueOf(cc.data[i][0]);m++;
                ds[l][m]=res[1];
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId(parseInt(data[i][0]));
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_fraud(new Fraud(parseInt(data[i][0]),t_id,df.format(dt1),"DAILY_SPENDING",res[1]));

                l++;m=0;
            }
            initPop[i][4]=res[1];
        }

        //	 float[][] finalresult = dt.organize(fre,loc,od,bb,ds);






        curPop=initPop;


        for(int q=0;q<20;q++)
        {
            nexPop=ng.getNextGen(curPop,row_s);
            System.out.println(" \n");


            curPop=nexPop;

            System.out.println(" \n\n Critical Values Found after Limited number of Generations (sorted order)");



            resValue = dt.resValue(curPop,row_s);

            Arrays.sort(resValue);

           /* for(int i=0;i<row_s;i++)
            {
                System.out.println(resValue[i]);
            }*/


        }
        float factor=(resValue[row_s-1]/4);
        float criti=factor*3;
        float monit=factor*2;
        float ordin=factor;

        System.out.println("\n\n Critical Values of each transaction of given DataSet");
        System.out.println(" ----------------------------------------------------------- ");

        float[][] finalresult = dt.organize(fre,loc,od,bb,ds,row_s);

        System.out.println("\n\n Value of Critic, Monitor and Ordinary Faruds");
        System.out.println("\n\n "+criti+"  "+monit+"   "+ordin);


        System.out.println(" \n\n Fraud Detected used Genetic Algorithm: ");
        System.out.println("--------------------------------------------- ");
        for(int i=0;i<row_s;i++)
        {
            if((finalresult[i][2])>= criti)
            {
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId((int) finalresult[i][0]);
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_Significant_fraud(new Significant_fraud((int) finalresult[i][0],t_id,(int)finalresult[i][1],df.format(dt1),"CRITICAL",finalresult[i][2]));

                System.out.println(" Credit Card with ID "+finalresult[i][0]+" is detected as fraud with "+finalresult[i][1]+" occurance and its crical value is "+ finalresult[i][2]);
                System.out.println(" ");

            }
        }

        System.out.println("Monitorable Fraud Detected:  ");
        System.out.println("-------------------------------- ");

        for(int i=0;i<=row_s;i++)
        {
            if(((finalresult[i][2])>= monit) && ((finalresult[i][2])< criti))
            {
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId((int) finalresult[i][0]);
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_Significant_fraud(new Significant_fraud((int) finalresult[i][0],t_id,(int)finalresult[i][1],df.format(dt1),"MONITOR",finalresult[i][2]));

                //transactionJDBCRepository.insert_critical_fraud(new Critical_fraud(finalresult[i][0],finalresult[i][1],finalresult[i][2],2,df.format(dt1)));
               System.out.println("Credit Card with ID "+finalresult[i][0]+" is detected as fraud with "+finalresult[i][1]+" occurance and its crical value is "+ finalresult[i][2]);
                System.out.println(" ");

            }
        }


        System.out.println("Ordinary Fraud Detected:  ");
        System.out.println("--------------------------------------- ");
        for(int i=0;i<row_s;i++)
        {
            if(((finalresult[i][2])< monit) && (finalresult[i][1])>0.0)
            {
                System.out.println("Credit Card with ID "+finalresult[i][0]+" is detected as fraud with "+finalresult[i][1]+" occurance and its crical value is "+ finalresult[i][2]);
                List <Transaction> transaction_id=transactionJDBCRepository.getTransactionId((int) finalresult[i][0]);
                int t_id=0;
                for(Transaction fdata : transaction_id)
                {
                    t_id= fdata.getId();
                }
                transactionJDBCRepository.insert_Significant_fraud(new Significant_fraud((int) finalresult[i][0],t_id,(int)finalresult[i][1],df.format(dt1),"ORDINARY",finalresult[i][2]));

            }
        }
        transactionJDBCRepository.updateTransactionFlag();


        List<Fraud> listfraud = transactionJDBCRepository.findAllfraud();
        List<Significant_fraud> listSignificantFraud = transactionJDBCRepository.findAllSignificantfraud();
        Map<String, Object > fraudMap = new HashMap<>();
        fraudMap.put("significant_transactions",listSignificantFraud);
        fraudMap.put("fraud_transactions", listfraud);



        return fraudMap;


}




}
