from google.cloud import bigquery
client = bigquery.Client()
filename = 'C:\\ninja\\NinjaGcp\\Sample-employee-JSON-data.json'
dataset_id = 'dataset_ninja'
table_id = 'table_employee'

dataset_ref = client.dataset(dataset_id)
table_ref = dataset_ref.table(table_id)
job_config = bigquery.LoadJobConfig()
job_config.source_format = bigquery.SourceFormat.JSON


with open(filename, "rb") as source_file:
    job = client.load_table_from_file(source_file, table_ref, job_config=job_config)

job.result()  # Waits for table load to complete.

print("Loaded {} rows into {}:{}.".format(job.output_rows, dataset_id, table_id))
