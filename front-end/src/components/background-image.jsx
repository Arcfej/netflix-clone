import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;

const BackgroundImage = () => {
    return (
        <Container>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f669a8f4-de1e-49d7-bb56-c9bd1f4a9069/64e98c27-6859-4f50-b5f0-f1b2b82d6aab/GB-en-20221031-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="Background image with movie posters"/>
        </Container>
    );
};

export default BackgroundImage;
