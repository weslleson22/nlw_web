import React from 'react';
import {Link} from 'react-router-dom'; 
import { FiArrowLeft } from 'react-icons/fi';
import {Map, TileLayer, Marker} from 'react-leaflet';

import './styles.css';

import logo from '../../assets/logo.svg'

const CreatePoint = ()=>{
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
                    />
                    </div>
            <div className="field-group">
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    />
               </div>
               <div className="field">
                    <label htmlFor="name">Whatsapp</label>
                    <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    />
                </div>
                </div>
                
            </fieldset>

            <fieldset>
                <legend>
                    <h2>Endereço</h2>
                    <span>Selecione o endereço no mapa</span>
                </legend>

                    <Map center={[-2.0339365, -45.9705647]}zoom={15}>
                        // />
                        <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[-2.0339365, -45.9705647]}/>
                    </Map>

                    <div className="field-group">
                        <div className = "field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0" >Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="uf">Cidade</label>
                            <select name="uf" id="uf">
                                <option value="0" >Selecione uma cidade</option>
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
                    <li>
                        <img src="http://localhost:3333/uploads/lampadas.svg" alt="Teste"/>
                        <span>Lampadas</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/baterias.svg" alt="Teste"/>
                        <span>Baterias</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/papeis-papelao.svg" alt="Teste"/>
                        <span>Papeis papelão</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/eletronicos.svg" alt="Teste"/>
                        <span>Eletronicos</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/organicos.svg" alt="Teste"/>
                        <span>Organicos</span>
                    </li>
                    <li>
                        <img src="http://localhost:3333/uploads/oleo.svg" alt="Teste"/>
                        <span>Óleo de Cozinha</span>
                    </li>
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