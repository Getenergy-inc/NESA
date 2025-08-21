import React from 'react'
import PartnerSpotlight from './PartnerSpotlight'
import PartnerFAQs from './PartnerFAQs'

const PartnerPageMain = () => {
  return (
    <div className ="relative z-10 bg-black/100">
    <PartnerSpotlight />
    <PartnerFAQs />
    </div>
  )
}

export default PartnerPageMain