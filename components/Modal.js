import { modalState } from '@/atoms/modalAtom';
import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { db, storage } from '@/firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';


function Modal() {
  const { data: session } = useSession(); 
  const [ open, setOpen ] = useRecoilState(modalState);
  const filePickerRef = useRef(null); // this for the image
  const captionRef = useRef(null);
  const [ loading, setLoading ] = useState(false);
  const [ selectedFile, setSelectedFile ] = useState(null);

  // now this function below makes the post in the firestore and it gives a post ID url which we take and send it to back to the app so the image is stored in the firebase 
  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1) Create a post and add to firestore 'posts' collection
    // 2) get the post ID for the newly created post
    // 3) upload the image to firebase store with the post ID
    // 4) get a download URL from firebase storage and update the original post with image

    // add document in a firebase timeline since for different areas have different timeline
    // This is step 1
    const docRef = await addDoc(collection(db, 'posts'), {
        username: session.user.username,
        caption: captionRef.current.value,
        profileImg: session.user.image,
        timestamp: serverTimestamp()
    })

    // This is step 2 
    console.log("New doc added with ID", docRef.id);

    //This is step 3
    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {

        //This is step 4 
        //Note: Here 'doc' is a helper function for pointing to a certain document in the firebase
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc (doc(db, 'posts', docRef.id), {
            image: downloadURL
        })
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);


  }

  //helper function
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {  // this line means get the file that user selects since the user can select only one picture at a time
        reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent.target.result); //Here the file is made as an object in the state
    };
  };
  return (
    <Transition.Root show = {open} as = {Fragment}>
        <Dialog
        as = 'div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose = {setOpen}>
            <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20
            text-center sm:block sm:p-0'>
                <Transition.Child
                as = { Fragment }
                enter = "ease-out duration-300"
                enterFrom = "opacity-0"
                enterTo = "opacity-100"
                leave = "ease-in duration-200"
                leaveFrom = "opacity-100"
                leaveTo = "opacity-0"
                >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity'/>

                </Transition.Child>
                {/* This element is to trick the browser into centering the modal contents */}
                <span
                className = 'hidden sm:inline-block sm:align-middle sm:h-screen'
                aria-hidden = "true">
                    &#8203;
                </span>
                <Transition.Child 
                as = { Fragment }
                enter = "ease-out duration-300"
                enterFrom = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo = "opacity-100 translate-y-0 sm:scale-100"
                leave = "ease-in duration-200"
                leaveFrom = "opacity-100 translate-y-0 sm:scale-100"
                leaveTo = "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" >
                    <div className = "inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                        <div>
                            {selectedFile ?(
                                <img src={selectedFile} 
                                className='w-full object-contain cursor-pointer'
                                onClick={() => setSelectedFile(null)} 
                                alt='Selected image' />
                            ):(
                                <div
                                onClick={() => filePickerRef.current.click()}
                                className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                             >
                                 <CameraIcon 
                                   className = 'h-6 w-6 text-emerald-600'
                                   aria-hidden = "true"
                                 />
                             
 
                             </div>
                            )}

 
                            <div className='mt-5 sm:mt-6'>
                                <div>
                                    <div className='mt-3 text-center sm:mt-5'>
                                        <Dialog.Title as="h3" className='text-lg leading-6 font-medium text-gray-900'
                                        >
                                            Upload Photo
                                        </Dialog.Title>

                                        <div>
                                            <input
                                              ref={filePickerRef}
                                              type='file'
                                              hidden
                                              onChange={addImageToPost}
                                            />

                                        </div>

                                        <div className='mt-2'>
                                            <input 
                                              className='border-none focus:ring-0 w-full text-center'
                                              type='text'
                                              //For the caption we use the below line
                                              ref={captionRef}
                                              placeholder='please enter a caption...'
                                            />

                                        </div>

                                    </div>
                                </div>
                                <button 
                                type = "button"
                                disabled ={!selectedFile}
                                className = 'inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300'
                                onClick={uploadPost}>
                                    {loading ? "Uploading..." : "Upload Post"}
                                </button>

                            </div>



                        </div>

                    </div>

                </Transition.Child>

            </div>

        </Dialog>

    </Transition.Root>
  )
}

export default Modal