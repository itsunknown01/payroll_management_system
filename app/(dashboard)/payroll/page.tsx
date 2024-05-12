import PayrollClient from "@/components/layouts/payroll/client";
import { PayrollColumn } from "@/components/layouts/payroll/column";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const PayrollPage = async () => {
  const payroll = await db.payroll.findMany();

  const formattedData: PayrollColumn[] = payroll.map((item) => ({
    id: item.id,
    refNo: item.refNo,
    From: formatDate(item.From),
    To: formatDate(item.To),
    status: item.status
  }))

  return (
    <div className="w-full">
      <div className="flex-1 space-y-2 pt-6 p-8 w-full">
        <PayrollClient data={formattedData} />
      </div>
    </div>
  );
};

export default PayrollPage;
