import { useState, useEffect } from "react";
import SpinnerSmall from "../../SpinnerSmall";
import AlertMessage from "../../AlertMessage";
import type { Employees } from "../../../interfaces/Employees";

interface ManageAccessModalProps {
    showModal: boolean;
    employee: Employees | null;
    onClose: () => void;
    onSave: (updatedEmployee: Employees) => void;
}

const features = [
    { key: "dashboard", label: "Dashboard" },
    { key: 'points_of_sale', label: "Points of Sale" },
    { key: "inventory", label: "Inventory" },
    { key: "inventory_record", label: "Inventory Record" },
    { key: "employees", label: "Employees" },
    { key: "categories", label: "Categories" },
    { key: "products", label: "Products" },
    { key: "order_history", label: "Order History" },
];

const ManageAccessModal = ({
    showModal,
    employee,
    onClose,
    onSave,
}: ManageAccessModalProps) => {
    const [selectedAccess, setSelectedAccess] = useState<string[]>(employee?.access || []);
    const [loading, setLoading] = useState(false);

    // Alert message state (like AddEmployeeModal)
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleShowAlertMessage = (
        message: string,
        isSuccess: boolean,
        isVisible: boolean
    ) => {
        setMessage(message);
        setIsSuccess(isSuccess);
        setIsVisible(isVisible);
    };

    const handleCloseAlertMessage = () => {
        setMessage("");
        setIsSuccess(false);
        setIsVisible(false);
    };

    useEffect(() => {
        setSelectedAccess(employee?.access || []);
    }, [employee]);

    const handleToggleAccess = (featureKey: string) => {
        setSelectedAccess((prev) =>
            prev.includes(featureKey)
                ? prev.filter((key) => key !== featureKey)
                : [...prev, featureKey]
        );
    };

    const handleSave = () => {
        if (!employee) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            handleShowAlertMessage("Access updated successfully!", true, true);
            onSave({ ...employee, access: selectedAccess });
        }, 1000);
    };

    return (
        <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Manage Access</h1>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <AlertMessage
                                message={message}
                                isSuccess={isSuccess}
                                isVisible={isVisible}
                                onClose={handleCloseAlertMessage}
                            />
                        </div>
                        {employee && (
                            <>
                                <div className="mb-3">
                                    <strong>Name:</strong> {employee.first_name} {employee.last_name}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Feature Access</label>
                                    <div className="row">
                                        {features.map((feature) => (
                                            <div className="col-6" key={feature.key}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={feature.key}
                                                        checked={selectedAccess.includes(feature.key)}
                                                        onChange={() => handleToggleAccess(feature.key)}
                                                    />
                                                    <label className="form-check-label" htmlFor={feature.key}>
                                                        {feature.label}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
                            {loading ? (
                                <>
                                    <SpinnerSmall /> Saving...
                                </>
                            ) : (
                                "Save"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAccessModal;