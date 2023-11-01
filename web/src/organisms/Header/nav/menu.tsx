import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import classNames from 'classnames';
import { Corsi } from './';
import { Link } from 'gatsby';

type Props = { list: Corsi[] };
export default function Menu({ list }: Props) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              `nav-menu-item group inline-flex items-center focus:outline-none `,
              { 'menu-open': open }
            )}
          >
            <span>Corsi</span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="grid gap-8 overflow-hidden rounded-lg bg-white p-7 shadow-lg ring-1 ring-black/5 lg:grid-cols-2">
                {list.map((item) => (
                  <Link
                    to={`/${item.slug.current}`}
                    key={item.slug.current}
                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                  >
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {/* @ts-expect-error */}
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
