import { useState, useEffect } from 'react';
import { scholarshipAPI } from '../utils/apiService';

function ScholarshipForm({ scholarshipId }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        scholarshipListingId: scholarshipId || ''
    });
    
    const [scholarships, setScholarships] = useState([]);
    const [loadingScholarships, setLoadingScholarships] = useState(true);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Fetch active scholarships
    useEffect(() => {
        fetchScholarships();
    }, []);

    const fetchScholarships = async () => {
        try {
            setLoadingScholarships(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/api/scholarship-listings?status=active`);
            const data = await response.json();
            
            if (data.success) {
                setScholarships(data.data);
            }
        } catch (err) {
            console.error('Failed to load scholarships:', err);
        } finally {
            setLoadingScholarships(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        
        // Validate file count (including existing files)
        if (files.length + selectedFiles.length > 3) {
            setError('Maximum 3 files allowed');
            return;
        }

        // Validate file types
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type));
        
        if (invalidFiles.length > 0) {
            setError('Only PDF, DOC, and DOCX files are allowed');
            return;
        }

        // Validate file size (5MB each)
        const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            setError('Each file must be less than 5MB');
            return;
        }

        // Add new files to existing files
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setError(null);
        
        // Reset file input so the same file can be selected again
        e.target.value = '';
    };

    const handleRemoveFile = (indexToRemove) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Validate files
        if (files.length === 0) {
            setError('Please upload at least one document');
            setLoading(false);
            return;
        }

        try {
            // Create FormData
            const data = new FormData();
            data.append('firstName', formData.firstName);
            data.append('lastName', formData.lastName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            
            // Add scholarship listing ID if selected
            if (formData.scholarshipListingId) {
                data.append('scholarshipListingId', formData.scholarshipListingId);
            }
            
            // Append files
            files.forEach(file => {
                data.append('documents', file);
            });

            const result = await scholarshipAPI.submitApplication(data);
            console.log('Success:', result);
            setSuccess(true);
            
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                scholarshipListingId: ''
            });
            setFiles([]);
            
            // Reset file input
            const fileInput = document.getElementById('documents');
            if (fileInput) fileInput.value = '';
            
        } catch (err) {
            console.error('Error:', err);
            setError(
                err.response?.data?.error || 
                err.response?.data?.errors?.join(', ') ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 sm:p-10">
                <h2 className="text-3xl font-bold text-zonta-burgundy mb-6 text-center">Scholarship Application</h2>
                
                {/* Instructions */}
                <div className="mb-8 p-5 bg-gradient-to-br from-yellow-50 to-red-50 border-l-4 border-yellow-600 rounded-lg">
                    <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Application Instructions
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                        <li>Download the application details from the scholarship card</li>
                        <li>Complete the respective scholarship application form</li>
                        <li>Upload the completed form along with supporting documents (Max 3 files)</li>
                        <li>Accepted formats: PDF, DOC, or DOCX (Each file must be less than 5MB)</li>
                    </ol>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="font-semibold">Thank you for your scholarship application! We have received your documents and will review them shortly.</p>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Scholarship Selector */}
                    <div>
                        <label htmlFor="scholarshipListingId" className="block text-sm font-bold text-gray-700 mb-2">
                            Select Scholarship *
                        </label>
                        {loadingScholarships ? (
                            <div className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-500">
                                Loading scholarships...
                            </div>
                        ) : scholarships.length === 0 ? (
                            <div className="w-full px-4 py-3 border-2 border-yellow-300 rounded-xl bg-yellow-50 text-yellow-700 font-semibold">
                                No active scholarships available at this time.
                            </div>
                        ) : (
                            <select
                                id="scholarshipListingId"
                                name="scholarshipListingId"
                                value={formData.scholarshipListingId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all bg-white"
                            >
                                <option value="">-- Select a scholarship --</option>
                                {scholarships.map((scholarship) => (
                                    <option key={scholarship._id} value={scholarship._id}>
                                        {scholarship.title} - ${scholarship.amount.toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                                First Name *
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                minLength={2}
                                placeholder="Enter your first name"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                minLength={2}
                                placeholder="Enter your last name"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                            Phone Number (Optional)
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label htmlFor="documents" className="block text-sm font-bold text-gray-700 mb-2">
                            Upload Documents * <span className="text-xs font-normal text-gray-500">(Max 3 files, 5MB each)</span>
                        </label>
                        <input
                            type="file"
                            id="documents"
                            name="documents"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            multiple
                            disabled={files.length >= 3}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        
                        {/* File List */}
                        {files.length > 0 && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                                <p className="font-bold text-sm text-gray-700 mb-3 flex items-center justify-between">
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Selected Files
                                    </span>
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">{files.length}/3</span>
                                </p>
                                <ul className="space-y-2">
                                    {files.map((file, index) => (
                                        <li key={index} className="text-sm flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                            <div className="flex items-center flex-1 min-w-0 mr-2">
                                                <svg className="w-5 h-5 mr-2 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="truncate font-medium text-gray-700">{file.name}</span>
                                                <span className="ml-2 text-gray-500 text-xs flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(index)}
                                                className="ml-2 text-red-600 hover:text-white hover:bg-red-600 p-1.5 rounded-lg transition-all flex-shrink-0"
                                                title="Remove file"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white py-4 px-6 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting Application...
                            </span>
                        ) : (
                            'Submit Application'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ScholarshipForm;
