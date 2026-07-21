import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";

// Plantilla placeholder: estructura y datos correctos, sin diseño de marca
// todavía. El formato visual final (logo, colores, tipografía) se aplica
// después sobre este mismo componente.
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#312f4e",
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#605e6b",
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 120,
    color: "#605e6b",
  },
  value: {
    flex: 1,
  },
  table: {
    marginTop: 8,
    borderTop: "1pt solid #eef0f5",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #312f4e",
    paddingVertical: 6,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #eef0f5",
    paddingVertical: 6,
  },
  colSeverity: { width: "20%" },
  colArea: { width: "25%", textAlign: "right" },
  colRate: { width: "25%", textAlign: "right" },
  colSubtotal: { width: "30%", textAlign: "right" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    paddingTop: 12,
    borderTop: "2pt solid #312f4e",
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 700,
    marginRight: 8,
  },
  totalValue: {
    fontSize: 13,
    fontWeight: 700,
  },
  footer: {
    marginTop: 40,
    fontSize: 9,
    color: "#8a8a97",
  },
});

const currency = (value) =>
  `$${Number(value).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function ProposalPdfTemplate({ proposal }) {
  const {
    client_name: clientName,
    client_address: clientAddress,
    total,
    created_at: createdAt,
    items = [],
  } = proposal;

  const date = createdAt ? new Date(createdAt) : new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Propuesta de Reparación de Grietas</Text>
        <Text style={styles.subtitle}>
          GP77 — Gerencia y Proyectos · {date.toLocaleDateString("es-VE")}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{clientName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Dirección</Text>
            <Text style={styles.value}>{clientAddress}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Desglose del Presupuesto</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colSeverity}>Tipo</Text>
              <Text style={styles.colArea}>m²</Text>
              <Text style={styles.colRate}>Precio/m²</Text>
              <Text style={styles.colSubtotal}>Subtotal</Text>
            </View>

            {items.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.colSeverity}>
                  {item.label ? `${item.severity} — ${item.label}` : item.severity}
                </Text>
                <Text style={styles.colArea}>{item.area_m2}</Text>
                <Text style={styles.colRate}>{currency(item.rate_snapshot)}</Text>
                <Text style={styles.colSubtotal}>{currency(item.subtotal)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{currency(total)}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Presupuesto generado automáticamente por el sistema interno de GP77.
          Los montos están sujetos a verificación en sitio.
        </Text>
      </Page>
    </Document>
  );
}
