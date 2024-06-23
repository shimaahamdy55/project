import Translate from "../components/ui/Translate"
const About = () => {
    return (
        <main className='text-center container sectionPadding mx-auto'>
            <h2 className='text-4xl mb-10 text-[#1c3383] '><Translate text="About us"/></h2>
            <p className='leading-[2rem] text-[#584e4e]'><Translate text="You don't have to worry about the details. Here, you will find what you want in everything that needs to be clearly defined, as the site provides quick communication with engineering service providers, whether they are offices or engineering companies."/></p>
        </main>
    )
}

export default About