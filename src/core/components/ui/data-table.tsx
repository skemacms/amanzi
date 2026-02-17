'use client';

import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  Check,
  X,
  Filter,
} from 'lucide-react';
import { cn } from '@/core/lib/utils';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './custom-select';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface ColumnDef<T> {
  id: string;
  header: string;
  accessorFn: (row: T) => React.ReactNode;
  /** raw value for searching / sorting / filtering */
  rawValue?: (row: T) => string | number;
  align?: 'left' | 'center' | 'right';
  /** column is hidden by default */
  defaultHidden?: boolean;
  /** Provide distinct filter values */
  filterOptions?: { label: string; value: string }[];
  /** width hint */
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  /** unique key extractor */
  getRowId: (row: T) => string;
  /** page sizes offered. Default [10,25,50] */
  pageSizes?: number[];
  /** placeholder for the search input */
  searchPlaceholder?: string;
  /** message when empty */
  emptyMessage?: string;
  /** Called when selection changes */
  onSelectionChange?: (selectedIds: string[]) => void;
}

/* ------------------------------------------------------------------ */
/*  Checkbox                                                           */
/* ------------------------------------------------------------------ */
function Checkbox({
  checked,
  onCheckedChange,
  indeterminate,
  className,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}) {
  return (
    <CheckboxPrimitive.Root
      checked={indeterminate ? 'indeterminate' : checked}
      onCheckedChange={(v) => onCheckedChange(v === true)}
      className={cn(
        'flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors',
        'data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-white',
        'data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:text-white',
        'hover:border-accent/60',
        className,
      )}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {indeterminate ? (
          <div className="h-0.5 w-2 bg-current rounded-full" />
        ) : (
          <Check className="h-3 w-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

/* ------------------------------------------------------------------ */
/*  DataTable                                                          */
/* ------------------------------------------------------------------ */
export function DataTable<T>({
  data,
  columns,
  getRowId,
  pageSizes = [10, 25, 50],
  searchPlaceholder = 'Rechercher...',
  emptyMessage = 'Aucun resultat.',
  onSelectionChange,
}: DataTableProps<T>) {
  /* -- state -------------------------------------------------------- */
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(
    () => new Set(columns.filter((c) => c.defaultHidden).map((c) => c.id)),
  );
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const visibleColumns = useMemo(
    () => columns.filter((c) => !hiddenColumns.has(c.id)),
    [columns, hiddenColumns],
  );

  /* -- filtering ---------------------------------------------------- */
  const filtered = useMemo(() => {
    let result = data;

    // global search
    if (search) {
      const term = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const raw = col.rawValue ? col.rawValue(row) : '';
          return String(raw).toLowerCase().includes(term);
        }),
      );
    }

    // per-column filters
    for (const [colId, filterValue] of Object.entries(columnFilters)) {
      if (!filterValue) continue;
      const col = columns.find((c) => c.id === colId);
      if (!col?.rawValue) continue;
      result = result.filter((row) => String(col.rawValue!(row)) === filterValue);
    }

    return result;
  }, [data, search, columns, columnFilters]);

  /* -- pagination --------------------------------------------------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);
  const paged = filtered.slice(safePageIndex * pageSize, (safePageIndex + 1) * pageSize);

  /* -- selection ----------------------------------------------------- */
  const allPageIds = paged.map(getRowId);
  const allPageSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id));
  const somePageSelected = allPageIds.some((id) => selectedIds.has(id));

  const toggleRow = useCallback(
    (id: string, checked: boolean) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        checked ? next.add(id) : next.delete(id);
        onSelectionChange?.([...next]);
        return next;
      });
    },
    [onSelectionChange],
  );

  const toggleAllPage = useCallback(
    (checked: boolean) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allPageIds.forEach((id) => (checked ? next.add(id) : next.delete(id)));
        onSelectionChange?.([...next]);
        return next;
      });
    },
    [allPageIds, onSelectionChange],
  );

  const activeFilterCount = Object.values(columnFilters).filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* --- Toolbar -------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageIndex(0);
            }}
            className="w-full rounded-xs border bg-card py-1.5 pl-8 pr-3 text-xs outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Column Filters */}
        {columns.some((c) => c.filterOptions) && (
          <Popover.Root>
            <Popover.Trigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-xs border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
                <Filter className="h-3.5 w-3.5" />
                Filtres
                {activeFilterCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="start"
                sideOffset={4}
                className="z-50 min-w-[240px] rounded-xs border bg-card p-3 shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Filtrer par colonne
                </p>
                <div className="space-y-2">
                  {columns
                    .filter((c) => c.filterOptions)
                    .map((col) => (
                      <div key={col.id} className="space-y-1">
                        <label className="text-[11px] font-medium text-foreground">{col.header}</label>
                        <Select
                          value={columnFilters[col.id] ?? ''}
                          onValueChange={(v) => {
                            setColumnFilters((prev) => ({ ...prev, [col.id]: v === '__all__' ? '' : v }));
                            setPageIndex(0);
                          }}
                        >
                          <SelectTrigger className="h-7 text-[11px]">
                            <SelectValue placeholder="Tous" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__all__">Tous</SelectItem>
                            {col.filterOptions!.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      setColumnFilters({});
                      setPageIndex(0);
                    }}
                    className="mt-2 w-full rounded-xs border py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Reinitialiser les filtres
                  </button>
                )}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}

        {/* Column visibility */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="inline-flex items-center gap-1.5 rounded-xs border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Colonnes
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="end"
              sideOffset={4}
              className="z-50 min-w-[180px] rounded-xs border bg-card p-2 shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
            >
              <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Colonnes visibles
              </p>
              {columns.map((col) => (
                <label
                  key={col.id}
                  className="flex items-center gap-2 rounded-xs px-1 py-1 text-xs hover:bg-muted"
                >
                  <Checkbox
                    checked={!hiddenColumns.has(col.id)}
                    onCheckedChange={(checked) => {
                      setHiddenColumns((prev) => {
                        const next = new Set(prev);
                        checked ? next.delete(col.id) : next.add(col.id);
                        return next;
                      });
                    }}
                  />
                  {col.header}
                </label>
              ))}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Selection info */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2 rounded-xs bg-accent/10 px-2.5 py-1.5 text-xs font-medium text-accent">
            {selectedIds.size} selectionne(s)
            <button
              onClick={() => {
                setSelectedIds(new Set());
                onSelectionChange?.([]);
              }}
              className="ml-1 rounded-xs p-0.5 hover:bg-accent/20"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* --- Table ---------------------------------------------------- */}
      <div className="overflow-hidden rounded-xs border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-10 px-3 py-2.5">
                  <Checkbox
                    checked={allPageSelected}
                    indeterminate={!allPageSelected && somePageSelected}
                    onCheckedChange={toggleAllPage}
                  />
                </th>
                {visibleColumns.map((col) => (
                  <th
                    key={col.id}
                    className={cn(
                      'px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.align !== 'right' && col.align !== 'center' && 'text-left',
                      col.className,
                    )}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((row) => {
                const rowId = getRowId(row);
                const isSelected = selectedIds.has(rowId);
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      'border-b last:border-b-0 transition-colors hover:bg-muted/30',
                      isSelected && 'bg-accent/5',
                    )}
                  >
                    <td className="w-10 px-3 py-2.5">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(v) => toggleRow(rowId, v)}
                      />
                    </td>
                    {visibleColumns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          'px-3 py-2.5',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          col.className,
                        )}
                      >
                        {col.accessorFn(row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={visibleColumns.length + 1} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Pagination ------------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Lignes par page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              setPageSize(Number(v));
              setPageIndex(0);
            }}
          >
            <SelectTrigger className="h-7 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="ml-2">
            {filtered.length === 0
              ? '0 resultat'
              : `${safePageIndex * pageSize + 1}-${Math.min((safePageIndex + 1) * pageSize, filtered.length)} sur ${filtered.length}`}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPageIndex(0)}
            disabled={safePageIndex === 0}
            className="inline-flex h-7 w-7 items-center justify-center rounded-xs border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={safePageIndex === 0}
            className="inline-flex h-7 w-7 items-center justify-center rounded-xs border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <span className="mx-2 text-xs font-medium text-foreground">
            {safePageIndex + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            disabled={safePageIndex >= totalPages - 1}
            className="inline-flex h-7 w-7 items-center justify-center rounded-xs border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setPageIndex(totalPages - 1)}
            disabled={safePageIndex >= totalPages - 1}
            className="inline-flex h-7 w-7 items-center justify-center rounded-xs border bg-card text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
