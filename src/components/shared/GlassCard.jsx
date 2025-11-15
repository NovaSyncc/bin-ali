const GlassCard = ({ children, className = '', hover = true, onClick }) => {
  return (
    <div
      className={`
        glass-effect
        rounded-3xl
        p-6
        ${hover ? 'glass-card-hover' : 'glass-card'}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
