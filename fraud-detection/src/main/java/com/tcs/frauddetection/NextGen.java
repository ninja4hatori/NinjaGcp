package com.tcs.frauddetection;

import java.util.Random;

public class NextGen {
	static int u=0;
	
	
	public float[][] getNextGen(float[][] a)
	{
		float[][] curPop=new float[21][6];
		curPop=a;
		float[][] temp1 = new float [21][5];
		float [][] res=new float[21][5];
		float[][] temp =new float[21][5];
		float[] x=new float[5];
		float[] y=new float[5];
        float[] z=new float[5];
		int cur=1;
		Evaluate ev = new Evaluate();
		int[] elite = new int[2];
		if(u<1)
		{
			System.out.println(" ***************");
		elite = ev.findElite(curPop);
		u=1;
		}
		else
		{
			System.out.println(" *************** ");
		elite = ev.findElite(curPop);		
		}
		int b=elite[0], c=elite[1];
		res[cur]=curPop[b];cur++;		
		res[cur]=curPop[c];cur++;
		//cur=2;
		Random randomGen = new Random();
		Operators op=new Operators(); 
	    
		for(int i=0;i<=8;i++)
		{
	
		int rand = randomGen.nextInt(19);
		int rand1 = randomGen.nextInt(19);

		if(rand==0)
			rand=rand1;
		if(rand1==0)
			rand1=rand;
		
		if(rand==rand1)
			if(rand>1)rand1=rand-1;
			else rand1=rand+1;
	
	//	System.out.println(" \n\n\n");
	//	System.out.println("the random rows are "+rand+"    "+rand1);
		temp1=curPop;
	//	System.out.println(" ******start of crossover*** ");
		z = op.crossover(temp1,rand,rand1);
	//	System.out.println("z values"+z[0]+"  "+z[1]+"  "+z[2]+"  "+z[3]+"  "+z[4]);
		float[] m =new float[5]; //=z;
		m[0]=z[0];m[1]=z[1];m[2]=z[2];m[3]=z[3];m[4]=z[4];
	    x=z;
		y = op.mutat(x); 
	//	System.out.println("y values"+y[0]+"  "+y[1]+"  "+y[2]+"  "+y[3]+"  "+y[4]);
		float[] n =new float[5];
		n[0]=y[0];n[1]=y[1];n[2]=y[2];n[3]=y[3];n[4]=y[4];
		
//		System.out.println("last ");
		
	//	System.out.println(m[0]+"  "+m[1]+"  "+m[2]+"  "+m[3]+"  "+m[4]);
	//	System.out.println(n[0]+"  "+n[1]+"  "+n[2]+"  "+n[3]+"  "+n[4]);
	//	System.out.println(z[0]+"  "+z[1]+"  "+z[2]+"  "+z[3]+"  "+z[4]);
	//	System.out.println(y[0]+"  "+y[1]+"  "+y[2]+"  "+y[3]+"  "+y[4]);
		
		res[cur]=m;cur++;
		res[cur]=n;cur++;
		}
		

		return res;
	}
	

}
