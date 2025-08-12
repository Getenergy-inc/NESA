'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function NomineeSignupPart2() {
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    nomineeCategory: searchParams.get('category') || '',
    nomineeSubCategory: searchParams.get('subCategory') || '',
    achievements: '',
    contributionImage: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, contributionImage: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Final submission:', formData)
    // Submit full registration to backend here
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Nomination Info</h1>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Nominee Category</label>
          <input
            type="text"
            name="nomineeCategory"
            value={formData.nomineeCategory}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Nominee Sub-Category</label>
          <input
            type="text"
            name="nomineeSubCategory"
            value={formData.nomineeSubCategory}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Tell us about yourself</label>
          <textarea
            name="achievements"
            rows={4}
            value={formData.achievements}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Write a personal statement or specific achievements"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Upload an image of your contribution</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="block w-full text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
