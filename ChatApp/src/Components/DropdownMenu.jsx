import React, { useState } from 'react';

const menuItems = [
    { id: 'uploadFile', label: 'Upload File', type: 'file' },
    { id: 'uploadImage', label: 'Upload Image', type: 'file' }
];

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                onClick={toggleDropdown}
                className="bg-blue-500 text-white p-2 rounded-full focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 9l6 6l6 -6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10" style={{ transition: 'opacity 0.3s ease', opacity: isOpen ? 1 : 0 }}>
                    <ul className="py-1">
                        {menuItems.map(item => (
                            <li key={item.id}>
                                {item.type === 'file' ? (
                                    <>
                                        <input type="file" id={item.id} className="hidden" />
                                        <label htmlFor={item.id} className="block px-4 py-2 text-gray-1000 hover:bg-gray-100 cursor-pointer">
                                            {item.label}
                                        </label>
                                    </>
                                ) : (
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                                        {item.label}
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;