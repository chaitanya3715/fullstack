import React from 'react';
import { Job } from '../types';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
}

export function JobList({ jobs, onJobClick }: JobListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          onClick={() => onJobClick(job)}
        />
      ))}
    </div>
  );
}