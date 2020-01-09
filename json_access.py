from google.cloud import bigquery
import pandas as pd
import numpy as np
import datetime
client = bigquery.Client()

x=datetime.datetime.now()
date_time=x.strftime("%I%M")

def client_query(client):

    df = pd.DataFrame(columns=['firstName', 'lastName' ,'employeeCode']) 

    query = """
        SELECT firstName,lastName,employeeCode FROM `intense-pier-262517.dataset_ninja.table2` 
    """
    query_job = client.query(query)  # Make an API request.

    print("The query data in dataframe:")
    for row in query_job:
        # Row values can be accessed by field name or index.
        #print("{},{}".format(row[0],row[1]))
        df = df.append({'firstName': row[0],'lastName': row[1],'employeeCode':row[2]}, ignore_index=True)
    print(df)

    #applying some simple calculations on data
    df2=df.applymap(lambda x: len(str(x)))
    print(df2)

    df.to_csv('employee_consumed_data_{}.csv'.format(date_time),index=False)

client_query(client)
