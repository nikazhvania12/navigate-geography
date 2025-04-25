import Button from 'react-bootstrap/Button';
import '../ComponentStyles/filterComponent.css';
import { useState } from 'react';
import FilterCountryDropdown from './FitlerCountryDropdown';
import GetCountriesFilter from '../../Controllers/Countries/GetCountriesFilter';


function FilterComponent({ setViewCountries, SetError }) {

    const [waterFilterFrom, setWaterFilterFrom] = useState(0);
    const [waterFilterTo, setWaterFilterTo] = useState(100);

    const [resourceFilterFrom, setResourceFilterFrom] = useState(0);
    const [resourceFilterTo, setResourceFilterTo] = useState(100);

    const [populationFilterFrom, setPopulationFilterFrom] = useState(0);
    const [populationFilterTo, setPopulationFilterTo] = useState(100);

    const [fitlerCountryName, setFilterCountryName] = useState("");
    const [isvisible, setVisible] = useState(false);



    const CustomSliderBackgroundFill = (e, color) => {
        const percent = (e.target.value / 100) * 100;
        e.target.style.background = `linear-gradient(to right, ${color} ${percent}%, #e0e0e0 ${percent}%)`;
      };
    
    const handleCountryNameInputChange = (e) => {
        setFilterCountryName(e.target.value);
        setVisible(e.target.value !== '')
    }
    async function handleMultiFilter() {
        if(waterFilterFrom > waterFilterTo || populationFilterFrom > populationFilterTo || resourceFilterFrom > resourceFilterTo)
            return;
        const countries = await GetCountriesFilter(SetError,
            null, waterFilterFrom, resourceFilterFrom, populationFilterFrom, 
            waterFilterTo, resourceFilterTo, populationFilterTo);
        
        setViewCountries(countries);
    }

    return (
        <div className="filter-component-container">
            <div className="filter-component-title">
                <h3>Find Countries to Your Liking</h3>
            </div>
            <div className="filter-component-size-filter-container">
                <div className='filter-range-cont'>
                    <label htmlFor='filter-range'>Filter (From)</label>
                    <label>Filter (To)</label>
                </div>
                <div className='filter-range-cont'>
                    <label htmlFor="water-filter" className='filter-label'>Water Supply:</label>
                    <input type='range' value={waterFilterFrom} onChange={(e) => {
                        setWaterFilterFrom(e.target.value);
                        CustomSliderBackgroundFill(e, "#4b88e3");
                    }} className='filter-range water-filter' />
                    <input type='range' value={waterFilterTo} onChange={(e) => {
                        setWaterFilterTo(e.target.value);
                        CustomSliderBackgroundFill(e, "#4b88e3");
                    }} className='filter-range fill-water water-filter' />
                </div>
                <div className='filter-range-cont'>
                    <label htmlFor="water-filter" className='filter-label'>Resource:</label>
                    <input type='range' value={resourceFilterFrom} onChange={(e) => {
                        setResourceFilterFrom(e.target.value);
                        CustomSliderBackgroundFill(e, "#FCD34D");
                    }} className='filter-range resource-filter' />
                    <input type='range' value={resourceFilterTo} onChange={(e) => {
                        setResourceFilterTo(e.target.value);
                        CustomSliderBackgroundFill(e, "#FCD34D");
                    }} className='filter-range resource-filter fill-resources' />
                </div>
                <div className='filter-range-cont'>
                    <label htmlFor="water-filter" className='filter-label'>Population:</label>
                    <input type='range' value={populationFilterFrom} onChange={(e) => {
                        setPopulationFilterFrom(e.target.value);
                        CustomSliderBackgroundFill(e, "#34D399");
                    }} className='filter-range population-filter' />
                    <input type='range' value={populationFilterTo} onChange={(e) => {
                        setPopulationFilterTo(e.target.value);
                        CustomSliderBackgroundFill(e, "#34D399");
                    }} className='filter-range population-filter fill-population' />
                </div>
                <div className='filter-range-button-container'>
                    <Button onClick={() => handleMultiFilter()} variant='success' className='submit-filter'>Filter</Button>
                </div>
            </div>
            <div className="filterbyname-conatiner">
                <input value={fitlerCountryName} onChange={(e) => handleCountryNameInputChange(e)}
                 className="form-control header-input" type="text" placeholder="Search for a Country.." />
                <button className='filter-dropdown-btn' onClick={() => setVisible(!isvisible)}>
                    <i className="bi bi-box-arrow-down"></i>
                </button>
            </div>

            <FilterCountryDropdown 
            isVisible={isvisible} 
            setVisible={setVisible} 
            filterCountryName={fitlerCountryName} 
            setViewCountries={setViewCountries}
            setFilterCountryName={setFilterCountryName}
            SetError={SetError} />
        </div>
    )
}

export default FilterComponent;