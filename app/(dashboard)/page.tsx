import { Card } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { auth } from "@/services/next-auth/auth";

export default async function Home() {
  const session = await auth();
  const name = session?.user.name?.split(' ') as Array<string>
  const UserName = name[0]

  return (
    <div className="w-full">
      <Card className="m-4 flex items-center justify-center max-w-full shadow-none">
        <Heading title={`Welcome back ${UserName}`} className="text-center gap-0 py-2" />
      </Card>
    </div>  
  );
}
