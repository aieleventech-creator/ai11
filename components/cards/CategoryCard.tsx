import React from 'react';
import Link from 'next/link';
import { 
  PenTool, 
  Code2, 
  Image as ImageIcon, 
  Video, 
  Mic, 
  CheckSquare, 
  Search, 
  TrendingUp, 
  Layout, 
  GraduationCap, 
  Briefcase, 
  Zap, 
  ArrowRight,
  Folder
} from 'lucide-react';
import { Category } from '@/lib/types';

const ICON_MAP: Record<string, React.ReactNode> = {
  PenTool: <PenTool size={20} />,
  Code2: <Code2 size={20} />,
  Image: <ImageIcon size={20} />,
  Video: <Video size={20} />,
  Mic: <Mic size={20} />,
  CheckSquare: <CheckSquare size={20} />,
  Search: <Search size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Layout: <Layout size={20} />,
  GraduationCap: <GraduationCap size={20} />,
  Briefcase: <Briefcase size={20} />,
  Zap: <Zap size={20} />,
};

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const icon = ICON_MAP[category.icon] || <Folder size={20} />;

  return (
    <Link
      href={`/categories/${category.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-sm)',
        textDecoration: 'none',
      }}
      className="ai11-card"
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>

          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            {category.toolCount} tools
          </span>
        </div>

        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            marginBottom: '6px',
          }}
        >
          {category.name}
        </h3>

        <p
          style={{
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
          }}
        >
          {category.description}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--accent-text)',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <span>Explore tools</span>
        <ArrowRight size={12} />
      </div>
    </Link>
  );
};
