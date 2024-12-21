import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { JobList } from './components/JobList';
import { JobDetailView } from './components/JobDetailView';
import { Job } from './types';
import { BriefcaseIcon } from 'lucide-react';

// Mock data - Replace with Supabase data fetching
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.',
    posted_date: '2024-03-10',
    employment_type: 'Full-time',
    salary_range: '$120k - $160k',
    created_at: '2024-03-10T00:00:00Z'
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Remote',
    description: 'Join our backend team to build scalable and efficient server-side applications.',
    posted_date: '2024-03-09',
    employment_type: 'Full-time',
    salary_range: '$130k - $170k',
    created_at: '2024-03-09T00:00:00Z'
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'New York, NY',
    description: 'Looking for a DevOps engineer to help us automate and optimize our infrastructure.',
    posted_date: '2024-03-08',
    employment_type: 'Contract',
    salary_range: '$140k - $180k',
    created_at: '2024-03-08T00:00:00Z'
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs] = useState<Job[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <BriefcaseIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Job Board</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {searchQuery ? `Search Results (${filteredJobs.length})` : 'Latest Jobs'}
          </h2>
        </div>

        <JobList 
          jobs={filteredJobs} 
          onJobClick={(job) => setSelectedJob(job)}
        />

        {selectedJob && (
          <JobDetailView 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;