import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import logo from "../../assets/img/LogoGP.png";

// Plantilla calcada del membrete real de GP77 (ver "Oferta de Servicios"
// de Proyecto de Arquitectura y Diseño Interior): encabezado con razón
// social + RIF, marca de agua del logo, bloque de portada centrado,
// tabla de inversión con fila de total sombreada, y pie de página con
// dirección/teléfonos en cada página.
const COMPANY = {
  name: "GERENCIA Y PROYECTOS 77, CA",
  rif: "J-31734617-3",
  address:
    "Avenida Ppal de Los Cortijos. Centro Empresarial Senderos. Piso 3. Oficina 303-A",
  phones: "Telfs. 0414-202.19.32 / 0414-160.03.05",
};

const SEVERITY_LABELS = { A: "Leve", B: "Moderada", C: "Grave" };

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const formatFecha = (date) =>
  `Caracas, ${date.getDate()} de ${MESES[date.getMonth()]} de ${date.getFullYear()}`;

const currency = (value) =>
  `$${Number(value || 0).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 50,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  headerName: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textDecoration: "underline",
  },
  headerRif: {
    fontSize: 9,
    color: "#444444",
  },
  watermark: {
    position: "absolute",
    top: 230,
    left: 176,
    width: 260,
    height: 260,
    opacity: 0.1,
  },
  coverBlock: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  coverEyebrow: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 2,
  },
  coverTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 26,
  },
  coverClient: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  coverAddress: {
    fontSize: 11,
    textAlign: "center",
    color: "#333333",
    marginBottom: 30,
  },
  coverDate: {
    fontSize: 10.5,
    textAlign: "center",
  },
  intro: {
    fontSize: 10.5,
    lineHeight: 1.5,
    marginBottom: 18,
    textAlign: "justify",
  },
  sectionLabel: {
    fontSize: 10.5,
    marginBottom: 8,
  },
  table: {
    borderWidth: 1,
    borderColor: "#999999",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderBottomColor: "#999999",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  tableTotalRow: {
    flexDirection: "row",
    backgroundColor: "#e8e8e8",
  },
  th: {
    padding: 7,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  td: {
    padding: 7,
    fontSize: 10,
  },
  colDetail: { width: "46%" },
  colArea: { width: "14%", textAlign: "center" },
  colRate: { width: "18%", textAlign: "right" },
  colSubtotal: { width: "22%", textAlign: "right" },
  totalLabel: {
    width: "78%",
    padding: 7,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    textAlign: "right",
  },
  totalValue: {
    width: "22%",
    padding: 7,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    textAlign: "right",
  },
  note: {
    marginTop: 18,
    fontSize: 9,
    color: "#555555",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: "#999999",
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    textAlign: "center",
    color: "#444444",
  },
});

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
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Text style={styles.headerName}>{COMPANY.name}</Text>
          <Text style={styles.headerRif}>{COMPANY.rif}</Text>
        </View>

        <Image src={logo} style={styles.watermark} fixed />

        <View style={styles.coverBlock}>
          <Text style={styles.coverEyebrow}>OFERTA DE SERVICIOS</Text>
          <Text style={styles.coverTitle}>REPARACIÓN DE GRIETAS</Text>
          <Text style={styles.coverClient}>{clientName}</Text>
          <Text style={styles.coverAddress}>{clientAddress}</Text>
          <Text style={styles.coverDate}>{formatFecha(date)}</Text>
        </View>

        <Text style={styles.intro}>
          Por medio de la presente sometemos a su consideración la oferta de
          servicios para la reparación de grietas detectadas en el inmueble
          de {clientName}, ubicado en {clientAddress}. Esta oferta comprende
          el diagnóstico y presupuesto de reparación de las grietas
          evaluadas, clasificadas según su nivel de severidad, con el
          desglose de costos correspondiente.
        </Text>

        <Text style={styles.sectionLabel}>
          La inversión para la realización del servicio es:
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, styles.colDetail]}>Tipo de grieta</Text>
            <Text style={[styles.th, styles.colArea]}>m²</Text>
            <Text style={[styles.th, styles.colRate]}>Precio/m²</Text>
            <Text style={[styles.th, styles.colSubtotal]}>Subtotal</Text>
          </View>

          {items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.td, styles.colDetail]}>
                {item.severity} — {item.label || SEVERITY_LABELS[item.severity] || ""}
              </Text>
              <Text style={[styles.td, styles.colArea]}>{item.area_m2}</Text>
              <Text style={[styles.td, styles.colRate]}>{currency(item.rate_snapshot)}</Text>
              <Text style={[styles.td, styles.colSubtotal]}>{currency(item.subtotal)}</Text>
            </View>
          ))}

          <View style={styles.tableTotalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{currency(total)}</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Presupuesto sujeto a verificación en sitio. Los montos pueden variar
          según las condiciones reales del inmueble al momento de la
          intervención.
        </Text>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Dirección: {COMPANY.address}</Text>
          <Text style={styles.footerText}>{COMPANY.phones}</Text>
        </View>
      </Page>
    </Document>
  );
}
