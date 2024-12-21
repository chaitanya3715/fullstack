from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.get_jobs, name='get_jobs'),
    path('jobs/create/', views.create_job, name='create_job'),
]