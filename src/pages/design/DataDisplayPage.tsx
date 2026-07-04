import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InboxIcon,
  StarIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { SEOHead } from "@sudobility/seo_lib";
import { Button, Section } from "@sudobility/components";
import { cn } from "@sudobility/components";
import { textVariants, ui, variants } from "@sudobility/design";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const DataDisplayPage: React.FC<AppProps> = ({
  emailDomain,
  appName: _appName,
}) => {
  const [sortColumn, setSortColumn] = useState("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const quickStartExamples = [
    {
      title: "Data Table",
      description: "Sortable table with hover states and selection",
      code: `// Data Table
<div className={variants.dataDisplay.table.container()}>
  <div className={variants.dataDisplay.table.wrapper()}>
    <table className={variants.dataDisplay.table.table()}>
      <thead className={variants.dataDisplay.table.thead()}>
        <tr>
          <th className={variants.dataDisplay.table.thSortable()}>
            Name <ChevronUpIcon className="h-3 w-3 inline" />
          </th>
          <th className={variants.dataDisplay.table.th()}>Email</th>
          <th className={variants.dataDisplay.table.th()}>Status</th>
        </tr>
      </thead>
      <tbody className={variants.dataDisplay.table.tbody()}>
        <tr className={variants.dataDisplay.table.tr()}>
          <td className={variants.dataDisplay.table.td()}>John Doe</td>
          <td className={variants.dataDisplay.table.td()}>john@example.com</td>
          <td className={variants.dataDisplay.table.td()}>Active</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    },
    {
      title: "Email List",
      description: "Interactive list with read/unread states",
      code: `// Email List
<div className={variants.dataDisplay.list.container()}>
  <ul className={variants.dataDisplay.list.ul()}>
    <li className={variants.dataDisplay.list.emailItem()}>
      <div className="flex-1">
        <div className="font-medium">Subject Line</div>
        <div className="text-sm text-muted-foreground">sender@example.com</div>
      </div>
      <div className="text-sm text-muted-foreground">2h ago</div>
    </li>
    <li className={variants.dataDisplay.list.emailItemRead()}>
      <div className="flex-1">
        <div className="font-medium">Read Email</div>
        <div className="text-sm text-muted-foreground">sender@example.com</div>
      </div>
    </li>
  </ul>
</div>`,
    },
    {
      title: "Key-Value Display",
      description: "Display structured data in key-value pairs",
      code: `// Key-Value Pairs
<div className={variants.dataDisplay.keyValue.container()}>
  <dl className={variants.dataDisplay.keyValue.list()}>
    <div className={variants.dataDisplay.keyValue.row()}>
      <dt className={variants.dataDisplay.keyValue.key()}>
        Wallet Address
      </dt>
      <dd className={variants.dataDisplay.keyValue.value()}>
        <code className={variants.dataDisplay.code.address()}>
          0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
        </code>
      </dd>
    </div>
    <div className={variants.dataDisplay.keyValue.row()}>
      <dt className={variants.dataDisplay.keyValue.key()}>Balance</dt>
      <dd className={variants.dataDisplay.keyValue.value()}>1.5 ETH</dd>
    </div>
  </dl>
</div>`,
    },
    {
      title: "Stats Grid",
      description: "Display metrics and statistics with trend indicators",
      code: `// Stats Grid
<div className={variants.dataDisplay.stats.container()}>
  <div className={variants.dataDisplay.stats.grid()}>
    <div className={variants.dataDisplay.stats.item()}>
      <p className={variants.dataDisplay.stats.label()}>Total Emails</p>
      <p className={variants.dataDisplay.stats.value()}>1,234</p>
      <p className={cn(
        variants.dataDisplay.stats.change(),
        variants.dataDisplay.stats.changePositive()
      )}>
        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
        12.5% from last month
      </p>
    </div>
  </div>
</div>`,
    },
  ];

  // Sample data for demos
  const tableData = [
    {
      id: 1,
      name: "Alice.eth",
      email: "alice@example.com",
      balance: "2.5 ETH",
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Bob.sol",
      email: "bob@example.com",
      balance: "1.2 SOL",
      status: "Active",
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      balance: "0.8 ETH",
      status: "Pending",
      date: "2024-01-13",
    },
    {
      id: 4,
      name: "David.eth",
      email: "david@example.com",
      balance: "5.0 ETH",
      status: "Active",
      date: "2024-01-12",
    },
    {
      id: 5,
      name: "Eve",
      email: "eve@example.com",
      balance: "3.3 ETH",
      status: "Inactive",
      date: "2024-01-11",
    },
  ];

  const emailData = [
    {
      id: 1,
      subject: "Transaction Confirmed",
      sender: "noreply@etherscan.io",
      preview: "Your transaction has been confirmed on the blockchain...",
      time: "2h ago",
      read: false,
      starred: true,
    },
    {
      id: 2,
      subject: "New NFT Drop Alert",
      sender: "updates@opensea.io",
      preview: "Exciting new collection launching tomorrow...",
      time: "5h ago",
      read: false,
      starred: false,
    },
    {
      id: 3,
      subject: "Wallet Security Update",
      sender: "security@metamask.io",
      preview: "Important security improvements to your wallet...",
      time: "1d ago",
      read: true,
      starred: false,
    },
    {
      id: 4,
      subject: "DeFi Yield Report",
      sender: "report@aave.com",
      preview: "Your monthly yield farming summary...",
      time: "2d ago",
      read: true,
      starred: true,
    },
    {
      id: 5,
      subject: "DAO Proposal #42",
      sender: "governance@dao.eth",
      preview: "Vote on the latest community proposal...",
      time: "3d ago",
      read: true,
      starred: false,
    },
  ];

  const timelineData = [
    {
      id: 1,
      title: "Account Created",
      description: "Welcome to example.com",
      time: "2024-01-01 10:00 AM",
      status: "complete",
    },
    {
      id: 2,
      title: "Wallet Connected",
      description: "MetaMask wallet linked successfully",
      time: "2024-01-01 10:15 AM",
      status: "complete",
    },
    {
      id: 3,
      title: "First Email Sent",
      description: "Sent welcome email to team",
      time: "2024-01-01 11:00 AM",
      status: "complete",
    },
    {
      id: 4,
      title: "ENS Name Registered",
      description: "alice.eth registered",
      time: "2024-01-02 2:00 PM",
      status: "active",
    },
    {
      id: 5,
      title: "Premium Upgrade",
      description: "Upgrade to premium plan pending",
      time: "Pending",
      status: "pending",
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

  return (
    <>
      <SEOHead
        title={`Data Display - Design System - Internal - ${emailDomain}`}
        description="Data display components including tables, lists, grids, and code displays"
        noIndex={true}
      />

      <div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center bg-accent/10 px-4 py-2 rounded-full mb-6">
              <TableCellsIcon className="h-5 w-5 text-accent mr-2" />
              <span className="text-accent font-semibold">
                Data Display Components
              </span>
            </div>

            <h1 className={`${textVariants.heading.display.xl()} mb-6`}>
              Data Display System
            </h1>

            <p
              className={`${textVariants.body.lg()} max-w-3xl text-muted-foreground`}
            >
              Comprehensive data display components for tables, lists, grids,
              and code. Optimized for Web3 data including addresses,
              transactions, and blockchain information.
            </p>
          </div>

          {/* Quick Start Examples */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Quick Start</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {quickStartExamples.map((example, index) => (
                <div
                  key={index}
                  className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
                >
                  <div className="p-6 border-b border-border">
                    <h3 className={`${textVariants.heading.h4()} mb-2`}>
                      {example.title}
                    </h3>
                    <p
                      className={`${textVariants.body.sm()} text-muted-foreground`}
                    >
                      {example.description}
                    </p>
                  </div>
                  <div className="relative">
                    <pre className="p-4 text-sm overflow-x-auto bg-muted">
                      <code className="text-foreground">{example.code}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(example.code)}
                      className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground bg-card rounded-md shadow-sm border border-border hover:bg-muted transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Interactive Table Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Data Tables</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  Interactive Contact Table
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  Sortable table with selection and hover states
                </p>
              </div>

              <div className={variants.dataDisplay.table.wrapper()}>
                <table className={variants.dataDisplay.table.table()}>
                  <thead className={variants.dataDisplay.table.thead()}>
                    <tr>
                      <th className={variants.dataDisplay.table.th()}>
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th
                        className={variants.dataDisplay.table.thSortable()}
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          {sortColumn === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-3 w-3 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-3 w-3 ml-1" />
                            ))}
                        </div>
                      </th>
                      <th className={variants.dataDisplay.table.th()}>Email</th>
                      <th className={variants.dataDisplay.table.th()}>
                        Balance
                      </th>
                      <th className={variants.dataDisplay.table.th()}>
                        Status
                      </th>
                      <th
                        className={variants.dataDisplay.table.thSortable()}
                        onClick={() => handleSort("date")}
                      >
                        <div className="flex items-center">
                          Date
                          {sortColumn === "date" &&
                            (sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-3 w-3 ml-1" />
                            ) : (
                              <ChevronDownIcon className="h-3 w-3 ml-1" />
                            ))}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className={variants.dataDisplay.table.tbody()}>
                    {tableData.map((row) => (
                      <tr
                        key={row.id}
                        className={
                          selectedRow === row.id
                            ? variants.dataDisplay.table.trSelected()
                            : variants.dataDisplay.table.tr()
                        }
                        onClick={() => setSelectedRow(row.id)}
                      >
                        <td className={variants.dataDisplay.table.td()}>
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={selectedRow === row.id}
                            onChange={() => {}}
                          />
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <span className="text-primary text-sm font-medium">
                                {row.name[0].toUpperCase()}
                              </span>
                            </div>
                            <div className="font-medium">{row.name}</div>
                          </div>
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          <code className={variants.dataDisplay.code.inline()}>
                            {row.email}
                          </code>
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          {row.balance}
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          <span
                            className={cn(
                              "px-2 py-1 text-xs rounded-full",
                              row.status === "Active" &&
                                "bg-success/10 text-success",
                              row.status === "Pending" &&
                                "bg-warning/10 text-warning",
                              row.status === "Inactive" &&
                                "bg-muted text-muted-foreground",
                            )}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className={variants.dataDisplay.table.td()}>
                          {row.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* Email List Demo */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Lists</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg overflow-hidden`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  Email List
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  Interactive email list with read/unread states and actions
                </p>
              </div>

              <div className={variants.dataDisplay.list.container()}>
                <ul className={variants.dataDisplay.list.ul()}>
                  {emailData.map((email) => (
                    <li
                      key={email.id}
                      className={
                        selectedEmail === email.id
                          ? variants.dataDisplay.list.emailItemSelected()
                          : email.read
                            ? variants.dataDisplay.list.emailItemRead()
                            : variants.dataDisplay.list.emailItem()
                      }
                      onClick={() => setSelectedEmail(email.id)}
                    >
                      <button
                        className="mr-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle star
                        }}
                      >
                        {email.starred ? (
                          <StarSolid className="h-5 w-5 text-warning" />
                        ) : (
                          <StarIcon className="h-5 w-5 text-muted-foreground hover:text-warning" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn(
                              "text-sm font-medium truncate",
                              !email.read && "font-semibold",
                            )}
                          >
                            {email.subject}
                          </p>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            {email.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {email.sender}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {email.preview}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Grid Layouts */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Grid Layouts
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  Stats Grid
                </h3>
                <div className={variants.dataDisplay.stats.container()}>
                  <div className={variants.dataDisplay.stats.grid()}>
                    <div className={variants.dataDisplay.stats.item()}>
                      <p className={variants.dataDisplay.stats.label()}>
                        Total Emails
                      </p>
                      <p className={variants.dataDisplay.stats.value()}>
                        1,234
                      </p>
                      <p
                        className={cn(
                          variants.dataDisplay.stats.change(),
                          variants.dataDisplay.stats.changePositive(),
                        )}
                      >
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1 inline" />
                        12.5% from last month
                      </p>
                    </div>
                    <div className={variants.dataDisplay.stats.item()}>
                      <p className={variants.dataDisplay.stats.label()}>
                        Active Contacts
                      </p>
                      <p className={variants.dataDisplay.stats.value()}>89</p>
                      <p
                        className={cn(
                          variants.dataDisplay.stats.change(),
                          variants.dataDisplay.stats.changePositive(),
                        )}
                      >
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-1 inline" />5
                        new this week
                      </p>
                    </div>
                    <div className={variants.dataDisplay.stats.item()}>
                      <p className={variants.dataDisplay.stats.label()}>
                        Storage Used
                      </p>
                      <p className={variants.dataDisplay.stats.value()}>
                        2.4GB
                      </p>
                      <p
                        className={cn(
                          variants.dataDisplay.stats.change(),
                          variants.dataDisplay.stats.changeNegative(),
                        )}
                      >
                        <ArrowTrendingDownIcon className="h-4 w-4 mr-1 inline" />
                        15% remaining
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  Card Grid
                </h3>
                <div className={variants.dataDisplay.grid.threeColumn()}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <InboxIcon className="h-8 w-8 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          #{i}
                        </span>
                      </div>
                      <h4 className={textVariants.heading.h4()}>
                        Card Title {i}
                      </h4>
                      <p
                        className={`${textVariants.body.sm()} text-muted-foreground mt-2`}
                      >
                        Card content with relevant information and actions.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Key-Value Display */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Key-Value Display
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  User Profile
                </h3>
                <div className={variants.dataDisplay.keyValue.container()}>
                  <dl className={variants.dataDisplay.keyValue.list()}>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Full Name
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        Alice Johnson
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        ENS Name
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        alice.eth
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Wallet Address
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <code className={variants.dataDisplay.code.address()}>
                          0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
                        </code>
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Email
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        alice@{emailDomain}
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Account Status
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <span className="px-2 py-1 text-xs rounded-full bg-success/10 text-success">
                          Verified
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  Transaction Details
                </h3>
                <div className={variants.dataDisplay.keyValue.container()}>
                  <dl className={variants.dataDisplay.keyValue.list()}>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Transaction Hash
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <code className={variants.dataDisplay.code.hash()}>
                          0x123abc...def789
                        </code>
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Block Number
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        18,234,567
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Gas Used
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        21,000
                      </dd>
                    </div>
                    <div className={variants.dataDisplay.keyValue.row()}>
                      <dt className={variants.dataDisplay.keyValue.key()}>
                        Status
                      </dt>
                      <dd className={variants.dataDisplay.keyValue.value()}>
                        <span className="flex items-center text-success">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Success
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </Section>

          {/* Code Display */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Code Display
            </h2>

            <div className="space-y-8">
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  Inline Code
                </h3>
                <p className={textVariants.body.md()}>
                  Use{" "}
                  <code className={variants.dataDisplay.code.inline()}>
                    variants.dataDisplay.code.inline()
                  </code>{" "}
                  for inline code. Web3 addresses like{" "}
                  <code className={variants.dataDisplay.code.address()}>
                    0x742d...4e88
                  </code>{" "}
                  and transaction hashes like{" "}
                  <code className={variants.dataDisplay.code.hash()}>
                    0xabc123...def456
                  </code>{" "}
                  have special styling.
                </p>
              </div>

              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-6`}
              >
                <h3 className={`${textVariants.heading.h3()} mb-4`}>
                  Code Block
                </h3>
                <pre className={variants.dataDisplay.code.block()}>
                  <code>{`// Smart Contract Example
pragma solidity ^0.8.0;

contract EmailRegistry {
    mapping(address => string) public emails;
    
    function setEmail(string memory _email) public {
        emails[msg.sender] = _email;
    }
    
    function getEmail(address _user) public view returns (string memory) {
        return emails[_user];
    }
}`}</code>
                </pre>
              </div>
            </div>
          </Section>

          {/* Timeline */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>Timeline</h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
            >
              <h3 className={`${textVariants.heading.h3()} mb-6`}>
                Activity Timeline
              </h3>

              <div className={variants.dataDisplay.timeline.container()}>
                <ul className={variants.dataDisplay.timeline.list()}>
                  {timelineData.map((item, index) => (
                    <li
                      key={item.id}
                      className={
                        index === timelineData.length - 1
                          ? variants.dataDisplay.timeline.itemLast()
                          : variants.dataDisplay.timeline.item()
                      }
                    >
                      {index !== timelineData.length - 1 && (
                        <span
                          className={variants.dataDisplay.timeline.connector()}
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex items-start">
                        <div
                          className={cn(
                            variants.dataDisplay.timeline.dot(),
                            item.status === "complete" && "bg-success",
                            item.status === "active" && "bg-primary",
                            item.status === "pending" && "bg-muted-foreground",
                          )}
                        >
                          {item.status === "complete" && (
                            <CheckCircleIcon className="h-5 w-5 text-success-foreground" />
                          )}
                          {item.status === "active" && (
                            <ClockIcon className="h-5 w-5 text-primary-foreground" />
                          )}
                          {item.status === "pending" && (
                            <ExclamationTriangleIcon className="h-5 w-5 text-foreground" />
                          )}
                        </div>
                        <div
                          className={variants.dataDisplay.timeline.content()}
                        >
                          <p className={variants.dataDisplay.timeline.time()}>
                            {item.time}
                          </p>
                          <p className={variants.dataDisplay.timeline.title()}>
                            {item.title}
                          </p>
                          <p
                            className={variants.dataDisplay.timeline.description()}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Empty States */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Empty States
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
              >
                <div className={variants.dataDisplay.empty.container()}>
                  <InboxIcon className={variants.dataDisplay.empty.icon()} />
                  <h3 className={variants.dataDisplay.empty.title()}>
                    No emails
                  </h3>
                  <p className={variants.dataDisplay.empty.description()}>
                    Get started by composing your first email
                  </p>
                  <div className={variants.dataDisplay.empty.action()}>
                    <Button>Compose Email</Button>
                  </div>
                </div>
              </div>

              <div
                className={`${ui.background.surface} ${ui.border.default} border rounded-lg p-8`}
              >
                <div className={variants.dataDisplay.empty.container()}>
                  <TableCellsIcon
                    className={variants.dataDisplay.empty.icon()}
                  />
                  <h3 className={variants.dataDisplay.empty.title()}>
                    No data available
                  </h3>
                  <p className={variants.dataDisplay.empty.description()}>
                    There are no records to display at this time
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* Web3 Data Patterns */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Web3 Data Patterns
            </h2>

            <div
              className={`${ui.background.surface} ${ui.border.default} border rounded-lg`}
            >
              <div className="p-6 border-b border-border">
                <h3 className={`${textVariants.heading.h3()} mb-2`}>
                  Blockchain Data Display
                </h3>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground`}
                >
                  Specialized patterns for displaying Web3 data
                </p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>
                    Address Display
                  </h4>
                  <div className="space-y-2">
                    <div className={variants.dataDisplay.keyValue.inline()}>
                      <span
                        className={variants.dataDisplay.keyValue.inlineKey()}
                      >
                        Full:
                      </span>
                      <code className={variants.dataDisplay.code.address()}>
                        0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
                      </code>
                      <button className="ml-2">
                        <ClipboardDocumentIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                    <div className={variants.dataDisplay.keyValue.inline()}>
                      <span
                        className={variants.dataDisplay.keyValue.inlineKey()}
                      >
                        Truncated:
                      </span>
                      <code className={variants.dataDisplay.code.address()}>
                        0x742d...bEb7
                      </code>
                    </div>
                    <div className={variants.dataDisplay.keyValue.inline()}>
                      <span
                        className={variants.dataDisplay.keyValue.inlineKey()}
                      >
                        ENS:
                      </span>
                      <span
                        className={variants.dataDisplay.keyValue.inlineValue()}
                      >
                        alice.eth
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${textVariants.heading.h4()} mb-3`}>
                    Token Balances
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        2.5
                      </div>
                      <div className="text-sm text-muted-foreground">ETH</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        1,234
                      </div>
                      <div className="text-sm text-muted-foreground">USDC</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        5.2
                      </div>
                      <div className="text-sm text-muted-foreground">SOL</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        420
                      </div>
                      <div className="text-sm text-muted-foreground">MATIC</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Implementation Notes */}
          <Section>
            <h2 className={`${textVariants.heading.h2()} mb-8`}>
              Implementation Notes
            </h2>

            <div className={`${ui.background.subtle} rounded-xl p-8`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    Performance Tips
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Use virtual scrolling for large data sets</li>
                    <li>• Implement pagination for tables over 100 rows</li>
                    <li>• Lazy load images and avatars in lists</li>
                    <li>• Memoize expensive calculations</li>
                    <li>• Use skeleton loaders during data fetching</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`${textVariants.heading.h3()} mb-4`}>
                    Accessibility
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Use semantic HTML (table, thead, tbody)</li>
                    <li>• Add aria-labels for sortable columns</li>
                    <li>• Ensure keyboard navigation for tables</li>
                    <li>• Provide text alternatives for visual indicators</li>
                    <li>• Use appropriate ARIA roles for lists</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};

export default DataDisplayPage;
