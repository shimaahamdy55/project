import Translate from "../components/ui/Translate"
const About = () => {
  return (
    <main className="text-center container sectionPadding mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32">
      <h2 className="text-4xl text-[#1c3383] sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-10 ">
        <Translate text="About us" />
      </h2>
      <p className="leading-7 sm:leading-8 md:leading-10 lg:leading-[65px] text-lg sm:text-2xl md:text-2xl lg:text-2xl text-[#584e4e]">
        <Translate text="You don't have to worry about the details. Here, you will find what you want in everything that needs to be clearly defined, as the site provides quick communication with engineering service providers, whether they are offices or engineering companies." />
      </p>
    </main>
  )
}

export default About