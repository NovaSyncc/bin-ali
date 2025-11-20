const GlassCard = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`
        premium-glass-card
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
