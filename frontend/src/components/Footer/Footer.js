import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FooterContainer, SocialMediaWrap, SocialLogo, SocialIcon, WebsiteRights, SocialIcons, SocialIconLink } from './Footer.elements';

const Footer = () => {
  return (
    <FooterContainer>
      <hr />
      <SocialMediaWrap>
        <SocialLogo to="/">
          <SocialIcon />
          Pollar
        </SocialLogo>
        <WebsiteRights>Pollar © 2022</WebsiteRights>
        <SocialIcons>
          <SocialIconLink href="/" target="_blank" aria-label="Facebook">
            <FaFacebook />
          </SocialIconLink>
          <SocialIconLink href="/" target="_blank" aria-label="Instagram">
            <FaInstagram />
          </SocialIconLink>
          <SocialIconLink
            href={'//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Youtube"
          >
            <FaYoutube />
          </SocialIconLink>
          <SocialIconLink href="/" target="_blank" aria-label="Twitter">
            <FaTwitter />
          </SocialIconLink>
          <SocialIconLink href="/" target="_blank" aria-label="LinkedIn">
            <FaLinkedin />
          </SocialIconLink>
        </SocialIcons>
      </SocialMediaWrap>
    </FooterContainer>
  );
};

export default Footer;
