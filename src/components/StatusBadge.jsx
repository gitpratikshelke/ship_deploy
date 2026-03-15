const statusStyles = {
  Pending: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  'In Transit': 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  Delivered: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
};

const statusDot = {
  Pending: 'bg-amber-400',
  'In Transit': 'bg-blue-400',
  Delivered: 'bg-emerald-400',
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${statusStyles[status] || 'bg-gray-500/15 text-gray-400'}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status] || 'bg-gray-400'} animate-pulse`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;