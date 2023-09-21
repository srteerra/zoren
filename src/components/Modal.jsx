import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Modal = ({ modalOpen, setModalOpen, children }) => {
    const closeModal = () => {
        setModalOpen(true)
    }
    
    return (
        <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 " onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-0 sm:p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="transform absolute sm:static bottom-[-20%] rounded-3xl bg-white dark:bg-gray-700 p-4 sm:p-10 pb-[50%] text-left align-middle shadow-xl transition-all">{children}</Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

const ModalClose = ({ modalOpen, setModalOpen, children }) => {
    const closeModal = () => {
        setModalOpen(false)
    }
    
    return (
        <Transition appear show={modalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="transform rounded-3xl bg-white dark:bg-gray-800 w-4/5 md:w-3/5 xl:w-3/5 2xl:w-2/5 px-24 py-10 text-left align-middle shadow-xl transition-all">{children}</Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export {Modal, ModalClose};