import React from 'react';
import { Button } from 'react-bootstrap';
import { PlusCircleFill, ArrowCounterclockwise } from 'react-bootstrap-icons';

function EmptyTable({ hasAddedBefore, onShowTemplates }) {
  // Different message if user has added workouts before versus first-time
  if (hasAddedBefore) {
    return (
      <div className="empty-table-container text-center p-5">
        <div className="empty-icon mb-3">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="#CCC"/>
          </svg>
        </div>
        <h3>Your workout plan is empty</h3>
        <p className="text-muted mb-4">Ready to build a new workout plan? Add exercises using the form.</p>
        
        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary">
            <PlusCircleFill className="me-2" />
            Add First Exercise
          </Button>
          <Button variant="outline-secondary" onClick={onShowTemplates}>
            <ArrowCounterclockwise className="me-2" />
            Browse Templates
          </Button>
        </div>
      </div>
    );
  } else {
    // First time user - show the full welcome guide
    return null; // The WelcomeContent component will be shown instead
  }
}

export default EmptyTable;