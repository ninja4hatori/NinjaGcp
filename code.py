from google.cloud import bigquery
import pandas as pd

emp_data=pd.read_csv(r'/home/supriyagcp/sup_gcp/data.csv')


client = bigquery.Client()
table_id='spheric-ray-264617.sup_gcp.sup_gcp_tab'
dataset_id='sup_gcp'

schema = [
    bigquery.SchemaField("names", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("gender", "STRING", mode="NULLABLE"),
	bigquery.SchemaField("count", "INTEGER", mode="NULLABLE"),
]

table = bigquery.Table(table_id, schema=schema)
table = client.create_table(table)  # Make an API request.
print(
    "Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)
)



emp_data.to_gbq('sup_gcp.sup_gcp_tab','spheric-ray-264617',if_exists='append')
