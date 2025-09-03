'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  Building2,
  ExternalLink,
  Mail,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
          >
            ID
            <motion.div
              animate={{
                rotate:
                  column.getIsSorted() === 'asc'
                    ? 0
                    : column.getIsSorted() === 'desc'
                    ? 180
                    : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
            </motion.div>
          </Button>
        </motion.div>
      );
    },
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="font-mono text-sm text-muted-foreground"
      >
        #{row.index + 1}
      </motion.div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
          >
            Name
            <motion.div
              animate={{
                rotate:
                  column.getIsSorted() === 'asc'
                    ? 0
                    : column.getIsSorted() === 'desc'
                    ? 180
                    : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
            </motion.div>
          </Button>
        </motion.div>
      );
    },
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Link
          href={`/users/${row.original.id}`}
          className="font-semibold text-primary hover:text-primary/80 hover:underline 
                   transition-all duration-300 flex items-center gap-2 group"
        >
          <span>{row.original.name}</span>
          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </motion.div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
          >
            Email
            <motion.div
              animate={{
                rotate:
                  column.getIsSorted() === 'asc'
                    ? 0
                    : column.getIsSorted() === 'desc'
                    ? 180
                    : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
            </motion.div>
          </Button>
        </motion.div>
      );
    },
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <Mail className="h-4 w-4 text-accent" />
        <span className="font-medium">{row.original.email}</span>
      </motion.div>
    ),
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
          >
            Phone
            <motion.div
              animate={{
                rotate:
                  column.getIsSorted() === 'asc'
                    ? 0
                    : column.getIsSorted() === 'desc'
                    ? 180
                    : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
            </motion.div>
          </Button>
        </motion.div>
      );
    },
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <Phone className="h-4 w-4 text-accent" />
        <span className="font-mono">{row.original.phone}</span>
      </motion.div>
    ),
  },
  {
    accessorKey: 'company',
    header: ({ column }) => {
      return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
          >
            Company
            <motion.div
              animate={{
                rotate:
                  column.getIsSorted() === 'asc'
                    ? 0
                    : column.getIsSorted() === 'desc'
                    ? 180
                    : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
            </motion.div>
          </Button>
        </motion.div>
      );
    },
    cell: ({ row }) => (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="group"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-300">
              {row.original.company.name}
            </div>
            <div className="text-xs text-muted-foreground italic">
              {row.original.company.catchPhrase}
            </div>
          </div>
        </div>
      </motion.div>
    ),
  },
];
