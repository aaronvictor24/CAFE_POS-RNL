
interface CheckoutWarningProps {
    show: boolean;
    onClose: () => void;
    message?: string;
}

const CheckoutWarning = ({ show, onClose, message }: CheckoutWarningProps) => {
    if (!show) return null;

    return (
        <div className="modal show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-warning">
                        <h5 className="modal-title text-dark">Warning</h5>
                        <button type="button" className="btn-close" onClick={onClose}>. </button>
                    </div>
                    <div className="modal-body">
                        <div className="alert alert-warning mb-0">
                            {message || "Some items in your cart cannot be made due to low ingredient stock!"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutWarning;