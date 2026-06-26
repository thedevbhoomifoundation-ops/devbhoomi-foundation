import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  borderOuter: {
    borderWidth: 3,
    borderColor: "#0B3C5D",
    padding: 4,
    height: "100%",
    borderRadius: 8,
  },
  borderInner: {
    borderWidth: 1.5,
    borderColor: "#E58A1F",
    padding: 25,
    height: "100%",
    borderRadius: 4,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    width: "100%",
  },
  foundationName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0B3C5D",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 8,
    color: "#7F8C8D",
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  certificateTitle: {
    fontSize: 28,
    color: "#E58A1F",
    fontFamily: "Helvetica-Bold",
    marginVertical: 15,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  bodyText: {
    fontSize: 12,
    color: "#2C3E50",
    textAlign: "center",
    lineHeight: 1.8,
    fontFamily: "Helvetica",
    maxWidth: "85%",
  },
  highlightText: {
    fontFamily: "Helvetica-Bold",
    color: "#0B3C5D",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "90%",
    marginTop: 20,
  },
  qrCode: {
    width: 60,
    height: 60,
  },
  certNumberContainer: {
    alignItems: "center",
  },
  certNumber: {
    fontSize: 8,
    color: "#7F8C8D",
    fontFamily: "Helvetica-Bold",
  },
  signatureContainer: {
    alignItems: "center",
    width: 120,
    borderTopWidth: 1,
    borderTopColor: "#BDC3C7",
    paddingTop: 5,
  },
  signatureText: {
    fontSize: 9,
    color: "#2C3E50",
    fontFamily: "Helvetica-Bold",
  },
  signatureSub: {
    fontSize: 7,
    color: "#7F8C8D",
    marginTop: 2,
    fontFamily: "Helvetica",
  },
});

interface CertificateProps {
  name: string;
  domain: string;
  duration: string;
  completionDate: string;
  certificateNumber: string;
  qrCodeUrl: string;
}

export function CertificateDocument({
  name,
  domain,
  duration,
  completionDate,
  certificateNumber,
  qrCodeUrl
}: CertificateProps) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.borderOuter}>
          <View style={styles.borderInner}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.foundationName}>NextGen Devbhoomi Foundation</Text>
              <Text style={styles.subtitle}>Technical Education & Community Empowerment</Text>
            </View>

            {/* Title */}
            <Text style={styles.certificateTitle}>Certificate of Completion</Text>

            {/* Body */}
            <Text style={styles.bodyText}>
              This is to proudly certify that <Text style={styles.highlightText}>{name}</Text> has successfully completed a professional IT Internship program in the domain of <Text style={styles.highlightText}>{domain}</Text> at NextGen Devbhoomi Foundation. The internship was completed over a duration of <Text style={styles.highlightText}>{duration}</Text> ending on <Text style={styles.highlightText}>{completionDate}</Text>. During the tenure of this internship, the candidate demonstrated exceptional technical proficiency and dedication in completing live project assignments.
            </Text>

            {/* Footer */}
            <View style={styles.footer}>
              {/* QR Verification */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image src={qrCodeUrl} style={styles.qrCode} />
                <View>
                  <Text style={styles.certNumber}>Verify at: nextgendevbhoomi.org/verify</Text>
                  <Text style={[styles.certNumber, { marginTop: 2 }]}>ID: {certificateNumber}</Text>
                </View>
              </View>

              {/* Certificate Number */}
              <View style={styles.certNumberContainer}>
                <Text style={styles.certNumber}>Certificate Number: {certificateNumber}</Text>
                <Text style={[styles.certNumber, { marginTop: 2 }]}>Issued: {new Date().toLocaleDateString()}</Text>
              </View>

              {/* Signature */}
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureText}>Director</Text>
                <Text style={styles.signatureSub}>Authorized Signatory</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
export default CertificateDocument;
