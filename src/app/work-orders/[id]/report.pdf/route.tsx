import { pdf } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { ServiceReportPdf } from "@/features/reports/service-report-pdf";
import { getWorkOrderById } from "@/features/work-orders/data";

type ReportPdfRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: ReportPdfRouteProps) {
  const { id } = await params;
  const context = await getCurrentUserContext();
  const workOrder = await getWorkOrderById(context.organization.id, id);

  if (!workOrder) {
    return new NextResponse("Work order not found", { status: 404 });
  }

  if (workOrder.serviceReports.length === 0) {
    return new NextResponse("No service report generated", { status: 400 });
  }

  const blob = await pdf(<ServiceReportPdf workOrder={workOrder} />).toBlob();
  const arrayBuffer = await blob.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="service-report-${workOrder.id}.pdf"`,
    },
  });
}