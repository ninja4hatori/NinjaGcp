package com.tcs.frauddetection;

public class Evaluate {
	
	
	public int[] findElite(float[][] a) {
		int[] res = new int[2];
		float[][] temp =new float[21][5];
		temp=a;
		float sum=0,sum1=0,sum2=0;
		int e1=0,e2=0;
		for(int i=1;i<=20;i++)
			{
			sum=temp[i][0]+temp[i][1]+temp[i][2]+temp[i][3]+temp[i][4];
				
			if(i==1)
			{
			sum1=sum;
			e1=1;
			}
			if(i==2)
			{
			sum2=sum;
			e2=2;		
					
			if(sum1<sum2)
			{
			sum1=sum1+sum2;
			sum2=sum1-sum2;
			sum1=sum1-sum2;
			e1=2;
			e2=1;
			}
			}
		
			if((sum>sum1) && (sum>sum2))
			{
				sum2=sum1;
				sum1=sum;
				
				e2=e1;
				e1=i;
				
			}
			else if(sum>sum2)
			{
				sum2=sum;
				e2=i;
			}
			
			}
		System.out.println("\n");
		res[0]=e1;
		res[1]=e2;
		System.out.println(" Elitist Value from the Previous Population \n");
		System.out.println("  "+e1+"   "+sum1+"   "+e2+"   "+sum2);
		return res;
	}
	
	
}
