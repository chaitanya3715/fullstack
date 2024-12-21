from django.conf import settings
from pymongo import MongoClient
from datetime import datetime

class MongoDB:
    def __init__(self):
        self.client = MongoClient(settings.MONGODB_URI)
        self.db = self.client[settings.MONGODB_NAME]
        self.jobs = self.db.jobs

    def get_jobs(self, query=None):
        if query:
            return list(self.jobs.find(query))
        return list(self.jobs.find())

    def create_job(self, job_data):
        job_data['created_at'] = datetime.utcnow()
        result = self.jobs.insert_one(job_data)
        job_data['id'] = str(result.inserted_id)
        return job_data

    def get_job_by_id(self, job_id):
        return self.jobs.find_one({'_id': job_id})

mongodb = MongoDB()