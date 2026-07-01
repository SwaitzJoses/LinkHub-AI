import { useState } from "react";
import "../styles/LeadsTable.css";

function LeadsTable({ leads = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter((lead) => {
    const name = lead.name?.toLowerCase() || "";
    const phone = lead.phone?.toLowerCase() || "";
    const query = search.toLowerCase();

    return (
      name.includes(query) ||
      phone.includes(query)
    );
  });

  const leadsPerPage = 5;

  const start = (currentPage - 1) * leadsPerPage;
  const end = start + leadsPerPage;

  const currentLeads = filteredLeads.slice(start, end);

  const totalPages = Math.ceil(
    filteredLeads.length / leadsPerPage
  );

  return (
    <div className="card">
      <h2>📲 Recent Leads</h2>

      <input
        type="text"
        placeholder="🔍 Search by name or phone..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{ marginBottom: "20px" }}
      />

      {filteredLeads.length === 0 ? (
        <p>No leads found.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#333",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Phone
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Date
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
  {currentLeads.map((lead) => (
    <>
      <tr key={lead.id} className="lead-row">
        <td
          style={{
            padding: "12px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          {lead.name}
        </td>

        <td
          style={{
            padding: "12px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          {lead.phone}
        </td>

        <td
          style={{
            padding: "12px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          {new Date(
            lead.created_at
          ).toLocaleDateString()}
        </td>

        <td
          style={{
            padding: "12px",
            borderBottom: "1px solid #f1f5f9",
          }}
          className="desktop-action"
        >
          <button
            className="whatsapp-btn"
            onClick={() => {
              const message =
                `Hi ${lead.name}, thank you for contacting us. How can we help you today?`;

              window.open(
                `https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                  message
                )}`,
                "_blank"
              );
            }}
          >
            📲 WhatsApp
          </button>
        </td>
      </tr>

      <tr className="mobile-action">
        <td colSpan="4">
          <button
            className="whatsapp-btn"
            onClick={() => {
              const message =
                `Hi ${lead.name}, thank you for contacting us. How can we help you today?`;

              window.open(
                `https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                  message
                )}`,
                "_blank"
              );
            }}
          >
            📲 WhatsApp
          </button>
        </td>
      </tr>
    </>
  ))}
</tbody>
          </table>

          {totalPages > 1 && (
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LeadsTable;