import React, { useState } from 'react';

const UserProfileSidebar = ({ user }) => {
  // console.log("useruseruser", userInfo)
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const [isInputVisible, setInputVisible] = useState(false);

  const handleAddClick = () => {
    setInputVisible(true);
  };
  const handleCancelClick = () => {
    setInputVisible(false);
  };

  // Function to format the message timestamp
  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleString('en-US', options);
  };

  return (
    <div className=" border-gray-300 overflow-hidden w-[290px] h-[calc(100vh-142px)] profile_screen" style={{ backgroundColor: 'rgb(254, 254, 254)' }}>
      <div className='flex-shrink-0 border-b border-gray-300 p-2 bg-[#0a474c] h-[50px] flex items-center'> <h2 className='text-md font-medium text-white'>Chat Profile</h2></div>
      <div className='overflow-auto h-full pb-20'>
        <div className='flex items-center justify-center gap-3 my-5'>
          <div className='flex items-center justify-center w-16 h-16 bg-gray-400 rounded-full text-white'>
            <h2 className='font-medium' style={{ fontSize: '30px' }}>
              {user.Name.charAt(0)}
            </h2>
          </div>
          <div className='text-center'>
            <h4 style={{ fontSize: '20px' }}>
              {user.Name}
            </h4>
            <p className='text-sm'>{user.Contact}</p>
          </div>
        </div>

        <div className='py-3 px-4 bg-[#ebf5f3] m-2 rounded-md'>
          <div className='justify-between item-center flex mt-1.5'>
            <p className="text-xs font-normal">Status </p>
            <p className='text-xs font-normal'>Intervened</p>
          </div>
          <div className='justify-between item-center flex mt-1.5'>
            <p className="text-xs font-normal">Intervened By </p>
            <p className="text-xs font-normal">Dimple</p>
          </div>
          <div className='justify-between item-center flex mt-1.5'>
            <p className="text-xs font-normal">Last Active</p>
            <p className="text-xs font-normal">{getTimeFromTimestamp(user.LastMessageTimestamp)}</p>
          </div>
          <div className='justify-between item-center flex mt-1.5'>
            <p className="text-xs font-normal">Template Messages </p>
            <p className="text-xs font-normal">20</p>
          </div>

          <div className='justify-between item-center flex mt-1.5'>
            <p className="text-xs font-normal">Source</p>
            <p className="text-xs font-normal">ORGANIC</p>
          </div>
        </div>

        {/* <div id="accordionExample" className="w-full">
          <div className="border border-neutral-200 dark:border-neutral-600">
            <h2 id="headingOne">
              <button
                className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                type="button"
                onClick={() => toggleAccordion(1)}
                aria-expanded={openIndex === 1}
                aria-controls="collapseOne"
              >
                Payments
                <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 1 ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div id="collapseOne" className={`px-5 py-4 ${openIndex === 1 ? '' : 'hidden'}`}>
              <button className="px-2 py-2 border rounded-lg border-[#0a474c] text-[#0a474c] text-xs" style={{ letterSpacing: '1px' }}>
                Create Payment
              </button>
              <div className='flex justify-between item-center mt-4'>
                <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                  Order Id
                </button>
                <div className='flex justify-between item-center gap-5'>
                  <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                    Amount
                  </button>
                  <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                    Status
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
            <h2 id="headingTwo">
              <button
                className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                type="button"
                onClick={() => toggleAccordion(2)}
                aria-expanded={openIndex === 2}
                aria-controls="collapseTwo"
              >
                Campaigns
                <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 2 ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div id="collapseTwo" className={`px-5 py-4 ${openIndex === 2 ? '' : 'hidden'}`}>
              <div className='justify-between item-center flex mt-1.5'>
                <button className='text-sm font-normal'>daac_fee_approva...</button>
                <div className='justify-between item-center flex mt-1.5'>
                  <span>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                    </svg>
                  </span>
                  <button>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='justify-between item-center flex mt-1.5'>
                <button className='text-sm font-normal'>daac_login</button>
                <div className='justify-between item-center flex mt-1.5'>
                  <span>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                    </svg>
                  </span>
                  <button>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='justify-between item-center flex mt-1.5'>
                <button className='text-sm font-normal'>daac_login</button>
                <div className='justify-between item-center flex mt-1.5'>
                  <span>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                    </svg>
                  </span>
                  <button>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className='justify-between item-center flex mt-1.5'>
                <button className='text-sm font-normal'>daac_fee_approva...</button>
                <div className='justify-between item-center flex mt-1.5'>
                  <span>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="#08CF65" strokeWidth="2">
                      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path>
                    </svg>
                  </span>
                  <button>
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="black">
                      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
            <h2 id="headingThree">
              <button
                className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                type="button"
                onClick={() => toggleAccordion(3)}
                aria-expanded={openIndex === 3}
                aria-controls="collapseThree"
              >
                Attributes
                <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 3 ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div id="collapseThree" className={`px-5 py-4 ${openIndex === 3 ? '' : 'hidden'}`}>
              <button className='px-4 py-1.5 border rounded-lg border-[#0a474c] text-[#0a474c] text-xs'>
                Edit
              </button>
              <div className='flex justify-between item-center mt-4'>
                <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                  Enroll
                </button>
                <button className="text-black text-xs" style={{ letterSpacing: '1px' }}>
                  DL1593
                </button>
              </div>
            </div>
          </div>

          <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
            <h2 id="headingFour">
              <button
                className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                type="button"
                onClick={() => toggleAccordion(4)}
                aria-expanded={openIndex === 4}
                aria-controls="collapseFour"
              >
                Tags
                <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 4 ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div id="collapseFour" className={`px-5 py-4 ${openIndex === 4 ? '' : 'hidden'}`}>
              <div className='flex justify-between items-center mt-4 mb-2'>
                {!isInputVisible ? (
                  <>
                    <select id="countries" className="bg-[rgb(240,240,240)] border border-gray-300 text-gray-900 text-xs  rounded-md block w-[133px]  gap-20 px-2.5 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected disabled>Select & add tag</option>
                      <option value="US">DAAC_VDN</option>
                      <option value="CA">DAAC_MANSAROVAR</option>
                      <option value="FR">DAAC_DEGREE</option>
                      <option value="DE">DAAC_DESIGN</option>
                      <option value="CA">DAAC_DIGITAL</option>
                      <option value="FR">DAAC_ACCOUNT</option>
                      <option value="DE">DAAC_PROG</option>
                    </select>
                    <button className='flex items-center px-3 h-[35px] border rounded-lg border-[#0a474c] text-[#0a474c] text-xs'>
                      <svg className="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Add
                    </button>
                  </>
                ) : (
                  <>
                    <input type="text" className="px-3 h-[35px] border rounded-lg border-[#0a474c] w-[133px] text-[#0a474c] text-xs" placeholder="Enter new tag" />
                    <button className='flex items-center text-[#0a474c] text-xs' onClick={handleCancelClick} style={{ width: 'max-content' }}>Create & Add Tag</button>
                  </>
                )}
              </div>
              {!isInputVisible ?
                <button className='flex items-center px-3  text-[#0a474c] text-xs' onClick={handleAddClick} >Create & Add Tag</button> : <button className='flex items-center px-3  text-[#0a474c] text-xs' onClick={handleCancelClick} >cancel</button>}
            </div>
          </div>


          <div className="border-t-0 border border-neutral-200 dark:border-neutral-600">
            <h2 id="headingfive">
              <button
                className="flex items-center justify-between w-full px-5 py-4 text-left text-sm bg-white border-0 dark:bg-body-dark dark:text-white focus:outline-none"
                type="button"
                onClick={() => toggleAccordion(5)}
                aria-expanded={openIndex === 5}
                aria-controls="collapsefive"
              >
                Customer Journey
                <span className={`w-4 h-4 ml-auto transform transition-transform duration-200 ease-in-out ${openIndex === 5 ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </h2>
            <div id="collapsefive" className={`px-5  ${openIndex === 5 ? '' : 'hidden'}`}>
              <div className='px-5 mb-5 relative'>
                <div>
                  <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                  <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                </div>
                <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                  DAAC_DIGITAL
                </button>
                <span className='text-xs pl-3'>
                  removed by Vikas Solanki
                </span>
              </div>
              <div className='px-5 mb-5 relative'>
                <div>
                  <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                  <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                </div>
                <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                  DAAC_DIGITAL
                </button>
                <span className='text-xs pl-3'>
                  removed by Vikas Solanki
                </span>
              </div>
              <div className='px-5 mb-5 relative'>
                <div>
                  <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                  <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                </div>
                <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                  DAAC_DIGITAL
                </button>
                <span className='text-xs pl-3'>
                  removed by Vikas Solanki
                </span>
              </div>
              <div className='px-5 mb-5 relative'>
                <div>
                  <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                  <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                </div>
                <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                  DAAC_DIGITAL
                </button>
                <span className='text-xs pl-3'>
                  removed by Vikas Solanki
                </span>
              </div>
              <div className='px-5 mb-5 relative'>
                <div>
                  <span className='h-[10px] w-[10px] bg-[#0a474c] absolute rounded-full top-1 left-1 block'></span>
                  <span className='h-full w-[2px] bg-[#0a474c] absolute rounded-full top-5 left-2 block'></span>
                </div>
                <button className='px-1 py-1 rounded-lg text-red-500 text-xs' style={{ backgroundColor: 'rgb(243, 240, 197)' }}>
                  DAAC_DIGITAL
                </button>
                <span className='text-xs pl-3'>
                  removed by Vikas Solanki
                </span>
              </div>
            </div>
          </div>


        </div> */}
      </div>

    </div>
  );
};

export default UserProfileSidebar;
