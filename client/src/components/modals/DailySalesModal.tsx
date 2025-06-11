import { Spinner } from "react-bootstrap";

interface DailySalesModalProps {
    show: boolean;
    onClose: () => void;
    orders: any[];
    loading: boolean;
}

const DailySalesModal = ({ show, onClose, orders, loading }: DailySalesModalProps) => {
    if (!show) return null;

    return (
        <div className="modal show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Yesterday's Transactions</h5>
                        <button type="button" className="btn-close" onClick={onClose}>.</button>
                    </div>
                    <div className="modal-body">
                        {loading ? (
                            <Spinner />
                        ) : orders.length === 0 ? (
                            <p>No transactions found for yesterday.</p>
                        ) : (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Date & Time</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.order_id}>
                                            <td>{order.order_id}</td>
                                            <td>{new Date(order.created_at).toLocaleString()}</td>
                                            <td>₱{order.total_amount?.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailySalesModal;