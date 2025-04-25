import '../ComponentStyles/countryDisplayComponent.css'
import WorldMap from './WorldMap'

function CountryDisplayComponent({ viewCountries, SetIsFullSizeMapVisible }) {


    return (
        <div className="country-display-container">
            {viewCountries === null ? 
            <DefaultCountryView /> : 
            ((viewCountries.length === 1 && !viewCountries[0].multi_search) ? 
            <SingleCountryView viewCountries={viewCountries} SetIsFullSizeMapVisible={SetIsFullSizeMapVisible}/> :
            <MultiCountryView viewCountries={viewCountries} SetIsFullSizeMapVisible={SetIsFullSizeMapVisible} /> )}
        </div>
    )
}

function DefaultCountryView() {
    return (
        <div className='default-view-country'>
            <h2>Search For a Country</h2>
        </div>
    )
}

function SingleCountryView({ viewCountries, SetIsFullSizeMapVisible }) {

    const country = viewCountries ? viewCountries[0] : null
    return (
        country &&
        <div className='single-country-view'>
            <div className='single-country-view-top'>
                <div className='single-country-top-left'>
                <div className='country-view-display'>
                    <img src={country.additional_info.flag_path} alt='country_flag' className='display-image' />
                    {"\u00A0"}
                    {"\u00A0"}
                    {"\u00A0"}
                    {"\u00A0"}
                    <h3>{country.name}</h3>
                </div>
                <h5>{country.additional_info.key_fact}</h5>
                </div>
                <div className='display-map-container' onClick={() => SetIsFullSizeMapVisible(true)}>
                    <WorldMap selectedCountries={viewCountries} />
                </div>
            </div>
            <div className='single-country-view-content'>
                <h5>{country.additional_info.description}</h5>
            </div>
            <div className='single-country-view-additionalinfo'>
                <h6 className='water-supply'>Water Supply ~ {country.water_supply / 1000000} Million km³/year</h6>
                <h6 className='resources'>Resource: {country.resources}/100</h6>
                <h6 className='population'>Population ~ {country.population / 1000000} Million</h6>
            </div>
        </div>
    )
}

function MultiCountryView({ viewCountries, SetIsFullSizeMapVisible }) {
    return (
        <div className='multi-country-world-map' onClick={() => SetIsFullSizeMapVisible(true)}>
            <WorldMap selectedCountries={viewCountries} />
        </div>
    )
}

export default CountryDisplayComponent;