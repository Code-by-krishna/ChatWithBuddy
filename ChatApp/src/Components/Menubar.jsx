import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export default function Menubar() {
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault();
    // Clear user authentication token
    localStorage.removeItem('user:token');
    // Redirect to the sign-in page
    navigate('/users/sign_in');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full gap-x-1.5 rounded-full bg-blue-400 p-3 text-sm font-semibold text-gray-900 ">
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              //href="#"
              onClick={() => navigate('/show-profile')}
              className="block px-4 py-2 text-sm text-gray-1000 data-[focus]:bg-gray-200 data-[focus]:text-gray-900 cursor-pointer "
            >
              Show Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a
              //href="#"
              onClick={() => navigate('/edit-profile')}
              className="block px-4 py-2 text-sm text-gray-1000 data-[focus]:bg-gray-200 data-[focus]:text-gray-900 cursor-pointer "
            >
              Edit Profile
            </a>
          </MenuItem>
          <MenuItem>
            <a
              //href="#"
              onClick={() => navigate('/payment-gateway')}
              className="block px-4 py-2 text-sm text-gray-1000 data-[focus]:bg-gray-200 data-[focus]:text-gray-900 cursor-pointer "
            >
            Payments
            </a>
          </MenuItem>
          <MenuItem>
            <a
              //href="#"
              onClick={() => navigate('/contact-us')}
              className="block px-4 py-2 text-sm text-gray-1000 data-[focus]:bg-gray-200 data-[focus]:text-gray-900 cursor-pointer "
            >
            Contact Us
            </a>
          </MenuItem>
          <form onSubmit={handleSignOut}>
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-1000 data-[focus]:bg-gray-200 data-[focus]:text-gray-900"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}

