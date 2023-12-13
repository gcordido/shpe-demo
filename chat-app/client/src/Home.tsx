import img from './assets/SHPELogo.webp';
import MicrosoftLogo from './assets/MicrosoftLogo.svg';
import './styles/Home.css';
import { Button } from '@fluentui/react-components';

export const Home = () => {
    return (
        <section className='home'>
            <Logos />
            <DemoTypes />
        </section>
    )
}

const Logos = () => {
    return (
        <section className='logos'>
            <img src={img} id='shpeLogo' alt="SHPE Logo" />
            <h1 id="shpeTitle">SHPE Chat</h1>
            <section id="msft">
                <p id="msftPowered">Powered by</p>
                <img src={MicrosoftLogo} id='msftLogo' alt="SHPE Logo" />
            </section>
        </section>
    )
}

const DemoTypes = () => {
    return (
        <section className='demoTypes'>
            <ul>
                <li><DemoTypeButton type='Simple'/></li>
                <li><DemoTypeButton type='Full'/></li>
            </ul>
        </section>
    )
}

const DemoTypeButton = (props: { type: 'Simple' | 'Full' }) => {
    return (
        <a href={`/${props.type.toLowerCase()}-chat`} tabIndex={-1}>
            <Button shape='circular' appearance='outline' size='large'>{props.type} Chat</Button>
        </a>
    )
}