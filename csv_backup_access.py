from google.cloud import bigquery
client = bigquery.Client()

def client_query(client):

    # [START bigquery_query]
    # TODO(developer): Import the client library.
    

    # TODO(developer): Construct a BigQuery client object.
     

    query = """
        SELECT first_name,last_name,address FROM `intense-pier-262517.dataset_ninja.dataset_ninja.test_table` limit 10;
    """
    query_job = client.query(query)  # Make an API request.

    print("The query data:")
    for row in query_job:
        # Row values can be accessed by field name or index.
        print("{},{},{}".format(row[0], row[1],row[2]))
    # [END bigquery_query]

client_query(client)    
