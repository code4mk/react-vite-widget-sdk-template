import React, { useState, useEffect } from 'react';
import { WidgetConfig }  from '@/types/widget';
import { X, MessageCircle } from 'lucide-react';


interface SDKWidgetProps {
  config: WidgetConfig;
}

export const SDKWidget: React.FC<SDKWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (config.additional_open_id) {
      const additionalOpener = document.getElementById(config.additional_open_id);
      if (additionalOpener) {
        additionalOpener.addEventListener('click', () => setIsOpen(true));
        return () => additionalOpener.removeEventListener('click', () => setIsOpen(true));
      }
    }
  }, [config.additional_open_id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setIsSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Form submitted:', formData);
      setIsSuccess(true);
      setTimeout(() => setIsOpen(false), 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {
        !isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-black text-white rounded-lg px-6 py-3 shadow-lg hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 z-50"
          >
            <MessageCircle size={20} />
            <span className="text-base font-medium">Message</span>
          </button>
        )
      }
      

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Add backdrop div */}
          <div className="absolute bg-black/50 inset-0 backdrop-blur-sm" onClick={handleClose} />
          <div className="bg-white rounded-3xl p-8 w-full max-w-md relative animate-fadeIn shadow-xl z-10">
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 text-black hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-gray-900">Thank you!</h3>
                <p className="text-gray-500 mt-2">We'll get back to you soon.</p>
              </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className='text-xl font-medium text-gray-900'>{config?.company_name}</p>
                  </div>
                <div>
                  <label htmlFor="name" className="block text-xl font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xl font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 placeholder-gray-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xl font-medium text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:outline-none focus:border-gray-300 placeholder-gray-400"
                    required
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#14171F] text-white py-3 px-4 rounded-xl hover:bg-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium mt-4"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            )}
            
            {/* Add copyright at the bottom */}
            <div className="text-center text-xs text-gray-400 mt-6">
              Powered by <a href="https://github.com/code4mk" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">code4mk</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 