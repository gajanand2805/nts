import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalAuthContext } from '../../AuthContext';
import Loader from '../../components/Loader';
import PrimaryButton from "../UI/Button/PrimaryButton";
import BroadcastPopup from './BroadcastPopup'; // Adjust the import path as needed


const ContactList = () => {
    const { isLoading, setIsLoading, getCookie, isAccessToken, wrapper } = useGlobalAuthContext();
    const [isApiLoading, setIsApiLoading] = useState(false);
    const { t } = useTranslation();
    const [contacts, setContacts] = useState([]);
    const [isBroadcastPopupOpen, setIsBroadcastPopupOpen] = useState(false);
    const [isImportPopupOpen, setIsImportPopupOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedContacts, setSelectedContacts] = useState(new Set()); // Use a Set for unique contact numbers
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [templatePreview, setTemplatePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage, setContactsPerPage] = useState(100); // Number of contacts per page
    const [budget, setBudget] = useState(0); // Add budget state
    const [remainingQuota, setRemainingQuota] = useState(0); // Add budget state
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const dailyLimit = 1000;


    // Function to fetch contacts and budget
    const fetchContacts = async () => {
        if (!isAccessToken) return;
        const config = {
            headers: {
                accept: 'application/json',
                Authorization: getCookie('access-token'),
            },
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/Contacts`,
                '',
                config
            );

            const { wallet, RemainingQuota, contacts } = response.data;
            setContacts(contacts);
            setBudget(wallet); // Assuming 'balance' is the wallet's budget field
            setRemainingQuota(RemainingQuota); // Assuming 'balance' is the wallet's budget field
        } catch (error) {
            wrapper(error.response);
            console.error('Error fetching contacts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts(); // Fetch contacts when component mounts
    }, [isAccessToken, getCookie, wrapper]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setErrorMessage("")
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsApiLoading(true)
        setErrorMessage("")

        const formData = new FormData();
        formData.append('file', file);

        const config = {
            headers: {
                accept: 'application/json',
                Authorization: getCookie('access-token'),
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_DOMAIN}/Dashboard/Merchant/v1.0/ImportContacts`,
                formData,
                config
            );

            if (response.data.status === false) {
                setErrorMessage(response.data.message)
            } else {
                await fetchContacts();
                setIsImportPopupOpen(false);
            }
            setIsApiLoading(false)
        } catch (error) {
            setIsApiLoading(false)
            setErrorMessage("Error uploading file")
        }
    };

    const handleCheckboxChange = (contactNumber) => {
        setSelectedContacts((prevSelected) => {
            const updatedSelection = new Set(prevSelected);
            if (updatedSelection.has(contactNumber)) {
                updatedSelection.delete(contactNumber);
            } else {
                updatedSelection.add(contactNumber);
            }
            return updatedSelection;
        });
    };

    const handleSelectAllChange = () => {
        const currentNumbers = currentContacts.map(contact => contact.Contact);
        if (areAllContactsSelected) {
            setSelectedContacts((prevSelected) => {
                const updatedSelection = new Set(prevSelected);
                currentNumbers.forEach(number => updatedSelection.delete(number));
                return updatedSelection;
            });
        } else {
            setSelectedContacts((prevSelected) => {
                const updatedSelection = new Set(prevSelected);
                currentNumbers.forEach(number => updatedSelection.add(number));
                return updatedSelection;
            });
        }
    };

    const handleTemplateChange = (event) => {
        const template = event.target.value;
        setSelectedTemplate(template);

        const preview = template
            .replace(/\$FirstName/g, '{{1}}')
            .replace(/\$Name/g, '{{2}}')
            .replace(/\$MobileNumber/g, '{{3}}');
        setTemplatePreview(preview);
    };

    const handleBroadcast = async () => {
        if (selectedContacts.size === 0) {
            alert('Please select at least one contact before sending a broadcast.');
            return;
        }

        const cost = selectedContacts.size; // Cost is 1 rupee per contact
        if (cost > budget) {
            alert(`Your wallet balance is too low to send this broadcast. Please recharge or reduce the number of contacts. Note: You can send a template message to up to ${budget} contacts.`);
            return;
        }

        if (selectedContacts.size > remainingQuota) {
            alert(`You can send a message to ${dailyLimit} contacts as your daily limit. Your remaining quota limit is ${remainingQuota}`);
            return;
        }

        setIsBroadcastPopupOpen(true);
    };

    const filteredContacts = contacts.filter(contact => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (contact.Name?.toLowerCase() || '').includes(searchLower) ||
            (contact.Contact?.toLowerCase() || '').includes(searchLower) ||
            (contact.Tags?.toLowerCase() || '').includes(searchLower) ||
            (contact.Source?.toLowerCase() || '').includes(searchLower)
        );
    });

    // Pagination logic
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

    const handleNextPage = () => {
        if (indexOfLastContact < filteredContacts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleContactsPerPageChange = (e) => {
        setContactsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1);
    };

    // Check if all contacts on the current page are selected
    const areAllContactsSelected = currentContacts.every((contact) =>
        selectedContacts.has(contact.Contact)
    );

    const selectedCount = selectedContacts.size;

    return (
        <>
            {isLoading ? (
                <Loader flag={isAccessToken} />
            ) : (
                <div>
                    <div className="mt-6 mb-4 flex items-center">
                        <input
                            type="text"
                            placeholder={t('Search...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 rounded py-2 px-4 mr-4"
                        />
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={() => setIsImportPopupOpen(true)}
                        >
                            {t('Import Contacts')}
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded ml-4"
                            onClick={handleBroadcast}
                        >
                            {t('BROADCAST')}
                        </button>
                        <span className="ml-4 text-gray-700">{selectedCount} contacts selected</span>

                        {/* Dropdown for contacts per page */}
                        <div className="ml-auto">
                            <label htmlFor="contactsPerPage" className="mr-2">
                                {t('View')}:
                            </label>
                            <select
                                id="contactsPerPage"
                                value={contactsPerPage}
                                onChange={handleContactsPerPageChange}
                                className="border border-gray-300 rounded py-2 px-4"
                            >
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="5000">5000</option>
                            </select>
                        </div>
                    </div>

                    {isImportPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" style={{ zIndex: 9999 }}>
                            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                                {
                                    errorMessage && (
                                        <div className="bg-red-100 text-red-700 py-2 px-4 rounded mb-4">
                                            {errorMessage}
                                        </div>
                                    )
                                }
                                <h2 className="text-lg font-semibold mb-4">{t('Import Contacts')}</h2>
                                <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />

                                <div className="flex justify-start space-x-2">

                                    <div className="w-full max-w-[80px]">
                                        <PrimaryButton
                                            className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                                            handleClick={handleUpload}
                                            isLoading={isApiLoading}
                                            text="Upload"
                                        />
                                    </div>

                                    <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setIsImportPopupOpen(false)}>
                                        {t('Cancel')}
                                    </button>
                                </div>
                                <br />
                                <a href="/Contacts.csv">Download Sample CSV</a>
                            </div >
                        </div >
                    )}

                    {
                        isBroadcastPopupOpen && (
                            <BroadcastPopup
                                isOpen={isBroadcastPopupOpen}
                                onClose={() => setIsBroadcastPopupOpen(false)}
                                onSend={handleBroadcast}
                                templatePreview={templatePreview}
                                handleTemplateChange={handleTemplateChange}
                                selectedContacts={Array.from(selectedContacts)}
                            />
                        )
                    }

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">
                                        <input
                                            type="checkbox"
                                            checked={areAllContactsSelected}
                                            onChange={handleSelectAllChange}
                                        />
                                    </th>
                                    <th className="px-4 py-2 text-left border">{t('Name')}</th>
                                    <th className="px-4 py-2 text-left border">{t('Contact')}</th>
                                    <th className="px-4 py-2 text-left border">{t('Source')}</th>
                                    <th className="px-4 py-2 text-left border">{t('Tags')}</th>
                                    <th className="px-4 py-2 text-left border">{t('Date')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentContacts.map((contact) => (
                                    <tr key={contact.Contact}>
                                        <td className="px-4 py-2 border text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedContacts.has(contact.Contact)}
                                                onChange={() => handleCheckboxChange(contact.Contact)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-left border">{contact.Name}</td>
                                        <td className="px-4 py-2 text-left border">{contact.Contact}</td>
                                        <td className="px-4 py-2 text-left border">{contact.Source}</td>
                                        <td className="px-4 py-2 text-left border">{contact.Tags}</td>
                                        <td className="px-4 py-2 text-left border">
                                            {format(new Date(contact.CreatedDate), 'dd-MMM-yyyy')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <button
                            onClick={handlePreviousPage}
                            className={`px-4 py-2 bg-gray-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            {t('< Previous')}
                        </button>

                        <span className="text-gray-700">
                            {/* Calculate the range of items displayed */}
                            {`${indexOfFirstContact + 1}-${Math.min(indexOfLastContact, filteredContacts.length)} ${t('of')} ${filteredContacts.length}`}
                        </span>

                        <button
                            onClick={handleNextPage}
                            className={`px-4 py-2 bg-gray-500 text-white rounded ${indexOfLastContact >= filteredContacts.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={indexOfLastContact >= filteredContacts.length}
                        >
                            {t('Next >')}
                        </button>
                    </div>
                </div >
            )}
        </>
    );
};

export default ContactList;
