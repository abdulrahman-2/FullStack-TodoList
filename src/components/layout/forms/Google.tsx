import { Button } from "@/components/ui/button";
import { socialLogin } from "@/lib/actions";
import { FaGoogle } from "react-icons/fa";

const Google = () => {
  return (
    <Button
      onClick={() => socialLogin("google")}
      variant="outline"
      className="w-full"
    >
      <FaGoogle />
      Login with Google
    </Button>
  );
};

export default Google;
