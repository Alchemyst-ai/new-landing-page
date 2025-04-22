"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './home/Button';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const WaitlistModal = ({ isOpen, onClose, email: initialEmail }: WaitlistModalProps) => {
  const [email, setEmail] = useState(initialEmail || '');

  // Update email when initialEmail prop changes
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email submitted:', email);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm sm:max-w-md transform overflow-hidden rounded-2xl bg-black p-4 sm:p-6 text-left align-middle shadow-xl transition-all border border-gray-800">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-3 sm:mb-4">
                    <Image
                      src="/icons/tick.png"
                      alt="Success"
                      width={150}
                      height={150}
                      className="mx-auto"
                    />
                  </div>
                  
                  <div className="text-xl sm:text-2xl md:text-3xl font-medium text-white text-center">
                    We&apos;ve added you to our
                    <br />
                    waiting list!
                  </div>
                  
                  <form onSubmit={handleSubmit} className="w-full mt-3 sm:mt-4">
                    <div className="bg-gray-900 rounded-lg px-3 py-2 mb-3 sm:mb-4 flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-2 text-gray-400"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-transparent text-gray-400 outline-none text-sm sm:text-base"
                        required
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400 text-center mb-3 sm:mb-4">
                      We&apos;re shipping the best AI products day and night—your exclusive access will be sent to this email shortly.
                    </p>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WaitlistModal; 