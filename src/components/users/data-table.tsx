'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Database,
  Users,
  Filter,
} from 'lucide-react';

interface BaseData {
  id: string | number;
}

interface DataTableProps<TData extends BaseData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
}

export function DataTable<TData extends BaseData, TValue>({
  columns,
  data,
  title = 'Data Management',
  description = 'Manage and organize your data efficiently',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  // Handle row click to navigate to user details
  const handleRowClick = (userId: string) => {
    router.push(`/users/${userId}`);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const glowVariants = {
    rest: { scale: 1, filter: 'drop-shadow(0 0 0px transparent)' },
    hover: {
      scale: 1.02,
      filter: 'drop-shadow(0 0 20px hsl(263 70% 55% / 0.3))',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl -z-10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/2 to-transparent rounded-3xl -z-10" />

      <div className="backdrop-blur-xl bg-card rounded-3xl p-8 space-y-8 relative overflow-hidden ">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float opacity-30" />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl animate-float opacity-20"
          style={{ animationDelay: '3s' }}
        />

        {/* Header Section */}
        <motion.div variants={itemVariants} className="relative">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary-gradient">
                  <Database className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {table.getFilteredRowModel().rows.length} total entries
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div variants={itemVariants}>
          <div className="glass-surface rounded-2xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Global Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  placeholder="Search across all columns..."
                  value={globalFilter ?? ''}
                  onChange={(event) => setGlobalFilter(event.target.value)}
                  className="pl-12 h-12 bg-background/50 border-white/10 text-foreground placeholder:text-muted-foreground
                           focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300
                           hover:border-white/20"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                      variants={glowVariants}
                    >
                      <Button
                        variant="outline"
                        className="h-12 px-6 bg-background/50 border-white/10 hover:bg-primary/10 
                                 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>Columns</span>
                        <ChevronDown className="h-4 w-4 ml-2 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 glass-card border-white/10"
                  >
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize hover:bg-primary/10 transition-colors"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <motion.div
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  variants={glowVariants}
                >
                  <Button
                    variant="outline"
                    onClick={() => {
                      setGlobalFilter('');
                      table.resetColumnFilters();
                    }}
                    className="h-12 px-6 bg-background/50 border-white/10 hover:bg-accent/10 
                             hover:border-accent/30 transition-all duration-300"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Container */}
        <motion.div variants={itemVariants} className="relative">
          <div className="glass-card rounded-2xl overflow-hidden border-white/10">
            {/* Table Header Info */}
            <div className="px-6 py-4 border-b border-white/10 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Showing{' '}
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}
                    -
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Rows per page:
                  </span>
                  <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => table.setPageSize(Number(value))}
                  >
                    <SelectTrigger className="h-8 w-20 bg-background/50 border-white/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/10">
                      {[5, 10, 20, 30, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="table-header hover:bg-transparent"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="table-cell font-semibold text-foreground/90 text-xs uppercase tracking-wider
                                   first:pl-6 last:pr-6"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="wait">
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, i) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              delay: Math.min(i * 0.03, 0.5),
                              duration: 0.4,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            x: 20,
                            transition: { duration: 0.2 },
                          }}
                          className="table-row group cursor-pointer"
                          onClick={() => handleRowClick(row.original.id)}
                          whileHover={{
                            backgroundColor: 'hsl(263 70% 55% / 0.05)',
                            transition: { duration: 0.2 },
                            scale: 1.02,
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className="table-cell text-foreground/90 first:pl-6 last:pr-6 py-4
                                       group-hover:text-foreground transition-colors duration-300"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TableCell
                          colSpan={columns.length}
                          className="h-64 text-center"
                        >
                          <div className="flex flex-col items-center justify-center py-12">
                            <div className="p-2 rounded-xl bg-[var(--primary-gradient)] mb-6 animate-pulse-glow">
                              <Database className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              No data found
                            </h3>
                            <p className="text-muted-foreground mb-6 max-w-md text-center">
                              {globalFilter ||
                              Object.keys(columnFilters).length > 0
                                ? 'No results match your current filters. Try adjusting your search criteria.'
                                : "There's no data to display yet. Your data will appear here once it's available."}
                            </p>
                            {(globalFilter ||
                              Object.keys(columnFilters).length > 0) && (
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setGlobalFilter('');
                                  table.resetColumnFilters();
                                }}
                                className="bg-background/50 border-white/10 hover:bg-primary/10 hover:border-primary/30"
                              >
                                Clear all filters
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {table.getPageCount() > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-gradient-to-r from-background/50 to-background/30">
                <div className="text-sm text-muted-foreground">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </div>

                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                      className="bg-background/50 border-white/10 hover:bg-primary/10 hover:border-primary/30 
                               disabled:opacity-30 transition-all duration-300"
                    >
                      <ChevronsLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="bg-background/50 border-white/10 hover:bg-primary/10 hover:border-primary/30 
                               disabled:opacity-30 transition-all duration-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>

                  {/* Page Numbers */}
                  {Array.from(
                    { length: Math.min(5, table.getPageCount()) },
                    (_, i) => {
                      const currentPage = table.getState().pagination.pageIndex;
                      const pageCount = table.getPageCount();
                      let pageIndex;

                      if (pageCount <= 5) {
                        pageIndex = i;
                      } else if (currentPage < 3) {
                        pageIndex = i;
                      } else if (currentPage > pageCount - 4) {
                        pageIndex = pageCount - 5 + i;
                      } else {
                        pageIndex = currentPage - 2 + i;
                      }

                      if (pageIndex < 0 || pageIndex >= pageCount) return null;

                      return (
                        <motion.div
                          key={pageIndex}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant={
                              currentPage === pageIndex ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => table.setPageIndex(pageIndex)}
                            className={
                              currentPage === pageIndex
                                ? 'bg-primary-gradient text-primary-foreground hover:opacity-90 transition-all duration-300'
                                : 'bg-background/50 border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300'
                            }
                          >
                            {pageIndex + 1}
                          </Button>
                        </motion.div>
                      );
                    }
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="bg-background/50 border-white/10 hover:bg-primary/10 hover:border-primary/30 
                               disabled:opacity-30 transition-all duration-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                      className="bg-background/50 border-white/10 hover:bg-primary/10 hover:border-primary/30 
                               disabled:opacity-30 transition-all duration-300"
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
