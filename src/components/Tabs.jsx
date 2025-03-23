import React from "react";

function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className="tabs">
            <button className={`tab ${activeTab === "info" ? "active" : ""}`} onClick={() => setActiveTab("info")}>
                Informações
            </button>
            <button className={`tab ${activeTab === "stats" ? "active" : ""}`} onClick={() => setActiveTab("stats")}>
                Status
            </button>
        </div>
    );
}

export default Tabs;
