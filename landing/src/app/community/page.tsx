import Header from "../global/Header";
import Wrapper from "../global/Wrapper";
import ContributinGuide from "./components/ContributionGuide";
import Discussions from "./components/Discussions";

export default function Community() {
  return (
    <Wrapper>
      <Header
        title="Community"
        description="Join our community and contribute to the open-source projects. We
        welcome all developers, designers, and enthusiasts to participate in
        discussions, share ideas, and collaborate on projects. Check out our
        contribution guide and join the discussions to get started!"
      />

      <ContributinGuide />
      <Discussions />
    </Wrapper>
  );
}
