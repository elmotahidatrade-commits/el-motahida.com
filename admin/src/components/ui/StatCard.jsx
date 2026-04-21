import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color = 'blue', linkTo }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    navy: 'bg-navy-dark/10 text-navy-dark',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };

  const Content = (
    <div className="admin-card p-6 flex items-center justify-between group hover:border-primary/30 transition-all cursor-default">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${colors[color] || colors.blue} group-hover:scale-110 transition-transform`}>
          {Icon && <Icon size={24} />}
        </div>
        <div>
          <p className="text-xs font-bold text-textMuted uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-textMain mt-1">{value}</p>
        </div>
      </div>
      {linkTo && (
        <div className="text-textMuted group-hover:text-primary transition-colors">
          <ArrowUpRight size={20} />
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{Content}</Link>;
  }

  return Content;
};

export default StatCard;
