"use client";
import PageComponent from "@/components/PageComponent";
import Settings from "@/components/Settings";
import { Inputs } from "@/lib/@types/formType";
import { addMonths, formatDate } from "date-fns";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function Home() {
  const methods = useForm<Inputs>({
    defaultValues: {
      title: "Quarter Life",
      startDate: formatDate(new Date(), "yyyy-MM-dd"),
      endDate: formatDate(addMonths(new Date(), 3), "yyyy-MM-dd"),
      color: "#CCFF73",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    handleDownloadPDF();
  };

  const pageRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!pageRef.current) return;

    // Capture the page as an image
    const canvas = await html2canvas(pageRef.current, { scale: 4 });
    const imgData = canvas.toDataURL("image/png");

    // Create a PDF
    const pdf = new jsPDF("portrait", "mm", "a4");
    const imgWidth = 210; // A4 width in mm

    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // Save the PDF
    pdf.save("CalendarPal.pdf");
  };
  return (
    <div className="m-12">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-12 justify-center">
            {/* PageComponent to be printed */}
            <div
              ref={pageRef}
              className="print:block"
              style={{ pageBreakInside: "avoid", pageBreakAfter: "always" }}
            >
              <PageComponent />
            </div>

            {/* Settings hidden during print */}
            <div className="print:hidden">
              <Settings />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
