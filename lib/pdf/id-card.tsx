import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#071826",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  card: {
    width: 250,
    height: 400,
    backgroundColor: "#0F2233",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F97316",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A4C",
    width: "100%",
    paddingBottom: 10,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
  },
  subtitle: {
    fontSize: 9,
    color: "#F97316",
    marginTop: 2,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#1E3A4C",
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#071826",
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 3,
  },
  internId: {
    fontSize: 9,
    color: "#F97316",
    fontFamily: "Helvetica",
    marginBottom: 10,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 7,
    color: "#7F8C8D",
    fontFamily: "Helvetica-Bold",
  },
  detailValue: {
    fontSize: 7,
    color: "#EAF2F8",
    fontFamily: "Helvetica",
    textAlign: "right",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#1E3A4C",
    paddingTop: 10,
  },
  qrCode: {
    width: 45,
    height: 45,
  },
  signatureContainer: {
    alignItems: "center",
  },
  signatureLabel: {
    fontSize: 6,
    color: "#7F8C8D",
    marginTop: 3,
  },
});

interface IDCardProps {
  name: string;
  internId: string;
  domain: string;
  duration: string;
  photoUrl: string;
  qrCodeUrl: string;
  logoUrl?: string;
}

export function IDCardDocument({
  name,
  internId,
  domain,
  duration,
  photoUrl,
  qrCodeUrl,
  logoUrl = "https://res.cloudinary.com/dmc9caq5i/image/upload/v1718250000/logo.jpg"
}: IDCardProps) {
  return (
    <Document>
      <Page size={[280, 430]} style={styles.page}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>NextGen Devbhoomi</Text>
            <Text style={styles.subtitle}>Intern Identity Card</Text>
          </View>

          {/* Photo */}
          <View style={styles.photoContainer}>
            <Image src={photoUrl} style={styles.photo} />
          </View>

          {/* Intern Name & ID */}
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.internId}>{internId}</Text>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Domain:</Text>
              <Text style={styles.detailValue}>{domain}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration:</Text>
              <Text style={styles.detailValue}>{duration}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valid Until:</Text>
              <Text style={styles.detailValue}>
                {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Footer with QR Code */}
          <View style={styles.footer}>
            <Image src={qrCodeUrl} style={styles.qrCode} />
            <View style={styles.signatureContainer}>
              <Text style={{ fontSize: 7, color: "#ffffff", fontFamily: "Helvetica-Bold" }}>Director</Text>
              <Text style={styles.signatureLabel}>Authorized Sign</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
export default IDCardDocument;
