import { styled } from 'styled-components';
import './Footer.css';
import logo from '../../assets/Logo.svg';

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background-color: var(--color-black);
    padding: 2rem;
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    img {
        width: clamp(30%, 100%, 10.528rem); 
        max-width: 12rem;
        background-color: var(--color-black);
    }
`;

const FooterText = styled.p`
    background-color: transparent;
    font-size: 13px;
    color: var(--color-white);
    margin: 0;
    line-height: 1.4;
    text-align: center;
`;

function Footer() {
    return (
        <StyledFooter className='container'>
            <LogoContainer className='logo'>
                <img src={logo} alt="Logo" />
            </LogoContainer>
            <FooterText className='text'>
                Desarrollado por Ñiura Gutiérrez.
            </FooterText>
        </StyledFooter>
    );
}

export default Footer;