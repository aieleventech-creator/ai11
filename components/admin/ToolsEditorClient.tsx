'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Edit3, 
  Search, 
  X, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { Tool, PricingType } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ToolsEditorClientProps {
  initialTools: Tool[];
}

export const ToolsEditorClient: React.FC<ToolsEditorClientProps> = ({ initialTools }) => {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [search, setSearch] = useState('');
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form edit state
  const [editName, setEditName] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPricing, setEditPricing] = useState<PricingType>('Freemium');
  const [editStartingPrice, setEditStartingPrice] = useState('');
  const [editRank, setEditRank] = useState(999);
  const [editBadge, setEditBadge] = useState('');
  const [editPublished, setEditPublished] = useState(true);

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (tool: Tool) => {
    setEditingTool(tool);
    setEditName(tool.name);
    setEditTagline(tool.tagline);
    setEditDescription(tool.description);
    setEditPricing(tool.pricing);
    setEditStartingPrice(tool.startingPrice || '');
    setEditRank(tool.curatedRank);
    setEditBadge(tool.editorialBadge || '');
    setEditPublished(tool.isPublished);
    setMessage(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/tools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: editingTool.slug,
          updates: {
            name: editName.trim(),
            tagline: editTagline.trim(),
            description: editDescription.trim(),
            pricing: editPricing,
            startingPrice: editStartingPrice.trim() || null,
            curatedRank: Number(editRank),
            editorialBadge: editBadge.trim() || null,
            isPublished: editPublished,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTools((prev) =>
          prev.map((t) => (t.slug === editingTool.slug ? data.tool : t))
        );
        setMessage(`Updated "${editName}" successfully!`);
        setEditingTool(null);
      } else {
        alert(data.error || 'Failed to update tool');
      }
    } catch {
      alert('Network error while updating tool');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header & Search */}
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
            Catalog Tool Editor
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Manage {tools.length} catalog tools, AI11 editorial badges, curated ranks, and visibility
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            width: '280px',
          }}
        >
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.8125rem',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>

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

      {/* Tools Table */}
      <div
        style={{
          overflowX: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border-default)',
                backgroundColor: 'var(--bg-surface-elevated)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: 'var(--text-muted)',
              }}
            >
              <th style={{ padding: '14px 16px' }}>Rank</th>
              <th style={{ padding: '14px 16px' }}>Tool</th>
              <th style={{ padding: '14px 16px' }}>Category</th>
              <th style={{ padding: '14px 16px' }}>Pricing</th>
              <th style={{ padding: '14px 16px' }}>Editorial Badge</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTools.map((tool) => (
              <tr
                key={tool.id}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '0.875rem',
                }}
              >
                <td style={{ padding: '14px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  #{tool.curatedRank}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tool.name}</span>
                    <Link
                      href={`/tools/${tool.slug}`}
                      target="_blank"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {tool.slug}
                  </div>
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <Badge variant="accent" size="sm">
                    {tool.category}
                  </Badge>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                  {tool.pricing} {tool.startingPrice ? `(${tool.startingPrice})` : ''}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  {tool.editorialBadge ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--accent-subtle)',
                        color: 'var(--accent-text)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      <Award size={12} />
                      {tool.editorialBadge}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>—</span>
                  )}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  {tool.isPublished ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--color-success)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      <Eye size={13} />
                      Published
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      <EyeOff size={13} />
                      Draft
                    </span>
                  )}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit3 size={13} />}
                    iconPosition="left"
                    onClick={() => startEdit(tool)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Tool Modal */}
      {editingTool && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setEditingTool(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal Card */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 101,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Edit Tool: {editingTool.name}
              </h2>
              <button
                type="button"
                onClick={() => setEditingTool(null)}
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                  Tagline
                </label>
                <input
                  type="text"
                  value={editTagline}
                  onChange={(e) => setEditTagline(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                    Curated Rank
                  </label>
                  <input
                    type="number"
                    value={editRank}
                    onChange={(e) => setEditRank(Number(e.target.value))}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                    Editorial Badge
                  </label>
                  <input
                    type="text"
                    value={editBadge}
                    onChange={(e) => setEditBadge(e.target.value)}
                    placeholder="e.g. Editor Choice, Top Pick"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                    Pricing Model
                  </label>
                  <select
                    value={editPricing}
                    onChange={(e) => setEditPricing(e.target.value as PricingType)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Paid">Paid</option>
                    <option value="Free Trial">Free Trial</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '4px' }}>
                    Starting Price
                  </label>
                  <input
                    type="text"
                    value={editStartingPrice}
                    onChange={(e) => setEditStartingPrice(e.target.value)}
                    placeholder="e.g. $20/mo"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-default)',
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    userSelect: 'none',
                    marginTop: '4px',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={editPublished}
                    onChange={(e) => setEditPublished(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--accent-primary)' }}
                  />
                  <span>Published in Public Directory</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <Button variant="ghost" size="md" type="button" onClick={() => setEditingTool(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
