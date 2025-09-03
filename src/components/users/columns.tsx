'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-start">{row.index + 1}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link 
        href={`/users/${row.original.id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
      >
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-start">{row.original.email}</div>,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-start">{row.original.phone}</div>,
  },
  {
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-start">{row.original.company.name}</div>
    ),
  },
];
