// import { Button } from '../../assets/styles/globalStyles';
import { Slogan, Guideline, HomeContainer, HomeImage } from './Home.elements';
import '../../assets/styles/neumorphism.css';

function Home() {
  return (
    <>
      <HomeContainer>
        <div>
          <Slogan>
            Poll Whatever,
            <br />
            Anywhere
          </Slogan>
          <Guideline>
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit. Diam sit condimentum sit diam.
          </Guideline>
          {/* <Button onClick={null} fontBig primary>
            Get Started
          </Button> */}
          <div className="btn btn__secondary">Get Started</div>
        </div>
        <HomeImage />
      </HomeContainer>
    </>
  );
}

export default Home;
