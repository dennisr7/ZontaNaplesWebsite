import { useSearchParams } from 'react-router-dom';
import ScholarshipForm from '../components/ScholarshipForm';

function ScholarshipApply() {
    const [searchParams] = useSearchParams();
    const scholarshipId = searchParams.get('id');

    return (
        <main className="relative min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-16 overflow-hidden">
            {/* Global gradient background to match other pages */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/80 via-yellow-700/70 to-red-900/90" />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <section className="text-center mb-10">
                    {/* Zonta Logo */}
                    <img
                        src="/src/assets/zonta-full-logo.png"
                        alt="Zonta Club Full Logo"
                        className="mx-auto mb-6 w-40 sm:w-48 opacity-90"
                    />

                    <h1 className="text-4xl font-bold text-white font-[Montserrat] mb-3">
                        Apply for Scholarship
                    </h1>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto">
                        Complete the form below to submit your scholarship application.
                    </p>
                </section>

                {/* Form */}
                <ScholarshipForm scholarshipId={scholarshipId} />
            </div>
        </main>
    );
}

export default ScholarshipApply;
