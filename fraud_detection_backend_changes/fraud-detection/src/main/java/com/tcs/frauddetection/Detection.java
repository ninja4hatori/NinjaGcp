package com.tcs.frauddetection;

public class Detection {

	
	public float[] ccfreq(String[] a) {
		float[] res = new float[2];
		String[] temp =a;
		res[0]=0; res[1]=0;
	//	for(int j=0;j<=11;j++)
	//	System.out.println(temp[j]);
		float ccfreq =Float.valueOf(temp[3])/Float.valueOf(temp[6]);
		if(ccfreq>0.2)
		{
			if(Float.valueOf(temp[7])>(5*ccfreq))
			{
				res[0]=1;
				res[1]=(Float.valueOf(temp[7])*ccfreq);
			}
		}			
	//	System.out.println("  "+ccfreq+"   "+res[0]+"   "+res[1]);
		if(res[0]<1)
		{
			res[1]=(float)ccfreq;
		}
		return res;
		}
	
	public float[] ccloc(String[] a) {
		float[] res = new float[2];
		String[] temp =a;
		res[0]=0; res[1]=0;
		int loc=Integer.valueOf(temp[8]); 
		if((loc<= 5) && (Integer.valueOf(temp[9])>( 2 * loc)))
				{
			res[0]=1;
			res[1]=(Float.valueOf(loc)/ Float.valueOf(temp[9]));
				}
		if(res[0]<1)
		{
			res[1]=(float)0.01;
		}
		
		return res;
	}
	
	
	public float[] ccod(String[] a) {
		float[] res = new float[2];
		String[] temp =a;
		res[0]=0; res[1]=0;
		float od =Float.valueOf(temp[5])/Float.valueOf(temp[3]);
		if(od<=0.2)
		{
			if(Float.valueOf(temp[10])>=1)
			{
				res[0]=1;
				res[1]=(Float.valueOf(temp[10])*od);
			}
		}
		if(res[0]<1)
		{
			res[1]=(float)od;
		}
	//	System.out.println("  "+od+"   "+res[0]+"   "+res[1]);
		return res;
	}
	
	
	public float[] ccbb(String[] a) {
		float[] res = new float[2];
		String[] temp =a;
		res[0]=0; res[1]=0;
		float bb =Float.valueOf(temp[2])/Float.valueOf(temp[4]);
		if(bb<=0.25)
		{
				res[0]=1;
				res[1]=(Float.valueOf(2)*bb);
		}	
		if(res[0]<1)
		{
			res[1]=(float)bb;
		}
	//	System.out.println("  "+bb+"   "+res[0]+"   "+res[1]);
		return res;
	}
	
	
	public float[] ccds(String[] a) {
		float[] res = new float[2];
		String[] temp =a;
		res[0]=0; res[1]=0;
		float mon= Float.valueOf(temp[6])/30;
		float bal= 100000 - Float.valueOf(temp[4]);
		float tot = mon*bal;
		float ds =tot/Float.valueOf(temp[6]);
		if((10*ds)<Float.valueOf(temp[11]))
		{
				res[0]=1;
				if(Float.valueOf(temp[11])>0)
				res[1]=(Float.valueOf(temp[11])/ (10*ds));
			else 
				res[1]=(float) 0.0;
				
		}
		if(res[0]<1)
		{
			res[1]=(float)0.01;
		}
	//	System.out.println("  "+ds+"   "+res[0]+"   "+res[1]);
		return res;
	}
	

	public float[][] organize(float[][] fre,float[][] loc,float[][] od,float[][] bb,float[][] ds,int row_s)
	{
	//	System.out.println(" ");
	//	System.out.println(" final");
		float[][] result=new float[50000][500];
		float now;
		float id=Float.valueOf(11111),val=(float)0;
		int ins=0,z=0;
				
		for(int i=0;i<row_s;i++)
		{
			now =id;
		//	System.out.println(now);
			for(int j=0;j<=4;j++)
			{
			if(fre[j][0]==now){
				ins++;
				val=val+fre[j][1];
			}
			
		//	System.out.println(ins);
		//	System.out.println(val); 
			
			if(loc[j][0]==now){
				ins++;
				val=val+loc[j][1];
			}
			
			if(od[j][0]==now){
				ins++;
				val=val+od[j][1];
			}
			
			if(bb[j][0]==now){
				ins++;
				val=val+bb[j][1];
			}
			
			if(ds[j][0]==now){
				ins++;
				val=val+ds[j][1];
			}
				
			}
			
			result[z][0]=now;
			result[z][1]=ins;
			result[z][2]=val;
			ins=0;val=0;z++;id++;
		}
		
		System.out.println(" AccountNo\tFraud Occurance\tCritical Value");
		for(int i=0;i<row_s;i++)
		 {
			 for(int j=0;j<=2;j++)
			 {
				 System.out.print(result[i][j]);
				 System.out.print("\t    ");
			 } 
			 System.out.println(" ");
		 }
		
	//	System.out.println("********* end of organise Result ************ ");
		
		return result;
	}
	
	public float[] resValue(float[][] a, int row_s)
	{
		float[] res=new float[row_s];
		float[][] b=new float[row_s+1][6];
		b=a;
		float sum =0;
				
		for(int i=0;i<row_s;i++)
		{
			for(int j=0;j<=4;j++)
			{
				sum=sum+b[i][j];
			}
			res[i]=sum;
			sum=0;
		}

		return res;
	}
}
