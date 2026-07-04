import { Section } from "@sudobility/components";

import { textVariants, ui, variants } from "@sudobility/design";
import {
  ArrowsRightLeftIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CubeIcon,
  EllipsisHorizontalIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TableCellsIcon as TableIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import LocalizedLink from "../../components/LocalizedLink";
import { SEOHead } from "@sudobility/seo_lib";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const TablesGridsPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");

  // Sample data
  const sampleData = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-01-15",
      transactions: 45,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "User",
      status: "Active",
      joinDate: "2023-02-20",
      transactions: 23,
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "Moderator",
      status: "Inactive",
      joinDate: "2023-03-10",
      transactions: 67,
    },
    {
      id: 4,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "User",
      status: "Pending",
      joinDate: "2023-04-05",
      transactions: 12,
    },
    {
      id: 5,
      name: "Eve Wilson",
      email: "eve@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-05-12",
      transactions: 89,
    },
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAllRows = () => {
    setSelectedRows(
      selectedRows.length === sampleData.length
        ? []
        : sampleData.map((item) => item.id),
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return variants.badge.success();
      case "Inactive":
        return variants.badge.error();
      case "Pending":
        return variants.badge.warning();
      default:
        return (variants.badge as any).default();
    }
  };

  return (
    <>
      <SEOHead
        title={`Tables & Data Grids - Design System - Internal - ${emailDomain}`}
        description="Comprehensive table system with sorting, filtering, pagination, and data grid functionality"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
              <TableIcon className="h-5 w-5 text-accent mr-2" />
              <span className="text-accent font-semibold">
                Tables & Data Grids
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Tables & Data Grids
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl mx-auto text-muted-foreground mb-8`}
            >
              Comprehensive table system with sorting, filtering, pagination,
              and data grid functionality. Perfect for displaying structured
              data with advanced interaction patterns.
            </p>
          </div>

          {/* Basic Table */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Basic Table</h2>

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.header.cell()}>Name</th>
                    <th className={variants.table.header.cell()}>Email</th>
                    <th className={variants.table.header.cell()}>Role</th>
                    <th className={variants.table.header.cell()}>Status</th>
                    <th className={variants.table.header.cell()}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleData.slice(0, 3).map((item) => (
                    <tr key={item.id} className={variants.table.body.row()}>
                      <td className={variants.table.body.cell()}>
                        {item.name}
                      </td>
                      <td className={variants.table.body.cellMuted()}>
                        {item.email}
                      </td>
                      <td className={variants.table.body.cell()}>
                        {item.role}
                      </td>
                      <td className={variants.table.body.cell()}>
                        <span className={getStatusBadge(item.status)}>
                          {item.status}
                        </span>
                      </td>
                      <td className={variants.table.body.cellAction()}>
                        <button
                          className={(variants.button as any).ghost.small()}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Code Example */}
            <div className="mt-8">
              <h3 className={`${textVariants.heading.h4()} mb-4`}>Usage</h3>
              <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                <pre className="text-foreground text-sm">
                  <code>{`// Basic Table Structure
<div className={variants.table.container()}>
  <table className={variants.table.table()}>
    <thead className={variants.table.header.row()}>
      <tr>
        <th className={variants.table.header.cell()}>Name</th>
        <th className={variants.table.header.cell()}>Email</th>
        <th className={variants.table.header.cell()}>Status</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border">
      <tr className={variants.table.body.row()}>
        <td className={variants.table.body.cell()}>John Doe</td>
        <td className={variants.table.body.cellMuted()}>john@example.com</td>
        <td className={variants.table.body.cell()}>
          <span className={variants.badge.success()}>Active</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>`}</code>
                </pre>
              </div>
            </div>
          </Section>

          {/* Sortable Table */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Sortable Table
            </h2>

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th
                      className={variants.table.header.sortable()}
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Name
                        {sortColumn === "name" ? (
                          sortDirection === "asc" ? (
                            <ChevronUpIcon
                              className={variants.table.sort.ascending()}
                            />
                          ) : (
                            <ChevronDownIcon
                              className={variants.table.sort.descending()}
                            />
                          )
                        ) : (
                          <ArrowsRightLeftIcon
                            className={variants.table.sort.indicator()}
                          />
                        )}
                      </div>
                    </th>
                    <th
                      className={variants.table.header.sortable()}
                      onClick={() => handleSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {sortColumn === "email" ? (
                          sortDirection === "asc" ? (
                            <ChevronUpIcon
                              className={variants.table.sort.ascending()}
                            />
                          ) : (
                            <ChevronDownIcon
                              className={variants.table.sort.descending()}
                            />
                          )
                        ) : (
                          <ArrowsRightLeftIcon
                            className={variants.table.sort.indicator()}
                          />
                        )}
                      </div>
                    </th>
                    <th
                      className={variants.table.header.sortable()}
                      onClick={() => handleSort("transactions")}
                    >
                      <div className="flex items-center">
                        Transactions
                        {sortColumn === "transactions" ? (
                          sortDirection === "asc" ? (
                            <ChevronUpIcon
                              className={variants.table.sort.ascending()}
                            />
                          ) : (
                            <ChevronDownIcon
                              className={variants.table.sort.descending()}
                            />
                          )
                        ) : (
                          <ArrowsRightLeftIcon
                            className={variants.table.sort.indicator()}
                          />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleData.slice(0, 3).map((item) => (
                    <tr key={item.id} className={variants.table.body.row()}>
                      <td className={variants.table.body.cell()}>
                        {item.name}
                      </td>
                      <td className={variants.table.body.cellMuted()}>
                        {item.email}
                      </td>
                      <td className={variants.table.body.cell()}>
                        {item.transactions}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className={`${textVariants.heading.h4()} mb-4`}>
                Sortable Headers
              </h3>
              <div className="bg-muted rounded-lg p-6 overflow-x-auto">
                <pre className="text-foreground text-sm">
                  <code>{`// Sortable Table Header
<th 
  className={variants.table.header.sortable()}
  onClick={() => handleSort('name')}
>
  <div className="flex items-center">
    Name
    {sortColumn === 'name' ? (
      sortDirection === 'asc' ? (
        <ChevronUpIcon className={variants.table.sort.ascending()} />
      ) : (
        <ChevronDownIcon className={variants.table.sort.descending()} />
      )
    ) : (
      <ArrowsRightLeftIcon className={variants.table.sort.indicator()} />
    )}
  </div>
</th>`}</code>
                </pre>
              </div>
            </div>
          </Section>

          {/* Selectable Table */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Selectable Table with Bulk Actions
            </h2>

            {selectedRows.length > 0 && (
              <div className="mb-4 bg-info/10 border border-info rounded-lg p-4 flex items-center justify-between">
                <span className="text-info">
                  {selectedRows.length} row(s) selected
                </span>
                <div className="flex gap-2">
                  <button
                    className={(variants.button as any).secondary.small()}
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                    Export
                  </button>
                  <button
                    className={(variants.button as any).destructive.small()}
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            )}

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.header.cell()}>
                      <input
                        type="checkbox"
                        className="rounded border-input text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                        checked={selectedRows.length === sampleData.length}
                        onChange={toggleAllRows}
                      />
                    </th>
                    <th className={variants.table.header.cell()}>Name</th>
                    <th className={variants.table.header.cell()}>Role</th>
                    <th className={variants.table.header.cell()}>Status</th>
                    <th className={variants.table.header.cell()}>Join Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleData.map((item) => (
                    <tr
                      key={item.id}
                      className={
                        selectedRows.includes(item.id)
                          ? variants.table.body.rowSelected()
                          : variants.table.body.row()
                      }
                    >
                      <td className={variants.table.body.cell()}>
                        <input
                          type="checkbox"
                          className="rounded border-input text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                        />
                      </td>
                      <td className={variants.table.body.cell()}>
                        {item.name}
                      </td>
                      <td className={variants.table.body.cell()}>
                        {item.role}
                      </td>
                      <td className={variants.table.body.cell()}>
                        <span className={getStatusBadge(item.status)}>
                          {item.status}
                        </span>
                      </td>
                      <td className={variants.table.body.cellMuted()}>
                        {item.joinDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Compact Table */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Compact Table
            </h2>

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.compact.header.cell()}>
                      Name
                    </th>
                    <th className={variants.table.compact.header.cell()}>
                      Email
                    </th>
                    <th className={variants.table.compact.header.cell()}>
                      Role
                    </th>
                    <th className={variants.table.compact.header.cell()}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleData.slice(0, 4).map((item) => (
                    <tr key={item.id} className={variants.table.body.row()}>
                      <td className={variants.table.compact.body.cell()}>
                        {item.name}
                      </td>
                      <td className={variants.table.compact.body.cellMuted()}>
                        {item.email}
                      </td>
                      <td className={variants.table.compact.body.cell()}>
                        {item.role}
                      </td>
                      <td className={variants.table.compact.body.cell()}>
                        <span
                          className={variants.badge.small(
                            item.status === "Active"
                              ? "success"
                              : item.status === "Inactive"
                                ? "error"
                                : "warning",
                          )}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Filterable Table */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Filterable Table
            </h2>

            <div className={variants.table.container()}>
              <div className={variants.table.grid.filterContainer()}>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className={`${variants.table.grid.filterInput()} pl-10`}
                    />
                  </div>
                  <button
                    className={(variants.button as any).secondary.default()}
                  >
                    <FunnelIcon className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                </div>
              </div>

              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.header.cell()}>Name</th>
                    <th className={variants.table.header.cell()}>Email</th>
                    <th className={variants.table.header.cell()}>Role</th>
                    <th className={variants.table.header.cell()}>Status</th>
                    <th className={variants.table.header.cell()}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleData
                    .filter(
                      (item) =>
                        filterValue === "" ||
                        item.name
                          .toLowerCase()
                          .includes(filterValue.toLowerCase()) ||
                        item.email
                          .toLowerCase()
                          .includes(filterValue.toLowerCase()),
                    )
                    .map((item) => (
                      <tr key={item.id} className={variants.table.body.row()}>
                        <td className={variants.table.body.cell()}>
                          {item.name}
                        </td>
                        <td className={variants.table.body.cellMuted()}>
                          {item.email}
                        </td>
                        <td className={variants.table.body.cell()}>
                          {item.role}
                        </td>
                        <td className={variants.table.body.cell()}>
                          <span className={getStatusBadge(item.status)}>
                            {item.status}
                          </span>
                        </td>
                        <td className={variants.table.body.cellAction()}>
                          <button
                            className={(variants.button as any).ghost.icon()}
                          >
                            <EllipsisHorizontalIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Pagination */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Table with Pagination
            </h2>

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.header.cell()}>Name</th>
                    <th className={variants.table.header.cell()}>Email</th>
                    <th className={variants.table.header.cell()}>Role</th>
                    <th className={variants.table.header.cell()}>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sampleData.slice(0, 3).map((item) => (
                    <tr key={item.id} className={variants.table.body.row()}>
                      <td className={variants.table.body.cell()}>
                        {item.name}
                      </td>
                      <td className={variants.table.body.cellMuted()}>
                        {item.email}
                      </td>
                      <td className={variants.table.body.cell()}>
                        {item.role}
                      </td>
                      <td className={variants.table.body.cell()}>
                        <span className={getStatusBadge(item.status)}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className={variants.table.pagination.container()}>
                <div className={variants.table.pagination.info()}>
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">3</span> of{" "}
                    <span className="font-medium">5</span> results
                  </p>
                </div>
                <div className={variants.table.pagination.nav()}>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">3</span> of{" "}
                      <span className="font-medium">5</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        className={variants.table.pagination.button()}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className={variants.table.pagination.buttonCurrent()}
                      >
                        1
                      </button>
                      <button className={variants.table.pagination.button()}>
                        2
                      </button>
                      <button className={variants.table.pagination.button()}>
                        3
                      </button>
                      <button className={variants.table.pagination.button()}>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Data Table */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Web3 Transaction Table
            </h2>

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.header.cell()}>
                      Transaction Hash
                    </th>
                    <th className={variants.table.header.cell()}>From</th>
                    <th className={variants.table.header.cell()}>To</th>
                    <th className={variants.table.header.cell()}>Amount</th>
                    <th className={variants.table.header.cell()}>Status</th>
                    <th className={variants.table.header.cell()}>Chain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className={variants.table.body.row()}>
                    <td className={variants.table.body.cell()}>
                      <span className="font-mono text-sm">0x1234...5678</span>
                    </td>
                    <td className={variants.table.body.cellMuted()}>
                      <span className="font-mono text-sm">0xabcd...efgh</span>
                    </td>
                    <td className={variants.table.body.cellMuted()}>
                      <span className="font-mono text-sm">0x9876...5432</span>
                    </td>
                    <td className={variants.table.body.cell()}>
                      <span className="font-semibold">1.5 ETH</span>
                    </td>
                    <td className={variants.table.body.cell()}>
                      <span className={variants.badge.success()}>
                        Confirmed
                      </span>
                    </td>
                    <td className={variants.table.body.cell()}>
                      <span className={variants.badge.ethereum()}>
                        Ethereum
                      </span>
                    </td>
                  </tr>
                  <tr className={variants.table.body.row()}>
                    <td className={variants.table.body.cell()}>
                      <span className="font-mono text-sm">0x8765...4321</span>
                    </td>
                    <td className={variants.table.body.cellMuted()}>
                      <span className="font-mono text-sm">0xfedc...ba98</span>
                    </td>
                    <td className={variants.table.body.cellMuted()}>
                      <span className="font-mono text-sm">0x1357...9246</span>
                    </td>
                    <td className={variants.table.body.cell()}>
                      <span className="font-semibold">250 SOL</span>
                    </td>
                    <td className={variants.table.body.cell()}>
                      <span className={variants.badge.warning()}>Pending</span>
                    </td>
                    <td className={variants.table.body.cell()}>
                      <span className={variants.badge.solana()}>Solana</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Empty State */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Empty State</h2>

            <div className={variants.table.container()}>
              <table className={variants.table.table()}>
                <thead className={variants.table.header.row()}>
                  <tr>
                    <th className={variants.table.header.cell()}>Name</th>
                    <th className={variants.table.header.cell()}>Email</th>
                    <th className={variants.table.header.cell()}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3} className={variants.table.states.empty()}>
                      <div className="flex flex-col items-center">
                        <CubeIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className={`${textVariants.heading.h4()} mb-2`}>
                          No data found
                        </h3>
                        <p
                          className={`${textVariants.body.sm()} text-muted-foreground mb-4`}
                        >
                          There are no records to display at this time.
                        </p>
                        <button
                          className={(variants.button as any).primary.default()}
                        >
                          Add New Record
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Design Tokens */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Available Table Variants
            </h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <h3 className={`${textVariants.heading.h3()} mb-6`}>
                Table Structure
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Container & Table */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    Container & Base
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.container()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.table()
                      </code>
                    </div>
                  </div>
                </div>

                {/* Headers */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    Headers
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.header.row()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.header.cell()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.header.sortable()
                      </code>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>Body</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.body.row()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.body.rowSelected()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.body.cell()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.body.cellMuted()
                      </code>
                    </div>
                  </div>
                </div>

                {/* States */}
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-4`}>
                    States & Pagination
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.states.loading()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.states.empty()
                      </code>
                    </div>
                    <div>
                      <code className="bg-muted px-2 py-1 rounded">
                        variants.table.pagination.container()
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <LocalizedLink
              to="/design/layout-spacing"
              className={`${(variants.button as any).secondary.default()} group`}
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Layout & Spacing
            </LocalizedLink>
            <LocalizedLink
              to="/design"
              className={(variants.button as any).outline.default()}
            >
              Back to Design System
            </LocalizedLink>
            <div className="w-32" /> {/* Spacer for next section when added */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TablesGridsPage;
