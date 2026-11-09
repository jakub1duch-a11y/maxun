import React from 'react';

/**
 * Wordmark for the internal joint workspace.
 * Not a replacement for the official brand logo assets on either website.
 */
export const BrandLockup: React.FC<{ compact?: boolean; dark?: boolean }> = ({
  compact = false,
  dark = false,
}) => {
  const ink = dark ? '#f5fbfc' : '#172f42';
  const muted = dark ? '#94b9bd' : '#657c87';

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
        MLŽIDLA<span style={{ color: '#15849a' }}>.CZ</span>
      </strong>
      <span aria-hidden="true" style={{ color: muted, fontWeight: 400, fontSize: compact ? 14 : 18 }}>×</span>
      <strong style={{ color: ink, fontSize: compact ? 16 : 23, fontWeight: 700 }}>HolmTec</strong>
    </div>
  );
};
