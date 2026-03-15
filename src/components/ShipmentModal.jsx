import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ShipmentModal = ({ isOpen, onClose, onSubmit, shipment }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      companyName: '',
      originPort: '',
      destinationPort: '',
      status: 'Pending',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (shipment) {
      reset({
        companyName: shipment.companyName || '',
        originPort: shipment.originPort || '',
        destinationPort: shipment.destinationPort || '',
        status: shipment.status || 'Pending',
      });
    } else {
      reset({
        companyName: '',
        originPort: '',
        destinationPort: '',
        status: 'Pending',
      });
    }
  }, [shipment, reset]);

  const onValidSubmit = (data) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-cyan-500/5 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-white">
            {shipment ? 'Edit Shipment' : 'Create Shipment'}
          </h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
            aria-label="Close"
            type="button"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onValidSubmit)} className="p-6 space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Global Cargo Ltd"
              className={`w-full px-4 py-2.5 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
                ${errors.companyName ? 'border-red-500/60 focus:ring-red-500/40' : 'border-slate-600/50 focus:ring-cyan-500/50 focus:border-cyan-500/50'}
              `}
              {...register('companyName', {
                required: 'Company name is required',
                minLength: { value: 2, message: 'Company name must be at least 2 characters' },
              })}
            />
            {errors.companyName && (
              <p className="mt-1 text-xs text-red-400">{errors.companyName.message}</p>
            )}
          </div>

          {/* Origin + Destination */}
          <div className="grid grid-cols-2 gap-4">
            {/* Origin Port */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Origin Port
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai Port"
                className={`w-full px-4 py-2.5 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
                  ${errors.originPort ? 'border-red-500/60 focus:ring-red-500/40' : 'border-slate-600/50 focus:ring-cyan-500/50 focus:border-cyan-500/50'}
                `}
                {...register('originPort', {
                  required: 'Origin port is required',
                  minLength: { value: 2, message: 'Origin port must be at least 2 characters' },
                })}
              />
              {errors.originPort && (
                <p className="mt-1 text-xs text-red-400">{errors.originPort.message}</p>
              )}
            </div>

            {/* Destination Port */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Destination Port
              </label>
              <input
                type="text"
                placeholder="e.g. Jebel Ali Port"
                className={`w-full px-4 py-2.5 bg-slate-800 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all
                  ${errors.destinationPort ? 'border-red-500/60 focus:ring-red-500/40' : 'border-slate-600/50 focus:ring-cyan-500/50 focus:border-cyan-500/50'}
                `}
                {...register('destinationPort', {
                  required: 'Destination port is required',
                  minLength: { value: 2, message: 'Destination port must be at least 2 characters' },
                })}
              />
              {errors.destinationPort && (
                <p className="mt-1 text-xs text-red-400">{errors.destinationPort.message}</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Status
            </label>
            <select
              className={`w-full px-4 py-2.5 bg-slate-800 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer
                ${errors.status ? 'border-red-500/60 focus:ring-red-500/40' : 'border-slate-600/50 focus:ring-cyan-500/50 focus:border-cyan-500/50'}
              `}
              {...register('status', {
                required: 'Status is required',
              })}
            >
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-xs text-red-400">{errors.status.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-600/50 rounded-xl hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {shipment ? 'Update Shipment' : 'Create Shipment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentModal;