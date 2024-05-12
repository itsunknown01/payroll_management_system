import Link from "next/link";

import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CardWrapper, { CardWrapperProps } from "@/components/wrappers/cardWrapper";
import Heading from "@/components/ui/heading";
import SocialLogin from "../buttons/socialLogin";

interface AuthWrapperProps extends CardWrapperProps {
  heading: string;
  description: string;
  backButtonLink: string;
  backButtonTitle: string;
  showSocial: boolean;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  return (
    <CardWrapper className={props.className}>
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
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={props.backButtonLink}>{props.backButtonTitle}</Link>
        </Button>
      </CardFooter>
    </CardWrapper>
  );
};

export default AuthWrapper;
