'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Wallet, Share2, PenSquareIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/context/AuthContext';
import { IoEyeSharp, IoEyeOffSharp, IoLogOut } from "react-icons/io5";
import SecurityTab from "@/components/UI/Accountsettings/SecurityTab";



export default function ProfilePage() {
  const router = useRouter();
  const { user, getUserId, logout, updateUser } = useAuthContext();
  
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    role: '',
    nomineeType: '',
    stateOrRegion: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      console.log('No user found, redirecting to signup');
    } else {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role || '',
        nomineeType: user.nomineeType || '',
        stateOrRegion: user.stateOrRegion || '',
        image: user.image || '',
      });
    }
  }, [user]);

    const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setImageFile(null);
    if (!user) {
      router.replace('/account/signup/membersignup');
    } else {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role || '',
        nomineeType: user.nomineeType || '',
        stateOrRegion: user.stateOrRegion || '',
        image: user.image || '',
      });
    }
  };
  interface ProfileFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    nomineeType: string;
    stateOrRegion: string;
    image: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ProfileFormData) => ({ ...prev, [name]: value, image: prev.image }));
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };
  const handleSave = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        // Upload image to Cloudinary or your backend
        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', 'nesa_upload'); // Change to your Cloudinary preset
        const res = await fetch('https://api.cloudinary.com/v1_1/demo/image/upload', {
          method: 'POST',
          body: data
        });
        const fileRes = await res.json();
        imageUrl = fileRes.secure_url;
      }
      await updateUser({ ...formData, image: imageUrl });
      setEditing(false);
      setImageFile(null);
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err && typeof (err as any).message === 'string') {
        setErrorMsg((err as any).message);
      } else {
        setErrorMsg('Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-white pt-20">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-[#151007] p-6 flex pt-[50px] flex-col space-y-6 items-center md:items-start">
        <div className="flex flex-col gap-5">
          <button className="font-normal px-2 md:px-4 py-2 border bg-white text-black border-white/30 rounded text-sm flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Profile Settings</span>
          </button>
          <button
            onClick={() => router.push('/ProfileSetting/ProfileWallet')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10">
            <Wallet className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Wallet</span>
          </button>
          <button
            onClick={() => router.push('/ProfileSetting/refer')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10">
            <Share2 className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Referrals</span>
          </button>
                    {/* Logout Button */}
                    <div className="flex justify-center mt-4 sm:mt-6 mb-8 sm:mb-12">
                      <button
                        onClick={handleLogout}
                        className="px-3 sm:px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:opacity-80 active:transform active:scale-95"
                        style={{ fontSize: '18px', marginBottom: '24px' }}
                      >
                        <IoLogOut size={24} style={{ color: '#CDA292' }} />
                        <span style={{ fontSize: '18px', color: '#CDA292' }}>Log Out</span>
                      </button>
                    </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-8 bg-white text-black" >
        <div className='mb-28' style={{
          backgroundImage: `url('/images/nomineeNav.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '250px',
        }}>
          <div className='flex flex-col space-y-4 pl-10 pt-28'>
            {editing ? (
              <div className="relative w-[200px] h-[200px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image-upload"
                />
                {(imageFile || formData.image) ? (
                  <Image
                    src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                    alt={'personal info'}
                    width={200}
                    height={200}
                    className="rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-6xl border border-gray-200">
                    <span className="select-none">?</span>
                  </div>
                )}
                {/* Plus sign only in editing mode */}
                <label htmlFor="profile-image-upload" className="absolute bottom-3 right-3 bg-[#FFC247] hover:bg-[#E48900] text-black rounded-full p-2 shadow cursor-pointer border-2 border-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"/></svg>
                </label>
              </div>
            ) : (
              <div className="relative w-[200px] h-[200px]">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt={'personal info'}
                    width={200}
                    height={200}
                    className="rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-6xl border border-gray-200">
                    <span className="select-none">?</span>
                  </div>
                )}
                {/* No plus sign in view mode */}
                {/* Hidden input for non-editing state, triggers edit mode */}
                {!formData.image && !editing && (
                  <input type="file" accept="image/*" className="hidden" id="profile-image-upload" readOnly />
                )}
              </div>
            )}
          </div>
        </div>

        <div className='p-10'>
          <div className='border border-2 border-b-[#B6B5B3] w-full max-w-[1016px] p-10 rounded-2xl'>
            {/* Header */}
            <div className="flex justify-start flex-col md:justify-between md:flex-row md:mb-[30px]">
              <h1 className='text-xl text-center'>Personal Information</h1>
              {editing ? (
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black px-4 py-2 rounded-[10px] text-sm"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    className="flex items-center gap-2 border border-[#FFC247] text-[#FFC247] px-4 py-2 rounded-[10px] text-sm"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black px-4 py-2 rounded-[10px] text-sm invisible md:visible"
                  onClick={handleEdit}
                >
                  Edit <PenSquareIcon size={16} />
                </button>
              )}
            </div>
            {errorMsg && <div className="text-red-500 mb-2">{errorMsg}</div>}
            {/* Editable Fields */}
            <div className='flex flex-col md:flex-row gap-4 '>
              {/* left */}
              <div className='w-[100%] md:w-[80%] lg:w-[50%]'>
                <div className='mb-[20px]'>
                  <p className='font-light text-[10px]'>Full Name</p>
                  {editing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full text-black"
                    />
                  ) : (
                    <h1>{formData.fullName || '-'}</h1>
                  )}
                </div>
                <div className='mb-[20px]'>
                  <p className='font-light text-[10px]'>Email address</p>
                  {editing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full text-black"
                    />
                  ) : (
                    <h1>{formData.email || '-'}</h1>
                  )}
                </div>
                <div className='mb-[20px]'>
                  <p className='font-light text-[10px]'>Phone number</p>
                  {editing ? (
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full text-black"
                    />
                  ) : (
                    <h1>{formData.phoneNumber || '-'}</h1>
                  )}
                </div>
              </div>
              {/* right */}
              <div className='w-[100%] md:w-[30%] lg:w-[50%]'>
                <div className='mb-[20px]'>
                  <p className='font-light text-[10px]'>Type</p>
                  {editing ? (
                    <input
                    disabled
                      type="text"
                      name="nomineeType"
                      value={formData.nomineeType}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full text-black"
                    />
                  ) : (
                    <h1>{formData.nomineeType || '-'}</h1>
                  )}
                </div>
                <div className='mb-[20px]'>
                  <p className='font-light text-[10px]'>State/Region</p>
                  {editing ? (
                    <input
                      type="text"
                      name="stateOrRegion"
                      value={formData.stateOrRegion}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full text-black"
                    />
                  ) : (
                    <h1>{formData.stateOrRegion || '-'}</h1>
                  )}
                </div>
              </div>
            </div>
            {/* Mobile Edit Button */}
            {!editing && (
              <div className="flex items-center mt-4">
                <div className="flex-1">{/* other content */}</div>
                <button
                  className="flex items-center gap-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black px-4 py-2 rounded-[10px] text-sm visible md:invisible ml-auto"
                  onClick={handleEdit}
                >
                  Edit <PenSquareIcon size={16} />
                </button>
              </div>
            )}
          </div>

          
            <SecurityTab /> 
        </div>
      </main>
    </div>
  );
}
