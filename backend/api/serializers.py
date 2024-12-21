from rest_framework import serializers

class JobSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    title = serializers.CharField()
    company = serializers.CharField()
    location = serializers.CharField()
    description = serializers.CharField()
    posted_date = serializers.DateField()
    employment_type = serializers.CharField()
    salary_range = serializers.CharField(required=False, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True)