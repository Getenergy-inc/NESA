'use client';

export default function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div className="spinner" />
      <p>Loading admin login...</p>

      {/* Using regular style tag instead of styled-jsx */}
      <style dangerouslySetInnerHTML={{ __html: `
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f0f0f0;
          border-top: 5px solid #f97316;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}