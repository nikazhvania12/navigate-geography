import homeLogo from '../../Resources/homeLogo.png';
import '../ComponentStyles/Home.css';
import CountryDisplayComponent from '../HelperComponents/CountryDisplayComponent';
import FilterComponent from '../HelperComponents/FilterComponent';

function Home({viewCountries, setViewCountries, SetIsFullSizeMapVisible, SetError}) {
    return (
        <div className='homePage-container'>
            <div className='title-page'>
                <img src={homeLogo} className='logo' alt='home'/>
                <h2 className='web-title'>Make Geography Your Domain</h2>
                <h5>
                Our Administrators Use:
                {"\u00A0"}<b>(</b> 
                {"\u00A0"}
                <a className='home-title-link water-link' rel="noopener noreferrer" href='https://www.fao.org/aquastat/en/' target="_blank">
                FAO AQUASTAT
                </a>, 
                {"\u00A0"} 
                <a className='home-title-link resource-link' rel="noopener noreferrer" target="_blank" href='https://www.cia.gov/the-world-factbook/'>
                CIA World Factbook
                </a>, 
                {"\u00A0"} 
                <a className='home-title-link resource-link' rel="noopener noreferrer" target="_blank" href=' https://worldpopulationreview.com/country-rankings/natural-resources-by-country'>
                World Population Review
                </a>, 
                {"\u00A0"} 
                <a className='home-title-link population-link' rel="noopener noreferrer" target="_blank" href='https://data.worldbank.org/indicator/SP.POP.TOTL'>
                World Bank</a>
                {"\u00A0"} and {"\u00A0"} 
                <a className='home-title-link population-link' rel="noopener noreferrer" target="_blank" href='https://data.un.org/Search.aspx?q=population'>
                UN Data</a> 
                {"\u00A0"}
                <b>)</b>
                {"\u00A0"}
                to provide the most credible, expertly synthesized information — <b>for your comfort and confidence.</b>
                </h5>
            </div>
            <div className='country-logic-container'>
                <div className='country-logic'>
                    <FilterComponent setViewCountries={setViewCountries} SetError={SetError} />
                    <CountryDisplayComponent viewCountries={viewCountries} SetIsFullSizeMapVisible={SetIsFullSizeMapVisible} />
                </div>
            </div>
        </div>
    )
} 

export default Home;