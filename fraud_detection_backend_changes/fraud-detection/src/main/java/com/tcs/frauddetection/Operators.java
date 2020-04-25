package com.tcs.frauddetection;

import java.util.Random;

public class Operators {
	
	
	
	public float[] mutat(float[] a)
	{
	float[] res1 = null, parent1,child;
	 
	parent1=a;
	
	Random randomGen = new Random();
	int rand = randomGen.nextInt(4);
	int rand1 = randomGen.nextInt(4);
	
	if(rand==rand1)
		if(rand>1)rand1=rand-1;
		else rand1=rand+1;
	
//	  System.out.println(" "+ parent1[0]+" "+ parent1[1]+" "+ parent1[2]+" "+ parent1[3]+" "+ parent1[4]);
  //    System.out.println("********* end of Parent 1");
	      
 //   System.out.println("the random num are "+rand+"  "+rand1);
    
    child=parent1;
        		                    
	if((rand==0) || (rand1==0))
	{
		float t1 = randomGen.nextFloat();
		int t2 = randomGen.nextInt(6);
		if(t1>0.2)t1=(float)0.15;
		if(t2==0) t2=6;
		
		child[0]=t1*t2;			
	}
	
	if((rand==1) || (rand1==1))
	{
		int t1 = randomGen.nextInt(4);
		int t2 = randomGen.nextInt(14);
		if(t1==0) t1=4;
		if(t2==0) t2=4;
		child[1]=(float)((float)t1/(float)t2);		
	}
	if((rand==2) || (rand1==2))
	{
		float t1 = randomGen.nextFloat();
		int t2 = randomGen.nextInt(1);
		if(t1>0.2)t1=(float)0.16;
		if(t2==0) t2=(int) 1;
		
		child[2]=t1*t2;	
		
					
	}
	if((rand==3) || (rand1==3))
	{
		float t1 = randomGen.nextFloat();
		if(t1>0.2)t1=(float)0.2;
			
		child[3]=t1*2;	
					
	}
	if((rand==4) || (rand1==4))
	{
	
		float t1 = randomGen.nextFloat();
		int t2 = randomGen.nextInt(1);
		if(t1>0.2)t1=(float)0.15;
		if(t2==0) t2=(int) 1;
		
		child[4]=t1*t2;	
	}
	
  //  child=parent1;
	
	res1=child;
	
	//   System.out.println("child of mutat "+ child[0]+" "+ child[1]+" "+ child[2]+" "+ child[3]+" "+ child[4]);
	
	//   System.out.println("******child 2*** ");
	   
	return res1;
}

	
	public float[] crossover(float[][] a,int b,int c)
	{
		float[] res = null, parent1, parent2,child;
		 
		parent1=a[b];
		parent2=a[c];
		
		Random randomGen = new Random();
		int rand = randomGen.nextInt(4);
		if(rand==4) rand=3;		
	     
        
        
        child=parent1;
        		                    
		if(rand==0)
		{
			child[0]=parent1[0];child[1]=parent2[1];child[2]=parent2[2];child[3]=parent2[3];child[4]=parent2[4];			
		}
		
		if(rand==1)
		{
			child[0]=parent1[0];child[1]=parent1[1];child[2]=parent2[2];child[3]=parent2[3];child[4]=parent2[4];			
		}
		if(rand==2)
		{
			child[0]=parent1[0];child[1]=parent1[1];child[2]=parent1[2];child[3]=parent2[3];child[4]=parent2[4];			
		}
		if(rand==3)
		{
			child[0]=parent1[0];child[1]=parent1[1];child[2]=parent1[2];child[3]=parent1[3];child[4]=parent2[4];			
		}
		
	//	   System.out.println("child of cross "+ child[0]+" "+ child[1]+" "+ child[2]+" "+ child[3]+" "+ child[4]);
		
	//	   System.out.println("******child 1*** ");
		
		res=child;
		
	return res;
}
	
	
}