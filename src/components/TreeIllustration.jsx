
function TreeIllustration({ colors = ['#1f7a45', '#2a9158', '#36a96a'], snow = false, className, style }) {
  const [bottom, middle, top] = colors;

  return (
    <svg
      className={className}
      style={style}
      viewBox="28 6 144 186"
      aria-hidden="true"
      focusable="false"
    >
      { }
      <rect x="91" y="166" width="18" height="20" rx="2" fill="#7a4a2a" />

      { }
      <polygon points="100,98 38,168 162,168" fill={bottom} />
      <polygon points="100,62 52,126 148,126" fill={middle} />
      <polygon points="100,30 64,86 136,86" fill={top} />

      { }
      {snow && (
        <g fill="#ffffff" opacity="0.85">
          <polygon points="38,168 162,168 151.4,156 48.6,156" />
          <polygon points="52,126 148,126 139,114 61,114" />
          <polygon points="64,86 136,86 129.6,76 70.4,76" />
        </g>
      )}

      { }
      <polygon
        points="100,12 104,24 117,24 107,32 111,44 100,37 89,44 93,32 83,24 96,24"
        fill="#f2b705"
      />

      { }
      <circle cx="84" cy="150" r="6" fill="#c0392b" />
      <circle cx="118" cy="156" r="6" fill="#f2b705" />
      <circle cx="132" cy="144" r="5" fill="#ffffff" />
      <circle cx="64" cy="156" r="5" fill="#ffffff" />
      <circle cx="102" cy="112" r="5" fill="#c0392b" />
      <circle cx="80" cy="114" r="5" fill="#f2b705" />
      <circle cx="108" cy="76" r="4.5" fill="#f2b705" />
      <circle cx="92" cy="64" r="4.5" fill="#c0392b" />
    </svg>
  );
}

export default TreeIllustration;
