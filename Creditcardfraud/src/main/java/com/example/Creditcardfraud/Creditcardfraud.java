package com.example.Creditcardfraud;

import java.io.*;
import java.util.Arrays;

public class Creditcardfraud {

    public static String[][] data = new String[50][50];
    public static void browse() throws IOException {
        String strline = null;
        String[] temp;
        String path ="E:\\spring_boot\\Creditcardfraud\\src\\main\\resources\\Dataset.txt";
        FileInputStream fstream =new FileInputStream(path);
        DataInputStream in =new DataInputStream(fstream);
        BufferedReader br=new BufferedReader(new InputStreamReader(in));
        Creditcardfraud cc=new Creditcardfraud();
        Integer linecount=0;
        while ((br.readLine()) != null) linecount++;

        br.close();
        FileInputStream fstream1 =new FileInputStream(path);
        DataInputStream in1 =new DataInputStream(fstream1);
        BufferedReader br1=new BufferedReader(new InputStreamReader(in1));
        //String s;
        System.out.println(linecount);

        for(int i=0;i<=20;i++)
        {
            strline=br1.readLine();
            System.out.println(strline);
            temp =strline.split(",");
            for(int j=0;j<=11;j++)
            {
                cc.data[i]=temp;

            }
        }
    }
    public static void find()
    {
        Creditcardfraud cc=new Creditcardfraud();
        float[] res = null;
        float[][] fre = new float[6][20];
        float[][] loc = new float[6][20];
        float[][] od = new float[6][20];
        float[][] bb = new float[6][20];
        float[][] ds = new float[6][20];

        float[][] initPop = new float[21][5];
        float[][] curPop = new float[21][5];
        float[][] nexPop = new float[21][5];
        float[][] finalPop = new float[21][5];

        float[] resValue =new float[21];

        Detection dt=new Detection();
        Evaluate ev= new Evaluate();
        NextGen ng= new NextGen();
        int l=0,m=0;

        for(int i=1;i<=20;i++)
        {
            res= dt.ccfreq(cc.data[i]);
            if(res[0]>=1)
            {
                fre[l][m]=Float.valueOf(cc.data[i][0]);m++;
                fre[l][m]=res[1];

                l++;m=0;
            }
            initPop[i][0]=res[1];
        }
        l=0;m=0;

        for(int i=1;i<=20;i++)
        {
            res= dt.ccloc(cc.data[i]);
            if(res[0]>=1)
            {
                loc[l][m]=Float.valueOf(cc.data[i][0]);m++;
                loc[l][m]=res[1];

                l++;m=0;
            }
            initPop[i][1]=res[1];
        }


        /* CC OverDraft */

        l=0;m=0;

        for(int i=1;i<=20;i++)
        {
            res= dt.ccod(cc.data[i]);

            if(res[0]>=1)
            {
                od[l][m]=Float.valueOf(cc.data[i][0]);m++;
                od[l][m]=res[1];

                l++;m=0;
            }
            initPop[i][2]=res[1];
        }


        /* Current Book Balance */

        l=0;m=0;

        for(int i=1;i<=20;i++)
        {
            res= dt.ccbb(cc.data[i]);
            if(res[0]>=1)
            {
                bb[l][m]=Float.valueOf(cc.data[i][0]);m++;
                bb[l][m]=res[1];

                l++;m=0;
            }
            initPop[i][3]=res[1];
        }


        /* Average Daily Spending */

        l=0;m=0;

        for(int i=1;i<=20;i++)
        {
            res= dt.ccds(cc.data[i]);
            if(res[0]>=1)
            {
                ds[l][m]=Float.valueOf(cc.data[i][0]);m++;
                ds[l][m]=res[1];

                l++;m=0;
            }
            initPop[i][4]=res[1];
        }

        //	 float[][] finalresult = dt.organize(fre,loc,od,bb,ds);



        for(int i=1;i<=20;i++)
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


        for(int q=1;q<=20;q++)
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

            for(int i=1;i<=20;i++)
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






}
}
