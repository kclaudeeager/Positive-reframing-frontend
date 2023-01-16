import React, { useEffect, useRef, useState } from 'react';
import Transition from '../Transition';

const DropChildren = ({
  toggle,
  children,
}: {
  toggle: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) {
        return;
      }
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      
    
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative flex w-full h-[200px]">
      {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
      <div
      className='h-[100px]'
        ref={trigger}
        role="button"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onKeyDown={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        {toggle}
      </div>

      <Transition
        className="origin-top-right h-[900px] z-50 w-full absolute top-full right-0 min-w-44 bg-brand-blue-light rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          className="w-full h-[700px] bg-yellow-600"
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default DropChildren;