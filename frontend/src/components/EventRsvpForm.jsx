import { useState } from 'react';

function EventRsvpButton({ eventId, eventTitle, isRsvped: initialRsvped = false }) {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [isRsvped, setIsRsvped] = useState(initialRsvped);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/rsvp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit RSVP');
            }

            setIsRsvped(true);
            setShowPopup(false);
            setEmail('');
        } catch (err) {
            setError(err.message || 'Failed to submit RSVP. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setShowPopup(false);
        setEmail('');
        setError('');
    };

    return (
        <>
            <button
                onClick={() => setShowPopup(true)}
                disabled={isRsvped}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isRsvped
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-zonta-burgundy text-white hover:bg-opacity-90 shadow-md hover:shadow-lg'
                }`}
            >
                {isRsvped ? '✓ RSVP\'d' : 'RSVP'}
            </button>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-zonta-burgundy mb-2">
                                RSVP to Event
                            </h3>
                            <p className="text-gray-600 text-sm">
                                {eventTitle}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zonta-burgundy focus:border-transparent transition-colors"
                                    placeholder="your@email.com"
                                    disabled={isSubmitting}
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    We'll send you a confirmation and reminder before the event
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all ${
                                        isSubmitting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-zonta-burgundy hover:bg-opacity-90 shadow-md'
                                    }`}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Confirm RSVP'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EventRsvpButton;
