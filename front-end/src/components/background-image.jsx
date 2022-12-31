import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  filter: brightness(brightness%);
  img {
    height: 100vh;
    width: 100vw;
  }
`;

const BackgroundImage = (props) => {
    const src = props.image;
    const alt = props.altText;
    const brightness = props.brightness;

    return (
        <Container brightness={brightness}>
            <img src={src} alt={alt} />
        </Container>
    );
};

BackgroundImage.defaultProps = {
    image: "https://assets.nflxext.com/ffe/siteui/vlv3/f669a8f4-de1e-49d7-bb56-c9bd1f4a9069/64e98c27-6859-4f50-b5f0-f1b2b82d6aab/GB-en-20221031-popsignuptwoweeks-perspective_alpha_website_small.jpg",
    brightness: 100,
    altText: "Background image with movie posters",
}

export default BackgroundImage;
