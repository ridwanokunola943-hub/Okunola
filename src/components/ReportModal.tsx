import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, X } from 'lucide-react';

interface ReportModalProps {
  targetType: string;
  targetId: string;
  targetName: string;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  targetType,
  targetId,
  targetName,
  onClose
}) => {
  const { createReport } = useApp();

  const [reason, setReason] = useState('Scam or fraud attempt');
  const [details, setDetails] = useState('');
  const [blockUser, setBlockUser] = useState(false);

  const REASONS = [
    'Scam or fraud attempt',
    'Fake business / Does not exist in Malete',
    'Inappropriate behavior / Harassment',
    'Inappropriate or offensive content',
    'Pricing extortion / Overcharging',
    'Unreliable / No-show after booking',
    'Other safety concern'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReport({
      targetType: targetType as any,
      targetId,
      targetName,
      reason,
      details: details.trim()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in zoom-in-95 duration-150">
      <div className="bg-[#141416] border border-[#29292D] rounded-xl w-full max-w-sm p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#29292D]">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="font-heading font-semibold text-sm text-[#F5F5F5]">
              Trust & Safety Report
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#A1A1AA]">
          Reporting: <strong className="text-[#F5F5F5]">{targetName}</strong> ({targetType})
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-[#A1A1AA] block mb-1">Reason for report</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-9 px-2.5 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
            >
              {REASONS.map((r) => (
                <option key={r} value={r} className="bg-[#141416]">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[#A1A1AA] block mb-1">Additional details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="What happened? Include dates or incident details..."
              rows={3}
              className="w-full p-2.5 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5]"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#29292D]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-[#A1A1AA] hover:text-[#F5F5F5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
