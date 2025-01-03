import { Button } from "@/components/ui/button";
import { socialLogin } from "@/lib/actions/authActions";
import { FaGithub } from "react-icons/fa";

const Github = () => {
  return (
    <Button
      type="submit"
      onClick={() => socialLogin("github")}
      variant="outline"
      className="w-full"
    >
      <FaGithub />
      Login with Github
    </Button>
  );
};

export default Github;
