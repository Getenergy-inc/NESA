import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Award, Clock, Globe, FileText, Plus, X } from 'lucide-react';
import { BlueGarnetNominee, nomineeValidationMessages } from '@/lib/types/nrc';
import { BaseNomineeFormComponent } from './BaseNomineeForm';

const blueGarnetSchema = z.object({
  // Base nominee fields
  fullName: z.string().min(2, 'Full name is required'),
  emailAddress: z.string().email('Valid email is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  country: z.string().min(2, 'Country is required'),
  stateRegion: z.string().min(2, 'State/Region is required'),
  gender: z.enum(['M', 'F', 'Other']).optional(),
  category: z.enum(['blue-garnet', 'gold-certificate', 'platinum-certificate']),
  subcategory: z.string().min(1, 'Subcategory is required'),
  summaryOfImpact: z.string().min(50, 'Summary of impact is required'),
  justification: z.string().min(50, 'Justification is required'),
  photo: z.any().optional(),
  supportingDocs: z.array(z.any()).optional(),
  nominationSource: z.enum(['Internal', 'External', 'Self', 'Staff']),
  nominatedBy: z.string().min(2, 'Nominator name is required'),
  nominatorEmail: z.string().email('Valid nominator email is required'),
  nominatorPhone: z.string().min(10, 'Valid nominator phone is required'),

  // Blue Garnet specific fields
  yearOfImpact: z.string().min(4, 'Please enter a valid year'),
  lifeTimeAchievements: z.array(z.string()).min(1, nomineeValidationMessages.achievements),
  legacyProjects: z.array(z.string()).min(1, 'Please add at least one legacy project'),
  publicRecognitions: z.array(z.string()),
  impactScope: z.enum(['National', 'Regional', 'Continental', 'Global']),
  sustainabilityMeasures: z.string().min(100, nomineeValidationMessages.minLength(100)),
});

interface BlueGarnetFormProps {
  onSubmit: (data: BlueGarnetNominee) => void;
  defaultValues?: Partial<BlueGarnetNominee>;
}

export const BlueGarnetForm: React.FC<BlueGarnetFormProps> = ({
  onSubmit,
  defaultValues
}) => {
  const [achievements, setAchievements] = React.useState<string[]>([]);
  const [projects, setProjects] = React.useState<string[]>([]);
  const [recognitions, setRecognitions] = React.useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BlueGarnetNominee>({
    resolver: zodResolver(blueGarnetSchema),
    defaultValues
  });

  const handleBaseSubmit = (baseData: any) => {
    const completeData = {
      ...baseData,
      lifeTimeAchievements: achievements,
      legacyProjects: projects,
      publicRecognitions: recognitions,
    };
    onSubmit(completeData);
  };

  return (
    <div className="space-y-8">
      <BaseNomineeFormComponent onSubmit={handleBaseSubmit} defaultValues={defaultValues} />

      {/* Blue Garnet Specific Fields */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Lifetime Impact Details</h3>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Impact Began *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('yearOfImpact')}
                  type="number"
                  min="1950"
                  max={new Date().getFullYear()}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  placeholder="Enter year"
                />
              </div>
              {errors.yearOfImpact && (
                <p className="mt-1 text-sm text-red-600">{errors.yearOfImpact.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Impact Scope *
              </label>
              <select
                {...register('impactScope')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              >
                <option value="">Select scope</option>
                <option value="National">National</option>
                <option value="Regional">Regional</option>
                <option value="Continental">Continental</option>
                <option value="Global">Global</option>
              </select>
              {errors.impactScope && (
                <p className="mt-1 text-sm text-red-600">{errors.impactScope.message}</p>
              )}
            </div>
          </div>

          {/* Lifetime Achievements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lifetime Achievements *
            </label>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <Award className="w-5 h-5 text-[#ea580c]" />
                  <span className="flex-1">{achievement}</span>
                  <button
                    type="button"
                    onClick={() => setAchievements(achievements.filter((_, i) => i !== index))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add an achievement"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        setAchievements([...achievements, input.value.trim()]);
                        input.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add an achievement"]') as HTMLInputElement;
                    if (input.value.trim()) {
                      setAchievements([...achievements, input.value.trim()]);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-[#ea580c] text-white rounded-lg hover:bg-[#ea580c]/90"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Legacy Projects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legacy Projects *
            </label>
            <div className="space-y-2">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <Globe className="w-5 h-5 text-[#ea580c]" />
                  <span className="flex-1">{project}</span>
                  <button
                    type="button"
                    onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a legacy project"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        setProjects([...projects, input.value.trim()]);
                        input.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a legacy project"]') as HTMLInputElement;
                    if (input.value.trim()) {
                      setProjects([...projects, input.value.trim()]);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-[#ea580c] text-white rounded-lg hover:bg-[#ea580c]/90"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Sustainability Measures */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sustainability Measures *
            </label>
            <textarea
              {...register('sustainabilityMeasures')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="Describe the long-term impact and sustainability of the nominee's contributions..."
            />
            {errors.sustainabilityMeasures && (
              <p className="mt-1 text-sm text-red-600">{errors.sustainabilityMeasures.message}</p>
            )}
          </div>

          {/* Public Recognitions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Public Recognitions & Awards
            </label>
            <div className="space-y-2">
              {recognitions.map((recognition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                >
                  <Award className="w-5 h-5 text-[#ea580c]" />
                  <span className="flex-1">{recognition}</span>
                  <button
                    type="button"
                    onClick={() => setRecognitions(recognitions.filter((_, i) => i !== index))}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a recognition or award"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        setRecognitions([...recognitions, input.value.trim()]);
                        input.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a recognition or award"]') as HTMLInputElement;
                    if (input.value.trim()) {
                      setRecognitions([...recognitions, input.value.trim()]);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-[#ea580c] text-white rounded-lg hover:bg-[#ea580c]/90"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
