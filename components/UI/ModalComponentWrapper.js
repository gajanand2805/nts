// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// const ModalComponentWrapper = ({ id, backdropClickHandler }) => {
//   return (
//     // <AnimatePresence>
//     //       {emailSent && (
//     //         <motion.div
//     //           initial={{ scale: 0 }}
//     //           animate={{ scale: 1 }}
//     //           className="absolute flex items-center justify-center w-screen h-screen bg-black/40"
//     //         >
//     //           <div className="absolute flex items-center justify-center w-screen h-screen">
//     //             <div className="z-10 w-[310px] h-[400px] bg-green-500 shadow-lg rounded-lg flex items-center justify-center absolute">
//     //               <div className="flex flex-col items-center gap-10">
//     //                 <p className="p-3 bg-white rounded-full shadow-md">
//     //                   <GiCheckMark className="text-3xl text-green-500 " />
//     //                 </p>
//     //                 <div className="flex flex-col items-center w-full gap-2 px-4 py-6 text-black bg-white rounded-md shadow-md">
//     //                   <p className="w-full text-base font-bold text-center  capitalize max-w-[290px]">
//     //                     {t("Auth_verify_mail")}
//     //                   </p>
//     //                   <p className="w-full text-base font-bold text-center text-blue-500 underline max-w-[290px]">
//     //                     {merchantEmail}
//     //                   </p>
//     //                 </div>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </motion.div>
//     //       )}
//     //     </AnimatePresence>
//     <div className="flex items-center justify-center w-full h-full">
//       <div
//         id={id}
//         className="fixed top-0 bottom-0 left-0 right-0 z-40 hidden h-full min-h-screen opacity-20 bg-Black"
//         onClick={backdropClickHandler}
//       ></div>

//       <div className="fixed px-10 z-[100] flex flex-col items-center justify-center top-0 bottom-0 left-0 right-0 bg-White/80 dark:bg-Black/80 ">
//         <div className="w-full flex flex-col px-5 py-4 space-y-5 bg-white dark:bg-black rounded-lg max-w-[400px]">
//           <div className="flex flex-col space-y-2">
//             <h1 className="text-xl font-semibold dark:text-white">
//               {t && t("ConfirmLogOut")}
//             </h1>
//             <p className="dark:text-white">{t && t("AcknoLogOut")}</p>
//           </div>
//           <div className="flex justify-end">
//             <button
//               className="px-4 py-2 text-Blue"
//               onClick={() => {
//                 setShowLogout(false);
//               }}
//             >
//               {t && t("cancel")}
//             </button>
//             <button
//               className="px-4 py-2 text-white rounded bg-Blue"
//               onClick={logout}
//             >
//               {t && t("Logout")}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModalComponentWrapper;
