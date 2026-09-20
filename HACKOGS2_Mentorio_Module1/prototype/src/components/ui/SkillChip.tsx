
import './SkillChip.css';

interface SkillChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'matched' | 'interest' | 'neutral' | 'default';
}

export const SkillChip = ({ label, selected = false, variant = 'default', onClick }: SkillChipProps) => {
  return (
    <button
      className={`skill-chip ${selected ? 'selected' : ''} ${variant !== 'default' ? `variant-${variant}` : ''}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
