import './App.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import Swal from "sweetalert2"
import { API_URL } from './helpers/constant'
import { Button, Modal } from 'react-bootstrap'

function App() {
    const [data, setData] = useState([])
    const [user, setUser] = useState({
        namalengkap: '',
        username: '',
        password: ''
    })
    const [showModal, setShowModal] = useState(false)
    const [IsLoading, setIsLoading] = useState(true)

    const handleChange = (value, name) => {
        setUser({
            ...user,
            [name]: value,
        });
    }

    const getUsers = () => {
        setIsLoading(true)
        axios.get(`${API_URL}getDataUser`)
        .then((response) => {
            console.log(response.data.data);
            setData(response.data.data)
            setIsLoading(false)
        })
        .catch(function (err) {
            setIsLoading(false)
        })
    }

    const setDataUser = () => {
        setIsLoading(true)
        axios.post(`${API_URL}setDataUser`, user)
        .then((response) => {
            Swal.fire({
                title: "User berhasil ditambahkan!",
                icon: "success"
            });
            setIsLoading(false)
            setShowModal(false)
            getUsers()
        })
        .catch(function (err) {
            Swal.fire({
                title: "User gagal ditambahkan!",
                icon: "error"
            });
            setIsLoading(false)
        })
    }

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'question',
            title: `Yakin Ingin Hapus User?`,
            // text: 'error',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            confirmButtonText: `Hapus User`,
            customClass: {
                confirmButton: 'btn-igrosir px-4'
            },
            preConfirm: () => {
                return axios.delete(`${API_URL}delDataUser/${id}`)
                    .then((res) => {
                        getUsers()
                    })
                    .catch((err) => {
                        Swal.showValidationMessage(
                            `Request failed: ${err}`
                        )
                    })
            }
        });
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <h2 className='mb-4'>List Users</h2>
            <div className='row'>
                {IsLoading ? 
                    <div className='col-12'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    data.length ? 
                    data.map((v, k) => {
                        return (
                            <div className='col-md-6' key={k}>
                                <div className="card" style={{width: '18rem'}}>
                                    <div className="card-body">
                                        <h4 className="card-title mb-0">{v.namalengkap}</h4>
                                        <p className="card-text">({v.username})</p>
                                        <p className="card-text">{v.status === 1 ? "Aktif" : "Tidak Aktif"}</p>
                                        <button type='button' className="btn btn-primary" onClick={() => handleDelete(v.userid)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : ''
                }
            </div>
            <button type='button' className="btn btn-primary mt-4" onClick={() => setShowModal(true)}>Tambah User</button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Tambah User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className="form-label">Nama Lengkap</label>
                        <input className="form-control" type="text" onChange={(e) => handleChange(e.target.value, 'namalengkap')}></input>
                    </div>
                    <div>
                        <label className="form-label">Username</label>
                        <input className="form-control" type="text" onChange={(e) => handleChange(e.target.value, 'username')}></input>
                    </div>
                    <div>
                        <label className="form-label">Password</label>
                        <input className="form-control" type="password" onChange={(e) => handleChange(e.target.value, 'password')}></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => setDataUser()}>
                    {IsLoading ? 
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Simpan'
                    }
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default App
