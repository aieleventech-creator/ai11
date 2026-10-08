'use client';

import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';
import { ToolSubmission, SubmissionStatus } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface SubmissionsModerationClientProps {
  initialSubmissions: ToolSubmission[];
}

export const SubmissionsModerationClient: React.FC<SubmissionsModerationClientProps> = ({
  initialSubmissions,
}) => {
  const [submissions, setSubmissions] = useState<ToolSubmission[]>(initialSubmissions);
  const [filter, setFilter] = useState<'ALL' | SubmissionStatus>('PENDING');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const displayed = submissions.filter((s) => {
    if (filter === 'ALL') return true;
    return s.status === filter;
  });

  const handleApprove = async (sub: ToolSubmission) => {
    if (!confirm(`Approve "${sub.name}" and publish to the public directory?`)) {
      return;
    }

    setProcessingId(sub.id);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: sub.id,
          action: 'approve',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === sub.id ? { ...s, status: 'APPROVED' } : s))
        );
        setMessage(`Approved "${sub.name}". It is now published in the public directory!`);
      } else {
        alert(data.error || 'Failed to approve submission');
      }
    } catch {
      alert('Network error occurred during approval');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (sub: ToolSubmission) => {
    const reason = prompt(
      `Provide rejection reason for "${sub.name}":`,
      'Does not meet AI11 catalog listing criteria or invalid official domain.'
    );

    if (reason === null) return; // Cancelled

    setProcessingId(sub.id);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: sub.id,
          action: 'reject',
          rejectionReason: reason,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions((prev) =>
          prev.map((s) =>
            s.id === sub.id ? { ...s, status: 'REJECTED', rejectionReason: reason } : s
          )
        );
        setMessage(`Marked "${sub.name}" as REJECTED.`);
      } else {
        alert(data.error || 'Failed to reject submission');
      }
    } catch {
      alert('Network error occurred during rejection');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div>
      {/* Header & Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Submissions Moderation Queue
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Review, verify, and approve community tool submissions
          </p>
        </div>

        {/* Status Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '2px',
          }}
        >
          {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((tab) => {
            const count = submissions.filter((s) => (tab === 'ALL' ? true : s.status === tab)).length;
            const isSelected = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                  color: isSelected ? 'var(--accent-text)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Success Notification Banner */}
      {message && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            color: 'var(--color-success)',
            fontSize: '0.875rem',
            marginBottom: '24px',
          }}
        >
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* Submissions List */}
      {displayed.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 24px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <Clock size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            No {filter.toLowerCase()} submissions found
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            When users submit new AI tools, they will appear here for verification.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {displayed.map((sub) => {
            const isProcessing = processingId === sub.id;

            return (
              <div
                key={sub.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Header row: Name, Category, Status, Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {sub.name}
                      </h2>
                      <Badge variant="accent" size="sm">
                        {sub.categorySlug}
                      </Badge>
                      <Badge
                        variant={
                          sub.status === 'APPROVED'
                            ? 'success'
                            : sub.status === 'REJECTED'
                            ? 'default'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {sub.status}
                      </Badge>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        ID: {sub.id}
                      </span>
                    </div>

                    <a
                      href={sub.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.8125rem',
                        color: 'var(--accent-text)',
                        textDecoration: 'none',
                        marginTop: '6px',
                      }}
                    >
                      <span>{sub.websiteUrl}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Actions for PENDING submissions */}
                  {sub.status === 'PENDING' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<Check size={14} />}
                        iconPosition="left"
                        disabled={isProcessing}
                        onClick={() => handleApprove(sub)}
                      >
                        {isProcessing ? 'Publishing...' : 'Approve & Publish'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<X size={14} />}
                        iconPosition="left"
                        disabled={isProcessing}
                        onClick={() => handleReject(sub)}
                        style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>

                {/* Tagline & Description */}
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {sub.tagline}
                  </div>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      marginTop: '6px',
                      lineHeight: 1.5,
                    }}
                  >
                    {sub.description}
                  </p>
                </div>

                {/* Metadata Pills: Pricing, Platforms, Features */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div>
                    <strong>Pricing:</strong> {sub.pricing} {sub.startingPrice ? `(${sub.startingPrice})` : ''}
                  </div>
                  <span>•</span>
                  <div>
                    <strong>Platforms:</strong> {sub.platforms.join(', ')}
                  </div>
                  {sub.submitterNotes && (
                    <>
                      <span>•</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={13} />
                        <span><strong>Notes:</strong> {sub.submitterNotes}</span>
                      </div>
                    </>
                  )}
                  {sub.rejectionReason && (
                    <>
                      <span>•</span>
                      <div style={{ color: '#ef4444' }}>
                        <strong>Rejection Reason:</strong> {sub.rejectionReason}
                      </div>
                    </>
                  )}
                </div>

                {/* Submitter & Date */}
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    Submitted: {new Date(sub.createdAt).toLocaleDateString()} at{' '}
                    {new Date(sub.createdAt).toLocaleTimeString()}
                  </span>
                  {sub.reviewedBy && (
                    <span>
                      Reviewed by: <strong>{sub.reviewedBy}</strong>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
