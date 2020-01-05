from google.cloud import bigquery
import pandas as pd
import numpy as np
import datetime
client = bigquery.Client()

x=datetime.datetime.now()
date_time=x.strftime("%I%M")

def client_query(client):

    df = pd.DataFrame(columns=['name', 'id' ,'post']) 

    query = """
        SELECT first_name,id,title FROM `constant-tracer-251017.test.table2` where title like '%Engineer'
    """
    query_job = client.query(query)  # Make an API request.

    print("The query data in dataframe:")
    for row in query_job:
        # Row values can be accessed by field name or index.
        #print("{},{}".format(row[0],row[1]))
        df = df.append({'name': row[0],'id': row[1],'post':row[2]}, ignore_index=True)
    print(df)

    #applying some simple calculations on data
    df2=df.applymap(lambda x: len(str(x)))
    print(df2)

    df.to_csv('consumed data_{}.csv'.format(date_time),index=False)

client_query(client)    