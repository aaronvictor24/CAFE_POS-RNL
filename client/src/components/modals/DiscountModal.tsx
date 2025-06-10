import { useState, useEffect } from "react";

interface DiscountModalProps {
    showModal: boolean;
    currentDiscount: number;
    onSave: (discount: number) => void;
    onClose: () => void;
}

const DiscountModal = ({
    showModal,
    currentDiscount,
    onSave,
    onClose,
}: DiscountModalProps) => {
    const [discount, setDiscount] = useState<number>(currentDiscount);

    useEffect(() => {
        setDiscount(currentDiscount);
    }, [currentDiscount, showModal]);

    if (!showModal) return null;

    return (
        <>
            <div className="modal show d-block bg-dark bg-opacity-50" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Set Discount</h5>
                            <button type="button" className="btn-close" onClick={onClose}>.</button>
                        </div>
                        <div className="modal-body">
                            <label>Discount (%)</label>
                            <input
                                type="text"
                                placeholder="Enter discount percentage"
                                min={0}
                                max={100}
                                className="form-control"
                                value={discount}
                                onChange={e => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}
                                autoFocus
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                            <button
                                className="btn btn-primary"
                                onClick={() => onSave(discount)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default DiscountModal;