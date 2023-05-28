import React, {useState, useEffect} from 'react';
import Navigation from '../components/Navigation';
import { CSVLink } from "react-csv";
import ReactPaginate from 'react-paginate';
import Select from 'react-select'

const UserApp_Invoices = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All invoices');
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const invoicesPerPage = 10;
  const invoicesData =  [
        {
            "invoice": "001",
            "customer": "John Doe - Acme Inc. lorem ipsumlorem ipsum lorem ipsumlorem ipsum ",
            "status": "Paid",
            "amount": 5220,
            "due_date": "2023-05-01",
            "id": "invoice-1"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-2"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-3"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-4"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-5"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-6"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-7"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-8"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-9"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-10"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-11"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-12"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-13"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-14"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-15"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-16"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-17"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-18"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-19"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-20"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-21"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-22"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-23"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-24"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-25"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-26"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-27"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-28"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-29"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-30"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-31"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-32"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-33"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-34"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-35"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-36"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-37"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-38"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-39"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-40"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-41"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-42"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-43"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-44"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-45"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-46"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-47"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-48"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-49"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-50"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-51"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-52"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-53"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-54"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-55"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-56"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-57"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-58"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-59"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-60"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-61"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-62"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-63"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-64"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-65"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-66"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-67"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-68"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-69"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-70"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-71"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-72"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-73"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-74"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-75"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-76"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-77"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-78"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-79"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-80"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-81"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-82"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-83"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-84"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-85"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-86"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-87"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-88"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-89"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-90"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-91"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-92"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-93"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-94"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-95"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-96"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-97"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-98"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-99"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-100"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-101"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-102"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-103"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-104"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-105"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-106"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-107"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-108"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-109"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-110"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-111"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-112"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-113"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-114"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-115"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-116"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-117"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-118"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-119"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-120"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-121"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-122"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-123"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-124"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-125"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-126"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-127"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-128"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-129"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-130"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-131"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-132"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-133"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-134"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-135"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-136"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-137"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-138"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-139"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-140"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-141"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-142"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-143"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-144"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-145"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-146"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-147"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-148"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-149"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-150"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-151"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-152"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-153"
        },
        {
            "invoice": "002",
            "customer": "Jane Smith - XYZ Corp.",
            "status": "Paid",
            "amount": 7769,
            "due_date": "2023-05-03",
            "id": "invoice-154"
        },
        {
            "invoice": "003",
            "customer": "Bob Johnson - ABC Company",
            "status": "Unpaid",
            "amount": 3445,
            "due_date": "2023-05-10",
            "id": "invoice-155"
        },
        {
            "invoice": "004",
            "customer": "Sarah Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 8932,
            "due_date": "2023-05-02",
            "id": "invoice-156"
        },
        {
            "invoice": "005",
            "customer": "Mark Brown - LMN Inc.",
            "status": "Awaiting",
            "amount": 4725,
            "due_date": "2023-05-05",
            "id": "invoice-157"
        },
        {
            "invoice": "006",
            "customer": "Emily Chen - DEF Industries",
            "status": "Paid",
            "amount": 6527,
            "due_date": "2023-05-08",
            "id": "invoice-158"
        },
        {
            "invoice": "007",
            "customer": "David Kim - GHI Enterprises",
            "status": "Paid",
            "amount": 2456,
            "due_date": "2023-05-06",
            "id": "invoice-159"
        },
        {
            "invoice": "008",
            "customer": "Lisa Johnson - JK Corp.",
            "status": "Unpaid",
            "amount": 6211,
            "due_date": "2023-05-04",
            "id": "invoice-160"
        },
        {
            "invoice": "009",
            "customer": "Mike Davis - OPQ Inc.",
            "status": "Cancel",
            "amount": 891,
            "due_date": "2023-05-15",
            "id": "invoice-161"
        },
        {
            "invoice": "010",
            "customer": "Amy Wilson - RST Company",
            "status": "Awaiting",
            "amount": 5386,
            "due_date": "2023-05-07",
            "id": "invoice-162"
        },
        {
            "invoice": "011",
            "customer": "Chris Lee - UVW Enterprises",
            "status": "Paid",
            "amount": 956,
            "due_date": "2023-05-11",
            "id": "invoice-163"
        },
        {
            "invoice": "012",
            "customer": "Mary Brown - XYZ Corp.",
            "status": "Paid",
            "amount": 1938,
            "due_date": "2023-05-02",
            "id": "invoice-164"
        },
        {
            "invoice": "013",
            "customer": "Tom Jackson - ABC Company",
            "status": "Unpaid",
            "amount": 8427,
            "due_date": "2023-05-12",
            "id": "invoice-165"
        },
        {
            "invoice": "014",
            "customer": "Samantha Lee - PQR Enterprises",
            "status": "Cancel",
            "amount": 7123,
            "due_date": "2023-05-01",
            "id": "invoice-166"
        },
        {
            "invoice": "015",
            "customer": "Alex Kim - LMN Inc.",
            "status": "Awaiting",
            "amount": 4684,
            "due_date": "2023-05-10",
            "id": "invoice-167"
        },
        {
            "invoice": "016",
            "customer": "Julia Chen - DEF Industries",
            "status": "Paid",
            "amount": 2845,
            "due_date": "2023-05-08",
            "id": "invoice-168"
        },
        {
            "invoice": "017",
            "customer": "Michael Davis - GHI Enterprises",
            "status": "Paid",
            "amount": 7376,
            "due_date": "2023-05-13",
            "id": "invoice-169"
        },
        {
            "invoice": "018",
            "customer": "Emma Wilson - JK Corp.",
            "status": "Unpaid",
            "amount": 1845,
            "due_date": "2023-05-15",
            "id": "invoice-170"
        },
        {
            "invoice": "019",
            "customer": "Peter Smith - OPQ Inc.",
            "status": "Cancel",
            "amount": 1089,
            "due_date": "2023-05-17",
            "id": "invoice-171"
        },
        {
            "invoice": "020",
            "customer": "Olivia Brown - RST Company",
            "status": "Awaiting",
            "amount": 5632,
            "due_date": "2023-05-12",
            "id": "invoice-172"
        }
    ]

    const quotationData = [
        {
            number: "Q0001",
            client:  {
                company: "ABC Company",
                contacts: [
                  {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                  {
                    contact_first_name: "Jane",
                    contact_last_name: "Smith",
                    contact_job_position: "Sales Rep",
                    contact_email: "janesmith@abccompany.com",
                    contact_tel: "0987654321",
                  },
                ],
                favorite_contact: {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                company_id_number: "123456789",
                hq_address: "123 Main St",
                hq_zipcode: "12345",
                hq_city: "Anytown",
                hq_country: "USA",
                VTA: "1234567890",
                status: "client",
                date_changing_status: "2023-04-20T15:00:00.000Z",
              },
            items: [
              {
                wording: "Produit A",
                price_unit: 50,
                nb_unit: 10,
                pretax_value: 500,
                tax_include_value: 600,
              },
              {
                wording: "Produit B",
                price_unit: 25,
                nb_unit: 20,
                pretax_value: 500,
                tax_include_value: 600,
              },
            ],
            date_creation: "2023-04-15T09:30:00.000Z",
            date_issue: "2023-04-19T14:45:00.000Z",
            date_limit_valid: "2023-05-01T00:00:00.000Z",
            status: "Accepté",
          },
          {
            number: "Q0002",
            client:  {
                company: "XYZ Inc.",
                contacts: [
                  {
                    contact_first_name: "Bob",
                    contact_last_name: "Johnson",
                    contact_job_position: "CEO",
                    contact_email: "bob@xyzinc.com",
                    contact_tel: "5555555555",
                  },
                  {
                    contact_first_name: "Sarah",
                    contact_last_name: "Lee",
                    contact_job_position: "Marketing Director",
                    contact_email: "sarah@xyzinc.com",
                    contact_tel: "4444444444",
                  },
                ],
                favorite_contact:{
                    contact_first_name: "Bob",
                    contact_last_name: "Johnson",
                    contact_job_position: "CEO",
                    contact_email: "bob@xyzinc.com",
                    contact_tel: "5555555555",
                  },
                company_id_number: "987654321",
                hq_address: "456 Elm St",
                hq_zipcode: "54321",
                hq_city: "Another City",
                hq_country: "USA",
                VTA: "0987654321",
                status: "client",
                date_changing_status: "2023-04-19T12:30:00.000Z",
              },
            items: [
              {
                wording: "Produit C",
                price_unit: 100,
                nb_unit: 5,
                pretax_value: 500,
                tax_include_value: 600,
              },
            ],
            date_creation: "2023-04-18T11:15:00.000Z",
            date_issue: "2023-04-20T16:20:00.000Z",
            date_limit_valid: "2023-05-05T00:00:00.000Z",
            status: "Accepté",
          },
          {
            number: "Q0003",
            client: {
                company: "ABC Company",
                contacts: [
                  {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                  {
                    contact_first_name: "Jane",
                    contact_last_name: "Smith",
                    contact_job_position: "Sales Rep",
                    contact_email: "janesmith@abccompany.com",
                    contact_tel: "0987654321",
                  },
                ],
                favorite_contact: {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                company_id_number: "123456789",
                hq_address: "123 Main St",
                hq_zipcode: "12345",
                hq_city: "Anytown",
                hq_country: "USA",
                VTA: "1234567890",
                status: "client",
                date_changing_status: "2023-04-20T15:00:00.000Z",
              },
            items: [
              {
                wording: "Produit D",
                price_unit: 75,
                nb_unit: 8,
                pretax_value: 600,
                tax_include_value: 720,
              },
              {
                wording: "Produit E",
                price_unit: 20,
                nb_unit: 15,
                pretax_value: 300,
                tax_include_value: 360,
              },
            ],
            date_creation: "2023-04-20T14:00:00.000Z",
            date_issue: "2023-04-21T10:30:00.000Z",
            date_limit_valid: "2023-05-10T00:00:00.000Z",
            status: "Accepté",
          },
    ]

    const projectData = [
        {
            name: "Gestionnaire de stock",
            description: "Un système de gestion de stock pour les entreprises.",
            status: "en cours",
            date_start: "2021-09-01T00:00:00.000Z",
            time_estimated_number: 120,
            time_estimated_format: "jour",
            time_real_number: 80,
            time_real_format: "jour",
            price_pre_tax: "5000",
            currency: "USD",
            client:  {
                company: "ABC Company",
                contacts: [
                  {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                  {
                    contact_first_name: "Jane",
                    contact_last_name: "Smith",
                    contact_job_position: "Sales Rep",
                    contact_email: "janesmith@abccompany.com",
                    contact_tel: "0987654321",
                  },
                ],
                favorite_contact: {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                company_id_number: "123456789",
                hq_address: "123 Main St",
                hq_zipcode: "12345",
                hq_city: "Anytown",
                hq_country: "USA",
                VTA: "1234567890",
                status: "client",
                date_changing_status: "2023-04-20T15:00:00.000Z",
              },
            tasks: [
              "6124248c8f821d28d1ce74ac",
              "6124248c8f821d28d1ce74ad"
            ]
          },
          {
            name: "Application de suivi des calories",
            description: "Une application pour suivre les calories consommées et brûlées.",
            status: "terminé",
            date_start: "2022-02-15T00:00:00.000Z",
            time_estimated_number: 40,
            time_estimated_format: "heure",
            time_real_number: 60,
            time_real_format: "heure",
            price_pre_tax: "2000",
            currency: "USD",
            client:  {
                company: "ABC Company",
                contacts: [
                  {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                  {
                    contact_first_name: "Jane",
                    contact_last_name: "Smith",
                    contact_job_position: "Sales Rep",
                    contact_email: "janesmith@abccompany.com",
                    contact_tel: "0987654321",
                  },
                ],
                favorite_contact: {
                    contact_first_name: "John",
                    contact_last_name: "Doe",
                    contact_job_position: "Manager",
                    contact_email: "johndoe@abccompany.com",
                    contact_tel: "1234567890",
                  },
                company_id_number: "123456789",
                hq_address: "123 Main St",
                hq_zipcode: "12345",
                hq_city: "Anytown",
                hq_country: "USA",
                VTA: "1234567890",
                status: "client",
                date_changing_status: "2023-04-20T15:00:00.000Z",
              },
            tasks: [
              "6124248c8f821d28d1ce74af",
              "6124248c8f821d28d1ce74b0"
            ]
          },
          {
            name: "Site de réservation d'hôtel",
            description: "Un site pour réserver des chambres d'hôtel en ligne.",
            status: "en attente",
            date_start: "2022-05-01T00:00:00.000Z",
            time_estimated_number: 60,
            time_estimated_format: "jour",
            time_real_number: 0,
            time_real_format: "jour",
            price_pre_tax: "8000",
            currency: "USD",
            client: {
                company: "XYZ Inc.",
                contacts: [
                  {
                    contact_first_name: "Bob",
                    contact_last_name: "Johnson",
                    contact_job_position: "CEO",
                    contact_email: "bob@xyzinc.com",
                    contact_tel: "5555555555",
                  },
                  {
                    contact_first_name: "Sarah",
                    contact_last_name: "Lee",
                    contact_job_position: "Marketing Director",
                    contact_email: "sarah@xyzinc.com",
                    contact_tel: "4444444444",
                  },
                ],
                favorite_contact:{
                    contact_first_name: "Bob",
                    contact_last_name: "Johnson",
                    contact_job_position: "CEO",
                    contact_email: "bob@xyzinc.com",
                    contact_tel: "5555555555",
                  },
                company_id_number: "987654321",
                hq_address: "456 Elm St",
                hq_zipcode: "54321",
                hq_city: "Another City",
                hq_country: "USA",
                VTA: "0987654321",
                status: "client",
                date_changing_status: "2023-04-19T12:30:00.000Z",
              },
            tasks: [
              "6124248c8f821d28d1ce74b2",
              "6124248c8f821d28d1ce74b3"
            ]
          },
          {
            name: "Application de gestion de projet",
            description: "Une application pour gérer les projets et les tâches.",
            status: "en cours",
            date_start: "2023-01-01T00:00:00.000Z",
            time_estimated_number: 240,
            time_estimated_format: "heure",
            time_real_number: 80,
            time_real_format: "heure",
            price_pre_tax: "6000",
            currency: "USD",
            client: {
                company: "XYZ Inc.",
                contacts: [
                  {
                    contact_first_name: "Bob",
                    contact_last_name: "Johnson",
                    contact_job_position: "CEO",
                    contact_email: "bob@xyzinc.com",
                    contact_tel: "5555555555",
                  },
                  {
                    contact_first_name: "Sarah",
                    contact_last_name: "Lee",
                    contact_job_position: "Marketing Director",
                    contact_email: "sarah@xyzinc.com",
                    contact_tel: "4444444444",
                  },
                ],
                favorite_contact:{
                    contact_first_name: "Bob",
                    contact_last_name: "Johnson",
                    contact_job_position: "CEO",
                    contact_email: "bob@xyzinc.com",
                    contact_tel: "5555555555",
                  },
                company_id_number: "987654321",
                hq_address: "456 Elm St",
                hq_zipcode: "54321",
                hq_city: "Another City",
                hq_country: "USA",
                VTA: "0987654321",
                status: "client",
                date_changing_status: "2023-04-19T12:30:00.000Z",
              },
            tasks: [
              "6124248c8f821d28d1ce74b5",
              "6124248c8f821d28d1ce74b6"
            ]
          },
    ]

    const clientData = [
        {
            company: "ABC Company",
            contacts: [
              {
                contact_first_name: "John",
                contact_last_name: "Doe",
                contact_job_position: "Manager",
                contact_email: "johndoe@abccompany.com",
                contact_tel: "1234567890",
              },
              {
                contact_first_name: "Jane",
                contact_last_name: "Smith",
                contact_job_position: "Sales Rep",
                contact_email: "janesmith@abccompany.com",
                contact_tel: "0987654321",
              },
            ],
            favorite_contact: {
                contact_first_name: "John",
                contact_last_name: "Doe",
                contact_job_position: "Manager",
                contact_email: "johndoe@abccompany.com",
                contact_tel: "1234567890",
              },
            company_id_number: "123456789",
            hq_address: "123 Main St",
            hq_zipcode: "12345",
            hq_city: "Anytown",
            hq_country: "USA",
            VTA: "1234567890",
            status: "client",
            date_changing_status: "2023-04-20T15:00:00.000Z",
          },
{
            company: "XYZ Inc.",
            contacts: [
              {
                contact_first_name: "Bob",
                contact_last_name: "Johnson",
                contact_job_position: "CEO",
                contact_email: "bob@xyzinc.com",
                contact_tel: "5555555555",
              },
              {
                contact_first_name: "Sarah",
                contact_last_name: "Lee",
                contact_job_position: "Marketing Director",
                contact_email: "sarah@xyzinc.com",
                contact_tel: "4444444444",
              },
            ],
            favorite_contact:{
                contact_first_name: "Bob",
                contact_last_name: "Johnson",
                contact_job_position: "CEO",
                contact_email: "bob@xyzinc.com",
                contact_tel: "5555555555",
              },
            company_id_number: "987654321",
            hq_address: "456 Elm St",
            hq_zipcode: "54321",
            hq_city: "Another City",
            hq_country: "USA",
            VTA: "0987654321",
            status: "client",
            date_changing_status: "2023-04-19T12:30:00.000Z",
          },
    ]

    function formatOptionLabel(option) {
        return (
          <div>
            {option.number} - {option.client.company}
          </div>
        );
      }
      
  
    const filteredInvoices = invoicesData.filter(invoice => {
        const searchLower = searchTerm.toLowerCase();
        const includesInvoice = invoice.invoice.toLowerCase().includes(searchLower);
        const includesCustomer = invoice.customer.toLowerCase().includes(searchLower);
      
        if (activeFilter === 'All invoices') {
          return includesInvoice || includesCustomer;
        } else {
          return (invoice.status === activeFilter) && (includesInvoice || includesCustomer);
        }
      }).slice(currentPage * invoicesPerPage, (currentPage + 1) * invoicesPerPage);
      

   useEffect(() => {
    const filteredInvoices = invoicesData.filter(invoice => {
        const searchLower = searchTerm.toLowerCase();
        const includesInvoice = invoice.invoice.toLowerCase().includes(searchLower);
        const includesCustomer = invoice.customer.toLowerCase().includes(searchLower);
    
        if (activeFilter === 'All invoices') {
          return includesInvoice || includesCustomer;
        } else {
          return (invoice.status === activeFilter) && (includesInvoice || includesCustomer);
        }
      });

    const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
    setTotalPages(totalPages);
    setCurrentPage(0);
  }, [activeFilter, invoicesPerPage, searchTerm]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }
  
  const handleOptionsClick = (e) => {
    e.stopPropagation(); 
    setShowOptions(!showOptions);
  };

  const handleRowClick = () => {
    setShowOptions(false);
  };

  const handleClickEdit = (id) => {
    setSelectedInvoiceId(id);
    setShowMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const editBox = document.getElementById("edit-box");
      if (editBox && !editBox.contains(event.target)) {
        setShowMenu(false);
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const handleClickCreateInvoice = () => {
    setShowCreateInvoice(true);
  }
  const handleCloseCreateInvoice = () => {
      const createInvoiceOverlay = document.querySelector('.create-invoice-overlay');
      createInvoiceOverlay.classList.add('slide-out');
      createInvoiceOverlay.addEventListener('animationend', () => {
          createInvoiceOverlay.classList.remove('slide-out');
          setShowCreateInvoice(false);
      }, { once: true });
  }
    

  

  

    return (
        <div className="userapp">
            <Navigation />
            <div className="userapp-invoices">

                <div className="userappinvoices-action-btn">
                    <div className="userappinvoices-search">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 96 960 960" className='invoices-icons-search'><path  d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
                    <input type="text" className='invoices-search-input' placeholder='Search for invoices or customer...' onChange={handleSearch}/>
                    </div>
                    <div className="userappinvoices-btns">
                        <button className="export-invoices-csv btn btn-primary"><CSVLink data={invoicesData} style={{ textDecoration: 'none', color:"var(--main)" }}>Export CSV</CSVLink></button>
                        <button className="add-invoices-btn btn btn-primary" onClick={handleClickCreateInvoice}>Create invoice</button>
                    </div>
                </div>

                <div className="userappinvoices-main">
                    <div className="userappinvoices-filters">
                    <div className={`userappinvoices-filter ${activeFilter === 'All invoices' ? 'active-filter-invoices' : ''}`} onClick={() => handleFilterClick('All invoices')}>All invoices</div>
            <div className={`userappinvoices-filter ${activeFilter === 'Paid' ? 'active-filter-invoices' : ''}`} onClick={() => handleFilterClick('Paid')}>Paid</div>
            <div className={`userappinvoices-filter ${activeFilter === 'Unpaid' ? 'active-filter-invoices' : ''}`} onClick={() => handleFilterClick('Unpaid')}>Unpaid</div>
            <div className={`userappinvoices-filter ${activeFilter === 'Cancel' ? 'active-filter-invoices' : ''}`} onClick={() => handleFilterClick('Cancel')}>Cancel</div>
            <div className={`userappinvoices-filter ${activeFilter === 'Awaiting' ? 'active-filter-invoices' : ''}`} onClick={() => handleFilterClick('Awaiting')}>Awaiting</div>
                    </div>

                    <div className="userappinvoices-list">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th># invoice</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Due date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredInvoices.map(invoice => (
                                    <tr key={invoice.id} onClick={handleRowClick} >
                                        <td></td>
                                        <td>{invoice.invoice}</td>
                                        <td>{invoice.customer}</td>
                                        <td>{invoice.status}</td>
                                        <td>{invoice.amount}$</td>
                                        <td>{invoice.due_date}</td>
                                        <td style={{ position: 'relative' }}><svg onClick={() => handleClickEdit(invoice.id)} xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 96 960 960" width="30"><path className='icon-more-infos' d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z"/></svg> {showMenu[invoice.id] && ( <div className="options-table-row" id='edit-box'> <button>Edit</button> <button>Delete</button> </div> )}</td>
                                        </tr>
                                        ))} 
                            </tbody>
                        </table>
                        {totalPages > 1 && ( <div className="userappinvoices-pagination"> <ReactPaginate previousClassName='prev-paginate' nextLabel={'Next'} nextClassName='next-paginate' breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active-pagination'} /> </div> )}
                    </div>

                {showCreateInvoice && (
                    <div className="create-invoice-overlay">
                        <div className="create-invoice-modal">
                        <div className="create-invoice-header">
                            <h2>Create Invoice</h2>
                            <button onClick={handleCloseCreateInvoice}>X</button>
                        </div>
                            <div className="create-invoice-body">
                                <form action="">
                                    <div className="create-invoice-body-1">
                                        <div className="create-invoice-body-by-quote"><Select placeholder="Select quote (optional)" options={quotationData}   formatOptionLabel={formatOptionLabel} /></div>
                                    </div>
                                    <div className="create-invoice-body-2">
                                        <div className="create-invoice-body-currency">
                                        <Select placeholder="Select currency" options={quotationData} />
                                        </div>
                                        <div className="create-invoice-body-status"><Select placeholder="Select status" options={quotationData} /></div>
                                    </div>
                                    <div className="create-invoice-body-3">
                                        <div className="create-invoice-body-number-title">Number #</div>
                                        <div className="create-invoice-body-number-body"><input type="text" name="" id="" placeholder='INV-100000'/></div>
                                    </div>
                                    <div className="create-invoice-body-4">
                                        <div className="create-invoice-body-client-title">Client</div>
                                        <div className="create-invoice-body-client-body"><Select placeholder="Select status" options={{value: clientData.company, label: clientData.company}} /></div>
                                    </div>

                                    <div className="create-invoice-body-5">
                                        <div className="create-invoice-body-item-top">
                                            <div className="create-invoice-body-item-title">Items :</div>
                                            <div className="create-invoice-body-item-add-button"><div className='create-invoice-body-item-add-button-addnewitem'>Add new item</div></div>
                                        </div>
                                        <div className="create-invoice-body-item-body">
                                            <div className="create-invoice-body-item-body-select"><Select placeholder="Select project" options={projectData} /></div>
                                            <div className="create-invoice-body-item-body-button">
                                                <div className='create-invoice-body-item-body-button-add'>Add</div>
                                                <div className='create-invoice-body-item-body-button-delete'>Delete</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="create-invoice-body-6">
                                        <div className="create-invoice-body-pretax-value">
                                            <div className="create-invoice-body-pretax-value-title">Pretax value : </div>
                                            <div className="create-invoice-body-pretax-value-body"> <input type="text" disabled /></div>
                                        </div>
                                        <div className="create-invoice-body-value-tax-included">
                                            <div className="create-invoice-body-value-tax-included-title">Value tax included : </div>
                                            <div className="create-invoice-body-value-tax-included-body"> <input type="text" disabled /></div>
                                        </div>    
                                    </div>

                                    <div className="create-invoice-body-7">
                                        <div className="create-invoice-body-payment-date-title">Payement Date :</div>
                                        <div className="create-invoice-body-payment-date-body"><input type="date" name="" id="" /></div>
                                    </div>
                                    <div className="create-invoice-body-8">
                                        <button>SAVE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default UserApp_Invoices;