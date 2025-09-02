'use client'
import { useSearchParams } from 'next/navigation'
import NominationPage from '@/components/UI/nomination/nominate';


export default function NominateFormPage() {
  const searchParams = useSearchParams()

  const category = {
    title: searchParams.get('title') || '',
    description: searchParams.get('description') || '',
    image: searchParams.get('image') || '',
  }

  const type = searchParams.get('type') || 'Default Type'

  return (
    <NominationPage type={type} category={category} />
  )
}
