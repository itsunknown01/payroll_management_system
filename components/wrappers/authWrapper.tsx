import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CardWrapper, {
  CardWrapperProps,
} from "@/components/wrappers/cardWrapper";
import Heading from "@/components/ui/heading";
import SocialLogin from "../buttons/socialLogin";
import Image from "next/image";

interface AuthWrapperProps extends CardWrapperProps {
  heading: string;
  description: string;
  backButtonLink: string;
  backButtonTitle: string;
  showSocial?: boolean;
  image?: boolean;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  return (
    <CardWrapper className={props.className}>
      {props.image && (
        <Image
          src="/Payroll.jpeg"
          alt="front image"
          width={400}
          height={200}
          className="rounded-lg"
        />
      )}
      <Card>
        <CardHeader>
          <Heading title={props.heading} description={props.description} />
        </CardHeader>
        <CardContent>{props.children}</CardContent>
        {props.showSocial && (
          <CardFooter>
            <SocialLogin />
          </CardFooter>
        )}
        <CardFooter>
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link href={props.backButtonLink}>{props.backButtonTitle}</Link>
          </Button>
        </CardFooter>
      </Card>
    </CardWrapper>
  );
};

export default AuthWrapper;
