import React from 'react';
import { Clipboard2Check } from 'react-bootstrap-icons';

function EmptyState() {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <Clipboard2Check size={64} />
            </div>

            <div className="user-guide">
                <h3 className="user-guide-header mb-3">Welcome to Your Workout Planner</h3>
                <h5 className="user-guide-subheader">Getting Started:</h5>

                <ol className="user-guide-list">
                    <li><strong>Select your target muscle</strong> from the dropdown on the left.</li>
                    <li><strong>Choose an exercise</strong> from the available options for that muscle.</li>
                    <li><strong>Set your volume</strong> by entering the number of sets and repetitions.</li>
                    <li><strong>Add to your plan</strong> by clicking the "Add to Plan" button.</li>
                    <li><strong>View and edit</strong> your exercises in this area.</li>
                    <li><strong>Download your plan</strong> as a PDF to use during your workout.</li>
                </ol>

                <div className="user-guide-footer">
                    <strong>Tips for an effective workout plan:</strong>
                    <p className="small mb-0 mt-2">
                        Balance your muscle groups, include both compound and isolation exercises,
                        and adjust volume based on your experience level. Rest at least 48 hours
                        before training the same muscle group again.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EmptyState;