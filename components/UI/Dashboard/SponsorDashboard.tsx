"use client";

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Download, 
  Users, 
  TrendingUp, 
  Calendar,
  FileText,
  Award,
  BarChart3
} from 'lucide-react';
import Button from '@/components/Common/Button';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

interface SponsorshipPackage {
  id: string;
  name: string;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  amount: number;
  benefits: string[];
  status: 'active' | 'pending' | 'expired';
}

interface SponsorMetrics {
  totalSponsored: number;
  activePackages: number;
  reachMetrics: {
    impressions: number;
    engagement: number;
    mentions: number;
  };
  impactMetrics: {
    nomineesSupported: number;
    eventsSponsored: number;
    scholarshipsProvided: number;
  };
}

const SponsorDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SponsorMetrics | null>(null);
  const [packages, setPackages] = useState<SponsorshipPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with real API calls
    setTimeout(() => {
      setMetrics({
        totalSponsored: 50000,
        activePackages: 3,
        reachMetrics: {
          impressions: 2500000,
          engagement: 125000,
          mentions: 450
        },
        impactMetrics: {
          nomineesSupported: 150,
          eventsSponsored: 8,
          scholarshipsProvided: 25
        }
      });

      setPackages([
        {
          id: '1',
          name: 'NESA Awards 2025 - Gold Sponsor',
          level: 'Gold',
          amount: 25000,
          benefits: ['Logo on all materials', 'Speaking opportunity', 'VIP gala tickets'],
          status: 'active'
        },
        {
          id: '2',
          name: 'Scholarship Program - Silver Sponsor',
          level: 'Silver',
          amount: 15000,
          benefits: ['Scholarship naming rights', 'Student mentorship program'],
          status: 'active'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const downloadMarketingKit = () => {
    // Implement marketing kit download
    console.log('Downloading marketing kit...');
  };

  const downloadImpactReport = () => {
    // Implement impact report download
    console.log('Downloading impact report...');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sponsor Dashboard</h1>
              <p className="text-gray-600">
                Track your sponsorship impact and access marketing resources
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                text="Marketing Kit"
                variant="outline"
                onClick={downloadMarketingKit}
                className="flex items-center gap-2"
                icon={<Download className="w-4 h-4" />}
              />
              <Button
                text="Impact Report"
                onClick={downloadImpactReport}
                className="flex items-center gap-2"
                icon={<FileText className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sponsored</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${metrics?.totalSponsored.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold text-gray-900">{metrics?.activePackages}</p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Impressions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics?.reachMetrics.impressions.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nominees Supported</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metrics?.impactMetrics.nomineesSupported}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Active Sponsorship Packages */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Active Sponsorship Packages</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                      <p className="text-sm text-gray-600">{pkg.level} Level Sponsorship</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${pkg.amount.toLocaleString()}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        pkg.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : pkg.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {pkg.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Reach Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Impressions</span>
                  <span className="font-semibold">{metrics?.reachMetrics.impressions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Engagement</span>
                  <span className="font-semibold">{metrics?.reachMetrics.engagement.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Brand Mentions</span>
                  <span className="font-semibold">{metrics?.reachMetrics.mentions}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Impact Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nominees Supported</span>
                  <span className="font-semibold">{metrics?.impactMetrics.nomineesSupported}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Events Sponsored</span>
                  <span className="font-semibold">{metrics?.impactMetrics.eventsSponsored}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Scholarships Provided</span>
                  <span className="font-semibold">{metrics?.impactMetrics.scholarshipsProvided}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorDashboard;
