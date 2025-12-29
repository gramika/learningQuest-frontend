import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateCard = ({ username, courseTitle, date, compact = false }) => {
    const certificateRef = useRef();

    const uniqueId = `LQ-${new Date().getFullYear()}-${courseTitle
        .slice(0, 3)
        .toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const handleDownload = async () => {
        try {
            const element = certificateRef.current;
            if (!element) return;

            await document.fonts.ready;

            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("landscape", "pt", "a4");
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, "PNG", 0, 0, width, height);
            pdf.save(`${courseTitle}_Certificate.pdf`);
        } catch (error) {
            console.error("Error generating certificate:", error);
        }
    };

    // Styles for compact or full layout
    const containerStyle = compact
        ? {
            width: "100%",
            height: "280px",
            border: "6px solid #0d9488",
            background: "linear-gradient(to bottom, #ffffff, #e6f4ea)",
            borderRadius: "12px",
            fontFamily: "serif",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            boxSizing: "border-box",
            position: "relative",
        }
        : {
            width: "1123px",
            height: "794px",
            border: "8px solid #0d9488",
            background: "linear-gradient(to bottom, #ffffff, #e6f4ea)",
            color: "#111827",
            fontFamily: "serif",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px",
            boxSizing: "border-box",
            position: "relative",
        };

    const fontSize = compact
        ? {
            title: "20px",
            subtitle: "14px",
            name: "22px",
            course: "18px",
            info: "12px",
            footer: "10px",
        }
        : {
            title: "36px",
            subtitle: "18px",
            name: "34px",
            course: "26px",
            info: "16px",
            footer: "12px",
        };

    return (
        <div
            className="bg-white p-3 rounded-xl shadow-md text-center flex flex-col items-center"
            style={compact ? { width: "100%" } : { backgroundColor: "#f9fafb", minHeight: "100vh" }}
        >
            <div ref={certificateRef} style={containerStyle}>
                {/* Title and Subtitle */}
                <div style={{ textAlign: "center" }}>
                    <h2
                        style={{
                            fontSize: fontSize.title,
                            fontWeight: "bold",
                            color: "#0f766e",
                            marginBottom: compact ? "4px" : "10px",
                        }}
                    >
                        Certificate of Completion
                    </h2>

                    <p
                        style={{
                            color: "#374151",
                            fontStyle: "italic",
                            fontSize: fontSize.subtitle,
                            marginBottom: "8px",
                        }}
                    >
                        Presented by Learning Quest
                    </p>

                    <p style={{ fontSize: fontSize.info, color: "#1f2937" }}>
                        This is to certify that
                    </p>

                    <h1
                        style={{
                            fontSize: fontSize.name,
                            fontWeight: "bold",
                            color: "#1d4ed8",
                            margin: "6px 0",
                        }}
                    >
                        {username}
                    </h1>

                    <p style={{ fontSize: fontSize.info, color: "#1f2937" }}>
                        has successfully completed the course
                    </p>

                    <h2
                        style={{
                            fontSize: fontSize.course,
                            fontWeight: "600",
                            color: "#15803d",
                            margin: "6px 0",
                        }}
                    >
                        “{courseTitle}”
                    </h2>

                    <p className="text font-bold"
                        style={{
                            fontSize: fontSize.info,
                            color: "#4b5563",
                            marginBottom: "10px",
                        }}
                    >
                        on {date}
                    </p>
                </div>

                {/* ID, Signature, and Footer */}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        padding: compact ? "0 12px" : "0 40px",
                    }}
                >
                    <div style={{ textAlign: "left" }}>
                        <p
                            style={{
                                fontSize: fontSize.footer,
                                color: "#4b5563",
                                fontFamily: "monospace",
                            }}
                        >
                            Certificate ID:{" "}
                            <span className="text" style={{ fontWeight: "600" }}>{uniqueId}</span>
                        </p>

                    </div>

                    <div style={{ textAlign: "right", color: "#374151" }}>
                        <div
                            style={{
                                borderTop: "1px solid #9ca3af",
                                width: compact ? "90px" : "150px",
                                marginLeft: "auto",
                                marginBottom: "4px",
                            }}
                        ></div>
                        <p
                            style={{
                                fontSize: fontSize.footer,
                                fontWeight: "500",
                            }}
                        >
                            Learning Quest Admin
                        </p>
                    </div>
                </div>

               
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                style={{
                    marginTop: "10px",
                    backgroundColor: "#0d9488",
                    color: "white",
                    padding: compact ? "6px 14px" : "10px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    border: "none",
                    fontSize: compact ? "13px" : "16px",
                }}
            >
                Download Certificate
            </button>
        </div>
    );
};

export default CertificateCard;
