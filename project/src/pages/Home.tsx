import CompaniesSlider from '../components/companies/CompaniesSlider'
import Footer from '../components/layout/footer/Footer'
import HeaderSlider from '../components/layout/header/HeaderSlider'
import Navbar from '../components/layout/header/Navbar'

const Home = () => {
    return (
        <>
            <Navbar />
            <HeaderSlider />
            <CompaniesSlider />
            <Footer />
        </>
    )
}

export default Home