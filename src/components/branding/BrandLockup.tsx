import React from 'react';

/**
 * Wordmark for the internal joint workspace.
 * Not a replacement for the official brand logo assets on either website.
 */
export const BrandLockup: React.FC<{ compact?: boolean; dark?: boolean }> = ({
  compact = false,
  dark = false,
}) => {
  const ink = dark ? '#FFFFFF' : '#183B56';
  const muted = dark ? '#A5B2BC' : '#697985';

  return (
    <div
      aria-label="Mlžidla.cz a HolmTec"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: compact ? 7 : 11,
        fontFamily: 'Montserrat, Inter, system-ui, sans-serif',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      }}
    >
      <strong style={{ color: ink, fontSize: compact ? 16 : 23, fontWeight: 800 }}>
        MLŽIDLA<span style={{ color: '#0C98A7' }}>.CZ</span>
      </strong>
      <span aria-hidden="true" style={{ color: muted, fontWeight: 400, fontSize: compact ? 14 : 18 }}>×</span>
      <strong style={{ color: ink, fontSize: compact ? 16 : 23, fontWeight: 700 }}>
        HolmTec<span aria-hidden="true" style={{ color: '#D63D48' }}>.</span>
      </strong>
    </div>
  );
};
