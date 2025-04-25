import { useEffect, useState } from 'react'
import '../ComponentStyles/manage.css'
import GetCountriesFilter from '../../Controllers/Countries/GetCountriesFilter'
import { Button } from 'react-bootstrap';
import UpdateCountry from '../../Controllers/Countries/UpdateCountry';


function Manage({ currentUser, SetError }) {
    const [displayCountries, setDisplayCountries] = useState([]);
    const [countriesInitial, setCountriesInitial] = useState([]);

    useEffect(() => {
        GetCountriesForTable()
    
        async function GetCountriesForTable() {
            const resp = await GetCountriesFilter(SetError, '')
            setDisplayCountries(resp);
            setCountriesInitial(resp);
        }
    }, [SetError])

    return (
        currentUser ? <Authorized 
        currentUser={currentUser} 
        displayCountries={displayCountries} setDisplayCountries={setDisplayCountries} 
        countriesInitial={countriesInitial} setCountriesInitial={setCountriesInitial}
        SetError={SetError}
        /> : <UnAuthorized />
    )
}

function UnAuthorized() {
    return (
        <div className="unauthorized-user">
            <h2>You are Not Allowed to Access This Page</h2>
        </div>
    )
}

function Authorized({currentUser, displayCountries, setDisplayCountries, countriesInitial, setCountriesInitial, SetError}) {

    async function SendCountryUpdate(countryToUpdate) {
        await UpdateCountry(countryToUpdate, SetError);
        const countries = await GetCountriesFilter(SetError, '');
        setDisplayCountries(countries);
        setCountriesInitial(countries);
    }

    return (
        currentUser &&
        <div className="authorized-container">
            <div className="manage-title">
                <h3>Hello, {currentUser.username}</h3>
                <br />
                <h6>This Page is Created to Help you Display Country Data Correctly</h6 >
            </div>
            <div className="manage-table">
                <div className='manage-table-cont titles'>
                    <h6 style={{width: '5%', borderLeft: '1px solid black'}}>ID</h6>
                    <h6 style={{width: '8%'}}>Flag</h6>
                    <h6 style={{width: '10%'}}>Country</h6>
                    <h6 style={{width: '15%'}}>Water Supply</h6>
                    <h6 style={{width: '10%'}}>Resources</h6>
                    <h6 style={{width: '10%'}}>Population</h6>
                    <h6 style={{width: '20%'}}>Description</h6>
                    <h6 style={{width: '9%'}}>Is Third World</h6>
                    <h6 style={{width: '13%'}}>Key Fact</h6>
                    <h6 style={{width: '10%'}}>Action</h6>
                </div>
                <div className='manage-table-content'>
                    {displayCountries && displayCountries.map((country, index) =>{
                        const countryInitial = countriesInitial.find(x => x.id === country.id);
                        return (
                            <div key={index} className='manage-table-cont'> 
                                <h6 style={{width: '5%', borderLeft: '1px solid black'}}>{country.id}</h6>
                                <h6 style={{width: '8%'}}><img className='manage-flag' alt='flag' src={country.additional_info.flag_path}  /></h6>
                                <h6 style={{width: '10%'}}>{country.name}</h6>
                                <ManageComp country={country} width={'15%'} content={country.water_supply} 
                                    setDisplayCountries={setDisplayCountries} countryInitial={countryInitial}/>

                                <ManageComp country={country} width={'10%'} content={country.resources} 
                                    setDisplayCountries={setDisplayCountries} countryInitial={countryInitial}/>
                                
                                <ManageComp country={country} width={'10%'} content={country.population} 
                                    setDisplayCountries={setDisplayCountries} countryInitial={countryInitial}/>

                                <ManageComp country={country} width={'20%'} content={country.additional_info.description} 
                                    setDisplayCountries={setDisplayCountries} countryInitial={countryInitial}/>

                                <ManageComp country={country} width={'9%'} content={country.additional_info.is3rdworld ? "Yes" : "No"} 
                                    setDisplayCountries={setDisplayCountries} countryInitial={countryInitial}/>
                                <ManageComp country={country} width={'13%'} content={country.additional_info.key_fact} 
                                    setDisplayCountries={setDisplayCountries} countryInitial={countryInitial}/>

                                <h6 style={{width: '10%'}}>
                                    {country.action ? 
                                        <Button onClick={() => SendCountryUpdate(country)} 
                                        variant='outline-success' className='manage-edit_button'>
                                            Submit
                                        </Button> : ''}
                                </h6>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Manage;

function ManageComp({ country, width, content, setDisplayCountries, countryInitial }) {

    useEffect(() => {setIsInput(false)}, [countryInitial])

    const [isInput, setIsInput] = useState(false);
    function ChangeInput(e) {   
        if(content === country.water_supply)
            setDisplayCountries(prev => 
                prev.map(c => c.id === country.id ? {...c, water_supply: parseInt(e.target.value) } : c));

        else if (content === country.resources)
            setDisplayCountries(prev => 
                prev.map(c => c.id === country.id ? {...c, resources: parseInt(e.target.value) } : c));

        else if (content === country.additional_info.description) 
            setDisplayCountries(prev => 
                prev.map(c => c.id === country.id ? {...c, additional_info: {...c.additional_info, description: e.target.value}} : c));

        else if (content === country.population)
            setDisplayCountries(prev => 
                prev.map(c => c.id === country.id ? {...c, population: parseInt(e.target.value) } : c));
            
        else if (content === (country.additional_info.is3rdworld ? "Yes" : "No")) {
            setDisplayCountries(prev => 
                prev.map(c => c.id === country.id ? 
                    {...c, additional_info: {...c.additional_info, is3rdworld: e.target.value === "Yes" ? true : false} } : c));
        }

        else if (content === country.additional_info.key_fact)
            setDisplayCountries(prev => 
                prev.map(c => c.id === country.id ? {...c, additional_info: {...c.additional_info, key_fact: e.target.value} } : c));
                
                
        setDisplayCountries(prev => prev.map(c => c.id === country.id ? 
            {...c, action: !CompareCountries(c, countryInitial)} : c))     
            
        function CompareCountries(c1, c2) {
            return c1.water_supply === c2.water_supply &&
                c1.resources === c2.resources &&
                c1.population === c2.population &&
                c1.additional_info.description === c2.additional_info.description &&
                c1.additional_info.is3rdworld === c2.additional_info.is3rdworld &&
                c1.additional_info.key_fact === c2.additional_info.key_fact;
        }
    }
    return (
        isInput ? (
            <div style={{width: width}} className='manage-input-cont'>
                {content === (country.additional_info.is3rdworld ? "Yes" : "No") ?
                    <select value={content} 
                    style={{textAlign: "center"}}                    
                    onChange={(e) => ChangeInput(e)} 
                    className='form-control manage-inp'>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    :
                    <input value={content}                    
                    onChange={(e) => ChangeInput(e)} 
                    className='form-control manage-inp'/>
                }
            </div>
        )
        :
        <h6 onClick={() => setIsInput(true)} className="manage-content" style={{width: width}}>
            {content.toString().length > 30 ? `${content.substring(0, 30)}...` : content}
            </h6>
    )
}