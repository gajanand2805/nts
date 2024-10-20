import React, { useState } from 'react'
import { useGlobalAuthContext } from '../../AuthContext'
import Breadcrumb from '../UI/Breadcrumb/Breadcrumb'
import DocsMobileHeader from './DocsHeader/DocsMobileHeader'
import DocsSideHeader from './DocsHeader/DocsSideHeader'

const DocsContentWrapper = ({ crumbs, heading, description, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { selectedLang } = useGlobalAuthContext()

  return (
    <div className="relative flex flex-col items-center justify-start w-full h-full min-h-screen text-base bg-white">
      <div className="flex relative flex-col items-start h-full tablet:gap-20 tablet:px-12 laptop:px-12 laptopL:px-20 px-5 w-full max-w-[1800px]">
        <DocsSideHeader />
        <div
          className={`flex flex-col items-start justify-start gap-10 w-full pt-[80px] tablet:pt-[100px] p-4 ${selectedLang === 'en' ? 'tablet:pl-[190px]' : 'tablet:pr-[190px]'}`}>
          <DocsMobileHeader
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {!isMobileMenuOpen && (
            <>
              <div className="flex flex-col items-start justify-start w-full gap-4">
                {crumbs && <Breadcrumb crumbs={crumbs} />}
                <h2 className="text-3xl font-bold">{heading}</h2>
                {description && <p>{description}</p>}
              </div>
              <div className="flex flex-col items-start justify-start w-full gap-10">
                {children}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocsContentWrapper
