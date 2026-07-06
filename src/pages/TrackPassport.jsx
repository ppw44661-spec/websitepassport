// import React, { useState } from "react";
// import axios from "axios";
// import "./TrackPassport.css";

// // Apne backend ka URL yahan set karo
// const api = axios.create({ baseURL: "http://localhost:5000/api" });

// const COMPLETED_STATUSES = ["Completed", "Passport Dispatched", "Dispatched"];
// const REJECTED_STATUSES = ["Rejected"];

// // ===== Tabs Config (video jaisa: Personal | Passport | Employment | Visa | Documents | Progress) =====
// const TABS = [
//   { key: "personal", label: "Personal", icon: "👤" },
//   { key: "passport", label: "Passport", icon: "💳" },
//   { key: "employment", label: "Employment", icon: "💼" },
//   { key: "visa", label: "Visa", icon: "✈️" },
//   { key: "documents", label: "Documents", icon: "📁" },
//   { key: "progress", label: "Progress", icon: "⏱️" },
// ];

// // ===== Progress Steps Config =====
// // Yeh sirf "Progress" tab ke andar use hote hain (video ke vertical checklist jaisa)
// const STEPS = [
//   { key: "submitted", label: "Application Submitted", match: ["submit", "applied", "application received", "pending"] },
//   { key: "document", label: "Document Verification", match: ["document"] },
//   { key: "police", label: "Police Verification", match: ["police"] },
//   { key: "printing", label: "Printing", match: ["print", "granted", "processing", "under process"] },
//   { key: "dispatched", label: "Dispatched", match: ["dispatch", "completed", "delivered"] },
// ];

// // ===== Uploaded Documents Config (Bunny CDN wali files) =====
// // Yeh sab passport model ke fields hain jo multer + Bunny upload se aate hain
// const DOCUMENT_FIELDS = [
//   { key: "profilePhoto", label: "Profile Photo", icon: "🧑" },
//   { key: "passportFront", label: "Passport Front Page", icon: "🛂" },
//   { key: "passportBack", label: "Passport Back Page", icon: "🛂" },
//   { key: "aadhaarCard", label: "Aadhaar Card", icon: "🆔" },
//   { key: "panCard", label: "PAN Card", icon: "🆔" },
//   { key: "visaPdf", label: "Visa Document", icon: "✈️" },
//   { key: "contractPdf", label: "Employment Contract", icon: "📄" },
//   { key: "approvalPdf", label: "Approval Letter", icon: "✅" },
//   { key: "otherDocument", label: "Other Document", icon: "📎" },
// ];

// // URL extension dekh kar pata lagao ki ye image hai ya pdf/other file
// function isImageUrl(url = "") {
//   return /\.(jpe?g|png|webp|gif|bmp)$/i.test(url);
// }

// // Current status string se pata lagao ki abhi kaunsa step chal raha hai (0-based index)
// function getCurrentStepIndex(status, tracking = []) {
//   if (!status) return 0;
//   const normalizedStatus = status.toLowerCase();

//   let idx = STEPS.findIndex((s) => s.match.some((m) => normalizedStatus.includes(m)));

//   if (idx === -1 && tracking.length > 0) {
//     const sorted = [...tracking].sort((a, b) => new Date(b.date) - new Date(a.date));
//     for (const t of sorted) {
//       const s = (t.status || "").toLowerCase();
//       const found = STEPS.findIndex((step) => step.match.some((m) => s.includes(m)));
//       if (found !== -1) {
//         idx = found;
//         break;
//       }
//     }
//   }

//   return idx === -1 ? 0 : idx;
// }

// // Ek particular step ke liye tracking history me se matching entry dhoondo (sabse latest wali)
// function findStepEntry(step, tracking = []) {
//   if (!tracking || tracking.length === 0) return null;
//   const sorted = [...tracking].sort((a, b) => new Date(b.date) - new Date(a.date));
//   return (
//     sorted.find((t) => step.match.some((m) => (t.status || "").toLowerCase().includes(m))) || null
//   );
// }

// // Reusable field row jo har tab me use hoga
// function Field({ label, value }) {
//   return (
//     <div className="track-field">
//       <span className="track-label">{label}</span>
//       <span className="track-value">{value || "-"}</span>
//     </div>
//   );
// }

// // ===== Progress Tab Content (video ke vertical checklist jaisa) =====
// function ProgressTabContent({ status, tracking }) {
//   const isRejected = REJECTED_STATUSES.includes(status);
//   const isFullyCompleted = COMPLETED_STATUSES.includes(status);
//   const currentIndex = isFullyCompleted ? STEPS.length - 1 : getCurrentStepIndex(status, tracking);

//   return (
//     <div className="progress-list">
//       {STEPS.map((step, i) => {
//         const isDone = i < currentIndex || (i === currentIndex && isFullyCompleted);
//         const isCurrent = i === currentIndex && !isFullyCompleted;
//         const isRejectedHere = isRejected && i === currentIndex;
//         const entry = findStepEntry(step, tracking);

//         let dotClass = "progress-dot";
//         if (isRejectedHere) dotClass += " progress-dot-rejected";
//         else if (isDone) dotClass += " progress-dot-done";
//         else if (isCurrent) dotClass += " progress-dot-current";
//         else dotClass += " progress-dot-pending";

//         return (
//           <div className="progress-row" key={step.key}>
//             <div className="progress-rail">
//               <div className={dotClass}>
//                 {isRejectedHere ? "✕" : isDone ? "✓" : ""}
//               </div>
//               {i < STEPS.length - 1 && (
//                 <div className={`progress-connector ${isDone ? "progress-connector-done" : ""}`} />
//               )}
//             </div>
//             <div className="progress-info">
//               <strong className={isCurrent ? "progress-label-current" : ""}>{step.label}</strong>
//               <span className="progress-date">
//                 {entry
//                   ? new Date(entry.date).toLocaleDateString()
//                   : isCurrent
//                   ? "In Progress..."
//                   : isDone
//                   ? "-"
//                   : "Pending"}
//               </span>
//               {entry?.remark && <p className="progress-remark">{entry.remark}</p>}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ===== Documents Tab Content (saari uploaded files: visa, contract, approval, aadhaar, pan, etc.) =====
// function DocumentsTabContent({ passport }) {
//   const availableDocs = DOCUMENT_FIELDS.filter((doc) => passport[doc.key]);

//   if (availableDocs.length === 0) {
//     return <p className="documents-empty">No documents uploaded yet.</p>;
//   }

//   return (
//     <div className="documents-grid">
//       {availableDocs.map((doc) => {
//         const url = passport[doc.key];
//         const isImg = isImageUrl(url);

//         return (
//           <div className="document-card" key={doc.key}>
//             <div className="document-preview">
//               {isImg ? (
//                 <img src={url} alt={doc.label} className="document-thumb" />
//               ) : (
//                 <span className="document-file-icon">{doc.icon}</span>
//               )}
//             </div>
//             <p className="document-name">{doc.label}</p>
//             <div className="document-actions">
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="doc-btn doc-btn-view"
//               >
//                 👁️ View
//               </a>
//               <a
//                 href={url}
//                 download
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="doc-btn doc-btn-download"
//               >
//                 ⬇️ Download
//               </a>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // onBack: parent (App.jsx) passes this so user can return to the Home / BCG landing page
// export default function TrackPassport({ onBack }) {
//   const [passportNumber, setPassportNumber] = useState("");
//   const [passport, setPassport] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searched, setSearched] = useState(false);
//   const [activeTab, setActiveTab] = useState("personal");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const trimmed = passportNumber.trim();
//     if (!trimmed) {
//       setError("Please enter a passport number.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setPassport(null);
//     setSearched(true);
//     setActiveTab("personal");

//     try {
//       const res = await api.get(`/passports/track/${trimmed}`);
//       setPassport(res.data.data);
//     } catch (err) {
//       setError(
//         err.response?.status === 404
//           ? "No record found for this passport number. Please check and try again."
//           : err.response?.data?.message || "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fmtDate = (d) => (d ? new Date(d).toDateString() : "-");

//   const statusClass = (status) => {
//     if (COMPLETED_STATUSES.includes(status)) return "st-green";
//     if (REJECTED_STATUSES.includes(status)) return "st-red";
//     return "st-orange";
//   };

//   return (
//     <div className="track-page">
//       {/* ===== Hero / Search ===== */}
//       <div className="track-hero">
//         {onBack && (
//           <button type="button" className="track-back-btn" onClick={onBack}>
//             ← Back to Home
//           </button>
//         )}
//         <div className="track-hero-icon">🛂</div>
//         <h1>Track Your Passport</h1>
//         <p>Enter your passport number below to check the current status of your application.</p>

//         <form className="track-search-box" onSubmit={handleSearch}>
//           <input
//             type="text"
//             placeholder="Enter Passport Number (e.g. N1234567)"
//             value={passportNumber}
//             onChange={(e) => setPassportNumber(e.target.value)}
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Searching..." : "Track"}
//           </button>
//         </form>
//       </div>

//       {/* ===== Result ===== */}
//       <div className="track-result-wrap">
//         {error && <div className="track-error">⚠ {error}</div>}

//         {loading && <p className="track-loading">Fetching details...</p>}

//         {!loading && passport && (
//           <div className="track-card">
//             {/* Summary */}
//             <div className="track-summary">
//               <div>
//                 <h2>{passport.fullName}</h2>
//                 <span className="track-app-id">Application ID: {passport.applicationId}</span>
//               </div>
//               <div className={`track-status-badge ${statusClass(passport.status)}`}>
//                 {passport.status}
//               </div>
//             </div>

//             {/* ===== View / Download PDF actions (summary form PDF) ===== */}
//             <div className="pdf-actions">
//               <a
//                 href={`${api.defaults.baseURL}/passports/track/${passport.passportNumber}/view-pdf`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="pdf-btn pdf-btn-view"
//               >
//                 📄 View PDF
//               </a>
//               <a
//                 href={`${api.defaults.baseURL}/passports/track/${passport.passportNumber}/download-pdf`}
//                 className="pdf-btn pdf-btn-download"
//               >
//                 ⬇️ Download PDF
//               </a>
//             </div>

//             {/* ===== Tabs (video jaisa: Personal | Passport | Employment | Visa | Documents | Progress) ===== */}
//             <div className="tab-bar">
//               {TABS.map((tab) => (
//                 <button
//                   key={tab.key}
//                   type="button"
//                   className={`tab-btn ${activeTab === tab.key ? "tab-btn-active" : ""}`}
//                   onClick={() => setActiveTab(tab.key)}
//                 >
//                   <span className="tab-icon">{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}
//             </div>

//             {/* ===== Tab Content ===== */}
//             <div className="tab-content">
//               {activeTab === "personal" && (
//                 <div className="track-grid">
//                   <Field label="Full Name" value={passport.fullName} />
//                   <Field label="Passport Number" value={passport.passportNumber} />
//                   <Field label="Application ID" value={passport.applicationId} />
//                   <Field label="Nationality" value={passport.nationality} />
//                   <Field label="Date of Birth" value={fmtDate(passport.dob)} />
//                   <Field label="Gender" value={passport.gender} />
//                   <Field label="Father's Name" value={passport.fatherName} />
//                   <Field label="Mother's Name" value={passport.motherName} />
//                   <Field label="Phone Number" value={passport.phone} />
//                   <Field label="Email Address" value={passport.email} />
//                   <Field label="Address" value={passport.address} />
//                   <Field label="City" value={passport.city} />
//                   <Field label="State" value={passport.state} />
//                   <Field label="Country" value={passport.country} />
//                   <Field label="Pincode" value={passport.pincode} />
//                 </div>
//               )}

//               {activeTab === "passport" && (
//                 <div className="track-grid">
//                   <Field label="Passport Number" value={passport.passportNumber} />
//                   <Field label="Passport Type" value={passport.passportType} />
//                   <Field label="Application Date" value={fmtDate(passport.applicationDate)} />
//                   <Field label="Issue Date" value={fmtDate(passport.issueDate)} />
//                   <Field label="Expiry Date" value={fmtDate(passport.expiryDate)} />
//                   <Field label="Place of Issue" value={passport.placeOfIssue} />
//                   <Field label="Issuing Country" value={passport.issuingCountry} />
//                   <Field label="Processing Office" value={passport.processingOffice} />
//                   <Field label="Assigned Executive" value={passport.assignedExecutive} />
//                   <Field label="Expected Completion" value={fmtDate(passport.expectedCompletion)} />
//                 </div>
//               )}

//               {activeTab === "employment" && (
//                 <div className="track-grid">
//                   <Field label="Employer Name" value={passport.employerName} />
//                   <Field label="Job Title" value={passport.jobTitle} />
//                   <Field label="Employment Type" value={passport.employmentType} />
//                   <Field label="Company Address" value={passport.companyAddress} />
//                   <Field label="Company Country" value={passport.companyCountry} />
//                   <Field label="Salary" value={passport.salary} />
//                   <Field label="Contract Duration" value={passport.contractDuration} />
//                   <Field label="Joining Date" value={fmtDate(passport.joiningDate)} />
//                   <Field label="Offer Letter Date" value={fmtDate(passport.offerLetterDate)} />
//                   {passport.employmentRemarks && (
//                     <Field label="Employment Remarks" value={passport.employmentRemarks} />
//                   )}
//                 </div>
//               )}

//               {activeTab === "visa" && (
//                 <div className="track-grid">
//                   <Field label="Visa Type" value={passport.visaType} />
//                   <Field label="Visa Number" value={passport.visaNumber} />
//                   <Field label="Country" value={passport.visaCountry} />
//                   <Field label="Visa Category" value={passport.visaCategory} />
//                   <Field label="Visa Issue Date" value={fmtDate(passport.visaIssueDate)} />
//                   <Field label="Visa Expiry Date" value={fmtDate(passport.visaExpiryDate)} />
//                   <Field label="Visa Duration" value={passport.visaDuration} />
//                   <Field label="Embassy Name" value={passport.embassyName} />
//                   <Field label="Embassy Reference" value={passport.embassyReference} />
//                 </div>
//               )}

//               {activeTab === "documents" && <DocumentsTabContent passport={passport} />}

//               {activeTab === "progress" && (
//                 <ProgressTabContent status={passport.status} tracking={passport.tracking} />
//               )}
//             </div>

//             {passport.officerRemark && (
//               <div className="track-remark">
//                 <strong>Officer Remark:</strong> {passport.officerRemark}
//               </div>
//             )}
//           </div>
//         )}

//         {!loading && !passport && searched && !error && (
//           <p className="track-empty">No details to show.</p>
//         )}
//       </div>

//       <footer className="track-footer">
//         © {new Date().getFullYear()} Passport Tracking System. All rights reserved.
//       </footer>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import "./TrackPassport.css";

// Apne backend ka URL yahan set karo
const api = axios.create({ baseURL: "http://localhost:5000/api" });

const COMPLETED_STATUSES = ["Completed", "Passport Dispatched", "Dispatched"];
const REJECTED_STATUSES = ["Rejected"];

// ===== Tabs Config (video jaisa: Personal | Passport | Employment | Visa | Documents | Progress) =====
const TABS = [
  { key: "personal", label: "Personal", icon: "👤" },
  { key: "passport", label: "Passport", icon: "💳" },
  { key: "employment", label: "Employment", icon: "💼" },
  { key: "visa", label: "Visa", icon: "✈️" },
  { key: "documents", label: "Documents", icon: "📁" },
  { key: "progress", label: "Progress", icon: "⏱️" },
];

// ===== Progress Steps Config =====
// Yeh sirf "Progress" tab ke andar use hote hain (video ke vertical checklist jaisa)
const STEPS = [
  { key: "submitted", label: "Application Submitted", match: ["submit", "applied", "application received", "pending"] },
  { key: "document", label: "Document Verification", match: ["document"] },
  { key: "police", label: "Police Verification", match: ["police"] },
  { key: "printing", label: "Printing", match: ["print", "granted", "processing", "under process"] },
  { key: "dispatched", label: "Dispatched", match: ["dispatch", "completed", "delivered"] },
];

// ===== Uploaded Documents Config (Bunny CDN wali files) =====
// Yeh sab passport model ke fields hain jo multer + Bunny upload se aate hain
const DOCUMENT_FIELDS = [
  { key: "profilePhoto", label: "Profile Photo", icon: "🧑" },
  { key: "passportFront", label: "Passport Front Page", icon: "🛂" },
  { key: "passportBack", label: "Passport Back Page", icon: "🛂" },
  { key: "aadhaarCard", label: "Aadhaar Card", icon: "🆔" },
  { key: "panCard", label: "PAN Card", icon: "🆔" },
  { key: "visaPdf", label: "Visa Document", icon: "✈️" },
  { key: "contractPdf", label: "Employment Contract", icon: "📄" },
  { key: "approvalPdf", label: "Approval Letter", icon: "✅" },
  { key: "otherDocument", label: "Other Document", icon: "📎" },
];

// URL extension dekh kar pata lagao ki ye image hai ya pdf/other file
function isImageUrl(url = "") {
  return /\.(jpe?g|png|webp|gif|bmp)$/i.test(url);
}

// Current status string se pata lagao ki abhi kaunsa step chal raha hai (0-based index)
function getCurrentStepIndex(status, tracking = []) {
  if (!status) return 0;
  const normalizedStatus = status.toLowerCase();

  let idx = STEPS.findIndex((s) => s.match.some((m) => normalizedStatus.includes(m)));

  if (idx === -1 && tracking.length > 0) {
    const sorted = [...tracking].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (const t of sorted) {
      const s = (t.status || "").toLowerCase();
      const found = STEPS.findIndex((step) => step.match.some((m) => s.includes(m)));
      if (found !== -1) {
        idx = found;
        break;
      }
    }
  }

  return idx === -1 ? 0 : idx;
}

// Ek particular step ke liye tracking history me se matching entry dhoondo (sabse latest wali)
function findStepEntry(step, tracking = []) {
  if (!tracking || tracking.length === 0) return null;
  const sorted = [...tracking].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    sorted.find((t) => step.match.some((m) => (t.status || "").toLowerCase().includes(m))) || null
  );
}

// Reusable field row jo har tab me use hoga
function Field({ label, value }) {
  return (
    <div className="track-field">
      <span className="track-label">{label}</span>
      <span className="track-value">{value || "-"}</span>
    </div>
  );
}

// ===== Progress Tab Content (video ke vertical checklist jaisa) =====
function ProgressTabContent({ status, tracking }) {
  const isRejected = REJECTED_STATUSES.includes(status);
  const isFullyCompleted = COMPLETED_STATUSES.includes(status);
  const currentIndex = isFullyCompleted ? STEPS.length - 1 : getCurrentStepIndex(status, tracking);

  return (
    <div className="progress-list">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex || (i === currentIndex && isFullyCompleted);
        const isCurrent = i === currentIndex && !isFullyCompleted;
        const isRejectedHere = isRejected && i === currentIndex;
        const entry = findStepEntry(step, tracking);

        let dotClass = "progress-dot";
        if (isRejectedHere) dotClass += " progress-dot-rejected";
        else if (isDone) dotClass += " progress-dot-done";
        else if (isCurrent) dotClass += " progress-dot-current";
        else dotClass += " progress-dot-pending";

        return (
          <div className="progress-row" key={step.key}>
            <div className="progress-rail">
              <div className={dotClass}>
                {isRejectedHere ? "✕" : isDone ? "✓" : ""}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`progress-connector ${isDone ? "progress-connector-done" : ""}`} />
              )}
            </div>
            <div className="progress-info">
              <strong className={isCurrent ? "progress-label-current" : ""}>{step.label}</strong>
              <span className="progress-date">
                {entry
                  ? new Date(entry.date).toLocaleDateString()
                  : isCurrent
                  ? "In Progress..."
                  : isDone
                  ? "-"
                  : "Pending"}
              </span>
              {entry?.remark && <p className="progress-remark">{entry.remark}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ===== Documents Tab Content (saari uploaded files: visa, contract, approval, aadhaar, pan, etc.) =====
function DocumentsTabContent({ passport }) {
  const availableDocs = DOCUMENT_FIELDS.filter((doc) => passport[doc.key]);

  if (availableDocs.length === 0) {
    return <p className="documents-empty">No documents uploaded yet.</p>;
  }

  return (
    <div className="documents-grid">
      {availableDocs.map((doc) => {
        const url = passport[doc.key];
        const isImg = isImageUrl(url);

        return (
          <div className="document-card" key={doc.key}>
            <div className="document-preview">
              {isImg ? (
                <img src={url} alt={doc.label} className="document-thumb" />
              ) : (
                <span className="document-file-icon">{doc.icon}</span>
              )}
            </div>
            <p className="document-name">{doc.label}</p>
            <div className="document-actions">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-btn doc-btn-view"
              >
                👁️ View
              </a>
              <a
                href={`${api.defaults.baseURL}/passports/track/${passport.passportNumber}/document/${doc.key}/download`}
                className="doc-btn doc-btn-download"
              >
                ⬇️ Download
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// onBack: parent (App.jsx) passes this so user can return to the Home / BCG landing page
export default function TrackPassport({ onBack }) {
  const [passportNumber, setPassportNumber] = useState("");
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = passportNumber.trim();
    if (!trimmed) {
      setError("Please enter a passport number.");
      return;
    }

    setLoading(true);
    setError("");
    setPassport(null);
    setSearched(true);
    setActiveTab("personal");

    try {
      const res = await api.get(`/passports/track/${trimmed}`);
      setPassport(res.data.data);
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "No record found for this passport number. Please check and try again."
          : err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fmtDate = (d) => (d ? new Date(d).toDateString() : "-");

  const statusClass = (status) => {
    if (COMPLETED_STATUSES.includes(status)) return "st-green";
    if (REJECTED_STATUSES.includes(status)) return "st-red";
    return "st-orange";
  };

  return (
    <div className="track-page">
      {/* ===== Hero / Search ===== */}
      <div className="track-hero">
        {onBack && (
          <button type="button" className="track-back-btn" onClick={onBack}>
            ← Back to Home
          </button>
        )}
        <div className="track-hero-icon">🛂</div>
        <h1>Track Your Passport</h1>
        <p>Enter your passport number below to check the current status of your application.</p>

        <form className="track-search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter Passport Number (e.g. N1234567)"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Track"}
          </button>
        </form>
      </div>

      {/* ===== Result ===== */}
      <div className="track-result-wrap">
        {error && <div className="track-error">⚠ {error}</div>}

        {loading && <p className="track-loading">Fetching details...</p>}

        {!loading && passport && (
          <div className="track-card">
            {/* Summary */}
            <div className="track-summary">
              <div>
                <h2>{passport.fullName}</h2>
                <span className="track-app-id">Application ID: {passport.applicationId}</span>
              </div>
              <div className={`track-status-badge ${statusClass(passport.status)}`}>
                {passport.status}
              </div>
            </div>

            {/* ===== View / Download PDF actions (summary form PDF) ===== */}
            <div className="pdf-actions">
              <a
                href={`${api.defaults.baseURL}/passports/track/${passport.passportNumber}/view-pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-btn pdf-btn-view"
              >
                📄 View PDF
              </a>
              <a
                href={`${api.defaults.baseURL}/passports/track/${passport.passportNumber}/download-pdf`}
                className="pdf-btn pdf-btn-download"
              >
                ⬇️ Download PDF
              </a>
            </div>

            {/* ===== Tabs (video jaisa: Personal | Passport | Employment | Visa | Documents | Progress) ===== */}
            <div className="tab-bar">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`tab-btn ${activeTab === tab.key ? "tab-btn-active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ===== Tab Content ===== */}
            <div className="tab-content">
              {activeTab === "personal" && (
                <div className="track-grid">
                  <Field label="Full Name" value={passport.fullName} />
                  <Field label="Passport Number" value={passport.passportNumber} />
                  <Field label="Application ID" value={passport.applicationId} />
                  <Field label="Nationality" value={passport.nationality} />
                  <Field label="Date of Birth" value={fmtDate(passport.dob)} />
                  <Field label="Gender" value={passport.gender} />
                  <Field label="Father's Name" value={passport.fatherName} />
                  <Field label="Mother's Name" value={passport.motherName} />
                  <Field label="Phone Number" value={passport.phone} />
                  <Field label="Email Address" value={passport.email} />
                  <Field label="Address" value={passport.address} />
                  <Field label="City" value={passport.city} />
                  <Field label="State" value={passport.state} />
                  <Field label="Country" value={passport.country} />
                  <Field label="Pincode" value={passport.pincode} />
                </div>
              )}

              {activeTab === "passport" && (
                <div className="track-grid">
                  <Field label="Passport Number" value={passport.passportNumber} />
                  <Field label="Passport Type" value={passport.passportType} />
                  <Field label="Application Date" value={fmtDate(passport.applicationDate)} />
                  <Field label="Issue Date" value={fmtDate(passport.issueDate)} />
                  <Field label="Expiry Date" value={fmtDate(passport.expiryDate)} />
                  <Field label="Place of Issue" value={passport.placeOfIssue} />
                  <Field label="Issuing Country" value={passport.issuingCountry} />
                  <Field label="Processing Office" value={passport.processingOffice} />
                  <Field label="Assigned Executive" value={passport.assignedExecutive} />
                  <Field label="Expected Completion" value={fmtDate(passport.expectedCompletion)} />
                </div>
              )}

              {activeTab === "employment" && (
                <div className="track-grid">
                  <Field label="Employer Name" value={passport.employerName} />
                  <Field label="Job Title" value={passport.jobTitle} />
                  <Field label="Employment Type" value={passport.employmentType} />
                  <Field label="Company Address" value={passport.companyAddress} />
                  <Field label="Company Country" value={passport.companyCountry} />
                  <Field label="Salary" value={passport.salary} />
                  <Field label="Contract Duration" value={passport.contractDuration} />
                  <Field label="Joining Date" value={fmtDate(passport.joiningDate)} />
                  <Field label="Offer Letter Date" value={fmtDate(passport.offerLetterDate)} />
                  {passport.employmentRemarks && (
                    <Field label="Employment Remarks" value={passport.employmentRemarks} />
                  )}
                </div>
              )}

              {activeTab === "visa" && (
                <div className="track-grid">
                  <Field label="Visa Type" value={passport.visaType} />
                  <Field label="Visa Number" value={passport.visaNumber} />
                  <Field label="Country" value={passport.visaCountry} />
                  <Field label="Visa Category" value={passport.visaCategory} />
                  <Field label="Visa Issue Date" value={fmtDate(passport.visaIssueDate)} />
                  <Field label="Visa Expiry Date" value={fmtDate(passport.visaExpiryDate)} />
                  <Field label="Visa Duration" value={passport.visaDuration} />
                  <Field label="Embassy Name" value={passport.embassyName} />
                  <Field label="Embassy Reference" value={passport.embassyReference} />
                </div>
              )}

              {activeTab === "documents" && <DocumentsTabContent passport={passport} />}

              {activeTab === "progress" && (
                <ProgressTabContent status={passport.status} tracking={passport.tracking} />
              )}
            </div>

            {passport.officerRemark && (
              <div className="track-remark">
                <strong>Officer Remark:</strong> {passport.officerRemark}
              </div>
            )}
          </div>
        )}

        {!loading && !passport && searched && !error && (
          <p className="track-empty">No details to show.</p>
        )}
      </div>

      <footer className="track-footer">
        © {new Date().getFullYear()} Passport Tracking System. All rights reserved.
      </footer>
    </div>
  );
}