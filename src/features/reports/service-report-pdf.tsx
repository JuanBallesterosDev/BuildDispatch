import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

type ServiceReportPdfProps = {
  workOrder: {
    title: string;
    description: string | null;
    status: string;
    priority: string;
    completedAt: Date | null;
    client: {
      name: string;
      contactName: string | null;
      phone: string | null;
      email: string | null;
    };
    jobSite: {
      name: string;
      address: string;
      city: string | null;
      province: string | null;
      postalCode: string | null;
    };
    fieldNotes: {
      body: string;
      createdAt: Date;
      author: {
        name: string;
      };
    }[];
    materialUsages: {
      quantity: number;
      material: {
        name: string;
        unit: string;
      };
    }[];
    serviceReports: {
      summary: string;
      createdAt: Date;
    }[];
  };
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    color: "#0f172a",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
  },
  brand: {
    fontSize: 10,
    color: "#1d4ed8",
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 6,
    color: "#475569",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 6,
  },
  label: {
    width: 90,
    color: "#64748b",
  },
  value: {
    flex: 1,
  },
  box: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    marginBottom: 8,
  },
  noteMeta: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 9,
  },
});

function formatDate(date: Date | null) {
  if (!date) return "Not completed";
  return date.toLocaleDateString("en-CA");
}

export function ServiceReportPdf({ workOrder }: ServiceReportPdfProps) {
  const latestReport = workOrder.serviceReports[0];

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.brand}>BUILDDISPATCH</Text>
          <Text style={styles.title}>Service Report</Text>
          <Text style={styles.subtitle}>{workOrder.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Order</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{workOrder.status}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Priority</Text>
            <Text style={styles.value}>{workOrder.priority}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Completed</Text>
            <Text style={styles.value}>{formatDate(workOrder.completedAt)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{workOrder.client.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.value}>{workOrder.client.contactName ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{workOrder.client.phone ?? "N/A"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Site</Text>
          <Text>{workOrder.jobSite.name}</Text>
          <Text style={styles.subtitle}>
            {workOrder.jobSite.address}
            {workOrder.jobSite.city ? `, ${workOrder.jobSite.city}` : ""}
            {workOrder.jobSite.province ? `, ${workOrder.jobSite.province}` : ""}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text>{workOrder.description ?? "No description provided."}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Field Notes</Text>
          {workOrder.fieldNotes.length === 0 ? (
            <Text>No field notes recorded.</Text>
          ) : (
            workOrder.fieldNotes.map((note, index) => (
              <View style={styles.box} key={`${note.author.name}-${index}`}>
                <Text>{note.body}</Text>
                <Text style={styles.noteMeta}>
                  {note.author.name} · {formatDate(note.createdAt)}
                </Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Materials Used</Text>
          {workOrder.materialUsages.length === 0 ? (
            <Text>No materials logged.</Text>
          ) : (
            workOrder.materialUsages.map((usage, index) => (
              <Text key={`${usage.material.name}-${index}`}>
                {usage.quantity} {usage.material.unit} · {usage.material.name}
              </Text>
            ))
          )}
        </View>

        {latestReport ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Generated Summary</Text>
            <Text>{latestReport.summary}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}