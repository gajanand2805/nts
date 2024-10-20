import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import DirectionProvider, {
  DIRECTIONS,
} from 'react-with-direction/dist/DirectionProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGlobalCampaignContext } from '../../../contexts/CampaignContext';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const CampaignContent = () => {
  const { viewData } = useGlobalCampaignContext()
  // alert(viewData?.content?.text)
  // Function to format the content text by replacing line breaks with <br /> tags
  const formatContentText = (text) => {
    if (!text) return null
    text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Convert *text* to <strong>text</strong>
    return text.split('\r\n').map((line, index) => (
      <React.Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: line }} />
        <br />
      </React.Fragment>
    ))
  }

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-sm gap-2 p-2 bg-white dark:bg-bgBlack rounded-standard">
      <div className="bg-[#ECE5DD] dark:bg-bgBlackSec dark:text-white text-black w-full rounded-[10px] pb-10 p-2 gap-2 flex  flex-col py-2 items-center justify-start">
        <p className="bg-[#E2F7CB] dark:bg-bgBlack px-2 py-1 text-sm rounded-[10px] text-black dark:text-white">
          {viewData?.date}
        </p>
        <div className="flex items-center justify-center w-full">
          {/* message */}
          <div className="flex items-start justify-start w-full h-full">
            <DirectionProvider
              direction={DIRECTIONS.LTR}>
              <div className="w-full max-w-[100%] min-w-[240px] flex flex-col text-sm gap-2  items-center justify-start h-auto overflow-y-auto">
                <div className="flex  w-full flex-col gap-4 p-2 bg-white dark:bg-bgBlack rounded-[10px]">
                  {viewData?.content?.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={viewData?.content?.image}
                        alt="Campagin Image"
                        width={400}
                        height={160}
                      />
                    </div>
                  )}

                  {viewData?.content?.video && (
                    <div className="relative w-full h-30">
                      <video
                        src={viewData?.content?.video}
                        alt="Campagin Image"
                        width={400}
                        height={160}
                      >
                      </video>
                    </div>
                  )}

                  {viewData?.content?.document && (
                    <div className="relative w-full h-30">
                      <iframe
                        src={viewData?.content?.document}
                        alt="Campagin Document"
                        width={330}
                        height={160}
                      />
                    </div>
                  )}

                  {viewData?.content?.text === '$custom' ? (
                    <SkeletonText />
                  ) : (
                    <>
                      <p>{formatContentText(viewData?.content?.text)}</p>
                    </>
                  )}

                  {viewData?.content?.cardBody && (
                    <div className="relative w-full h-30">
                      <div className="mt-2">
                        <div className='overflow-hidden ' style={{ width: "100%", maxWidth: "800px", minWidth: "75px" }}>
                          <Swiper
                            slidesPerView={'auto'}
                            centeredSlides={true}
                            spaceBetween={30}
                            pagination={{
                              clickable: true,
                            }}
                            navigation
                            modules={[Navigation, Pagination]}
                            className="mySwiper  add-teplet-sld"
                            style={{ paddingBottom: "40px", paddingTop: "20px" }}
                          >

                            {viewData.content.cardBody.text.map((carousel, index) => (
                              <>
                                <SwiperSlide style={{ width: "100%", maxWidth: "270px", minWidth: "60px" }} key={index}>
                                  <div className='p-2 shadow pb-20 border rounded-md border-gray-200 relative'>
                                    {viewData.content.cardBody?.mediaType === "IMAGE" && (
                                      <Image
                                        width={400}
                                        height={160} // You can adjust these values as needed
                                        src={viewData.content.cardBody.mediaLinks[index]}
                                        alt="Selected"
                                        className="max-w-full h-auto rounded-md"
                                      />
                                    )}
                                    {viewData.content.cardBody?.mediaType === "VIDEO" && (
                                      <video
                                        controls
                                        src={viewData.content.cardBody.mediaLinks[index]} // Make sure to define typeImageTemplate
                                        alt="Selected"
                                        className="max-w-full h-[150px] rounded-md"
                                      />
                                    )}
                                    {/* Display Text Preview Here */}
                                    <p className="mt-4 text-base text-gray-800">
                                      {carousel}
                                    </p>

                                    {/* Display Button Preview Here */}
                                    <p className="mt-4 text-base text-sky-500">
                                      <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                      {viewData.content.cardBody.buttonPhoneTitle || ""}
                                    </p>
                                  </div>
                                </SwiperSlide>
                              </>
                            ))}


                          </Swiper >
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DirectionProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignContent

const SkeletonText = () => {
  return (
    <div className="w-full ">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Custom campaign text</span>
    </div>
  )
}
