from google.cloud import bigquery
import pandas as pd
import numpy as np
import datetime
client = bigquery.Client()

x=datetime.datetime.now()
date_time=x.strftime("%I%M")

def client_query(client):

    df = pd.DataFrame(columns=['first_name', 'last_name' ,'address']) 

    query = """
        SELECT first_name,last_name,address FROM `intense-pier-262517.dataset_ninja.test_table` 
    """
    query_job = client.query(query)  # Make an API request.

    print("The query data in dataframe:")
    for row in query_job:
        # Row values can be accessed by field name or index.
        #print("{},{}".format(row[0],row[1]))
        df = df.append({'first_name': row[0],'last_name': row[1],'address':row[2]}, ignore_index=True)
    print(df)

    #applying some simple calculations on data
    df2=df.applymap(lambda x: len(str(x)))
    print(df2)

    df.to_csv('employee_consumed_data_{}.csv'.format(date_time),index=False)

client_query(client)

