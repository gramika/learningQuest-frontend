import React, { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = ({ user, onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (oldPassword !== currentUser.password) {
            toast.error("Old password is incorrect!");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        const updatedUsers = users.map((u) =>
            u.email === currentUser.email ? { ...u, password: newPassword } : u
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem(
            "currentUser",
            JSON.stringify({ ...currentUser, password: newPassword })
        );

        toast.success("Password updated successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4 text-teal-700">Change Password</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="password" className="w-full border rounded-lg px-3 py-2 focus:outline-none" placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required />
                    <input
                        type="password" className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password" className="w-full border rounded-lg px-3 py-2 focus:outline-none"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    /> 
                    

                    <div className="flex justify-end gap-3 mt-3">
                        <button type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
