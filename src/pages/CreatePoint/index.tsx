
import React, {useEffect, useState, ChangeEvent} from 'react';
import {Link} from 'react-router-dom'; 
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import {LeafletMouseEvent, LeafletEvent} from 'leaflet';
import {Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg'
//arry ou objeto: manualmente informar o tipo da variavel

interface Item{
    id: number;
    title:string;
    image_url:string;
}
interface IBGEUFResponse{
    sigla: string;
}
interface IBGECityResponse{
    nome: string;
}
const CreatePoint = ()=>{
    //buscando todos os items do formulario
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs]= useState<string[]>([]);
    const [cities, setCities]= useState<string[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const[formData, setFormData]=useState({
        name:  '',
        email:'',
        whatsapp:'',
    });
    
    const [selectdUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity]= useState('0');
    const [selectedPosition, setSelectPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    useState(()=>{
        navigator.geolocation.getCurrentPosition(position=>{
           const{latitude, longitude}=position.coords;
           setInitialPosition([latitude, longitude]);
        })
    })

    useEffect(()=>{
        api.get('items').then(response=>{
            setItems(response.data);
        });
    }, []);

    //buscando api do ibge para buscar estados e cidedade
    useEffect(()=>{
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response=>{
            const ufInitials = response.data.map(uf=>uf.sigla);
            setUfs(ufInitials);
        });
    },[]);
    useEffect(()=>{
        //CARREGAR AS CIDADE SEMPRE QUE A UF MUDAR 
        // o segunda arry de uma função useEffect determina quanda essa função vai ser execultada 
        if(selectdUf === '0'){
            return;
        }
        axios
        .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectdUf}/municipios`)
        .then(response =>{
            const cityNames = response.data.map(city=>city.nome);
            setCities(cityNames);
        });
    }, [selectdUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        setSelectedUf(uf);

    }
    
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
       const city = event.target.value;

       setSelectedCity(city);
    }
    function handleMapClick(event: LeafletMouseEvent){
       setSelectPosition([ event.latlng.lat,
        event.latlng.lng,
    ])
    }
    function handleInputChange(event:ChangeEvent<HTMLInputElement>){ 
        const{name, value} =event.target;

        setFormData({ ...formData, [name]:value});

    }
    function handleSelectItem(id: number){
        const alreadySelected = selectedItems.findIndex(item=>item===id);
        if (alreadySelected>=0){
            const filteredItems = selectedItems.filter(item=>item!==id);

            setSelectedItems(filteredItems);

        }else{
            setSelectedItems([ ...selectedItems,id]);
        }
       
    }
    function handleSubbmit(){
        
    }

    return(
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft/>
                    volta para a home
                </Link>
            </header>

            <form>
            <h1>Cadastro do<br/> ponto de coleta</h1>
            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>
                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleInputChange}
                    />
                    </div>
            <div className="field-group">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    />
               </div>
               <div className="field">
                    <label htmlFor="name">Whatsapp</label>
                    <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    onChange={handleInputChange}
                    />
                </div>
                </div>
                
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione o endereço no mapa</span>
                </legend>

                    <Map center={initialPosition}zoom={15} onclick={handleMapClick}>
                        
                        <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={selectedPosition}/>
                    </Map>

                    <div className="field-group">
                        <div className = "field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                            name="uf"
                             id="uf"
                              value={selectdUf} 
                              onChange={handleSelectedUf}>
                                <option value="0" >Selecione uma UF</option>
                                {ufs.map(uf=>(
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                            name="city" 
                            id="city"
                            value={selectedCity}
                            onChange={handleSelectCity}
                            >
                                <option value="0" >Selecione uma cidade</option>
                                {cities.map(city=>(
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Ítens de coleta</h2>
                    <span>selecione um ou mais itens abaixo</span>
                </legend>
                <ul className="items-grid">
                    {items.map(item =>(
                        <li
                         key={item.id}
                          onClick= { () => handleSelectItem(item.id)}
                          className={selectedItems.includes(item.id)?'selected':''}>
                        <img src={item.image_url} alt={item.title}/>
                    <span>{item.title}</span>
                    </li>
                   
                    ))}
                </ul>                
            </fieldset>

            <button type="submit">
                Cadastrar ponto de coleta
            </button>
        </form>
    </div>
    );
};
//parei 1:09:55
export default CreatePoint;