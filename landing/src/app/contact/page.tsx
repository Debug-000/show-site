import Header from "../global/Header";
import Wrapper from "../global/Wrapper";
import Message from "./components/Message";
import Support from "./components/Support";

export default function Contact() {
  return (
    <Wrapper>
      <Header
        title="Contact Us"
        description="Contact us for any inquiries, feedback, or support. We are here to help
        you with your needs. Whether you have questions about our services or
        need assistance, feel free to reach out."
      />

      <Support />
      <Message />
    </Wrapper>
  );
}
