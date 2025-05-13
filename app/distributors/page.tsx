'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import DistributorTable from '@/components/DistributorTable';
import { processedDistributors } from '@/lib/mockData';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Distributor } from '@/lib/types';

export default function Distributors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('');
  
  // Get unique regions for filtering
  const regions = Array.from(new Set(processedDistributors.map(d => d.region)));

  // Filter distributors based on search and region filter
  const filteredDistributors = processedDistributors.filter(distributor => {
    const matchesSearch = distributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.logisticsPartner.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = filterRegion === '' || distributor.region === filterRegion;
    
    return matchesSearch && matchesRegion;
  });

  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Distributors</h1>
          <p className="text-gray-500">All distributors in the Augur system</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
          <div className="flex-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search distributors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span className="text-gray-700 text-sm">Filter by Region:</span>
            </div>
            <select
              className="ml-2 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Distributors Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredDistributors.length} of {processedDistributors.length} distributors
          </p>
        </div>

        {/* Distributors Table */}
        <DistributorTable distributors={filteredDistributors} />
      </div>
    </main>
  );
} 