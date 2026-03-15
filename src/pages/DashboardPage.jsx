import { useState, useEffect, useCallback, useMemo } from 'react';
import { getShipments, deleteShipment, updateShipment } from '../services/api';
import { toast } from 'react-hot-toast';
import ShipmentTable from '../components/ShipmentTable';
import ShipmentModal from '../components/ShipmentModal';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');


  const [statusFilter, setStatusFilter] = useState('');
  const [dateSort, setDateSort] = useState('desc'); 


  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);


  const [modalOpen, setModalOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  //  Debounce search (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page,
        limit: 5,         
        sort: dateSort, 
      };

      if (debouncedSearch) params.search = debouncedSearch;
      if (statusFilter) params.status = statusFilter;

      const { data } = await getShipments(params);

      setShipments(data.shipments || []);
      setTotalPages(data.pages || 1);
      setTotal(data.total || 0);
    } catch {
      setError('Failed to load shipments');
      toast.error('Failed to load shipments');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, statusFilter, dateSort]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const handleDeleteClick = (id) => {
    const shipment = shipments.find((s) => s._id === id);
    if (!shipment) return;
    setShipmentToDelete(shipment);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteShipment(shipmentToDelete._id);
      toast.success('Shipment deleted');
      setDeleteModalOpen(false);
      fetchShipments();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (shipment) => {
    setEditingShipment(shipment);
    setModalOpen(true);
  };

  const handleUpdate = async (data) => {
    try {
      await updateShipment(editingShipment._id, data);
      toast.success('Shipment updated');
      setModalOpen(false);
      fetchShipments();
    } catch {
      toast.error('Update failed');
    }
  };

  const stats = useMemo(() => {
    return [
      { label: 'Total Shipments', value: total },
      { label: 'Pending', value: shipments.filter(s => s.status === 'Pending').length },
      { label: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length },
      { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length },
    ];
  }, [shipments, total]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Manage shipments</p>
        </div>
        <Link to="/create" className="px-5 py-2 bg-cyan-600 text-white rounded-xl">
          + New Shipment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-slate-900 p-4 rounded-xl">
            <p className="text-slate-400 text-sm">{s.label}</p>
            <p className="text-2xl text-white font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 bg-slate-900 p-4 rounded-xl">
        <input
          value={searchInput}
          onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
          placeholder="Search shipments..."
          className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-lg"
        />

        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        <select
          value={dateSort}
          onChange={(e) => { setDateSort(e.target.value); setPage(1); }}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Table */}
      <ShipmentTable
        shipments={shipments}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={setPage}
      />

      {/* Edit Modal */}
      <ShipmentModal
        isOpen={modalOpen}
        shipment={editingShipment}
        onClose={() => setModalOpen(false)}
        onSubmit={handleUpdate}
      />

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl">
            <p className="text-white mb-4">Delete this shipment?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button onClick={handleConfirmDelete} className="bg-red-600 px-4 py-2 rounded-lg text-white">
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
