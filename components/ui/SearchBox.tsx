'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';

const SUGGESTIONS = [
  'Write blog posts',
  'Generate images',
  'Build websites',
  'Edit videos',
  'Analyze data',
  'Write code',
];

export const SearchBox: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/tools');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/tools?q=${encodeURIComponent(suggestion)}`);
  };

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <div style={{ width: '100%', maxWidth: '720px', margin: '0 auto' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '8px 12px 8px 18px',
          boxShadow: 'var(--shadow-md)',
          gap: '12px',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
      >
        <Search size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want AI to help you with?"
          aria-label="What do you want AI to help you with?"
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '1rem',
          }}
        />

        {query && (
          <button
            type="button"
            onClick={clearQuery}
            aria-label="Clear search input"
            style={{
              padding: '4px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}

        <button
          type="submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--accent-primary)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            transition: 'background-color var(--transition-fast)',
          }}
        >
          <span>Search</span>
          <ArrowRight size={14} />
        </button>
      </form>

      {/* Suggested prompts */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '14px',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}
        >
          <Sparkles size={12} />
          Suggestions:
        </span>
        {SUGGESTIONS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleSuggestionClick(item)}
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              transition: 'all var(--transition-fast)',
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
