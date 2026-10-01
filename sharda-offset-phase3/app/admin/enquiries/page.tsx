export const dynamic = "force-dynamic";
export const revalidate = 0;
import { prisma } from "@/lib/prisma";
import EnquiryStatusForm from "@/components/admin/EnquiryStatusForm";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: { service: true, sample: true },
  });
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[#6e665f]">Customer enquiries</p>
        <h1 className="mt-1 text-3xl font-semibold">Enquiries</h1>
      </div>
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="divide-y divide-black/10">
          {enquiries.length ? (
            enquiries.map((item) => (
              <article key={item.id} className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#6e665f]">
                      {item.phone}
                      {item.email ? ` · ${item.email}` : ""}
                    </p>
                    <p className="mt-3 text-sm">
                      <strong>Service:</strong>{" "}
                      {item.service?.name || "Custom requirement"}
                    </p>
                    <p className="text-sm">
                      <strong>Sample:</strong> {item.sample?.title || "None"}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-[#403a35]">
                      {item.message}
                    </p>
                  </div>
                  <EnquiryStatusForm id={item.id} status={item.status} />
                </div>
              </article>
            ))
          ) : (
            <p className="p-8 text-sm text-[#6e665f]">No enquiries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
