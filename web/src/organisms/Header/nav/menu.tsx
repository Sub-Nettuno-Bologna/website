import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import classNames from 'classnames';
import { Corsi } from './';
import { Link } from 'gatsby';

function partition<T>(
  arr: Array<T>,
  predicate: (val: T) => boolean
): [Array<T>, Array<T>] {
  const partitioned: [Array<T>, Array<T>] = [[], []];
  for (const val of arr) {
    const partitionIndex: 0 | 1 = predicate(val) ? 0 : 1;
    partitioned[partitionIndex].push(val);
  }
  return partitioned;
}

type GridProps = { list: Corsi[]; title: string };

function Grid({ list, title }: GridProps) {
  return (
    <div className="my-2">
      <div className="mb-2 font-bold">{title}</div>
      <div className="grid gap-2 lg:grid-cols-2">
        {list.map((item) => (
          <Link
            to={`/${item.slug.current}`}
            key={item.slug.current}
            className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

type Props = { list: Corsi[] };
export default function Menu({ list }: Props) {
  const [base, specs] = partition(list, (item) =>
    ['p1', 'p2', 'p3'].includes(item.codice?.toLowerCase())
  );
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
              <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1  ring-black/5">
                <Grid list={base} title="Corsi base" />
                <Grid list={specs} title="Specializzazioni" />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
