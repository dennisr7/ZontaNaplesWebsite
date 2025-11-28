import EventsList from '../components/EventsList';
import { usePageTitle } from '../hooks/usePageTitle';

function EventsPage() {
    usePageTitle('Events');
    
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-16">
            <EventsList />
        </div>
    );
}

export default EventsPage;
