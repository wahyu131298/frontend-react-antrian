import Container  from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";

//import $ from 'jquery';

import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React from 'react';

import { useState , useEffect } from "react";

function AntrianF() {

    const [antrians, setAntrian] = useState([]);
    const [polis, setPoli] = useState([]);
    const [kode, setKode] = useState('');
    const [count, setCount ] = useState(0);
    const [disable, setDisable] = useState([]);

    const fectData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/cari/?cari=${kode}`);
            const respoli = await axios.get('http://127.0.0.1:8000/api/getpoli');
            //get response data
            const data = await response.data.data;
            const data2 = await respoli.data.data;
            //assign response data to state "posts"
            setAntrian(data);
            setPoli(data2);
        } catch (e) {
            console.log(e.message);
        }
    }
    //useEffect hook
    useEffect(() => {
        fectData();
    }, [kode]);

    const setStore = async (no_reg, kd_dokter, kd_poli, no_rawat, no_rkm_medis,nm_pasien, nm_poli, nm_dokter, tgl_registrasi, kelas) => {
        if (disable.length === 0) {
            setCount(count + 1)
            setDisable(kelas)
            try {
                await axios.post('http://127.0.0.1:8000/api/antrian/storef',{
                    id : count,
                    kd_dokter : kd_dokter,
                    kd_poli : kd_poli,
                    status : 1,
                    no_rawat : no_rawat,
                    no_reg : no_reg,
                    no_rkm_medis : no_rkm_medis,
                    nm_pasien : nm_pasien,
                    nm_poli : nm_poli,
                    nm_dokter : nm_dokter,
                    tgl_registrasi : tgl_registrasi
                });
                console.log('success')
            } catch (e) {
                console.log(e.message);
              
            }
        }else{
            alert('STOP ANTRIAN DAHULU');
        }
    }

    const setUpdate = async (tgl_registrasi,no_rkm_medis,kd_dokter,kd_poli, nm_pasien,nm_poli,nm_dokter, no_reg) => {
        setDisable([])
        try {
            await axios.post('http://127.0.0.1:8000/api/antrianf/update/'+tgl_registrasi+'/'+no_rkm_medis+'/'+kd_dokter+'/'+kd_poli+'/',{
                status : 2,
                nm_pasien : nm_pasien,
                nm_dokter : nm_dokter,
                nm_poli : nm_poli,
                no_reg : no_reg
            });
            console.log('success stop')
           
        } catch (error) {
          
            console.log(error.message);
        }
    }

    
    return(
        <Container>
            <Row>
                <Col>
                <Card style={{ margin: '30px' }}>
                    <Card.Header className="header-antrian-f">
                    <Row>
                            <Col>
                                Panggil Antrian Poliklinik F
                            </Col>
                            <Col  xs={3}>
                               
                                <Form.Select aria-label="Floating label select example" onChange={(e) => setKode(e.target.value)}>
                                <option value="">- Pilih Poliklinik -</option>
                                    {
                                        polis.map((poli,index) => (
                                            <>
                                                <option value={poli.kd_poli}>{poli.nm_poli}</option>
                                            </>
                                        ))
                                    }
                                </Form.Select>
                                {/* <Col sm="10">
                                    <Button  type="submit" Button variant="outline-primary"><FontAwesomeIcon icon={faSpellCheck} /></Button>{' '}
                                </Col> */}
                                    
                            </Col>
                                
                        </Row>
                    </Card.Header>
                    <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No Reg</th>
                                <th>No Rawat</th>
                                <th>No Rekam Medis</th>
                                <th>Nama Pasien</th>
                                <th>Poliklinik</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {antrians.length !== 0 ? antrians.map((antrian, index) => (
                               <tr key={index}>
                                    <td>{antrian.no_reg}</td>
                                    <td>{antrian.no_rawat}</td>
                                    <td>{antrian.no_rkm_medis}</td>
                                    <td>{antrian.nm_pasien}</td>
                                    <td>{antrian.nm_poli}</td>
                                    <td> 
                                        <Button disabled={disable === 'play-'+antrian.no_rawat ? true : false } onClick={() => setStore(antrian.no_reg, antrian.kd_dokter, antrian.kd_poli, antrian.no_rawat, antrian.no_rkm_medis,antrian.nm_pasien,antrian.nm_poli,antrian.nm_dokter, antrian.tgl_registrasi, 'play-'+antrian.no_rawat)} variant="primary" size="sm"><FontAwesomeIcon icon={faPlay} /> </Button>{' '}
                                        <Button  disabled={disable === 'play-'+antrian.no_rawat ? false : true} onClick={() => setUpdate(antrian.tgl_registrasi,antrian.no_rkm_medis,antrian.kd_dokter, antrian.kd_poli,antrian.nm_pasien,antrian.nm_dokter,antrian.nm_poli,antrian.no_reg)} variant="danger" size="sm"><FontAwesomeIcon icon={faStop} /> </Button>{' '}
                                    </td>
                                </tr> 
                            )) : <tr><td colSpan={6}><center>TIDAK ADA PASIEN TERDAFTAR</center></td></tr> }
                        </tbody>
                        </Table>

                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AntrianF;

