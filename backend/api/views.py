from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import JobSerializer
from .db import mongodb

@api_view(['GET'])
def get_jobs(request):
    search_query = request.query_params.get('search', '')
    
    query = {}
    if search_query:
        query = {
            '$or': [
                {'title': {'$regex': search_query, '$options': 'i'}},
                {'company': {'$regex': search_query, '$options': 'i'}},
                {'location': {'$regex': search_query, '$options': 'i'}}
            ]
        }
    
    jobs = mongodb.get_jobs(query)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_job(request):
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
        job = mongodb.create_job(serializer.validated_data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)