// src/services/api.ts
import { Job } from '../types/index';
const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchJobs(search?: string): Promise<Job[]> {
  const url = search 
    ? `${API_BASE_URL}/jobs/?search=${encodeURIComponent(search)}`
    : `${API_BASE_URL}/jobs/`;
    
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return response.json();
}
